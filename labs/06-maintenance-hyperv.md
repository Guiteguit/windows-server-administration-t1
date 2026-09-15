# TP6 — Maintenance, health-check et Hyper-V

**Durée : 90 min**  
**VMs : DC01, SRV01 + HYP01 si disponible**

## Mission

Votre infrastructure fonctionne. NovaCorp veut maintenant savoir si elle est **maintenable** : services critiques, espace disque, événements, santé AD/DNS/DHCP et capacité à documenter l'état d'un serveur.

Le second objectif est de manipuler Hyper-V lorsque la plateforme autorise la virtualisation imbriquée.

---

## Partie A — health-check Windows Server — 45 min

### 1. Services critiques

Sur DC01 :

```powershell
Get-Service DNS,NTDS,Netlogon,Kdc
```

Sur SRV01 :

```powershell
Get-Service DHCPServer,LanmanServer
```

### 2. Capacité et uptime

```powershell
Get-CimInstance Win32_OperatingSystem |
    Select CSName,LastBootUpTime,FreePhysicalMemory

Get-Volume | Select DriveLetter,FileSystemLabel,Size,SizeRemaining
```

### 3. Événements récents

Chercher les erreurs et warnings des 60 dernières minutes :

```powershell
$since = (Get-Date).AddHours(-1)
Get-WinEvent -FilterHashtable @{LogName='System'; StartTime=$since; Level=2,3} -ErrorAction SilentlyContinue |
    Select-Object -First 20 TimeCreated,Id,ProviderName,LevelDisplayName,Message
```

### 4. Santé des rôles

Sur DC01 :

```powershell
dcdiag
Resolve-DnsName _ldap._tcp.dc._msdcs.novacorp.test -Type SRV
```

Sur SRV01 :

```powershell
Get-DhcpServerv4Scope
Get-SmbShare
```

### 5. Créer un rapport

À partir du template [`../scripts/student/06-health-check-template.ps1`](../scripts/student/06-health-check-template.ps1), produire :

```text
health-report.json
```

Le rapport doit contenir :

- hostname ;
- uptime ou dernier boot ;
- espace disque ;
- état des services ciblés ;
- nombre d'erreurs système récentes ;
- statut de vos checks métier.

---

## Partie B — Hyper-V — 30 min

### Voie A — virtualisation imbriquée disponible

Sur **HYP01**, vérifier le rôle :

```powershell
Get-WindowsFeature Hyper-V
```

Installer Hyper-V si nécessaire et si votre plateforme de lab le supporte.

Créer :

1. un switch `vLAB-PRIVATE` de type Private ;
2. un disque VHDX dynamique de 8 Go ;
3. une VM Generation 2 `LAB-VM01` avec 1 Go de RAM ;
4. connecter la VM au switch ;
5. ne pas démarrer d'installation d'OS si le temps est court.

Commandes à rechercher :

```powershell
New-VMSwitch
New-VHD
New-VM
Get-VM
Get-VMSwitch
```

### Voie B — virtualisation imbriquée indisponible

Produire un mini dossier d'architecture :

```text
HYP01
├── vSwitch-External
├── vSwitch-Internal
├── vSwitch-Private
└── LAB-VM01
    └── OS-Disk.vhdx
```

Expliquer pour chaque type de vSwitch :

- qui peut communiquer avec qui ;
- un cas d'usage ;
- un risque de mauvaise configuration.

Puis écrire les commandes PowerShell que vous utiliseriez pour créer la VM sans les exécuter.

---

## Partie C — journal d'exploitation — 15 min

Créer `rendus/maintenance-checklist.md` avec au minimum :

- sauvegardes : quoi / fréquence / test de restauration ;
- mises à jour : stratégie et fenêtre de maintenance ;
- logs : événements à surveiller ;
- capacité : disque/RAM ;
- comptes privilégiés : revue régulière ;
- DNS/DHCP/AD : tests synthétiques ;
- Hyper-V : état des VMs et stockage si utilisé.

## Validation

Présenter au formateur :

```powershell
Get-Service
Get-Volume
Get-WinEvent
```

et, en voie A :

```powershell
Get-VM
Get-VMSwitch
```

Le fichier `health-report.json` doit être lisible et expliquer clairement un éventuel statut `WARN`/`FAIL`.
