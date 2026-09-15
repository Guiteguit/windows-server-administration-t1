# TP7 — Challenge final : incident NovaCorp

**Durée : 90 min**  
**Mode : binôme / break-fix**

## Contexte

En dernière séance, un incident est déclaré. Un utilisateur ne peut plus travailler normalement. Vous recevez uniquement un symptôme et quelques informations de contexte.

Le formateur attribue ou injecte un incident.

## Règle

Vous ne marquez pas de point pour une correction trouvée "au hasard".

Vous devez produire une trace de diagnostic :

| Étape | Contenu |
|---|---|
| Symptôme | ce qui est observé |
| Hypothèse 1 | cause possible |
| Test 1 | commande / outil utilisé |
| Résultat | fait observé |
| Conclusion | hypothèse confirmée ou rejetée |
| Cause racine | cause technique exacte |
| Correction | changement effectué |
| Validation | preuve que le service est revenu |

## Méthode imposée

Commencer par :

1. IP ;
2. DNS ;
3. connectivité vers le service ;
4. authentification ;
5. autorisation.

Cheat sheet : [`../docs/troubleshooting-cheatsheet.md`](../docs/troubleshooting-cheatsheet.md)

## Commandes typiques

```powershell
ipconfig /all
Resolve-DnsName
Test-NetConnection
whoami /groups
gpresult /r
Get-SmbShareAccess
icacls
Get-DhcpServerv4Scope
Get-DhcpServerv4OptionValue
Get-Service
Get-WinEvent
```

## Restitution

Chaque binôme dispose de 2 minutes pour répondre à :

1. Quel était le symptôme ?
2. Quelle était la cause racine ?
3. Quel test a réellement permis de la prouver ?
4. Quelle correction a été appliquée ?
5. Quelle validation prouve le retour à la normale ?

## Bonus senior

Proposer une mesure préventive : supervision, documentation, GPO, script de conformité, séparation de droits, alerte ou contrôle automatique.


## Déroulé conseillé sur 90 min

- 10 min : lecture du symptôme et collecte initiale ;
- 40 min : diagnostic structuré ;
- 15 min : correction + validation ;
- 15 min : restitution ;
- 10 min : QCM / mesure préventive.

## Critère senior

Une correction sans preuve de cause racine ne vaut pas un diagnostic complet. Votre restitution doit citer le test qui a permis de confirmer la cause.
