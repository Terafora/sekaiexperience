const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const engine = require('ejs-mate');
const catchAsync = require('./utils/catchAsync');
const ExpressError = require('./utils/ExpressError');
const methodOverride = require('method-override');
const Experience = require('./models/experience');

mongoose.connect('mongodb://localhost:27017/sekai-experience');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once("open", () => {
    console.log("Database connected");
})

const app = express();

app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.get('/', (req, res) => {
    res.render('home')
});

app.get('/experiences', async (req, res) => {
    try {
        const experiences = await Experience.find({});
        res.render('experience/index', {experiences});
    } catch (e) {
        next(e);
    }
});

app.get('/experiences/new', (req, res) => {
    res.render('experience/new');
});

app.post('/experiences', catchAsync(async (req, res) => {
    console.log(result);
    const {title, location, description, image} = req.body;
    const experience = new Experience({title, location, description, image});
    await experience.save();
    res.redirect(`/experiences/${experience._id}`);
}));

app.get('/experiences/:id', catchAsync(async (req, res) => {
    const experience = await Experience.findById(req.params.id);
    if (!experience) {
        return res.status(404).send('Experience not found');
    }
    res.render('experience/show', { experience });
}));

app.get('/experiences/:id/edit', catchAsync(async (req, res) => {
    const experience = await Experience.findById(req.params.id);
    if (!experience) {
        return res.status(404).send('Experience not found');
    }
    res.render('experience/edit', { experience });
}));

app.put('/experiences/:id', catchAsync(async (req, res) => {
        const { title, location, description, image } = req.body;
        const experience = await Experience.findByIdAndUpdate(req.params.id, { title, location, description, image }, { new: true });
        res.redirect(`/experiences/${experience._id}`);
}));

app.delete('/experiences/:id', catchAsync(async (req, res) => {
        const {id} = req.params;
        await Experience.findByIdAndDelete(id);
        res.redirect('/experiences');
}));

app.all('*', (req, res, next) => {
    next(new ExpressError('Page not found', 404));
});

app.use((err, req, res, next) => {
    const { statusCode = 500} = err;
    if (!err.message) err.message = 'Something went wrong';
    res.status(statusCode).render('error', { err });
});

app.listen(3000, () => {
    console.log('Serving data on port 3000')
});