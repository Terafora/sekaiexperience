const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const Experience = require('../models/experience');
const {isLoggedIn, isAuthor} = require('../middleware');

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

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(async (req, res) => {
    const experience = await Experience.findById(req.params.id);
    if (!experience) {
        req.flash('error', 'Cannot find that experience!');
        return res.redirect('/experiences');
    }
    res.render('experience/edit', { experience });
}));

router.put('/:id', isLoggedIn, catchAsync(async (req, res) => {
    const { id } = req.params;
    const experience = await Experience.findById(id);
    if (!experience) {
        req.flash('error', 'Cannot find that experience!');
        return res.redirect('/experiences');
    }
    if (!experience.owner.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to do that!');
        return res.redirect(`/experiences/${id}`);
    }
    const { title, location, description, image } = req.body;
    await Experience.findByIdAndUpdate(id, { title, location, description, image }, { new: true });
    req.flash('success', 'Successfully updated experience!');
    res.redirect(`/experiences/${id}`);
}));


router.delete('/:id', isLoggedIn, isAuthor, catchAsync(async (req, res) => {
    const { id } = req.params;
    const experience = await Experience.findById(id);
    if (!experience) {
        req.flash('error', 'Cannot find that experience!');
        return res.redirect('/experiences');
    }
    await Experience.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted experience');
    res.redirect('/experiences');
}));

module.exports = router;
