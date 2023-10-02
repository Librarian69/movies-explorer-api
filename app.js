require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const router = require('./routes');
const defaultErr = require('./errors/defaultError');
const cors = require('./middlewares/cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000, NODE_ENV, URL_DB_PROD } = process.env;
const app = express();

mongoose.connect(NODE_ENV === 'production' ? URL_DB_PROD : 'mongodb://127.0.0.1:27017/bitfilmsdb');

app.use(helmet());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.use(cors);

app.use(router);

app.use(errorLogger);

app.use(errors());

app.use(defaultErr);

app.listen(PORT, () => {
  console.log('server started on port 3000');
});
