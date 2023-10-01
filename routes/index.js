const express = require('express');
const userRouter = require('./users');
const movieRouter = require('./movies');
const NotFound = require('../errors/notFound');

const router = express.Router();
router.use('/users', userRouter);
router.use('/movies', movieRouter);
router.use((req, res, next) => {
  next(new NotFound('Порта не существует'));
});

module.exports = router;
