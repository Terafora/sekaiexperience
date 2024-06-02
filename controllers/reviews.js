const Experience = require('../models/experience');
const Review = require('../models/review');

module.exports.createReview = async (req, res) => {
    const experience = await Experience.findById(req.params.id);
    const review = new Review(req.body.review);
    review.owner = req.user._id;
    experience.reviews.push(review);
    await review.save();
    await experience.save();
    req.flash('success', 'Created new review!');
    res.redirect(`/experiences/${experience._id}`);
};

module.exports.deleteReview = async (req, res) => {
    const { id, reviewId } = req.params;
    await Experience.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Successfully deleted review');
    res.redirect(`/experiences/${id}`);
};