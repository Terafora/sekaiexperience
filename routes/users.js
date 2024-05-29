const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');

router.get('/register', (req, res) => {
    res.render('users/register');
});

router.post('/register', catchAsync (async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({email, username});
        const registeredUser = await User.register(user, password);
        req.flash('success', 'Welcome to Sekai Experience!');
        res.redirect('/experiences');
    } catch(e) {
        req.flash('error', e.message);
        res.redirect('/register');
    }
}));

router.get('/login', (req, res) => {
    res.render('users/login');
});

router.post('/login', passport.authenticate('local', {failureFlash: true, failureRedirect: '/login'}),(req, res) => {
    req.flash('success', 'Welcome back!');
    res.redirect('/experiences');
});

router.get('/logout', (req, res, next) => {
    req.logout(function(err){
        if(err) {
            req.flash('error', 'Cannot log out');
            return next(err);
        }
        req.flash('success', 'Goodbye!');
        res.redirect('/experiences');
    })    
});

module.exports = router;