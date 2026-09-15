# Alignement avec le programme pédagogique

## Matière de référence

**Administration et maintenance Windows Server — B3**

Le programme de référence couvre notamment :

- Windows Active Directory ;
- construction et gestion de l'AD ;
- partage de fichiers et droits NTFS ;
- fonctionnalités réseau ;
- DHCP, DNS et routage ;
- Hyper-V ;
- WSUS, WDS et PowerShell.

Les modalités prévues sont de type QCM, écrit et projet avec soutenance.

## Choix pédagogique pour 12 h

Le format réel est **8 séances de 1 h 30 = 12 h**. On conserve environ **2 h de cours/démonstrations** et on consacre le reste aux manipulations et au diagnostic.

| Thème du programme | Traitement dans ce T1 | Niveau |
|---|---|---|
| Active Directory | cours + TP1 + TP2 | approfondi |
| Construction / gestion AD | TP1 + TP2 | approfondi |
| GPO | cours + TP2 | pratique |
| Partage de fichiers / NTFS | TP3 | approfondi |
| DNS | cours + TP1 + TP4 + TP7 | approfondi |
| DHCP | cours + TP4 + TP7 | pratique |
| Routage | positionnement et commandes de diagnostic | introduction |
| Hyper-V | cours + mini-lab TP6 lorsque possible | pratique guidée |
| PowerShell | transversal + TP5 + TP6 | approfondi |
| Maintenance / logs | cours + TP6 + TP7 | pratique |
| WSUS | rôle, architecture et positionnement 2026 | sensibilisation raisonnée |
| WDS | rôle historique, limitations et positionnement 2026 | sensibilisation raisonnée |

## Pourquoi WSUS/WDS ne deviennent pas un gros TP ?

Le temps supplémentaire est utilisé pour **maintenance, Hyper-V, automatisation et troubleshooting**, plus transférables dans un contexte professionnel. WSUS est encore utilisable mais n'est plus activement développé ; les workflows WDS modernes sont partiellement restreints/dépréciés. Le cours les enseigne donc comme technologies à connaître et à replacer dans l'écosystème actuel.

## Challenge ajouté

Par rapport à un TP purement guidé :

- AGDLP ;
- deux GPO ciblées à des scopes différents ;
- matrice SMB/NTFS et droits effectifs ;
- DHCP + DNS direct/inverse + incident volontaire ;
- PowerShell idempotent + rapport / `-WhatIf` ;
- health-check de maintenance ;
- Hyper-V avec voie alternative si nested virtualization absente ;
- break/fix final avec preuve de cause racine et mesure préventive.
