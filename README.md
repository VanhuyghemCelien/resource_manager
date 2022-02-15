# MONOREPO for Resource manager

:warning: Ce repository est protégé en push sur les branches `develop` et `main`. Pour pouvoir merger sur ces branches, vous devez créer une [pull request](https://github.com/TRIPTYK/ipbw-front-office/pulls) et vous assurer que les tests unitaires passent.
Chaque commit est vérifié par husky qui vous force à faire passer vos tests en local avant chaque commit.

Une méthode de travail [Git flow](https://danielkummer.github.io/git-flow-cheatsheet/) est donc préconisée.

:exclamation: Faites bien attention aux points suivants pour que les tests passent : 
  - Tests
  - Compilation Typescript
  - Lint des templates
  - Lint du JS/TS

- N'oubliez pas de lire les README de chaque package
    - [ipbw-common](https://github.com/TRIPTYK/ipbw/blob/main/packages/ipbw-common/README.md)
    - [ipbw-back-office](https://github.com/TRIPTYK/ipbw/blob/main/packages/ipbw-back-office/README.md)

## Concernant les tests

A faire : acceptance et d'intégration (components, helpers).
Optionnel : unitaires.

## Concernant le code coverage

Le front-office et la back-office sont soumis à un minimum de code coverage, si il n'y a pas assez de tests écrits ou qu'ils ne couvrent pas assez de cas, les tests ne passeront pas.

# Install

## Clone

```bash
git clone git@github.com:TRIPTYK/ipbw.git
git flow init
```

## Installer pnpm

Voir https://pnpm.io/fr/installation

```bash
pnpm recursive install
```

## Setup

```bash
pnpm recursive run setup
```

##  Start all

```bash
pnpm recursive run start
```

# Extensions Visual Studio Code

Un set d'extensions visual studio vous est recommandée à l'installation. Afin d'être heureux et de ne pas balancer votre pc par la fenêtre.
