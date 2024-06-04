import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Favorites.css';

const Favorites = () => {
    const [ratingsData, setRatingsData] = useState([]);
    const [moviesData, setMoviesData] = useState([]);

    useEffect(() => {
        const fetchUserRatings = async () => {
            try {
                const user = JSON.parse(localStorage.getItem('user'));
                if (user && user._id) {
                    console.log(`Fetching ratings for user: ${user._id}`);
                    const { data } = await axios.get(`http://localhost:3000/api/user-ratings/${user._id}`);
                    setRatingsData(data);
                }
            } catch (error) {
                console.error('Could not fetch user ratings:', error);
            }
        };

        const fetchAllMovies = async () => {
            try {
                const { data } = await axios.get('http://localhost:3000/api/movies');
                setMoviesData(data);
            } catch (error) {
                console.error('Could not fetch movies:', error);
            }
        };

        fetchUserRatings();
        fetchAllMovies();
    }, []);

    const mergeRatingsWithMovies = () => {
        return ratingsData
            .map(rating => {
                const matchedMovie = moviesData.find(movie => movie._id === rating.movieID);
                if (matchedMovie) {
                    return { ...matchedMovie, userRating: rating.rating };
                }
                return null;
            })
            .filter(movie => movie !== null); // Filter out unmatched movies
    };

    const ratedMovies = mergeRatingsWithMovies();

    return (
        <div className="favorites">
            <h2>Favorites</h2>
            {ratedMovies.length > 0 ? (
                <ul>
                    {ratedMovies.map(movie => (
                        <li key={movie._id}>
                            <h3>{movie.title}</h3>
                            <p>Genre: {movie.genre}</p>
                            <p>User Rating: {movie.userRating}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No ratings available.</p>
            )}
        </div>
    );
};

export default Favorites;
