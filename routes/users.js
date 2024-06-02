const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');
const users = require('../controllers/users');
const { isLoggedIn, storeReturnTo } = require('../middleware');
const review = require('../models/review');

router.get('/register', users.renderRegister);

router.post('/register', catchAsync(users.register));

router.get('/login', storeReturnTo, users.renderLogin);

router.post('/login', storeReturnTo, passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), users.login);

router.get('/logout', users.logout);

module.exports = router;
