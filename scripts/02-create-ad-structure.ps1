#requires -Modules ActiveDirectory,GroupPolicy
<#
.SYNOPSIS
  Crée la structure AD principale du lab NovaCorp.
#>

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

$domain = Get-ADDomain
if ($domain.DNSRoot -ne 'novacorp.test') {
    throw "Ce script doit être exécuté dans novacorp.test. Domaine actuel : $($domain.DNSRoot)"
}

$domainDn = $domain.DistinguishedName
$rootOu = "OU=NovaCorp,$domainDn"
$usersOu = "OU=Users,$rootOu"
$computersOu = "OU=Computers,$rootOu"
$groupsOu = "OU=Groups,$rootOu"

function Ensure-Ou {
    param([string]$Name,[string]$Path)
    $dn = "OU=$Name,$Path"
    if (-not (Get-ADOrganizationalUnit -Identity $dn -ErrorAction SilentlyContinue)) {
        New-ADOrganizationalUnit -Name $Name -Path $Path -ProtectedFromAccidentalDeletion $true | Out-Null
        Write-Host "OU créée : $dn" -ForegroundColor Green
    }
}

if (-not (Get-ADOrganizationalUnit -Identity $rootOu -ErrorAction SilentlyContinue)) {
    New-ADOrganizationalUnit -Name 'NovaCorp' -Path $domainDn -ProtectedFromAccidentalDeletion $true | Out-Null
}

Ensure-Ou -Name 'Users' -Path $rootOu
Ensure-Ou -Name 'Computers' -Path $rootOu
Ensure-Ou -Name 'Groups' -Path $rootOu
Ensure-Ou -Name 'Finance' -Path $usersOu
Ensure-Ou -Name 'RH' -Path $usersOu
Ensure-Ou -Name 'IT' -Path $usersOu
Ensure-Ou -Name 'Workstations' -Path $computersOu
Ensure-Ou -Name 'Servers' -Path $computersOu

$groups = @(
    @{Name='GG-FINANCE'; Scope='Global'},
    @{Name='GG-RH'; Scope='Global'},
    @{Name='GG-IT'; Scope='Global'},
    @{Name='DL-FINANCE-RW'; Scope='DomainLocal'},
    @{Name='DL-RH-RW'; Scope='DomainLocal'},
    @{Name='DL-COMMUN-R'; Scope='DomainLocal'}
)

foreach ($g in $groups) {
    if (-not (Get-ADGroup -Identity $g.Name -ErrorAction SilentlyContinue)) {
        New-ADGroup -Name $g.Name -SamAccountName $g.Name -GroupScope $g.Scope -GroupCategory Security -Path $groupsOu | Out-Null
    }
}

$password = Read-Host 'Mot de passe commun de LAB pour les trois comptes' -AsSecureString
$users = @(
    @{Given='Alice'; Surname='Martin'; Sam='amartin'; Ou="OU=Finance,$usersOu"; Group='GG-FINANCE'},
    @{Given='Bruno'; Surname='Robert'; Sam='brobert'; Ou="OU=RH,$usersOu"; Group='GG-RH'},
    @{Given='Chloé'; Surname='Durand'; Sam='cdurand'; Ou="OU=IT,$usersOu"; Group='GG-IT'}
)

foreach ($u in $users) {
    if (-not (Get-ADUser -Identity $u.Sam -ErrorAction SilentlyContinue)) {
        New-ADUser -Name "$($u.Given) $($u.Surname)" `
            -GivenName $u.Given -Surname $u.Surname `
            -SamAccountName $u.Sam -UserPrincipalName "$($u.Sam)@novacorp.test" `
            -Path $u.Ou -Enabled $true -AccountPassword $password `
            -ChangePasswordAtLogon $false | Out-Null
    }
    Add-ADGroupMember -Identity $u.Group -Members $u.Sam -ErrorAction SilentlyContinue
}

Add-ADGroupMember -Identity 'DL-FINANCE-RW' -Members 'GG-FINANCE' -ErrorAction SilentlyContinue
Add-ADGroupMember -Identity 'DL-RH-RW' -Members 'GG-RH' -ErrorAction SilentlyContinue
Add-ADGroupMember -Identity 'DL-COMMUN-R' -Members 'GG-FINANCE','GG-RH','GG-IT' -ErrorAction SilentlyContinue

$gpoName = 'GPO-Users-ScreenLock'
if (-not (Get-GPO -Name $gpoName -ErrorAction SilentlyContinue)) {
    New-GPO -Name $gpoName | Out-Null
    New-GPLink -Name $gpoName -Target $usersOu -LinkEnabled Yes | Out-Null
}

# User Configuration > Screen saver policy via registry-based policy settings.
Set-GPRegistryValue -Name $gpoName -Key 'HKCU\Software\Policies\Microsoft\Windows\Control Panel\Desktop' -ValueName 'ScreenSaveActive' -Type String -Value '1'
Set-GPRegistryValue -Name $gpoName -Key 'HKCU\Software\Policies\Microsoft\Windows\Control Panel\Desktop' -ValueName 'ScreenSaveTimeOut' -Type String -Value '600'
Set-GPRegistryValue -Name $gpoName -Key 'HKCU\Software\Policies\Microsoft\Windows\Control Panel\Desktop' -ValueName 'ScreenSaverIsSecure' -Type String -Value '1'

Write-Host 'Structure AD créée / vérifiée.' -ForegroundColor Green
