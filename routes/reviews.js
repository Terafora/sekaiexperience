const express = require('express');
const router = express.Router({mergeParams: true});
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const Experience = require('../models/experience');
const Review = require('../models/review');
const {isLoggedIn, isReviewAuthor} = require('../middleware');

router.post('/', isLoggedIn, isReviewAuthor, catchAsync(async (req, res) => {
    const experience = await Experience.findById(req.params.id);
    const review = new Review(req.body.review);
    experience.reviews.push(review);
    review.owner = req.user._id;
    await review.save();
    await experience.save();
    req.flash('success', 'Created new review!');
    res.redirect(`/experiences/${experience._id}`);
}));

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    await Experience.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Successfully deleted review');
    res.redirect(`/experiences/${id}`);
}));

module.exports = router;