import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './MovieList.css';
import StarRating from "./StarRating";

const MovieList = () => {
    const [movies, setMovies] = useState([]);

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
    }, []);

    return (
        <div className="movie-list">
            {movies.map((movie) => (
                <div key={movie._id} className="movie-item">
                    <h3>{movie.title}</h3>
                    <p>Genre: {movie.genre}</p>
                    <p>Streaming Platforms: {movie.streamingPlatforms.join(', ')}</p>
                    <StarRating initialRating={0} />
                </div>
            ))}
        </div>
    );
};

export default MovieList;
