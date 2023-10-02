const userRouter = require('express').Router();
const {
  updateProfile, getCurrentUser
} = require('../controllers/users');
const { updateUserValid } = require('../middlewares/validation');

userRouter.get('/me', getCurrentUser);

userRouter.patch('/me', updateUserValid, updateProfile);

module.exports = userRouter;
