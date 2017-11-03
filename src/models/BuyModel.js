// Model de la route '/bookings'

import mongoose from "mongoose";
mongoose.Promise = global.Promise;

let Schema = new mongoose.Schema({
  username: { type: String }, // le nom de l'utilisateur
  offerId: { type: String },   // l'id de l'offre
  quantity: { type: Number },    // le nombre de produit achetés
  boughtAt: { type: Date },  // la date d'achat'
});

let Model = mongoose.model('Buying', Schema);

export default {
  getBoughts: () => {
    return Model.find({}).exec();
  },

  getBought: (_id) => {
    return Model.findOne({ _id }).exec();
  },

  createBuy: (buy) => {
    return Model.create({
      username: buy.username,
      offerId: buy.offerId,
      quantity: buy.seats,
      boughtAt: new Date(),
    });
  },

};