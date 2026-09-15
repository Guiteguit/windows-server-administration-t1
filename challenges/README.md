# Challenges bonus

## Challenge A — second contrôleur de domaine

Ajouter `DC02` et vérifier la réplication :

```powershell
Get-ADDomainController -Filter *
repadmin /replsummary
```

## Challenge B — Hyper-V niveau 2

Si la plateforme le permet :

- créer un vSwitch Internal et un Private ;
- créer deux VMs Generation 2 ;
- utiliser un VHDX dynamique ;
- créer un checkpoint ;
- comparer `Get-VM`, `Get-VHD`, `Get-VMSwitch` ;
- expliquer pourquoi un checkpoint n'est pas une stratégie de sauvegarde.

## Challenge C — durcissement

Créer une GPO de base pour les postes utilisateurs contenant trois réglages raisonnables et documenter l'impact opérationnel.

## Challenge D — PowerShell avancé

Transformer le TP5 en fonction avancée avec paramètres, `CmdletBinding()`, `-WhatIf`, journalisation et codes de retour.

## Challenge E — conformité

Écrire un script qui vérifie automatiquement :

- DNS de CLT01 ;
- état du scope DHCP ;
- présence des groupes AGDLP ;
- ACL des partages Finance/RH ;
- présence des deux GPO attendues.

Le script ne doit rien corriger : uniquement produire `PASS/WARN/FAIL`.
