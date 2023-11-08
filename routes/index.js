const express = require('express');
const userRouter = require('./users');
const movieRouter = require('./movies');
const NotFound = require('../errors/notFound');
const auth = require('../middlewares/auth');
const authRouter = require('./auth');

const router = express.Router();
router.use(authRouter);
router.use(auth);
router.use('/users', userRouter);
router.use('/movies', movieRouter);
router.use((req, res, next) => {
  next(new NotFound('Порта не существует'));
});

module.exports = router;
