// Controller de la route '/shows'
import Errors from "../helpers/Errors";

// Récupération du model
import DealModel from "../models/DealModel";
import ProModel from "../models/ProModel";
//import BookingModel from "../models/BookingModel";


//TODO add a step to delete pro table, add a step to initialise the deal seed with the pro ids (so create promodel)
export default {
  seedDb: (req, res) => {
    return Promise.all([
      DealModel.deleteDeals(),
      ProModel.deletePros(),
      //BookingModel.deleteBookings(),
    ])
    .then((data) => {
      return ProModel.seedPros();
    })
    .then((data) => {
      return ProModel.getPros();
    })
    .then((data) => {
      let Dico = {};

      for (let item of data){
        Dico[item.name]=item._id;
      }

      return DealModel.seedDeals(Dico);

    })
    .then((data) => {
      res.send('ok');
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },
};