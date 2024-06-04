import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './MovieList.css';
import StarRating from './StarRating';

const MovieList = () => {
    const [movies, setMovies] = useState([]);
    const [user, setUser] = useState(null);
    const [ratings, setRatings] = useState({});

    useEffect(() => {
        async function fetchMovies() {
            try {
                const response = await axios.get('http://localhost:3000/api/movies');
                setMovies(response.data);
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        }

        fetchMovies();

        try {
            const userData = JSON.parse(localStorage.getItem('user'));
            console.log('User data from localStorage:', userData);
            if (userData) {
                setUser(userData);
            }
        } catch (error) {
            console.error('Error loading data from localStorage:', error);
        }
    }, []);

    const handleRatingChange = (movieId, newRating) => {
        console.log(`Rating changed for movie ${movieId}: ${newRating}`);
        const newRatings = { ...ratings, [movieId]: newRating };
        console.log('New ratings:', newRatings);
        setRatings(newRatings);
        localStorage.setItem('ratings', JSON.stringify(newRatings));
    };

    const handleConfirmRating = async (movieId) => {
        console.log('User data before confirming rating:', user);
        if (!user || !user._id) {
            alert('Please log in to rate movies.');
            return;
        }

        const rating = ratings[movieId];
        if (rating === undefined || rating === null) {
            alert('Please select a rating before confirming.');
            return;
        }
        
        try {
            const response = await axios.post('http://localhost:3000/user-data', {
                userID: user._id,
                movieID: movieId,
                rating: rating,
            });
            alert(`You rated this movie ${rating} stars.`);
            console.log('Rating saved:', response.data);
        } catch (error) {
            console.error('Error saving rating:', error);
            alert('Error saving rating. Please try again.');
        }
    };

    return (
        <div className="movie-list">
            {movies.map((movie) => (
                <div key={movie._id} className="movie-box">
                    <h3>{movie.title}</h3>
                    <p>Genre: {movie.genre}</p>
                    <p>Streaming Platforms: {movie.streamingPlatforms.join(', ')}</p>
                    <div className="rating-section">
                        <StarRating
                            initialRating={ratings[movie._id] || 0}
                            onRatingChange={(newRating) => handleRatingChange(movie._id, newRating)}
                        />
                        <button
                            onClick={() => handleConfirmRating(movie._id)}
                            className="confirm-rating-btn"
                        >
                            Confirm Rating
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MovieList;
