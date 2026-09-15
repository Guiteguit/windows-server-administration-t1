# Déroulé pédagogique — 8 séances × 1 h 30

Ce document est la vue « emploi du temps ». Les temps sont des cibles ; garder 5 à 10 minutes de marge lorsqu'un reboot ou une promotion AD prend plus de temps.

## S1 — Fondamentaux Windows Server — 90 min

**Slides 1 à 16.**

- 0–15 min : contexte, architecture NovaCorp, rôles/features ;
- 15–45 min : domaine, forêt, OU, groupes, AGDLP ;
- 45–65 min : DNS AD, promotion d'un DC, GPO ;
- 65–80 min : SMB/NTFS, moindre privilège ;
- 80–90 min : DHCP, commandes réseau, PowerShell/idempotence.

**Checkpoint oral :** l'étudiant sait expliquer pourquoi un domaine AD dépend d'un DNS cohérent.

## S2 — Fin du cours + TP1 — 90 min

**0–30 min : slides 17 à 24**

- Hyper-V ;
- WSUS/WDS et positionnement 2026 ;
- maintenance ;
- méthode `IP -> DNS -> Service -> Auth -> Autorisation` ;
- règles de preuve.

**30–90 min : TP1 — Construire `novacorp.test`.**

Checkpoint :

```powershell
Get-ADDomain
Get-ADForest
Resolve-DnsName _ldap._tcp.dc._msdcs.novacorp.test -Type SRV
dcdiag
```

## S3 — TP2 : AD / AGDLP / GPO — 90 min

- 0–10 min : briefing + rappel OU ≠ groupe ;
- 10–45 min : OU, users, groupes et AGDLP ;
- 45–65 min : jointure SRV01 / CLT01 ;
- 65–85 min : GPO utilisateur + GPO ordinateur ;
- 85–90 min : validation / commit.

## S4 — TP3 : SMB / NTFS — 90 min

- 0–15 min : création stockage + partages ;
- 15–45 min : ACL NTFS + groupes de ressources ;
- 45–65 min : tests Alice / Bruno / Chloé ;
- 65–80 min : héritage, ABE et droits effectifs ;
- 80–90 min : challenge d'audit et preuves.

## S5 — TP4 : DHCP / DNS — 90 min

- 0–20 min : rôle DHCP + autorisation AD ;
- 20–45 min : scope, options, exclusions/réservation ;
- 45–65 min : CLT01 en DHCP + validation ;
- 65–75 min : reverse zone / PTR ;
- 75–85 min : incident DNS volontaire ;
- 85–90 min : conclusion / commit.

## S6 — TP5 : PowerShell — 90 min

- 0–15 min : lecture CSV + architecture du script ;
- 15–55 min : onboarding idempotent ;
- 55–70 min : `try/catch`, validation et deuxième exécution ;
- 70–85 min : rapport CSV et/ou `SupportsShouldProcess` ;
- 85–90 min : revue rapide de code.

## S7 — TP6 : Maintenance / Hyper-V — 90 min

- 0–15 min : contrôle santé de DC01/SRV01 ;
- 15–45 min : health-check PowerShell + export d'un rapport ;
- 45–75 min : mini-lab Hyper-V si nested virtualization disponible ; sinon voie alternative d'analyse/architecture ;
- 75–90 min : journal d'exploitation + mesure préventive.

## S8 — TP7 : Incident final — 90 min

- 0–10 min : attribution / injection de panne ;
- 10–50 min : diagnostic sans correction au hasard ;
- 50–65 min : correction + validation ;
- 65–80 min : restitution courte par binôme ;
- 80–90 min : QCM / débrief / prévention.
