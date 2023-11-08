const { celebrate, Joi } = require('celebrate');

const validateUrl = /https?:\/\/(www\.)?[a-z0-9.-]{2,}\.[a-z]{2,}\/?[-._~:/?#[\]@!$&'()*+,;=]*/;

const movieIdValid = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required().hex()
  })
});

const addMovieValid = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().regex(validateUrl),
    trailerLink: Joi.string().required().regex(validateUrl),
    thumbnail: Joi.string().required().regex(validateUrl),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required()
  })
});

const updateUserValid = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email()
  })
});

const registValid = celebrate({
  body: Joi.object()
    .keys({
      name: Joi.string().min(2).max(30),
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    })
});

const loginValid = celebrate({
  body: Joi.object()
    .keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    })
});

module.exports = {
  validateUrl, movieIdValid, addMovieValid, updateUserValid, registValid, loginValid
};
