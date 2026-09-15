# Projet d'évaluation pratique — « Agence NovaCorp Lyon »

Ce sujet peut servir de partiel, de devoir ou de prolongement.

## Situation

NovaCorp ouvre une agence de 25 personnes. Vous devez proposer et maqueter le socle Windows Server minimal, puis démontrer sa maintenabilité.

## Exigences

- un domaine Active Directory ;
- DNS intégré ;
- au moins 3 OU métiers ;
- utilisateurs et groupes suivant un modèle cohérent ;
- 2 partages métiers avec droits différents ;
- DHCP pour le LAN ;
- 1 GPO utilisateur + 1 GPO ordinateur ;
- 1 script PowerShell d'automatisation ;
- 1 health-check de maintenance ;
- une procédure de validation ;
- une procédure de diagnostic d'un incident choisi ;
- expliquer la place de Hyper-V, WSUS et WDS dans votre architecture, même si tout n'est pas déployé.

## Livrables

1. schéma d'architecture ;
2. plan d'adressage ;
3. arborescence AD ;
4. matrice groupes / ressources / droits ;
5. preuves de validation ;
6. script PowerShell ;
7. rapport de santé ;
8. document de 3 à 5 pages expliquant les choix ;
9. soutenance de 8 minutes + 4 minutes de questions.

## Challenge supplémentaire

Ajouter au choix :

- second DC + réplication ;
- mini-lab Hyper-V complet ;
- sauvegarde/restauration testée ;
- supervision ;
- stratégie de durcissement ;
- contrôle PowerShell de conformité.
