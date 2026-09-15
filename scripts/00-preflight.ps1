<#
.SYNOPSIS
  Vérifications préalables du lab Windows Server.
#>

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Continue'

Write-Host '=== OS ===' -ForegroundColor Cyan
Get-ComputerInfo | Select-Object WindowsProductName, WindowsVersion, OsBuildNumber, CsName

Write-Host "`n=== Réseau ===" -ForegroundColor Cyan
Get-NetAdapter | Format-Table Name, Status, LinkSpeed, MacAddress -AutoSize
Get-NetIPConfiguration

Write-Host "`n=== Rôles utiles ===" -ForegroundColor Cyan
Get-WindowsFeature AD-Domain-Services,DNS,DHCP,FS-FileServer,Hyper-V |
    Format-Table Name, InstallState -AutoSize

Write-Host "`n=== Heure ===" -ForegroundColor Cyan
Get-Date
Get-TimeZone

Write-Host "`nPréflight terminé. Vérifiez manuellement que le NIC est connecté au réseau LAB-NOVACORP." -ForegroundColor Yellow
