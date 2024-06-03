const Movie = require('../models/movie.model');

exports.updateRank = async (req, res) => {
    const { id } = req.params;
    const { rank } = req.body;
    try {
        const movie = await Movie.findByIdAndUpdate(id, { rank }, { new: true });
        res.json(movie);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};