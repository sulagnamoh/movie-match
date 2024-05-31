const mongoose = require('mongoose')

const Schema = mongoose.Schema

const eventSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    platform: {
        type: Number,
        required: false
    },
    rank: {
        type: Number,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Movie', movieSchema)