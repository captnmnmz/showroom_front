# Installation de l'API Showroom

L'objectif dans ce workshop est de récupérer l'API Showroom pour commencer à jouer avec.

## Récupération de l'API

On va commencer par lancer un terminal faire un `git clone https://github.com/captnmnmz/showroom_front.git`.
Le code va maintenant être en local sur votre machine. Vous pouvez ouvrir le dossier ainsi récupéré avec votre éditeur (Sublime Text par exemple).

## Avant de lancer l'application
Vous allez maintenant entrer dans le dossier en faisant un `cd showroom_front` puis vous allez devoir lancer l'installation des dépendances avec `npm install`

## Lancer l'application
Pour lancer l'application, vous avez besoin de vous connecter sur une base de données. Dans un temps 1, nous allons nous connecter sur une base de données à distance pour simplifier la situation, qui est hébergée sur [https://mlab.com/](https://mlab.com/) et dont nous allons vous donner les identifiants juste en dessous. L'URL de la base de données est`ds149535.mlab.com:49535/showroom-db`. Attention elle doit être configurée dans le fichier `src/config/dev.js`.

### Mac et Linux
`DB_USERNAME=test-user DB_PASSWORD=test-password NODE_ENV=development npm run dev`

### Windows
```bash
setx DB_USERNAME test-user
setx DB_PASSWORD test-password
setx NODE_ENV development
npm run dev
```

Vous allez maintenant tester que le serveur est bien lancé en vous rendant dans votre navigateur sur [http://localhost:5000/](http://localhost:5000/) qui correspond au backoffice.

## Effectuer les premières requêtes sur l'API

### Pour commencer
Pour commencer à effectuer des requêtes sur l'API, nous allons utiliser un logiciel du type de [Postman](https://www.getpostman.com/). Il nous simplifiera la vie pour envoyer des requêtes sur le serveur. A la fin du projet, ce sera le rôle de l'application mobile.

* Pour commencer, dans PostMan nous allons faire une requête de type `GET` sur l'API `http://localhost:5000/api`. C'est notre HelloWorld de l'API.
* Ensuite, vous allez récupérer une liste des spectacles en `GET` sur l'API `http://localhost:5000/api/deals`

### Ajouter un deal

On peut ajouter un deal avec une requête `POST` de la manière suivante (à mettre dans le body) :

```
{
	name: "Paire de Nike à moitié prix !",
    business: "MouffetardShoes",
    description: "Réduction sur la paire de votre choix",
    capacity: 20,
    price: 40,
    image: "https://images.nike.com/is/image/DotCom/pwp_sheet2?$NIKE_PWPx3$&$img0=AA1125_200&$img1=AA1125_001&$img2=AA1125_002",
    begin: "2017-12-01",
    end: "2017-12-02",
    hidden: "False"
}
```
Ensuite, il faut envoyer cette requête sur l'URL `http://localhost:5000/api/deals/create` avec ce contenu.


### Lien postman pour tester les apis
Pour tester toutes les APIs possibles, vous pouvez utiliser ce lien à importer dans Postman : `https://www.getpostman.com/collections/1a324ea6496f4dc8de41`