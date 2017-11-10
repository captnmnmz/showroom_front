// Controller de la route '/shows'
import Errors from "../helpers/Errors";

// Récupération du model
import DealModel from "../models/DealModel";
//import BookingModel from "../models/BookingModel";

export default {
  seedDb: (req, res) => {
    return Promise.all([
      DealModel.deleteDeals(),
      //BookingModel.deleteBookings(),
    ])
    .then((data) => {
      return Promise.all([
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