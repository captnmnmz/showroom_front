// Liste des erreurs que l'API peut renvoyer

const list = {
  noOffersError: {
    code: 500,
    error: 'noOffersError',
    error_description: 'La base ne contient pas de deals'
  },
  noOfferError: {
    code: 500,
    error: 'noOfferError',
    error_description: 'Ce deal n\'existe pas'
  },
};

export default (err) => {
  if (err instanceof Error && err.message){
    return list[err.message] ? list[err.message] : { code: 500, error: 'UnknownError', error_description: 'Unknown error' };
  } else {
    return list[err] ? list[err] : { code: 500, error: 'UnknownError', error_description: 'Unknown error' };
  }
};