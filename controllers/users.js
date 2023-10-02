require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const BadRequest = require('../errors/badRequest');
const NotFound = require('../errors/notFound');
const Unauthrized = require('../errors/unauthrized');
const Conflict = require('../errors/conflict');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.createUser = (req, res, next) => {
  const {
    name, email, password
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => {
      User
        .create({
          name, email, password: hash
        })
        .then((user) => res.status(201).send({
          email: user.email,
          name: user.name,
        }))
        .catch((err) => {
          if (err.code === 11000) {
            next(new Conflict('Пользователь с таким email уже существует'));
          } else if (err.name === 'ValidationError') {
            next(new BadRequest('Переданы некорректные данные'));
          } else {
            next(err);
          }
        });
    }).catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new Unauthrized('Пользователь не найден');
      }
      return bcrypt.compare(password, user.password)
        .then((match) => {
          if (!match) {
            return next(new Unauthrized('Не правильно указан логин или пароль'));
          }
          const token = jwt.sign(
            { _id: user._id },
            NODE_ENV === 'production' ? JWT_SECRET : 'super-secret-key',
            { expiresIn: '7d' },
          );
          return res.send({ token });
        });
    })
    .catch(next);
};

module.exports.getCurrentUser = (req, res, next) => {
  const { _id } = req.user;

  User
    .findById(_id)
    .then((user) => {
      if (!user) {
        throw new NotFound('Пользователь по данному _id не найден');
      }
      return res.send(user);
    })
    .catch(next);
};

module.exports.updateProfile = (req, res, next) => {
  const { name, email } = req.body;
  const { _id } = req.user;
  User.findByIdAndUpdate(_id, { name, email }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFound('пользователь не найден.');
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new BadRequest('переданы некорректные данные пользователя'));
      } else {
        next(err);
      }
    });
};
