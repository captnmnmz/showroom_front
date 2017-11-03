// Liste des erreurs que l'API peut renvoyer

const list = {
  noOffersError: {
    code: 500,
    error: 'noOffersError',
    error_description: 'La base ne contient pas d\'offres'
  },
  noOfferError: {
    code: 500,
    error: 'noOfferError',
    error_description: 'Cette offre n\'existe pas'
  },
  noBuysError: {
    code: 500,
    error: 'noBuysError',
    error_description: 'La base ne contient pas d\'achat'
  },
  noBuyError: {
    code: 500,
    error: 'noBuyError',
    error_description: 'Cet achat n\'existe pas'
  },
};

export default (err) => {
  if (err instanceof Error && err.message){
    return list[err.message] ? list[err.message] : { code: 500, error: 'UnknownError', error_description: 'Unknown error' };
  } else {
    return list[err] ? list[err] : { code: 500, error: 'UnknownError', error_description: 'Unknown error' };
  }
};