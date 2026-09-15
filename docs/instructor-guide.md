# Guide formateur — 12 h / 8 séances × 1 h 30

## Philosophie

Le module doit produire des **preuves techniques**, pas seulement des captures de GUI. La progression est volontaire :

```text
Construire -> Structurer -> Autoriser -> Distribuer -> Automatiser -> Maintenir -> Dépanner
```

Le référentiel est large. Avec 12 h, on peut conserver les fondamentaux approfondis et ajouter un vrai bloc **maintenance / Hyper-V** au lieu de les laisser uniquement en sensibilisation.

## Répartition générale

- **S1 :** 90 min de slides / démonstrations ;
- **S2 :** 30 min de slides puis 60 min de TP1 ;
- **S3 à S7 :** TP de 90 min ;
- **S8 :** break/fix, restitution et mini-évaluation.

Le deck PowerPoint est donc toujours un deck d'environ **2 h**, mais il est réparti sur le début de S1 et S2.

---

## S1 — Slides 1 à 16

Arrêter la séance après la slide 16 **Idempotence**.

À la fin de S1, faire verbaliser :

1. pourquoi DC01 doit être en IP statique ;
2. pourquoi le DNS client du domaine doit connaître la zone AD ;
3. différence OU / groupe ;
4. principe AGDLP ;
5. différence droit de partage / droit NTFS ;
6. intérêt d'un script relançable.

## S2 — Slides 17 à 24 + TP1

### 0–30 min — fin du deck

Couvrir Hyper-V, maintenance, WSUS/WDS, méthode de diagnostic et règles des TP.

### 30–90 min — TP1

Checkpoint :

```powershell
Get-ADDomain
Get-ADForest
Resolve-DnsName _ldap._tcp.dc._msdcs.novacorp.test -Type SRV
dcdiag
```

Si un étudiant est bloqué par la promotion ou le reboot, utiliser la correction pour garantir un point de reprise commun en S3.

---

## S3 — TP2 AD / GPO

Question pivot :

> Pourquoi je ne mets pas directement Alice dans l'ACL du dossier Finance ?

Réponse attendue : gestion centralisée, auditabilité, évolutivité, modèle groupes -> ressources.

Le TP demande désormais **deux preuves GPO** : une stratégie utilisateur et une stratégie ordinateur.

---

## S4 — TP3 SMB / NTFS

Faire tester au minimum deux comptes métiers. La bonne réponse n'est jamais « je vois le partage donc j'ai les droits ».

Rappel :

```text
Accès réseau effectif = combinaison permissions de partage + permissions NTFS.
```

Insister aussi sur l'héritage et l'Access-Based Enumeration.

---

## S5 — TP4 DHCP / DNS

Piège volontaire : un client peut recevoir une bonne IP mais un mauvais DNS et sembler « connecté » tout en étant incapable de travailler avec le domaine.

Faire verbaliser :

```text
IP -> DNS -> Service -> Authentification -> Autorisation
```

Les plus rapides ajoutent réservation et options DNS dynamiques.

---

## S6 — TP5 PowerShell

Refuser un script qui marche une seule fois.

Niveau attendu :

- contrôles d'existence ;
- `try/catch` ;
- deuxième exécution sans doublon ;
- rapport lisible ;
- bonus `SupportsShouldProcess` / `-WhatIf`.

---

## S7 — TP6 Maintenance / Hyper-V

Le TP est conçu en **deux voies** :

### Voie A — nested virtualization disponible

- health-check ;
- installation / inspection du rôle Hyper-V sur un serveur dédié de lab ou une VM prévue à cet effet ;
- vSwitch Internal/Private ;
- VM Generation 2 ;
- VHDX dynamique ;
- validation PowerShell.

### Voie B — nested virtualization indisponible

- health-check complet ;
- analyse des rôles/services/logs ;
- étude d'architecture Hyper-V ;
- commandes `Get-WindowsFeature`, fichiers de configuration et plan de déploiement ;
- production d'une checklist de maintenance exploitable.

Ne jamais faire installer Hyper-V sur DC01 au milieu du fil rouge.

---

## S8 — TP7 Break/Fix

Variante recommandée :

1. distribuer une carte d'incident par binôme ;
2. chaque binôme applique discrètement la panne ;
3. échange de poste ;
4. 40 min de diagnostic ;
5. 15 min de correction et validation ;
6. 15 min de restitution ;
7. 10 min QCM / débrief.

Le score récompense la **preuve de la cause racine**, pas uniquement le retour au vert.

Voir [`../assessment/grading-rubric.md`](../assessment/grading-rubric.md).
