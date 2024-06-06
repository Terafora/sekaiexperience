# Sekai Experience

![Screenshot from 2024-06-06 10-03-06](https://github.com/Terafora/sekaiexperience/assets/144109245/e78fe9e6-edb0-4377-86d8-be98fd836cf2)

## About

Sekai Experience is a platform for users to share chances for cross cultural sharing and charitable work opportunities. Anyone can post a possible "experience" from sharing a morning cup of coffee in an attempt to bring communities together, to organising charitable work or peaceful protests.

In a world where technology seems to divide us more and more, Sekai Experience aims to have technology help bring us closer together.

## Technologies

- HTML / EJS / CSS / Bootstrap
- JavaScript / NodeJS / Express / EJS - Mate
- MongoDB / Mongoose / Express-Mongo-Sanitize / Connect-Mongo / MongoDB Atlas
- Passport / Passport-Local / Passport-Local Mongoose
- Figma / PhotoShop
- Starability
- Cloudinary
- Multer / multer-storage-cloudinary
- Mapbox
- Helmet

## Design

The design of the application for the moment is a little spartan as it is currently only sporting basic BootStrap 5 classes outside of the home screen as it was created with the intention of functionality over style to begin with so that a product could be shown.

Going forward a design overhaul will be going into this application so what exists in version 1.0 will vary wildly from versions going forward.

## Features

### Home Screen

![Screenshot from 2024-06-06 10-03-06](https://github.com/Terafora/sekaiexperience/assets/144109245/e78fe9e6-edb0-4377-86d8-be98fd836cf2)

- The home screen features a design closer to the end goal of what the Sekai Experience will eventually be. A minimalist design with clear and minimalistic components for clear and easy navigation from the home page.

### Experiences Screen

![Screenshot from 2024-06-06 10-06-52](https://github.com/Terafora/sekaiexperience/assets/144109245/88834612-4fc8-42a9-a510-15ddc1e98c3a)

- The Experiences page shows all of the available experiences across the world in one location/
- The cluster map at the top of the screen is a visual representation of all available experiences and can be interacted with to drill down to find the right experience for you.
  - Clicking on a singular event on the cluster map will bring up the title and a truncated version of the details of the experience. clicking the embedded link will take users directly to the details page of said experiences.
- The list below allows users to find the experience they're after in a more traditional way in case they don't want to use the cluster map.
- "Add New Experience" button allows logged in users to create new experiences to share with others around the world.

### Details Page

![Screenshot from 2024-06-06 10-16-59](https://github.com/Terafora/sekaiexperience/assets/144109245/8101c24b-961e-4cad-b28d-070e2cd18229)

- The details page allows users to see the details of the various experiences available and reviews by other users.
- If users are logged in and on experiences they've created they can edit and delete the details of these experiences.
- The same is true of reviews across the site where users can update and delete their own reviews.
- User reviews are done directly from this page and users can leave a star rating along with their review.
- The top of the page features an interactable map that shows the general location of the experience which can be zoomed in and out on as well as moved around.
- If multiple images have been uploaded for an experience then the image window above the details section on the card will become a carousel and automatically begin to flick through the images while also allowing for user control of the carousel.

### Login/Register Page

![Screenshot from 2024-06-06 10-27-30](https://github.com/Terafora/sekaiexperience/assets/144109245/0617a3b5-5870-462a-a231-3ea5ed74e2e4)

- A page which allows users to login or register if they don't currently have an account.

### New Experience Page

![Screenshot from 2024-06-06 10-31-37](https://github.com/Terafora/sekaiexperience/assets/144109245/55a94363-8b22-4faf-8f26-2ca756821393)

- This page allows users to create their own experiences to share with others on Sekai Experience.
- Images are uploaded to Cloudinary and called back down when viewed on other pages.
- All other information is held on a Mongo database on MongoDB Atlas

### On Their Way

- Server side verfication
I was having some issues implementing this, so I'll be returning to this to make the project more secure.

- A pagify feture is still to be added to the index page to provide better navigation.

## Testing

- Documentation coming soon

## Deployment

- Sekai Experience was deployed on Heroku from it's main Github branch.
- The database is a MongoDB Atlas where details of experiences are held.
- Images are hosted on Cloudinary.

## Bugs

- Various style oddities which are noted and will be ironed out once a more robust design is implemented.
- More TBC.

## Credits

- [Charlotte Stone](https://www.linkedin.com/in/charlotte-stone-web/)
- All technologies named above
- Images taken from:
  - [Wikipedia.org](https://www.wikipedia.org/)
  - [Unsplash](https://unsplash.com/)

## Where to find more of my work 👇

- [LinkedIn](https://www.linkedin.com/in/charlotte-stone-web/)
- [Github](https://github.com/Terafora)
- [Portfolio](https://terafora.github.io/Portfolio-Site/)
- [freeCodeCamp](https://www.freecodecamp.org/japanese/news/author/charlotte-stone/)
