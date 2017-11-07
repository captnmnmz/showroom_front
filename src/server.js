// Récupération des librairies de base permettant de faire un serveur d'API
import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import path from "path";
import favicon from "serve-favicon";
import mongoose from "mongoose";
import exphbs from "express-handlebars";

// Récupération du fichier de configuration qui dépend de l'environnement :
// - /config/dev.js si vous lancez l'application en local
// - /config/prod.js si vous lancez l'application sur votre serveur chez Heroku
import config from "./config";
import HandlebarsConfig from "./helpers/HandlebarsConfig";

// Récupération des controllers
import SeedDbController from "./controllers/SeedDbController";
import HomeController from "./controllers/HomeController";
import ShowController from "./controllers/ShowController";
import BookingController from "./controllers/BookingController";

// Configuration du serveur
const viewsPath = __dirname + '/views/';
const server = express();
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(cookieParser());
server.use(favicon(path.resolve('./src/assets/favicon.png')));

server.use(express.static(path.resolve('./src/assets')));
server.set('views', path.resolve('./src/views'));
server.engine('.hbs', exphbs(HandlebarsConfig));
server.set('view engine', '.hbs');

server.set('port', (process.env.PORT || 5000));
server.listen(server.get('port'), () => {
  console.log('Node app is running on port', server.get('port'));
});

// CROSS : cela permettra plus tard d'accéder aux API produites ici depuis l'appli mobile
// Voir ici pour plus d'info : https://developer.mozilla.org/fr/docs/HTTP/Access_control_CORS
server.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Headers', 'Authorization,DNT,X-Mx-ReqToken,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

// Connection à la base de donnée
mongoose.connect('mongodb://' + process.env.DB_USERNAME + ':' + process.env.DB_PASSWORD + '@' + config.bddUri, {}, (err, res) => {
  if (err) {
    // La connection a échouée
    console.log('Mongo error:' + config.bddUri + '. ' + err);
  } else {
    // La connection a réussie
    console.log('Mongo success: ' + config.bddUri);
  }
});


// Routes pour initialiser la base
server.post('/seeddb', SeedDbController.seedDb);


// Routes pour les vues
server.get('/', HomeController.getIndex);

server.get('/users', ShowController.getUsers);
server.get('/users/id/:id', ShowController.getUser);
server.get('/users/create', ShowController.getCreateUser);
server.post('/users/create', ShowController.postCreateUser);
server.get('/users/update/:id', ShowController.getUpdateUser);
server.post('/users/update/:id', ShowController.postUpdateUser);
server.get('/users/delete/:id', ShowController.getDeleteUser);

server.get('/offers', BookingController.getOffers);
server.get('/offers/id/:id', BookingController.getOffer);
server.get('/offers/create', BookingController.getCreateOffer);
server.post('/offers/create', BookingController.postCreateOffer);
server.get('/offers/update/:id', BookingController.getUpdateOffer);
server.post('/offers/update/:id', BookingController.postUpdateOffer);
server.get('/offers/delete/:id', BookingController.getDeleteOffer);

// Routes pour les APIs
server.get('/api/', HomeController.getIndexApi);

server.get('/api/users', ShowController.getUsersApi);
server.get('/api/users/id/:id', ShowController.getUserApi);
server.post('/api/users/create', ShowController.postCreateUserApi);
server.post('/api/users/update/:id', ShowController.postUpdateUserApi);
server.post('/api/users/delete/:id', ShowController.postDeleteUserApi);

server.get('/api/offers', BookingController.getOffersApi);
server.get('/api/offers/id/:id', BookingController.getOfferApi);
server.post('/api/offers/create', BookingController.postCreateOfferApi);
server.post('/api/offers/update/:id', BookingController.postUpdateOfferApi);
server.post('/api/offers/delete/:id', BookingController.postDeleteOfferApi);
