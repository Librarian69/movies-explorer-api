const BadRequest = require('../errors/badRequest');
const NotFound = require('../errors/notFound');
const Movie = require('../models/movie');

module.exports.createMovie = (req, res, next) => {
  const { _id } = req.user;

  Movie
    .create({ ...req.body, owner: _id })
    .then((movie) => {
      res.status(201).send(movie);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest('переданы некорректные данные фильма'));
      } else {
        next(err);
      }
    });
};

module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movie) => res.send(movie))
    .catch(next);
};

module.exports.deleteMovieById = (req, res, next) => {
  Movie.findOne({ movieId: req.params.movieId })
    .then((movie) => {
      if (!movie) {
        throw new NotFound('фильм не найдена.');
      } else { movie.deleteOne().then(() => res.send({ message: 'Фильм удален' })); }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest('переданы некорректные данные Фильма'));
      } else {
        next(err);
      }
    });
};
