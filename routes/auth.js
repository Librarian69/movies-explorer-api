const authRouter = require('express').Router();
const {
  login, createUser
} = require('../controllers/users');
const { loginValid, registValid } = require('../middlewares/validation');

authRouter.post(
  '/signin',
  loginValid,
  login
);

authRouter.post(
  '/signup',
  registValid,
  createUser
);

module.exports = authRouter;
