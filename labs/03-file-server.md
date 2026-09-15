# TP3 — Serveur de fichiers : SMB, NTFS et moindre privilège

**Durée : 90 min**  
**VMs : SRV01, CLT01**

## Mission

NovaCorp veut trois espaces : Commun, Finance et RH. Les utilisateurs doivent accéder uniquement aux données correspondant à leur fonction.

## Étape 1 — préparer le stockage

Sur SRV01, créer :

```text
D:\Shares\Commun
D:\Shares\Finance
D:\Shares\RH
```

Si votre VM n'a pas de lecteur `D:`, utilisez `C:\Shares` et adaptez les commandes.

## Étape 2 — créer les partages SMB

Créer les partages :

```text
\\SRV01\Commun
\\SRV01\Finance
\\SRV01\RH
```

Les ACL de partage ne doivent pas donner des droits inutiles à `Everyone`.

## Étape 3 — appliquer les ACL NTFS

Objectif :

| Dossier | Groupe autorisé | Niveau |
|---|---|---|
| Commun | `DL-COMMUN-R` | Lecture |
| Finance | `DL-FINANCE-RW` | Modification |
| RH | `DL-RH-RW` | Modification |
| Tous | Administrateurs | Contrôle total |

Ajouter les groupes globaux appropriés dans les groupes locaux de domaine.

## Étape 4 — tester depuis CLT01

Ouvrir une session avec `NOVACORP\amartin`.

Tester :

```text
\\srv01\Commun
\\srv01\Finance
\\srv01\RH
```

Résultat attendu pour Alice :

- Commun : lecture ;
- Finance : modification ;
- RH : refus.

Recommencer avec `brobert`.

## Étape 5 — raisonner sur les droits effectifs

Répondez :

1. si le partage autorise `Change` mais NTFS seulement `Read`, que peut faire l'utilisateur ?
2. si le partage autorise `Read` mais NTFS `Modify`, que peut faire l'utilisateur via SMB ?
3. pourquoi les ACL directes sur un utilisateur sont-elles difficiles à maintenir à grande échelle ?

## Validation

Sur SRV01 :

```powershell
Get-SmbShare
Get-SmbShareAccess -Name Finance
Get-SmbShareAccess -Name RH
icacls D:\Shares\Finance
icacls D:\Shares\RH
```

Sur CLT01 :

```powershell
Test-NetConnection srv01.novacorp.test -Port 445
whoami /groups
```

## Bonus

Activez l'**Access-Based Enumeration** sur un partage et observez l'effet pour un utilisateur qui n'a pas accès à certains sous-dossiers.

---

## Extension 90 min — héritage, visibilité et audit

### Étape 6 — activer l'Access-Based Enumeration

Sur les partages métiers, activer l'ABE lorsque disponible :

```powershell
Set-SmbShare -Name Finance -FolderEnumerationMode AccessBased
Set-SmbShare -Name RH -FolderEnumerationMode AccessBased
```

Observer la différence entre **ne pas voir** une ressource et **ne pas avoir l'autorisation** de l'ouvrir.

### Étape 7 — vérifier l'héritage NTFS

Créer `D:\Shares\Finance\Budget-2027` et analyser ses ACL :

```powershell
(Get-Acl 'D:\Shares\Finance\Budget-2027').Access
```

Répondez :

- quels droits sont hérités ?
- quels droits sont explicites ?
- dans quel cas casser l'héritage serait-il justifié ?

### Challenge audit

Produire un tableau final :

| Utilisateur | Commun | Finance | RH | Preuve |
|---|---|---|---|---|
| Alice | ? | ? | ? | commande / test |
| Bruno | ? | ? | ? | commande / test |
| Chloé | ? | ? | ? | commande / test |

Le tableau doit refléter les tests réels, pas uniquement la configuration supposée.
