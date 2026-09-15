# Conventions du lab

## Adressage

| Élément | Valeur |
|---|---|
| Réseau | `10.10.10.0/24` |
| DC01 | `10.10.10.10` |
| SRV01 | `10.10.10.20` |
| DHCP dynamique | `10.10.10.100` à `10.10.10.199` |
| DNS | `10.10.10.10` |
| Passerelle | optionnelle selon votre hyperviseur |

## Domaine

```text
novacorp.test
```

## Nommage

- serveurs : `DC01`, `SRV01` ;
- poste : `CLT01` ;
- groupes globaux : `GG-...` ;
- groupes locaux de domaine liés aux ressources : `DL-...` ;
- GPO : `GPO-...`.

## Règle de preuve

Chaque TP se termine par une section **Validation**. Les commandes de validation font partie du rendu.

## Règle de sécurité

Les scripts et manipulations sont conçus pour un environnement de lab jetable. Ne jamais exécuter les scripts de ce dépôt sur un domaine d'entreprise sans revue complète.
