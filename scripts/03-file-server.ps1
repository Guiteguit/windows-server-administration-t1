<#
.SYNOPSIS
  Configure les partages de fichiers NovaCorp sur SRV01.
#>

[CmdletBinding()]
param(
    [string]$Root = 'D:\Shares'
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

if ($env:COMPUTERNAME -ne 'SRV01') {
    throw "Script prévu pour SRV01. Machine actuelle : $env:COMPUTERNAME"
}

$domain = (Get-CimInstance Win32_ComputerSystem).Domain
if ($domain -ne 'novacorp.test') {
    throw "SRV01 doit être membre de novacorp.test avant ce script. Domaine actuel : $domain"
}

if (-not (Test-Path (Split-Path $Root -Qualifier))) {
    Write-Warning "Le lecteur demandé n'existe pas. Bascule automatique vers C:\Shares."
    $Root = 'C:\Shares'
}

Install-WindowsFeature FS-FileServer | Out-Null

$shares = @(
    @{Name='Commun'; Group='NOVACORP\DL-COMMUN-R'; Access='Read'},
    @{Name='Finance'; Group='NOVACORP\DL-FINANCE-RW'; Access='Change'},
    @{Name='RH'; Group='NOVACORP\DL-RH-RW'; Access='Change'}
)

foreach ($s in $shares) {
    $path = Join-Path $Root $s.Name
    New-Item -ItemType Directory -Path $path -Force | Out-Null

    # NTFS : coupe l'héritage, conserve Administrators + SYSTEM et ajoute le groupe métier.
    & icacls.exe $path /inheritance:r | Out-Null
    & icacls.exe $path /grant:r '*S-1-5-32-544:(OI)(CI)F' '*S-1-5-18:(OI)(CI)F' | Out-Null

    if ($s.Access -eq 'Read') {
        & icacls.exe $path /grant "$($s.Group):(OI)(CI)RX" | Out-Null
    } else {
        & icacls.exe $path /grant "$($s.Group):(OI)(CI)M" | Out-Null
    }

    if (Get-SmbShare -Name $s.Name -ErrorAction SilentlyContinue) {
        Remove-SmbShare -Name $s.Name -Force
    }

    if ($s.Access -eq 'Read') {
        New-SmbShare -Name $s.Name -Path $path -ReadAccess $s.Group | Out-Null
    } else {
        New-SmbShare -Name $s.Name -Path $path -ChangeAccess $s.Group | Out-Null
    }
}

Write-Host "Partages créés sous $Root" -ForegroundColor Green
Get-SmbShare | Where-Object Name -in @('Commun','Finance','RH') | Format-Table Name,Path -AutoSize
