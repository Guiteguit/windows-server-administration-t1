# Cheat sheet — diagnostic Windows Server

## La méthode en 5 couches

Avant de changer quoi que ce soit :

1. **IP** — la machine a-t-elle la bonne adresse, le bon masque et la bonne route ?
2. **DNS** — résout-elle le nom attendu via le bon serveur ?
3. **Service** — le port et le service répondent-ils ?
4. **Authentification** — le compte / ticket / canal sécurisé est-il valide ?
5. **Autorisation** — l'identité dispose-t-elle réellement du droit demandé ?

## Commandes client

```powershell
ipconfig /all
ipconfig /release
ipconfig /renew
ipconfig /flushdns
nslookup dc01.novacorp.test
Resolve-DnsName dc01.novacorp.test
Test-NetConnection dc01.novacorp.test -Port 53
Test-NetConnection srv01.novacorp.test -Port 445
whoami
whoami /groups
gpresult /r
klist
```

## Active Directory

```powershell
Get-ADDomain
Get-ADForest
Get-ADDomainController -Filter *
Get-ADUser -Filter * | Select Name,SamAccountName,Enabled
Get-ADGroupMember GG-FINANCE
```

Diagnostic DC :

```powershell
dcdiag
repadmin /replsummary
```

> `repadmin` devient surtout intéressant dès qu'il existe plusieurs contrôleurs de domaine.

## DNS

```powershell
Get-DnsServerZone
Get-DnsServerResourceRecord -ZoneName novacorp.test
Resolve-DnsName _ldap._tcp.dc._msdcs.novacorp.test -Type SRV
```

## DHCP

```powershell
Get-DhcpServerv4Scope
Get-DhcpServerv4OptionValue -ScopeId 10.10.10.0
Get-DhcpServerv4Lease -ScopeId 10.10.10.0
```

## SMB / NTFS

```powershell
Get-SmbShare
Get-SmbShareAccess -Name Finance
icacls D:\Shares\Finance
```

## Services et logs

```powershell
Get-Service DNS,DHCPServer,Netlogon,LanmanServer
Get-WinEvent -LogName System -MaxEvents 30
Get-WinEvent -LogName 'Directory Service' -MaxEvents 20
```

## Réflexe professionnel

Ne pas "réparer au hasard". Pour chaque action noter :

- hypothèse ;
- test ;
- résultat ;
- conclusion ;
- changement effectué ;
- validation après changement.
