const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const Experience = require('../models/experience');
const {isLoggedIn, isAuthor} = require('../middleware');
const experiences = require('../controllers/experiences');
const e = require('connect-flash');

router.get('/', catchAsync(experiences.index));

router.get('/new', isLoggedIn, experiences.renderNewForm);

router.post('/', isLoggedIn, catchAsync(experiences.createExperience));

router.get('/:id', catchAsync(experiences.showExperience));

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(experiences.renderEditForm));

router.put('/:id', isLoggedIn, catchAsync(experiences.updateExperience));

router.delete('/:id', isLoggedIn, catchAsync(experiences.deleteExperience));

module.exports = router;
