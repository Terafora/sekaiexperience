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
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum?',
            images: [
                {
                    url: 'https://res.cloudinary.com/djrh6ryfr/image/upload/v1717420552/SekaiExperience/qzboqiyxiq0tzzpc0jnk.webp',
                    filename: 'SekaiExperience/qzboqiyxiq0tzzpc0jnk'
                },
                {
                    url: 'https://res.cloudinary.com/djrh6ryfr/image/upload/v1717420928/SekaiExperience/sefdzqnsao1dhundiqyw.jpg',
                    filename: 'SekaiExperience/sefdzqnsao1dhundiqyw'
                },
                {
                    url: 'https://res.cloudinary.com/djrh6ryfr/image/upload/v1717420928/SekaiExperience/xykgc0l4gs4piiuabmip.png',
                    filename: 'SekaiExperience/xykgc0l4gs4piiuabmip'
                },
                {
                    url: 'https://res.cloudinary.com/djrh6ryfr/image/upload/v1717420928/SekaiExperience/nv7nri0pr0semyytuvm0.png',
                    filename: 'SekaiExperience/nv7nri0pr0semyytuvm0',
                },
                {
                    url: 'https://res.cloudinary.com/djrh6ryfr/image/upload/v1717420929/SekaiExperience/d8xumg9qsdvcrnhfmqda.png',
                    filename: 'SekaiExperience/d8xumg9qsdvcrnhfmqda'
                }
            ]
        })
        await exp.save();
    }
};

seedDB().then(()=> {
    mongoose.connection.close();
});