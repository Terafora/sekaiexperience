const express = require('express');
const router = express.Router({mergeParams: true});
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const Experience = require('../models/experience');
const Review = require('../models/review');

router.post('/', catchAsync(async (req, res) => {
    const experience = await Experience.findById(req.params.id);
    const review = new Review(req.body.review);
    experience.reviews.push(review);
    await review.save();
    await experience.save();
    req.flash('success', 'Created new review!');
    res.redirect(`/experiences/${experience._id}`);
}));

router.delete('/:reviewId', catchAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    await Experience.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Successfully deleted review');
    res.redirect(`/experiences/${id}`);
}));

module.exports = router;