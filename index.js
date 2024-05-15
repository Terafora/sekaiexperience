const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
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

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/makeexperience', async (req, res) => {
    const exp = new Experience({
        title: 'Your First Experience',
        location: 'Somewhere in the world',
        description: 'Something life changing.' });
        await exp.save();
        res.send(exp);
})

app.listen(3000, () => {
    console.log('Serving data on port 3000')
})