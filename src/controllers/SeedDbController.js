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
      return Promise.all([
        ProModel.seedPros(),
      ]);
    })
    .then((data) => {
      Promise.all([
        DealModel.seedDeals(),
      ]);
    })
    
    .then((data) => {
      res.send('ok');
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },
};