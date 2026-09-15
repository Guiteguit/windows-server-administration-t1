# TP5 — Automatiser un onboarding avec PowerShell

**Durée : 90 min**  
**VM principale : DC01**

## Mission

La direction ouvre une équipe Support. Vous recevez un CSV de nouveaux collaborateurs. Votre script doit créer les éléments manquants et pouvoir être relancé proprement.

Fichier source : [`../data/new-users.csv`](../data/new-users.csv)

Template : [`../scripts/student/05-provision-users-template.ps1`](../scripts/student/05-provision-users-template.ps1)

## Exigences

Votre script doit :

1. importer le CSV ;
2. vérifier si l'OU du département existe ;
3. créer l'OU si nécessaire ;
4. vérifier si le groupe global du département existe ;
5. créer le groupe si nécessaire ;
6. vérifier si chaque utilisateur existe ;
7. créer les comptes manquants ;
8. ajouter chaque utilisateur au bon groupe ;
9. afficher un résumé final ;
10. ne pas échouer si le script est lancé une deuxième fois.

## Contraintes

- pas de mot de passe en clair dans le dépôt final ;
- utiliser `-ErrorAction Stop` dans les opérations critiques ;
- utiliser au moins un `try/catch` ;
- afficher des messages lisibles ;
- commenter les étapes non évidentes.

## Commandes à rechercher

```powershell
Import-Csv
Get-ADOrganizationalUnit
New-ADOrganizationalUnit
Get-ADGroup
New-ADGroup
Get-ADUser
New-ADUser
Add-ADGroupMember
```

## Validation

Le premier lancement doit créer des objets.

Le second lancement doit terminer sans doublon ni erreur bloquante.

Vérifier :

```powershell
Get-ADUser -Filter * -SearchBase 'OU=Support,OU=Users,OU=NovaCorp,DC=novacorp,DC=test'
Get-ADGroupMember GG-SUPPORT
```

## Bonus 1

Générer `onboarding-report.csv` avec :

```text
SamAccountName,Action,Status,Timestamp
```

## Bonus 2

Ajouter un paramètre `-WhatIfMode` permettant de simuler le provisioning sans créer d'objet.

---

## Extension 90 min — niveau production

### Exigence 11 — rapport

Exporter un rapport CSV contenant au minimum :

```text
SamAccountName,Action,Status,Timestamp
```

### Exigence 12 — simulation

Option recommandée : transformer le script en fonction avancée ou utiliser :

```powershell
[CmdletBinding(SupportsShouldProcess)]
```

puis protéger les opérations de création avec :

```powershell
if ($PSCmdlet.ShouldProcess(...)) {
    # création
}
```

Le script doit pouvoir être appelé avec `-WhatIf` lorsqu'il est implémenté comme script avancé.

### Revue de code

Avant de terminer, un autre étudiant/binôme relit votre script et note :

- une bonne pratique ;
- un risque ;
- une amélioration de lisibilité ;
- une amélioration de robustesse.
