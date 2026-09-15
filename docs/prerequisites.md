# Pré-requis et préparation du lab

## Matériel conseillé

Par étudiant ou binôme :

- 16 Go de RAM minimum ; **24 Go recommandés** pour être confortable ;
- 60 Go d'espace disque libre ;
- VMware Workstation, Hyper-V, VirtualBox ou plateforme équivalente ;
- ISO Windows Server 2022/2025 ;
- ISO Windows 11 Pro.

Le travail en binôme est recommandé sur les postes modestes.

## VMs principales

| VM | OS | vCPU | RAM | IP | Rôle final |
|---|---|---:|---:|---|---|
| DC01 | Windows Server 2022/2025 Desktop Experience | 2 | 4 Go | 10.10.10.10/24 | AD DS + DNS |
| SRV01 | Windows Server 2022/2025 Desktop Experience | 2 | 3–4 Go | 10.10.10.20/24 | DHCP + File Server |
| CLT01 | Windows 11 Pro | 2 | 3–4 Go | DHCP | Client du domaine |

## VM Hyper-V optionnelle

Pour le TP6, la meilleure option est une quatrième VM **HYP01** dédiée :

| VM | OS | vCPU | RAM | IP | Usage |
|---|---|---:|---:|---|---|
| HYP01 | Windows Server 2022/2025 | 2–4 | 4 Go | libre | mini-lab Hyper-V |

La virtualisation imbriquée doit être activée dans l'hyperviseur hôte. Si elle n'est pas disponible, le TP6 contient une voie alternative et le fil rouge principal reste entièrement réalisable.

> Ne pas installer Hyper-V sur DC01 pour « gagner une VM » : cela mélange les rôles et augmente le risque de casser le lab.

## Réseau

Créer un réseau isolé `LAB-NOVACORP` :

- réseau : `10.10.10.0/24` ;
- DHCP de l'hyperviseur : **désactivé** ;
- passerelle : facultative ;
- Internet : non requis une fois les OS/outils préparés.

> Ne jamais laisser le DHCP natif de VMware/VirtualBox/Hyper-V distribuer sur le même segment que le futur serveur DHCP du TP4.

## Domaine

- FQDN : `novacorp.test`
- NetBIOS : `NOVACORP`
- DC : `DC01.novacorp.test`

Le suffixe `.test` est volontairement réservé au laboratoire.

## Préparation avant le premier cours

Pour éviter de perdre 60 minutes à installer des OS :

1. préparer les trois VMs principales ;
2. installer VMware Tools / Guest Additions si nécessaire ;
3. créer un snapshot `BASE-OS` ;
4. vérifier le mot de passe administrateur local ;
5. connecter les cartes réseau à `LAB-NOVACORP` ;
6. préparer HYP01 si la plateforme permet la virtualisation imbriquée.

## Vérification rapide

```powershell
Get-ComputerInfo | Select-Object WindowsProductName, WindowsVersion, OsBuildNumber
Get-NetAdapter
Get-NetIPConfiguration
```

Le script [`../scripts/00-preflight.ps1`](../scripts/00-preflight.ps1) réalise une partie de ces contrôles.
