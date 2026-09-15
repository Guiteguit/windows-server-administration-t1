# TP1 — Construire le domaine NovaCorp

**Durée : 60 min**  
**VM principale : DC01**

## Mission

NovaCorp ne possède encore aucun domaine. Vous devez transformer `DC01` en premier contrôleur de domaine du nouveau domaine `novacorp.test` et rendre la résolution DNS Active Directory fonctionnelle.

## Objectifs

- fixer l'identité réseau du serveur ;
- installer AD DS ;
- créer la forêt `novacorp.test` ;
- installer DNS avec le domaine ;
- vérifier la présence des enregistrements nécessaires à AD.

## Étape 1 — nom et IP

Configurer :

```text
Hostname : DC01
IPv4     : 10.10.10.10/24
DNS      : 10.10.10.10
Gateway  : facultative
```

Commandes utiles :

```powershell
Get-NetAdapter
Get-NetIPConfiguration
Rename-Computer
New-NetIPAddress
Set-DnsClientServerAddress
```

Redémarrer si nécessaire.

## Étape 2 — installer le rôle AD DS

Vous pouvez utiliser Server Manager, mais vous devez être capable de retrouver l'équivalent PowerShell.

Indice :

```powershell
Get-WindowsFeature *AD*
```

Installer **AD-Domain-Services** avec les outils d'administration.

## Étape 3 — créer la forêt

Créer :

```text
Domaine DNS : novacorp.test
NetBIOS     : NOVACORP
DNS         : installé sur le DC
```

Choisir un mot de passe DSRM et conserver-le pour le lab.

## Étape 4 — observer AD et DNS

Après redémarrage, ouvrir :

- Active Directory Users and Computers ;
- DNS Manager ;
- Group Policy Management.

Identifier :

- l'OU `Domain Controllers` ;
- le serveur `DC01` ;
- la zone DNS `novacorp.test` ;
- le dossier `_msdcs` et les enregistrements SRV.

## Validation

```powershell
Get-ADDomain
Get-ADForest
Get-ADDomainController -Filter *
Resolve-DnsName dc01.novacorp.test
Resolve-DnsName _ldap._tcp.dc._msdcs.novacorp.test -Type SRV
```

Puis :

```powershell
dcdiag
```

### Critères de réussite

- `novacorp.test` existe ;
- `DC01` est contrôleur de domaine ;
- DNS résout `dc01.novacorp.test` ;
- une requête SRV LDAP retourne DC01 ;
- `dcdiag` ne montre pas d'erreur bloquante.

## Bonus

Expliquez en trois phrases pourquoi configurer `8.8.8.8` comme DNS principal de `DC01` serait une mauvaise idée dans ce lab.
