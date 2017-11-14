// Model de la route '/deals'

import mongoose from "mongoose";
mongoose.Promise = global.Promise;

import DealSeeds from "../helpers/DealSeeds";

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

let Model = mongoose.model('Deal', Schema);

export default {
  seedDeals: () => {
    let promises = [];
    for (let deal of DealSeeds){
      promises[promises.legth] = Model.create(deal);
    }
    return Promise.all(promises);
  },

  getDeals: () => {
    return Model.find({}).exec();
  },

  getDeal: (_id) => {
    return Model.findOne({ _id }).exec();
  },

  createDeal: (deal) => {
    return Model.create({
      name: deal.name,
      business: deal.business,
      description: deal.description,
      capacity: deal.capacity,
      price: deal.price,
      image: deal.image,
      begin: deal.begin,
      end: deal.end,
      hidden: deal.hidden
    });
  },

  updateDeal: (_id, offer) => {
    return Model.findOneAndUpdate({ _id }, {
      name: deal.name,
      business: deal.business,
      description: deal.description,
      capacity: deal.capacity,
      price: deal.price,
      image: deal.image,
      begin: deal.begin,
      end: deal.end,
      hidden: deal.hidden
    }, {upsert: true}).exec();
  },

  deleteDeals: () => {
    return Model.remove({}).exec();
  },

  deleteDeal: (_id) => {
    return Model.remove({ _id }).exec();
  },
};