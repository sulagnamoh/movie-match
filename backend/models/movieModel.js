const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    name: String,
    genre: String,
    platform: String,
    rank: Number
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;