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

const dealqr = (_id) => {
  let response = {
    qrcode: "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://sheltered-plains-73520.herokuapp.com/deals/id/"
            +_id
  };
  return response;
}

const pros = (proId) => {
  return ProModel.getPro(proId)
  .then((pro) => {
    if (pro === null) {
      throw new Error('noProsError');
    }
    console.log("HERE");
    let response = {
      name: pro.name,
      lat: pro.lat,
      lng: pro.lng,
      };
    console.log(response);
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
    // Promise.all([
    //   deal(req.params.id),
    //   pros(req.params.id),
    //   // dealproname(req.params.id),
    // ])
    // .then((data) => {
    //   console.log(data);
    //   res.render('deal/deal', { deal: data[0], qr: data[1] });
    //   // console.log(data[0]);
    //   // console.log(data[1]);
    //   // console.log(data[2]);
    //   // res.render('deal/deal', { deal: data[0], qr: data[1], pro: data[2] });
    //   console.log('OK');
    // }, (err) => {
    //   console.log(err);
    //   res.status(Errors(err).code).send(Errors(err));
    // });
    deal(req.params.id)
    .then((data1) => {
      console.log(data1.proId);
      pros(data1.proId)
      .then((data2) => {
        console.log(data2.name);
        res.render('deal/deal', { deal: data1, pro: data2 });
      }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
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
