<#
.SYNOPSIS
  Prépare DC01 puis installe AD DS + DNS pour le lab NovaCorp.

.WARNING
  LAB UNIQUEMENT. Le script change le nom, l'IP et crée une nouvelle forêt.
#>

[CmdletBinding()]
param(
    [string]$InterfaceAlias = 'Ethernet',
    [string]$DcIp = '10.10.10.10',
    [int]$PrefixLength = 24,
    [string]$DomainName = 'novacorp.test',
    [string]$DomainNetbios = 'NOVACORP'
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

if ($env:COMPUTERNAME -ne 'DC01') {
    Write-Warning "Nom actuel : $env:COMPUTERNAME"
    Write-Warning "Ce script est prévu pour une VM de lab qui doit devenir DC01."
    $confirm = Read-Host 'Continuer et renommer en DC01 ? (O/N)'
    if ($confirm -notmatch '^[OoYy]$') { return }
    Rename-Computer -NewName 'DC01' -Force
    Write-Host 'Redémarrez puis relancez ce script.' -ForegroundColor Yellow
    return
}

$adapter = Get-NetAdapter -Name $InterfaceAlias -ErrorAction Stop

# Nettoyage uniquement des IPv4 non APIPA sur l'interface de lab.
Get-NetIPAddress -InterfaceIndex $adapter.ifIndex -AddressFamily IPv4 -ErrorAction SilentlyContinue |
    Where-Object { $_.IPAddress -notlike '169.254.*' } |
    Remove-NetIPAddress -Confirm:$false -ErrorAction SilentlyContinue

New-NetIPAddress -InterfaceIndex $adapter.ifIndex -IPAddress $DcIp -PrefixLength $PrefixLength | Out-Null
Set-DnsClientServerAddress -InterfaceIndex $adapter.ifIndex -ServerAddresses $DcIp

Install-WindowsFeature AD-Domain-Services -IncludeManagementTools | Out-Null

$dsrm = Read-Host 'Mot de passe DSRM' -AsSecureString

Install-ADDSForest `
    -DomainName $DomainName `
    -DomainNetbiosName $DomainNetbios `
    -InstallDNS:$true `
    -SafeModeAdministratorPassword $dsrm `
    -Force:$true
