const mongoose = require('mongoose');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers');
const Experience = require('../models/experience');

mongoose.connect('mongodb://localhost:27017/sekai-experience');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once("open", () => {
    console.log("Database connected");
})

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Experience.deleteMany({});
    for(let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const exp = new Experience({
            owner: "66571b98ffa2ff1dcbbf5e49",
            title: `${sample(descriptors)}, ${sample(places)}`,
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            image: 'https://source.unsplash.com//collection/483251',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum?',
        })
        await exp.save();
    }
};

seedDB().then(()=> {
    mongoose.connection.close();
});