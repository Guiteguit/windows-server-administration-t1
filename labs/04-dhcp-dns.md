# TP4 — DHCP, DNS et intégration réseau

**Durée : 90 min**  
**VMs : SRV01, DC01, CLT01**

## Mission

Les postes clients ne doivent plus être configurés à la main. SRV01 doit distribuer automatiquement les paramètres IPv4 tout en orientant les clients vers le DNS Active Directory.

## Étape 1 — installer DHCP sur SRV01

Installer le rôle **DHCP Server** avec les outils d'administration.

Comme SRV01 est membre du domaine, autoriser le serveur DHCP dans Active Directory.

## Étape 2 — créer le scope

Créer :

```text
Nom        : LAN-NOVACORP
Réseau     : 10.10.10.0/24
Pool       : 10.10.10.100 - 10.10.10.199
DNS        : 10.10.10.10
Suffixe DNS: novacorp.test
Gateway    : seulement si votre lab en possède une
```

## Étape 3 — basculer CLT01 en DHCP

Remettre l'interface IPv4 de CLT01 en adressage automatique puis :

```powershell
ipconfig /release
ipconfig /renew
ipconfig /all
```

## Étape 4 — valider DNS

Sur CLT01 :

```powershell
Resolve-DnsName dc01.novacorp.test
Resolve-DnsName srv01.novacorp.test
Test-NetConnection srv01.novacorp.test -Port 445
```

Sur DC01, vérifier les enregistrements DNS.

## Étape 5 — créer une zone inversée

Créer une zone reverse pour `10.10.10.0/24` puis ajouter / vérifier les enregistrements PTR utiles.

Tester :

```powershell
Resolve-DnsName 10.10.10.10
```

## Validation

Sur SRV01 :

```powershell
Get-DhcpServerv4Scope
Get-DhcpServerv4OptionValue -ScopeId 10.10.10.0
Get-DhcpServerv4Lease -ScopeId 10.10.10.0
```

Sur CLT01 :

```powershell
ipconfig /all
Resolve-DnsName _ldap._tcp.dc._msdcs.novacorp.test -Type SRV
```

## Incident minute

Modifiez temporairement le DNS de CLT01 vers une adresse qui n'héberge pas la zone `novacorp.test`. Observez ce qui continue de fonctionner et ce qui casse. Remettez ensuite la configuration correcte.

Écrivez la conclusion en une phrase :

> "Avoir une adresse IP valide ne signifie pas que l'intégration Active Directory fonctionne, car ..."

---

## Extension 90 min — exclusions, réservation et DNS dynamique

### Étape 6 — exclusion / réservation

Créer une exclusion dans le pool, par exemple :

```text
10.10.10.100 - 10.10.10.109
```

Puis créer une réservation pour un client de test à partir de son Client ID / MAC.

Commandes à rechercher :

```powershell
Add-DhcpServerv4ExclusionRange
Add-DhcpServerv4Reservation
```

### Étape 7 — observer les mises à jour DNS

Comparer :

```powershell
Get-DhcpServerv4DnsSetting
Get-DhcpServerv4Lease -ScopeId 10.10.10.0
```

Identifier qui enregistre les entrées A/PTR dans votre lab.

### Challenge diagnostic

Le formateur peut désactiver temporairement le scope ou modifier l'option DNS. Votre compte rendu doit distinguer :

- absence de bail DHCP ;
- bail correct mais DNS incorrect ;
- DNS correct mais service applicatif indisponible.
