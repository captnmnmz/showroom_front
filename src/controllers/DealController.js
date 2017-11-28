// Controller de la route '/deals'
import _ from "lodash";
import Errors from "../helpers/Errors";

// Récupération du model
import DealModel from "../models/DealModel";
import ProModel from "../models/ProModel";

const deals = () => {
  return DealModel.getDeals()
  .then((data) => {
    if (data === null) {
      throw new Error('noDealsError');
    }

    let response = [];
    for (let deal of data){
      response[response.length] = {
        id: deal._id,
        name: deal.name,
        proId: deal.proId,
        description: deal.description,
        capacity: deal.capacity,
        price: deal.price,
        image: deal.image,
        begin: deal.begin,
        end: deal.end,
        hidden: deal.hidden,
      }
    }
    return _.sortBy(response, 'end');
  });
}

const deal = (_id) => {
  return DealModel.getDeal(_id)
  .then((data) => {
    if (data === null) {
      throw new Error('noDealError');
    }

      let response = {
        id: data._id,
        name: data.name,
        proId: data.proId,
        description: data.description,
        capacity: data.capacity,
        price: data.price,
        image: data.image,
        begin: data.begin,
        end: data.end,
        hidden: data.hidden,
      };
    return response;
  });
}

const createDeal = (deal) => {
  return DealModel.createDeal(deal);
}

const updateDeal = (id, deal) => {
  return DealModel.updateDeal(id, deal);
}

const deleteDeal = (id) => {
  return DealModel.deleteDeal(id);
}

export default {
  // Controller des views
  getDeals: (req, res) => {
    deals()
    .then((data) => {
      res.render('deal/deals', { deals: data });
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  getDeal: (req, res) => {
    deal(req.params.id)
    .then((data) => {
      res.render('deal/deal', { deal: data });
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  getCreateDeal: (req, res) => {
    ProModel.getPros()
    .then((data) => {
      res.render('deal/createDeal', { pros: data });
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  postCreateDeal: (req, res) => {
    let deal = {
      name: req.body.name,
      proId: req.body.proId,
      description: req.body.description,
      capacity: req.body.capacity,
      price: req.body.price,
      image: req.body.image,
      begin: req.body.begin,
      end: req.body.end,
      hidden: req.body.hidden
    };

    createDeal(deal)
    .then((data) => {
      res.redirect('/deals');
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  getUpdateDeal: (req, res) => {
    Promise.all([
      deal(req.params.id),
      ProModel.getPros(),
    ])
    .then((data) => {
      res.render('deal/updateDeal', { deal: data[0], pros: data[1] });
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  postUpdateDeal: (req, res) => {
    let deal = {
      name: req.body.name,
      proId: req.body.proId,
      description: req.body.description,
      capacity: req.body.capacity,
      price: req.body.price,
      image: req.body.image,
      begin: req.body.begin,
      end: req.body.end,
      hidden: req.body.hidden
    };

    updateDeal(req.params.id, deal)
    .then((data) => {
      res.redirect('/deals');
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  getDeleteDeal: (req, res) => {
    deleteDeal(req.params.id)
    .then((data) => {
      res.redirect('/deals');
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  // ************ API FROM THERE ************ //

  // Controller des Apis
  getDealsApi: (req, res) => {
    deals()
    .then((data) => {
      // data contient maintenant la valeur retournée par la fonction _.sortBy
      // Si les opérations précédentes se sont bien passées, l'api renvoie une liste de deals
      res.send(data);
    }, (err) => {
      // Si une erreur a été renvoyée avec la fonctions throw new Error(), nous atterrissons ici
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  getDealApi: (req, res) => {
    deal(req.params.id)
    .then((data) => {
      res.send(data);
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  postCreateDealApi: (req, res) => {
    let deal = {
      name: req.body.name,
      proId: req.body.proId,
      description: req.body.description,
      capacity: req.body.capacity,
      price: req.body.price,
      image: req.body.image,
      begin: req.body.begin,
      end: req.body.end,
      hidden: req.body.hidden
    };

    createDeal(deal)
    .then((data) => {
      res.send('ok');
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  postUpdateDealApi: (req, res) => {
    let deal = {
      name: req.body.name,
      proId: req.body.proId,
      description: req.body.description,
      capacity: req.body.capacity,
      price: req.body.price,
      image: req.body.image,
      begin: req.body.begin,
      end: req.body.end,
      hidden: req.body.hidden
    };

    updateDeal(req.params.id, deal)
    .then((data) => {
      res.send('ok');
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  postDeleteDealApi: (req, res) => {
    deleteDeal(req.params.id)
    .then((data) => {
      res.send('ok');
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },
};
