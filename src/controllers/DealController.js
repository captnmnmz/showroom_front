// Controller de la route '/deals'
import _ from "lodash";
import Errors from "../helpers/Errors";

// Récupération du model
import DealModel from "../models/DealModel";
import ProModel from "../models/ProModel";

const deals = () => {
  // On fait appel à la fonction getDeals du model
  // Celle ci renvoie tous les deals présents en base
  return DealModel.getDeals()
  .then((data) => {
    // On récupère ici data qui est une liste de deals

    if (data === null) {
      // Si data est vide, nous renvoyons l'erreur 'noDealsError'
      throw new Error('noDealsError');
    }

    // On prépare ici la réponse que va renvoyer l'api, il s'agit d'un tableau
    let response = [];
    for (let deal of data){
      // On parcours data. pour chaque élément, on garde les champs name, proId, description, price, image, begin and end
      return ProModel.getPro(deal.proId)
      .then((pro) => {
        if (pro === null) {
          // Si data est vide, nous renvoyons l'erreur 'noDealsError'
          throw new Error('ProUnknownError');
        }

        response[response.length] = {
          id: deal._id,
          name: deal.name,
          proId: deal.proId,
          business: pro.name,
          description: deal.description,
          price: deal.price,
          image: deal.image,
          begin: deal.begin,
          end: deal.end,
          hidden: deal.hidden,
          lat: pro.lat,
          lng: pro.lng
        }
      });
    }

    // Avant d'envoyer la réponse on la tri par ordre alphabétique croissant sur le champs name
    return _.sortBy(response, 'begin');
  });
}

const deal = (_id) => {
  // On fait appel à la fonction getDeal du model
  // Celle ci renvoie le deal dont l'id est _id
  return DealModel.getDeal(_id)
  .then((data) => {
    // On récupère ici data qui est une liste de deals

    if (data === null) {
      // Si data est vide, nous renvoyons l'erreur 'noDealError'
      throw new Error('noDealError');
    }


    return ProModel.getPro(data.proId)
    .then((data_pro) => {
    // On prépare ici la réponse que va renvoyer l'api, il s'agit d'un élement
      let response = {
        id: data._id,
        name: data.name,
        proId: data.proId,
        business: data_pro.name,
        description: data.description,
        price: data.price,
        image: data.image,
        begin: data.begin,
        end: data.end,
        hidden: data.hidden,
        lat: data_pro.lat,
        lng: data_pro.lng
      };
      return response;
    });
  });
}

const createDeal = (deal) => {
  // On fait appel à la fonction createDeal du model
  // Celle ci renvoie le deal dont l'id est _id
  return DealModel.createDeal(deal);
}

const updateDeal = (id, deal) => {
  // On fait appel à la fonction updateDeal du model
  // Celle ci renvoie le deal dont l'id est _id
  return DealModel.updateDeal(id, deal);
}

const deleteDeal = (id) => {
  // On fait appel à la fonction deleteDeal du model
  // Celle ci renvoie le deal dont l'id est _id
  return DealModel.deleteDeal(id);
}

export default {
  // Controller des views
  getDeals: (req, res) => {
    deals()
    .then((data) => {
      // data contient une liste de deals
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
    res.render('deal/createDeal');
  },

  postCreateDeal: (req, res) => {
    let deal = {
      name: req.body.name,
      proId: req.body.proId,
      description: req.body.description,
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
    deal(req.params.id)
    .then((data) => {
      res.render('deal/updateDeal', { deal: data });
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
