const movieRouter = require('express').Router();

const {
  getMovies, deleteMovieById, createMovie
} = require('../controllers/movies');
const { movieIdValid, addMovieValid } = require('../middlewares/validation');

movieRouter.get('/', getMovies);

movieRouter.delete('/:movieId', movieIdValid, deleteMovieById);

movieRouter.post('/', addMovieValid, createMovie);

module.exports = movieRouter;
