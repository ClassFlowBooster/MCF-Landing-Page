# Hébergement du site : réglages à appliquer (non appliqués)

Le site est servi par **Coolify sur `ovhperso`** (VPS OVH de Benoist, `37.59.123.51`) : Traefik, le proxy de Coolify, termine le HTTPS ; derrière lui, un conteneur nginx (image construite par Nixpacks depuis `main`) sert la racine du dépôt telle quelle. Ces réglages se font dans l'interface Coolify (`coolify.benoist-de-montgrand.fr`), application « MCF-Landing-Page ». **Rien n'est appliqué sans le go de Joseph** ; Benoist a la main sur le serveur.

Constat du 21/10 (vérifié par `curl`) :

| Point | Aujourd'hui | Attendu |
|---|---|---|
| `http://myclassflow.fr/` | 302 vers https | 301 |
| `https://myclassflow.fr/enseignants` | 301 vers **`http://`**`myclassflow.fr/enseignants/`, puis 302 vers https | une seule 301 vers `https://myclassflow.fr/enseignants/` |
| Adresse inexistante | 200 avec la page d'accueil | 404 avec `404.html` |
| `/outils/`, `/docs/`, `/tests/`, `/.github/`, `/.claude/`, `package.json` | publics (200 ou 403) | 404 |
| Cache | aucun `Cache-Control` | images, CSS, JS : 7 jours ; HTML : revalidé |
| `www.myclassflow.fr` | DNS vers le serveur, mais aucune route (404 en http, échec TLS en https) | 301 vers `https://myclassflow.fr/` |

## 1. nginx (Coolify : application → Configuration → « Custom Nginx Configuration »)

Si l'application n'offre pas ce champ (build Nixpacks Node), passer l'application en « Static » avec ce fichier, ou fournir un `nginx.conf` au build : à voir avec Benoist selon la version de Coolify.

```nginx
server {
    listen 80;
    server_name _;
    root /usr/share/nginx/html;   # à reprendre de la configuration actuelle du conteneur (Nixpacks peut servir depuis /app)
    index index.html;

    # Redirections relatives : nginx ne réécrit plus l'adresse en http:// derrière Traefik.
    absolute_redirect off;

    # Fichiers de travail du dépôt : jamais publiés.
    location ~ ^/(outils|docs|tests|\.github|\.claude|\.git|node_modules)(/|$) { return 404; }
    location ~ ^/(package\.json|package-lock\.json|CLAUDE\.md|README\.md)$ { return 404; }

    # Pages : un vrai 404 au lieu de l'accueil.
    location / {
        try_files $uri $uri/ =404;
        add_header Cache-Control "no-cache" always;
    }
    error_page 404 /404.html;
    location = /404.html { internal; add_header Cache-Control "no-cache" always; }

    # Ressources statiques : 7 jours (les noms ne sont pas versionnés, d'où une durée courte).
    location ~* \.(css|js|webp|png|jpg|jpeg|svg|ico|woff2?)$ {
        try_files $uri =404;
        add_header Cache-Control "public, max-age=604800";
    }

    gzip on;
    gzip_types text/css application/javascript image/svg+xml application/xml text/plain;
}
```

Contrôles après application :

```sh
curl -sI https://myclassflow.fr/enseignants | grep -i '^location'      # location: /enseignants/
curl -s -o /dev/null -w '%{http_code}\n' https://myclassflow.fr/inexistant/   # 404
curl -s -o /dev/null -w '%{http_code}\n' https://myclassflow.fr/.claude/settings.json  # 404
curl -s -o /dev/null -w '%{http_code}\n' https://myclassflow.fr/outils/generer.mjs     # 404
curl -sI https://myclassflow.fr/assets/css/base.css | grep -i cache-control
```

## 2. Traefik (Coolify : application → Configuration → Domains et « Container Labels »)

- **Domaines** : `https://myclassflow.fr,https://www.myclassflow.fr`, avec l'option de redirection **« Redirect to non-www »** (Coolify génère le certificat de `www` et la redirection).
- **http → https en 301** : Coolify pose par défaut un middleware `redirect-to-https` en 302. Dans les labels du conteneur, rendre ce middleware permanent :

```
traefik.http.middlewares.redirect-to-https.redirectscheme.scheme=https
traefik.http.middlewares.redirect-to-https.redirectscheme.permanent=true
```

  (Le nom exact du middleware figure dans les labels générés par Coolify : garder ce nom, n'ajouter que `permanent=true`. Idem pour la redirection www si elle sort en 302 : `…redirectregex.permanent=true`.)

Contrôles :

```sh
curl -s -o /dev/null -w '%{http_code} %{redirect_url}\n' http://myclassflow.fr/        # 301 https://myclassflow.fr/
curl -s -o /dev/null -w '%{http_code} %{redirect_url}\n' https://www.myclassflow.fr/   # 301 https://myclassflow.fr/
curl -s -o /dev/null -w '%{http_code} %{redirect_url}\n' http://www.myclassflow.fr/    # 301 (une seule redirection idéalement)
```

## Retour arrière

Vider le champ « Custom Nginx Configuration » et retirer les labels ajoutés, puis « Redeploy » : le site revient au comportement actuel. Le domaine `www` peut être retiré de la liste des domaines.
