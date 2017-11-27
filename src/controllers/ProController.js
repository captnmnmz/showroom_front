// Controller de la route '/bookings'
import _ from "lodash";
import Errors from "../helpers/Errors";

// Récupération du model
import DealModel from "../models/DealModel";
import ProModel from "../models/ProModel";

const pros = () => {
  return ProModel.getPros()
  .then((data) => {
    if (data === null) {
      throw new Error('noProsError');
    }

    let response = [];
    for (let pro of data){
      response[response.length] = {
        id: pro._id,
        name: pro.name,
        lat: pro.lat,
        lng: pro.lng,
      }
    }
    return _.sortBy(response, 'name');
  });
}

const pro = (_id) => {
  return ProModel.getPro(_id)
  .then((data) => {
    if (data === null) {
      throw new Error('noProError');
    }

    let response = {
      id: data._id,
      name: data.name,
      lat: data.lat,
      lng: data.lng,
    };
    return response;
  });
}

const createPro = (pro) => {
  return ProModel.createPro(pro);
}

const updatePro = (id, pro) => {
  return ProModel.updatePro(id, pro);
}

const deletePro = (id) => {
  return ProModel.deletePro(id);
}

export default {
  // Controller des views
  getPros: (req, res) => {
    pros()
    .then((data) => {
      // data contient une liste de pros
      res.render('pro/pros', { pros: data });
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  getPro: (req, res) => {
    pro(req.params.id)
    .then((data) => {
      res.render('pro/pro', { pro: data });
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  getCreatePro: (req, res) => {
    res.render('pro/createPro');
  },

  postCreatePro: (req, res) => {
    let pro = {
      name: req.body.name,
      lat: req.body.lat,
      lng: req.body.lng,
    };

    createPro(pro)
    .then((data) => {
      res.redirect('/pros');
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  getUpdatePro: (req, res) => {
    pro(req.params.id)
    .then((data) => {
      res.render('pro/updatePro', { pro: data });
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  postUpdatePro: (req, res) => {
    let pro = {
      name: req.body.name,
      lat: req.body.lat,
      lng: req.body.lng,
    };

    updatePro(req.params.id, pro)
    .then((data) => {
      res.redirect('/pros');
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  getDeletePro: (req, res) => {
    deletePro(req.params.id)
    .then((data) => {
      res.redirect('/pros');
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  // ************ API FROM THERE ************ //

  // Controller des Apis
  getProsApi: (req, res) => {
    pros()
    .then((data) => {
      // data contient maintenant la valeur retournée par la fonction _.sortBy
      // Si les opérations précédentes se sont bien passées, l'api renvoie une liste de pros
      res.send(data);
    }, (err) => {
      // Si une erreur a été renvoyée avec la fonctions throw new Error(), nous atterrissons ici
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  getProApi: (req, res) => {
    pro(req.params.id)
    .then((data) => {
      res.send(data);
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  postCreateProApi: (req, res) => {
    let pro = {
      name: req.body.name,
      lat: req.body.lat,
      lng: req.body.lng,
    };

    createPro(pro)
    .then((data) => {
      res.send('ok');
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  postUpdateProApi: (req, res) => {
    let pro = {
      name: req.body.name,
      lat: req.body.lat,
      lng: req.body.lng,
    };

    updatePro(req.params.id, pro)
    .then((data) => {
      res.send('ok');
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  postDeleteProApi: (req, res) => {
    deletePro(req.params.id)
    .then((data) => {
      res.send('ok');
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },
};
