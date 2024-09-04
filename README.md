
# Shabadeft

Ce projet est une application développée avec [Nuxt 3](https://nuxt.com/), un framework Vue.js performant et flexible. Il intégre diverses dépendances pour améliorer l'expérience utilisateur, notamment Vuetify pour le design UI, et `@nuxtjs/google-fonts` pour la gestion des polices Google.

## App

Visite le site [shabadeft.netlify.app](https://shabadeft.netlify.app/) pour essayer l'application.

## Prérequis

Avant de commencer, assurez-vous d'avoir installé [Node.js](https://nodejs.org/) (version 14.x ou supérieure) et [npm](https://www.npmjs.com/) (ou [yarn](https://yarnpkg.com/)) sur votre machine.

## Installation

Clonez ce dépot, puis installez les dépendances en exécutant la commande suivante dans le répertoire du projet :

```bash
npm install
```

## Scripts npm

Voici les scripts disponibles dans ce projet :

- **`dev`** : Lance l'application en mode développement.
  
  ```bash
  npm run dev
  ```

- **`build`** : Compile l'application pour la production.
  
  ```bash
  npm run build
  ```

- **`generate`** : Génére un site statique.
  
  ```bash
  npm run generate
  ```

- **`preview`** : Lance un serveur local pour prévisualiser la version compilée en production.
  
  ```bash
  npm run preview
  ```

- **`postinstall`** : Exécute la préparation nécessaire après l'installation des modules.
  
  Ce script est exécuté automatiquement après `npm install`.

## Dépendances

- **@mdi/font** : Collection d'icônes Material Design.
- **nuxt** : Le framework Nuxt 3.
- **vue** : La bibliothèque Vue.js.

## Dépendances de développement

- **@hypernym/nuxt-anime** : Intégration de la bibliothèque Anime.js pour Nuxt.
- **@nuxtjs/google-fonts** : Module Nuxt pour intégrer facilement les polices Google.
- **nuxt-mdi** : Intégration de Material Design Icons pour Nuxt.
- **vuetify** : Framework Vue pour des composants UI stylisés.
- **vuetify-nuxt-module** : Module Nuxt pour Vuetify.

## Lancer l'application

Après avoir installé les dépendances, vous pouvez lancer l'application en mode développement avec la commande :

```bash
npm run dev
```

Ensuite, ouvrez [http://localhost:3000](http://localhost:3000) pour voir votre application dans le navigateur.

## Contribuer

Les contributions sont les bienvenues ! Si vous trouvez un bug ou souhaitez proposer une amélioration, n'hésitez pas à créer une issue ou à  soumettre une pull request.

## Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.
