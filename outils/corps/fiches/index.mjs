// Fiches explicatives des fonctionnalités, dans l'ordre du plan (MCF-Pilotage#53).
import ficheDePreparation from "./fiche-de-preparation.mjs";
import cahierJournal from "./cahier-journal.mjs";
import emploiDuTemps from "./emploi-du-temps.mjs";
import adaptationDesSupports from "./adaptation-des-supports.mjs";
import fichesEleves from "./fiches-eleves.mjs";
import importElevesPhoto from "./import-eleves-photo.mjs";
import taches from "./taches.mjs";
import lia from "./lia.mjs";
import { dateModification, datePublication } from "../../dates.mjs";

// Publication : commit qui a ajouté le corps de la fiche ; mise à jour : son dernier commit (ou le jour
// même s'il est modifié). Lue sur la source, la date ne change pas d'une génération à l'autre.
export const FICHES = [ficheDePreparation, cahierJournal, emploiDuTemps, adaptationDesSupports, fichesEleves, importElevesPhoto, taches, lia]
  .map((fiche) => ({
    ...fiche,
    datePublication: datePublication(`outils/corps/fiches/${fiche.slug}.mjs`),
    dateModification: dateModification(`outils/corps/fiches/${fiche.slug}.mjs`),
  }));
