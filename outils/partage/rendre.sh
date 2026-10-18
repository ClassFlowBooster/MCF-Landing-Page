#!/bin/sh
# Rend les cartes og:image des espaces et des fiches (assets/img/og-*.png) depuis gabarit.html avec Chrome sans tête.
# Usage : outils/partage/rendre.sh [dossier de sortie, défaut assets/img]
set -e
cd "$(dirname "$0")/../.."
SORTIE="${1:-assets/img}"
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
for p in classflow ecoles enseignants parents-enfants fiche-de-preparation; do
  "$CHROME" --headless=new --disable-gpu --hide-scrollbars --allow-file-access-from-files \
    --window-size=1200,630 --virtual-time-budget=8000 \
    --screenshot="$SORTIE/og-$p.png" "file://$PWD/outils/partage/gabarit.html?page=$p" >/dev/null 2>&1
done
