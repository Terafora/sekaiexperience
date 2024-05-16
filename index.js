const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const Experience = require('./models/experience');

mongoose.connect('mongodb://localhost:27017/sekai-experience');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once("open", () => {
    console.log("Database connected");
})

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.get('/', (req, res) => {
    res.render('home')
});

app.get('/experiences', async (req, res) => {
    const experiences = await Experience.find({});
    res.render('experience/index', {experiences});
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
    } catch (err) {
        console.error(err);
        res.send('Error saving experience');
    }    
});

app.get('/experiences/:id', async (req, res) => {
    try {
        const experience = await Experience.findById(req.params.id);
        if (!experience) {
            return res.status(404).send('Experience not found');
        }
        res.render('experience/show', { experience });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/experiences/:id/edit', async (req, res) => {
        try {
        const experience = await Experience.findById(req.params.id);
        if (!experience) {
            return res.status(404).send('Experience not found');
        }
        res.render('experience/edit', { experience });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

app.put('/experiences/:id', async (req, res) => {
    const {title, location, description} = req.body;
    const experience = await Experience.findByIdAndUpdate(req.params.id, {title, location, description}, {new: true});
    res.redirect(`/experiences/${experience._id}`);
});



app.listen(3000, () => {
    console.log('Serving data on port 3000')
});