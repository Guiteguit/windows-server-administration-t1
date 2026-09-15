[CmdletBinding()]
param(
    [string]$OutputPath = "$PSScriptRoot\..\..\health-report.json"
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

# TODO 1 — informations OS / dernier démarrage
$os = $null

# TODO 2 — volumes et espace restant
$volumes = @()

# TODO 3 — services critiques selon le rôle du serveur
$services = @()

# TODO 4 — compter les erreurs System des 60 dernières minutes
$systemErrorCount = 0

# TODO 5 — ajouter au moins un check métier : DNS SRV sur DC01 OU DHCP/SMB sur SRV01
$roleChecks = @()

$report = [pscustomobject]@{
    ComputerName     = $env:COMPUTERNAME
    GeneratedAt      = Get-Date
    OS               = $os
    Volumes          = $volumes
    Services         = $services
    SystemErrorCount = $systemErrorCount
    RoleChecks       = $roleChecks
}

$report | ConvertTo-Json -Depth 6 | Set-Content -Path $OutputPath -Encoding UTF8
$report
