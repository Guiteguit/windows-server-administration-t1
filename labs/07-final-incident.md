# TP7 — Incident final NovaCorp

**Durée : 1 h 30**  
**Mode : binôme**  
**Contexte : mise en situation professionnelle / break-fix**

---

## Objectif

Vous intervenez comme administrateurs systèmes Windows de **NovaCorp**.

L’infrastructure fonctionnait correctement la veille. Ce matin, plusieurs utilisateurs du service Finance signalent qu’ils ne peuvent plus accéder à leurs ressources habituelles.

Votre mission n’est pas seulement de "faire remarcher" le service : vous devez **identifier et prouver la ou les causes racines**, appliquer une correction minimale, puis démontrer le retour à la normale.

> Une correction trouvée au hasard, sans preuve technique, n’est pas considérée comme un diagnostic complet.

---

# Ticket utilisateur

**INC-2026-042 — Finance inaccessible**

**Priorité : P2**  
**Demandeur : Alice Martin — Finance**  
**Poste : CLIENT01**

> Bonjour,
>
> Depuis ce matin je n’arrive plus à accéder au dossier Finance.
> J’utilise normalement :
>
> `\\srv01\Finance`
>
> J’ai aussi remarqué que certains noms de serveurs ne semblent plus répondre correctement.
>
> J’ai redémarré mon poste mais cela n’a rien changé.
>
> Alice

Le service informatique vous indique également :

- aucun changement volontaire n’était prévu cette nuit ;
- **DC01** et **SRV01** sont allumés ;
- le problème est apparu après une opération de maintenance ;
- vous disposez des droits administrateur sur le lab ;
- l’objectif est d’éviter tout redémarrage global ou toute réinstallation.

---

# Infrastructure connue

| Élément | Valeur attendue |
|---|---|
| Domaine | `novacorp.test` |
| DC / DNS | `DC01` — `10.10.10.10` |
| Serveur de fichiers / DHCP | `SRV01` — `10.10.10.20` |
| Client | `CLIENT01` — DHCP |
| Utilisateur Finance | `NOVACORP\amartin` |
| Groupe métier | `GG-FINANCE` |
| Groupe de permission | `DL-FINANCE-RW` |
| Partage | `\\srv01\Finance` |

Le modèle de droits attendu est :

```text
amartin
   ↓
GG-FINANCE
   ↓
DL-FINANCE-RW
   ↓
\\srv01\Finance
```

---

# Symptômes constatés

Depuis **CLIENT01**, connecté avec `NOVACORP\amartin` :

1. l’ouverture de `\\srv01\Finance` échoue ;
2. le problème doit être diagnostiqué avant toute modification ;
3. vous ne savez pas si l’origine est réseau, DNS, Active Directory, SMB ou droits d’accès.

Vous devez traiter l’incident comme si vous étiez en production.

---

# Règles du challenge

Vous devez travailler dans l’ordre suivant :

```text
IP
 ↓
DNS
 ↓
Connectivité réseau
 ↓
Service
 ↓
Authentification
 ↓
Autorisation
```

Interdictions :

- ne pas réinstaller un serveur ;
- ne pas recréer le domaine ;
- ne pas supprimer/recréer les utilisateurs pour "tester" ;
- ne pas donner `Everyone: Full Control` ;
- ne pas modifier plusieurs éléments en même temps ;
- ne pas utiliser un script qui reconstruit entièrement le lab.

Pour chaque changement :

1. écrire l’hypothèse ;
2. effectuer un test ;
3. noter le résultat ;
4. seulement ensuite appliquer la correction.

---

# Phase 1 — Collecte

Avant toute correction, collectez les informations suivantes depuis CLIENT01.

### Configuration IP

```powershell
ipconfig /all
```

À relever :

- IPv4 ;
- masque ;
- passerelle éventuelle ;
- serveur DHCP ;
- serveur(s) DNS ;
- suffixe DNS.

### Résolution DNS

```powershell
Resolve-DnsName dc01.novacorp.test
Resolve-DnsName srv01.novacorp.test
Resolve-DnsName _ldap._tcp.dc._msdcs.novacorp.test -Type SRV
```

### Connectivité

```powershell
Test-NetConnection 10.10.10.10 -Port 53
Test-NetConnection 10.10.10.20 -Port 445
Test-NetConnection srv01.novacorp.test -Port 445
```

### Identité et groupes

```powershell
whoami
whoami /groups
```

### GPO / domaine

```powershell
gpresult /r
```

---

# Phase 2 — Diagnostic serveur

Si les résultats précédents vous orientent vers l’infrastructure, contrôlez les serveurs concernés.

## Sur DC01

```powershell
Get-Service DNS,Netlogon
Get-ADDomain
Get-ADDomainController -Filter *
Get-ADGroupMember GG-FINANCE
Get-ADGroupMember DL-FINANCE-RW
```

Vous pouvez également utiliser :

```powershell
dcdiag /test:dns
```

## Sur SRV01

```powershell
Get-Service LanmanServer,DHCPServer
Get-SmbShare -Name Finance
Get-SmbShareAccess -Name Finance
Get-DhcpServerv4Scope
Get-DhcpServerv4OptionValue -ScopeId 10.10.10.0
```

Pour contrôler les droits NTFS, localisez le chemin du partage puis utilisez :

```powershell
(Get-SmbShare -Name Finance).Path
icacls "CHEMIN_DU_PARTAGE"
```

---

# Votre journal de diagnostic

Complétez au minimum **4 hypothèses**, même si la panne est trouvée avant.

| # | Hypothèse | Test effectué | Résultat observé | Confirmée / rejetée |
|---|---|---|---|---|
| 1 | | | | |
| 2 | | | | |
| 3 | | | | |
| 4 | | | | |

Puis renseignez :

### Cause racine n°1

```text
...
```

### Preuve technique

```text
Commande / résultat qui prouve la cause :
...
```

### Correction appliquée

```text
...
```

### Validation

```text
...
```

Si, après la première correction, le service ne fonctionne pas totalement, **reprenez le diagnostic depuis le symptôme restant**. Ne supposez pas qu’il n’existe qu’une seule panne.

---

# ✅ Critères de retour à la normale

L’incident est considéré comme résolu uniquement si vous démontrez les points suivants depuis CLIENT01 :

### DNS

```powershell
Resolve-DnsName dc01.novacorp.test
Resolve-DnsName srv01.novacorp.test
```

Les deux noms doivent être résolus par le DNS interne NovaCorp.

### Domaine

```powershell
nltest /dsgetdc:novacorp.test
```

Un contrôleur de domaine doit être retourné.

### SMB

```powershell
Test-NetConnection srv01.novacorp.test -Port 445
```

`TcpTestSucceeded` doit être à `True`.

### Groupes

```powershell
whoami /groups
```

L’utilisateur Finance doit disposer de son appartenance métier attendue après reconnexion si nécessaire.

### Accès au partage

Ouvrir :

```text
\\srv01\Finance
```

Puis :

1. créer un fichier `validation-amartin.txt` ;
2. écrire une ligne dedans ;
3. sauvegarder le fichier ;
4. le relire ;
5. le supprimer.

---

# 📦 Livrable à rendre

Créez un fichier :

```text
INC-2026-042-NOM1-NOM2.md
```

Il doit contenir :

## 1. Symptôme

Ce qui ne fonctionnait pas au début.

## 2. Diagnostic

Votre tableau hypothèse → test → résultat → conclusion.

## 3. Cause(s) racine(s)

Expliquez précisément les causes techniques.

## 4. Correction

Indiquez les commandes ou modifications effectuées.

## 5. Validation

Fournissez les preuves que le service fonctionne de nouveau.

## 6. Prévention

Proposez au moins **deux mesures** parmi :

- supervision ;
- script de conformité ;
- procédure de changement ;
- sauvegarde de configuration ;
- contrôle périodique ;
- journalisation ;
- documentation ;
- alerting.

---

# 🎤 Restitution — 2 minutes par binôme

Vous devez être capables de répondre à ces cinq questions :

1. Quel était le symptôme initial ?
2. Quelle était la première cause racine ?
3. Quel test vous a permis de la prouver ?
4. Avez-vous rencontré une seconde panne après la première correction ?
5. Comment avez-vous prouvé le retour complet du service ?

---

# Bonus "Admin senior"

Sans modifier l’environnement, proposez un contrôle PowerShell qui aurait pu détecter automatiquement l’incident avant l’appel d’Alice.

Exemples de pistes :

```powershell
Get-DhcpServerv4OptionValue
Resolve-DnsName
Get-ADGroupMember
Get-SmbShareAccess
Test-NetConnection
```

Le bonus est accordé si votre contrôle produit un résultat simple du type :

```text
[PASS] DNS DHCP conforme
[PASS] SRV01 résolu
[FAIL] chaîne AGDLP Finance non conforme
```

---

## Aide

Si vous êtes bloqués plus de 15 minutes, reprenez la chaîne :

```text
CLIENT01
   ↓
Adresse IP correcte ?
   ↓
DNS correct ?
   ↓
Nom srv01 résolu ?
   ↓
TCP/445 accessible ?
   ↓
Utilisateur authentifié sur le domaine ?
   ↓
Groupes corrects ?
   ↓
SMB correct ?
   ↓
NTFS correct ?
```

**Ne cherchez pas une solution : cherchez une preuve.**
