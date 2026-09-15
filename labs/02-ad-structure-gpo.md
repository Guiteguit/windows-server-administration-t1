# TP2 — Structurer Active Directory et appliquer une GPO

**Durée : 90 min**  
**VMs : DC01, SRV01, CLT01**

## Mission

NovaCorp veut séparer les identités de ses services Finance, RH et IT. Les permissions devront être attribuées via des groupes, jamais directement utilisateur par utilisateur.

## Étape 1 — créer l'arborescence OU

Créer sous la racine du domaine :

```text
OU=NovaCorp
├── OU=Users
│   ├── OU=Finance
│   ├── OU=RH
│   └── OU=IT
├── OU=Computers
│   ├── OU=Workstations
│   └── OU=Servers
└── OU=Groups
```

## Étape 2 — créer les utilisateurs

Créer au minimum :

| Nom | Login | OU |
|---|---|---|
| Alice Martin | `amartin` | Finance |
| Bruno Robert | `brobert` | RH |
| Chloé Durand | `cdurand` | IT |

Mot de passe de lab conseillé : `N0vaCorp!2026`

> Le mot de passe doit rester un secret de lab et ne doit jamais être réutilisé ailleurs.

## Étape 3 — créer les groupes

Créer :

```text
GG-FINANCE
GG-RH
GG-IT
DL-FINANCE-RW
DL-RH-RW
DL-COMMUN-R
```

Appliquer la logique :

```text
Accounts -> Global Groups -> Domain Local Groups -> Permissions
```

C'est le principe **AGDLP**.

Exemple attendu :

```text
amartin -> GG-FINANCE -> DL-FINANCE-RW -> ACL du dossier Finance
```

## Étape 4 — joindre SRV01 au domaine

Avant la jointure :

- IP de SRV01 : `10.10.10.20/24` ;
- DNS de SRV01 : `10.10.10.10`.

Joindre `SRV01` à `novacorp.test`, puis placer son compte ordinateur dans `OU=Servers`.

## Étape 5 — joindre CLT01 au domaine

Pour l'instant, donner temporairement une IP statique libre à CLT01, par exemple :

```text
10.10.10.50/24
DNS 10.10.10.10
```

Joindre le poste au domaine puis déplacer son compte dans `OU=Workstations`.

## Étape 6 — créer une GPO

Créer une GPO :

```text
GPO-Users-ScreenLock
```

Lier cette GPO à `OU=Users` et imposer un verrouillage de session après 10 minutes d'inactivité avec demande de mot de passe à la reprise.

Sur CLT01 :

```powershell
gpupdate /force
gpresult /r
```

## Validation

Sur DC01 :

```powershell
Get-ADOrganizationalUnit -Filter * | Select Name,DistinguishedName
Get-ADGroupMember GG-FINANCE
Get-ADGroupMember DL-FINANCE-RW
Get-ADComputer SRV01
Get-ADComputer CLT01
```

Sur CLT01 :

```powershell
whoami
whoami /groups
gpresult /r
```

## Challenge

Expliquez pourquoi lier la GPO à `OU=Computers` ne serait pas cohérent si les paramètres configurés sont uniquement dans **User Configuration**.

---

## Extension 90 min — deuxième GPO et preuve de ciblage

Créer une seconde GPO :

```text
GPO-Workstations-LogonBanner
```

La lier uniquement à `OU=Workstations` et configurer un message d'ouverture de session de lab, par exemple :

```text
NovaCorp LAB — Accès réservé aux utilisateurs autorisés.
```

Sur CLT01 :

```powershell
gpupdate /force
gpresult /r
gpresult /h C:\Temp\gpo-report.html
```

### Questions challenge

1. Pourquoi la GPO utilisateur et la GPO ordinateur ne sont-elles pas liées au même niveau ?
2. Que se passe-t-il si CLT01 reste dans le conteneur `Computers` au lieu de l'OU `Workstations` ?
3. Quelle commande ou quel rapport prouve réellement la GPO appliquée ?
