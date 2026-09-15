#requires -Modules ActiveDirectory
<#
.SYNOPSIS
  Template étudiant - TP5.

.DESCRIPTION
  Compléter les TODO afin de provisionner les utilisateurs du CSV de manière relançable.
  Ce script est destiné uniquement au domaine de lab novacorp.test.
#>

[CmdletBinding()]
param(
    [string]$CsvPath = "$PSScriptRoot\..\..\data\new-users.csv"
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

$DomainDn = 'DC=novacorp,DC=test'
$UsersBaseOu = "OU=Users,OU=NovaCorp,$DomainDn"
$GroupsOu = "OU=Groups,OU=NovaCorp,$DomainDn"

if (-not (Test-Path $CsvPath)) {
    throw "CSV introuvable : $CsvPath"
}

$users = Import-Csv $CsvPath

foreach ($row in $users) {
    $department = $row.Department
    $departmentOu = "OU=$department,$UsersBaseOu"
    $groupName = "GG-$($department.ToUpper())"

    # TODO 1 : vérifier/créer l'OU département.

    # TODO 2 : vérifier/créer le groupe global dans $GroupsOu.

    # TODO 3 : vérifier/créer l'utilisateur.
    # Conseil : demander le mot de passe une seule fois hors de la boucle.

    # TODO 4 : ajouter l'utilisateur au groupe si nécessaire.

    Write-Host "Traitement : $($row.SamAccountName)" -ForegroundColor Cyan
}

Write-Host 'Provisioning terminé.' -ForegroundColor Green
