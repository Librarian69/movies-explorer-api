require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const { errors, celebrate, Joi } = require('celebrate');
const bodyParser = require('body-parser');
const router = require('./routes');
const auth = require('./middlewares/auth');
const defaultErr = require('./errors/defaultError');
const { login, createUser } = require('./controllers/users');
const cors = require('./middlewares/cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000, NODE_ENV, URL_DB_PROD } = process.env;
const app = express();

mongoose.connect(NODE_ENV === 'production' ? URL_DB_PROD : 'mongodb://127.0.0.1:27017/mestodb');

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.use(cors);

app.post(
  '/signin',
  celebrate({
    body: Joi.object()
      .keys({
        email: Joi.string().required().email(),
        password: Joi.string().required(),
      })
  }),
  login
);

app.post(
  '/signup',
  celebrate({
    body: Joi.object()
      .keys({
        name: Joi.string().min(2).max(30),
        email: Joi.string().required().email(),
        password: Joi.string().required(),
      })
  }),
  createUser
);

app.use(auth);

app.use(router);

app.use(errorLogger);

app.use(errors());

app.use(defaultErr);

app.listen(PORT, () => {
  console.log('server started on port 3000');
});
