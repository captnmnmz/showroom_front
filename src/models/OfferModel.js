// Model de la route '/shows'

import mongoose from "mongoose";
mongoose.Promise = global.Promise;

import OfferSeeds from "../helpers/OfferSeeds";

let Schema = new mongoose.Schema({
  name: { type: String },         // le nom de l'offre
  business: { type: String },        // le nom du magasin
  description: { type: String },  // la description
  capacity: { type: Number },     // la quantité de l'offre disponible
  price: { type: Number },        // le prix
  image: { type: String },        // l'url de l'image
  begin: { type: String },         // la date du début de l'offre
  end: { type:String},            //la date de fin de l'offre
  hidden: {type:String},         // Si l'offre est secrète ou non
});

let Model = mongoose.model('Show', Schema);

export default {
  seedOffers: () => {
    let promises = [];
    for (let offer of OfferSeeds){
      promises[promises.legth] = Model.create(offer);
    }
    return Promise.all(promises);
  },

  getOffers: () => {
    return Model.find({}).exec();
  },

  getOffer: (_id) => {
    return Model.findOne({ _id }).exec();
  },

  createOffer: (offer) => {
    return Model.create({
      name: offer.name,
      business: offer.business,
      description: offer.description,
      capacity: offer.capacity,
      price: offer.price,
      image: offer.image,
      begin: offer.begin,
      end: offer.end,
      hidden: offer.hidden
    });
  },

  updateOffer: (_id, offer) => {
    return Model.findOneAndUpdate({ _id }, {
      name: offer.name,
      business: offer.business,
      description: offer.description,
      capacity: offer.capacity,
      price: offer.price,
      image: offer.image,
      begin: offer.begin,
      end: offer.end,
      hidden: offer.hidden
    }, {upsert: true}).exec();
  },

  deleteOffers: () => {
    return Model.remove({}).exec();
  },

  deleteOffer: (_id) => {
    return Model.remove({ _id }).exec();
  },
};