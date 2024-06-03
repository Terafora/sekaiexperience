const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const Experience = require('../models/experience');
const {isLoggedIn, isAuthor} = require('../middleware');
const experiences = require('../controllers/experiences');
const e = require('connect-flash');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.route('/')
    .get(catchAsync(experiences.index))
    // .post(isLoggedIn, catchAsync(experiences.createExperience));
    .post(upload.array('image'), (req, res) => {
        console.log(req.body, req.files);
    });

router.get('/new', isLoggedIn, experiences.renderNewForm);

router.route('/:id')
    .get(catchAsync(experiences.showExperience))
    .put(isLoggedIn, isAuthor, catchAsync(experiences.updateExperience))
    .delete(isLoggedIn, isAuthor, catchAsync(experiences.deleteExperience));

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(experiences.renderEditForm));

module.exports = router;
