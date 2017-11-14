//Model de la route '/pros'

import mongoose from "mongoose";
mongoose.Promise = global.Promise;

import DealSeeds from "../helpers/ProSeeds";

let Schema = new mongoose.Schema({
	name : { type: String},      // le nom de l'offre
	lat : { type: String},
	lng : {type : String},
});

Let Model = mongoose.model('Deal', Schema);

export default {
	seedPros: () => {
		let promises = [];
		for (let pro of ProSeeds){
			promises[promises.length] = Model.create(pro);
		}
		return Promise.all(promises);
	},

	getPros: () => {
    	return Model.find({}).exec();
  	},

	getPro: (_id) => {
	return Model.findOne({ _id }).exec();
	},

	createPro: (pro) => {
	return Model.create({
	  name: pro.name,
	  lat: pro.lat,
	  lng: pro.lng
	});
	},

	updatePro: (_id, pro) => {
	return Model.findOneAndUpdate({ _id }, {
	  name: pro.name,
	  lat: pro.lat,
	  lng: pro.lng
	}, {upsert: true}).exec();
	},

	deletePros: () => {
	return Model.remove({}).exec();
	},

	deletePro: (_id) => {
	return Model.remove({ _id }).exec();
	},

};