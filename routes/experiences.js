const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const Experience = require('../models/experience');

router.get('/', catchAsync(async (req, res) => {
    const experiences = await Experience.find({});
    res.render('experience/index', { experiences });
}));

router.get('/new', (req, res) => {
    res.render('experience/new');
});

router.post('/', catchAsync(async (req, res) => {
    const { title, location, description, image } = req.body;
    const experience = new Experience({ title, location, description, image });
    await experience.save();
    res.redirect(`/experiences/${experience._id}`);
}));

router.get('/:id', catchAsync(async (req, res) => {
    const experience = await Experience.findById(req.params.id).populate('reviews');
    res.render('experience/show', { experience });
}));

router.get('/:id/edit', catchAsync(async (req, res) => {
    const experience = await Experience.findById(req.params.id);
    if (!experience) {
        return res.status(404).send('Experience not found');
    }
    res.render('experience/edit', { experience });
}));

router.put('/:id', catchAsync(async (req, res) => {
    const { title, location, description, image } = req.body;
    const experience = await Experience.findByIdAndUpdate(req.params.id, { title, location, description, image }, { new: true });
    res.redirect(`/experiences/${experience._id}`);
}));

router.delete('/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    await Experience.findByIdAndDelete(id);
    res.redirect('/experiences');
}));

module.exports = router;
