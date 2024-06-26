const mongoose = require("mongoose");
require('dotenv').config();
const url = process.env.MONGODB_URL;

mongoose.connect(url)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log('Error connecting to MongoDB:', err));

const newSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: false
    },
});

const collection = mongoose.model("collection", newSchema);

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    streamingPlatforms: {
        type: [String], 
        required: true
    },

    ratings: {
        type: [Number], 
        default: []
    },
    averageRating: {
        type: Number,
        default: 0
    },
});
const movieCollection = mongoose.model("movies", movieSchema);

const ratingSchema = new mongoose.Schema({
    userID: {
        type: String,
        required: false
    },
    movieID: {
        type: String,
        required: false
    },
    rating: {
        type: Number,  
        required: false
    },
});

const ratingCollection = mongoose.model("user-datas", ratingSchema);

module.exports = { collection, movieCollection, ratingCollection };
