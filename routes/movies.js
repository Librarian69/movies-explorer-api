const movieRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getMovies, deleteMovieById, createMovie
} = require('../controllers/cards');
const { validateUrl } = require('../middlewares/validation');

movieRouter.get('/', getMovies);

movieRouter.delete('/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required().length(24).hex()
  })
}), deleteMovieById);

movieRouter.post('/', celebrate({
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
}), createMovie);

module.exports = movieRouter;
