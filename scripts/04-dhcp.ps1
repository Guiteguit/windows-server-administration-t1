#requires -Modules DhcpServer
<#
.SYNOPSIS
  Installe et configure DHCP sur SRV01.
#>

[CmdletBinding()]
param(
    [string]$ServerIp = '10.10.10.20',
    [string]$DnsServer = '10.10.10.10',
    [string]$DnsDomain = 'novacorp.test',
    [string]$Gateway = ''
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

if ($env:COMPUTERNAME -ne 'SRV01') {
    throw "Script prévu pour SRV01. Machine actuelle : $env:COMPUTERNAME"
}

Install-WindowsFeature DHCP -IncludeManagementTools | Out-Null

# Autorisation AD, idempotente.
if (-not (Get-DhcpServerInDC | Where-Object DnsName -eq 'srv01.novacorp.test')) {
    Add-DhcpServerInDC -DnsName 'srv01.novacorp.test' -IPAddress $ServerIp
}

$scopeId = '10.10.10.0'
if (-not (Get-DhcpServerv4Scope -ScopeId $scopeId -ErrorAction SilentlyContinue)) {
    Add-DhcpServerv4Scope `
        -Name 'LAN-NOVACORP' `
        -StartRange '10.10.10.100' `
        -EndRange '10.10.10.199' `
        -SubnetMask '255.255.255.0' `
        -State Active | Out-Null
}

Set-DhcpServerv4OptionValue -ScopeId $scopeId -DnsServer $DnsServer -DnsDomain $DnsDomain

if ($Gateway) {
    Set-DhcpServerv4OptionValue -ScopeId $scopeId -Router $Gateway
}

Restart-Service DHCPServer
Write-Host 'DHCP configuré.' -ForegroundColor Green
Get-DhcpServerv4Scope
Get-DhcpServerv4OptionValue -ScopeId $scopeId
