# Notes formateur — deck 2 h / module total 12 h

Le deck contient 24 slides et reste volontairement limité à environ **2 h**. Le module complet dure **8 × 1 h 30 = 12 h**.

## Découpage imposé

- **S1 : slides 1 à 16** — environ 90 min ;
- **S2 : slides 17 à 24** — environ 30 min ;
- puis **TP1 pendant les 60 min restantes de S2**.

Le minutage est une cible. Les démos prennent naturellement quelques minutes.

## Slides 1–16 — S1

### Slide 1 — Titre — 2 min
Présenter le module comme un mini-projet d'infrastructure : **construire, valider, dépanner**.

### Slide 2 — Objectifs — 5 min
Montrer le dépôt GitHub et annoncer les preuves demandées.

### Slide 3 — Architecture NovaCorp — 5 min
Faire identifier les rôles. Question : « Quel DNS doit utiliser CLT01 ? » -> `10.10.10.10`.

### Slide 4 — Rôles / features — 5 min
Un Windows Server devient DC/DNS/DHCP/File Server via rôles et features. Démo `Get-WindowsFeature`.

### Slide 5 — Workgroup vs domaine — 5 min
Centralisation des identités et politiques. Introduire Kerberos sans plongée protocolaire.

### Slide 6 — Forêt, domaine, OU, objets — 7 min
Faire dessiner la hiérarchie. Rappeler : OU ≠ groupe de sécurité.

### Slide 7 — AGDLP — 7 min
`Alice -> GG-FINANCE -> DL-FINANCE-RW -> ACL`.

### Slide 8 — DNS et AD — 7 min
Démo :

```powershell
Resolve-DnsName _ldap._tcp.dc._msdcs.novacorp.test -Type SRV
```

### Slide 9 — Promotion DC — 6 min
Distinguer installation du rôle et promotion.

### Slide 10 — GPO / LSDOU — 7 min
Expliquer ciblage et ordre général de traitement.

### Slide 11 — SMB vs NTFS — 7 min
Exemple Share=Change, NTFS=Read -> accès réseau limité par la combinaison des droits.

### Slide 12 — Moindre privilège — 5 min
Contre-exemple `Everyone:Full Control`.

### Slide 13 — DHCP DORA — 6 min
Discover / Offer / Request / Ack + options DNS/suffixe/passerelle.

### Slide 14 — Commandes réseau — 5 min
Mini-démo `ipconfig`, `Resolve-DnsName`, `Test-NetConnection`, `whoami /groups`, `gpresult`.

### Slide 15 — PowerShell — 7 min
GUI pour comprendre ; PowerShell pour industrialiser et prouver.

### Slide 16 — Idempotence — 5 min
Question : « Que se passe-t-il si je relance le script demain ? ».

> **Fin de S1 ici.**

---

## Slides 17–24 — début S2 (~30 min)

### Slide 17 — Hyper-V — 4 min
Rôle, vSwitch, VM, VHDX, Generation 2. Annoncer le TP6 avec voie A/B.

### Slide 18 — WSUS / WDS — 4 min
Positionner les technologies sans en faire le cœur du module. Mentionner leur évolution/dépréciation partielle.

### Slide 19 — Maintenance — 4 min
Mises à jour, sauvegardes testées, journaux, capacité, comptes admin, documentation.

### Slide 20 — Diagnostic — 6 min
Faire mémoriser :

```text
IP -> DNS -> Service -> Authentification -> Autorisation
```

### Slide 21 — Planning — 3 min
Présenter les huit séances et les checkpoints.

### Slide 22 — Règles du jeu — 3 min
Exiger des preuves. Refuser « j'ai rebooté et ça remarche » sans cause racine.

### Slide 23 — Mini-check — 3 min
Réponses orales rapides.

### Slide 24 — Lancement TP1 — 2 min
Checkpoint de fin de S2 : domaine, DNS SRV, `dcdiag`.

---

## Démonstrations conseillées

```powershell
Get-WindowsFeature | Where-Object InstallState -eq Installed
Resolve-DnsName _ldap._tcp.dc._msdcs.novacorp.test -Type SRV
Get-SmbShareAccess -Name Finance
icacls D:\Shares\Finance
gpresult /r
```
