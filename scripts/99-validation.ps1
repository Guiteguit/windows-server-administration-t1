<#
.SYNOPSIS
  Validation globale du lab. À lancer sur un serveur disposant des modules RSAT nécessaires.
#>

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Continue'

Write-Host '=== DNS ===' -ForegroundColor Cyan
Resolve-DnsName dc01.novacorp.test
Resolve-DnsName srv01.novacorp.test
Resolve-DnsName _ldap._tcp.dc._msdcs.novacorp.test -Type SRV

Write-Host "`n=== AD ===" -ForegroundColor Cyan
Import-Module ActiveDirectory
Get-ADDomain | Select DNSRoot,NetBIOSName,DomainMode
Get-ADDomainController -Filter * | Select HostName,IPv4Address,IsGlobalCatalog
Get-ADGroupMember GG-FINANCE | Select Name,SamAccountName
Get-ADGroupMember DL-FINANCE-RW | Select Name,ObjectClass

Write-Host "`n=== SMB ===" -ForegroundColor Cyan
Test-NetConnection srv01.novacorp.test -Port 445

Write-Host "`n=== Services ===" -ForegroundColor Cyan
Get-Service Netlogon | Format-Table Name,Status

Write-Host "`nValidation terminée. Les tests DHCP/SMB détaillés sont à exécuter sur SRV01 et CLT01." -ForegroundColor Yellow
