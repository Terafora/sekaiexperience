const Experience = require('../models/experience');

module.exports.index = async (req, res) => {
    const experiences = await Experience.find({});
    res.render('experience/index', { experiences });
};

module.exports.renderNewForm = (req, res) => {
    res.render('experience/new');
};

module.exports.createExperience = async (req, res) => {
    const { title, location, description, image } = req.body;
    const experience = new Experience({ title, location, description, image });
    experience.owner = req.user._id;
    await experience.save();
    req.flash('success', 'Successfully made a new experience!');
    res.redirect(`/experiences/${experience._id}`);
};

module.exports.showExperience = async (req, res) => {
    const experience = await Experience.findById(req.params.id).populate({
        path: 'reviews',
        populate: {
            path: 'owner'
        }
    }).populate('owner');
    if (!experience) {
        req.flash('error', 'Cannot find that experience!');
        return res.redirect('/experiences');
    }
    res.render('experience/show', { experience });
};

module.exports.renderEditForm = async (req, res) => {
    const experience = await Experience.findById(req.params.id);
    if (!experience) {
        req.flash('error', 'Cannot find that experience!');
        return res.redirect('/experiences');
    }
    res.render('experience/edit', { experience });
};

module.exports.updateExperience = async (req, res) => {
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
};

module.exports.deleteExperience = async (req, res) => {
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
    await Experience.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted experience');
    res.redirect('/experiences');
};