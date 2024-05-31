const mongoose = require('mongoose')

const Schema = mongoose.Schema

const eventSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    genre: {
        type: String,
        required: true
    },
    platform: {
        type: String,
        required: true
    },
    rank: {
        type: Number,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Movie', movieSchema)