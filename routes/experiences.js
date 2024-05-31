const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const Experience = require('../models/experience');
const {isLoggedIn} = require('../middleware');

router.get('/', catchAsync(async (req, res) => {
    const experiences = await Experience.find({});
    res.render('experience/index', { experiences });
}));

router.get('/new', isLoggedIn, (req, res) => {
    res.render('experience/new');
});

router.post('/', isLoggedIn, catchAsync(async (req, res) => {
    const { title, location, description, image } = req.body;
    const experience = new Experience({ title, location, description, image });
    experience.owner = req.user._id;
    await experience.save();
    req.flash('success', 'Successfully made a new experience!');
    res.redirect(`/experiences/${experience._id}`);
}));

router.get('/:id', catchAsync(async (req, res) => {
    const experience = await Experience.findById(req.params.id).populate('reviews').populate('owner');
    if (!experience) {
        req.flash('error', 'Cannot find that experience!');
        return res.redirect('/experiences');
    }
    res.render('experience/show', { experience });
}));

router.get('/:id/edit', isLoggedIn, catchAsync(async (req, res) => {
    const experience = await Experience.findById(req.params.id);
    if (!experience) {
        req.flash('error', 'Cannot find that experience!');
        return res.redirect('/experiences');
    }
    res.render('experience/edit', { experience });
}));

router.put('/:id', isLoggedIn, catchAsync(async (req, res) => {
    const { title, location, description, image } = req.body;
    const experience = await Experience.findByIdAndUpdate(req.params.id, { title, location, description, image }, { new: true });
    req.flash('success', 'Successfully updated experience!');
    res.redirect(`/experiences/${experience._id}`);
}));

router.delete('/:id', isLoggedIn, catchAsync(async (req, res) => {
    const { id } = req.params;
    await Experience.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted experience');
    res.redirect('/experiences');
}));

module.exports = router;
