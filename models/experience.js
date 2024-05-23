const mongoose = require('mongoose');
const review = require('./review');
const Schema = mongoose.Schema;

const ExperienceSchema = new Schema({
    title: String,
    image: String,
    location: String,
    description: String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
});

ExperienceSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        })
    }
});

module.exports = mongoose.model('Experience', ExperienceSchema);