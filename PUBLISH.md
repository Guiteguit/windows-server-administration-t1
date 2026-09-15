# Publier le dépôt sur GitHub

Depuis le dossier du cours :

```bash
git init
git branch -M main
git add .
git status
```

Avant le commit, vérifier que `instructor/` **n'est pas** dans les fichiers suivis.

```bash
git commit -m "Initial course: Windows Server administration T1"
```

Avec GitHub CLI :

```bash
gh repo create windows-server-administration-t1 --public --source=. --remote=origin --push
```

Sans GitHub CLI : créer un dépôt vide sur GitHub puis ajouter le remote indiqué par GitHub.

## Recommandation pour les étudiants

Le plus simple est de demander à chaque étudiant de :

1. fork le dépôt ;
2. créer une branche `tp/prenom-nom` ;
3. déposer ses preuves dans un dossier `rendus/` ;
4. ouvrir une Pull Request à la fin du module.

Cela ajoute une petite pratique Git sans transformer ce module Windows en cours Git.
