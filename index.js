const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const engine = require('ejs-mate');
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

app.post('/experiences', async (req, res) => {
    const {title, location, description} = req.body;
    const experience = new Experience({title, location, description});
    try {
        await experience.save();
        res.redirect(`/experiences/${experience._id}`);
    } catch (e) {
        next(e);
    }    
});

app.get('/experiences/:id', async (req, res) => {
    try {
        const experience = await Experience.findById(req.params.id);
        if (!experience) {
            return res.status(404).send('Experience not found');
        }
        res.render('experience/show', { experience });
    } catch (e) {
        next(e);
    }
});

app.get('/experiences/:id/edit', async (req, res) => {
        try {
        const experience = await Experience.findById(req.params.id);
        if (!experience) {
            return res.status(404).send('Experience not found');
        }
        res.render('experience/edit', { experience });
    } catch (e) {
        next(e);
    }
});

app.put('/experiences/:id', async (req, res) => {
    try{
        const { title, location, description, image } = req.body;
        const experience = await Experience.findByIdAndUpdate(req.params.id, { title, location, description, image }, { new: true });
        res.redirect(`/experiences/${experience._id}`);
    } catch (e) {
        next(e);
    }
});

app.delete('/experiences/:id', async (req, res) => {
    try{
        const {id} = req.params;
        await Experience.findByIdAndDelete(id);
        res.redirect('/experiences');
    } catch (e) {
        next(e);
    }  
});

app.use((err, req, res, next) => {
    res.send('Something went wrong');
});

app.listen(3000, () => {
    console.log('Serving data on port 3000')
});