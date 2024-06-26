import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './search.css';
import StarRating from './StarRating';

export function SearchFeat() {
    const [movies, setMovies] = useState([]);
    const [searchResults, setSearchResults] = useState("");
    const [movieRatings, setMovieRatings] = useState({});
    const [user, setUser] = useState(null);
    
    const [isComedyChecked, setIsComedyChecked] = useState(false);
    const [isActionChecked, setIsActionChecked] = useState(false);
    const [isHorrorChecked, setIsHorrorChecked] = useState(false);
    const [isHuluChecked, setIsHuluChecked] = useState(false);
    const [isNetflixChecked, setIsNetflixChecked] = useState(false);
    const [isDisneyChecked, setIsDisneyChecked] = useState(false);
    const [isAmazonPrimeChecked, setIsAmazonPrimeChecked] = useState(false);

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
            if (userData) {
                setUser(userData);
            }
        } catch (error) {
            console.error('Error loading data from localStorage:', error);
        }
    }, []);

    const handleRateChange = (movieID, newRating) => {
        setMovieRatings(lastRatings => ({
            ...lastRatings, [movieID]: newRating
        }));
    };

    const handleConfirmRating = async (movieId) => {
        if (!user || !user._id) {
            alert('Please log in to rate movies.');
            return;
        }

        const rating = movieRatings[movieId];
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

    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        if (name === 'comedy') {
            setIsComedyChecked(checked);
        } else if (name === 'action') {
            setIsActionChecked(checked);
        } else if (name === 'horror') {
            setIsHorrorChecked(checked);
        } else if (name === 'netflix') {
            setIsNetflixChecked(checked);
        } else if (name === 'hulu') {
            setIsHuluChecked(checked);
        } else if (name === 'disney') {
            setIsDisneyChecked(checked);
        } else if (name === 'amazonPrime') {
            setIsAmazonPrimeChecked(checked);
        }
    };

    const filteredMovies = movies
        .filter((movie) => {
            let genreMatch = true;
            if (isComedyChecked || isActionChecked || isHorrorChecked) {
                genreMatch = (isComedyChecked && movie.genre === 'Comedy') ||
                    (isActionChecked && movie.genre === 'Action') ||
                    (isHorrorChecked && movie.genre === 'Horror');
            }
            let platformMatch = true;
            if (isNetflixChecked || isHuluChecked || isDisneyChecked || isAmazonPrimeChecked) {
                platformMatch = (isNetflixChecked && movie.streamingPlatforms.includes('Netflix')) ||
                    (isHuluChecked && movie.streamingPlatforms.includes('Hulu')) ||
                    (isDisneyChecked && movie.streamingPlatforms.includes('Disney+')) ||
                    (isAmazonPrimeChecked && movie.streamingPlatforms.includes('Amazon Prime'));
            }
            return genreMatch && platformMatch;
        })
        .filter((movie) => movie.title.toLowerCase().includes(searchResults.toLowerCase()));

    return (
        <div className='search-and-nav'>
            <div style={{ display: 'flex', alignItems: 'center', marginLeft: '20px', marginRight: '5px' }}>
                <div style={{ fontWeight: 'bold', marginRight: '5px' }}>Genres:</div>
                <label style={{ marginLeft: '5px', marginRight: '10px' }}>
                    <input
                        type="checkbox"
                        name="comedy"
                        checked={isComedyChecked}
                        onChange={handleCheckboxChange}
                    />
                    Comedy 🤣
                </label>
                <label style={{ marginRight: '10px' }}>
                    <input
                        type="checkbox"
                        name="action"
                        checked={isActionChecked}
                        onChange={handleCheckboxChange}
                    />
                    Action 🏃
                </label>
                <label style={{ marginRight: '10px' }}>
                    <input
                        type="checkbox"
                        name="horror"
                        checked={isHorrorChecked}
                        onChange={handleCheckboxChange}
                    />
                    Horror 😱
                </label>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginLeft: '20px', marginRight: '5px' }}>
                <div style={{ fontWeight: 'bold', marginRight: '5px' }}>Streaming Platforms:</div>
                <label style={{ marginLeft: '5px', marginRight: '10px' }}>
                    <input
                        type="checkbox"
                        name="netflix"
                        checked={isNetflixChecked}
                        onChange={handleCheckboxChange}
                    />
                    Netflix
                </label>
                <label style={{ marginRight: '10px' }}>
                    <input
                        type="checkbox"
                        name="hulu"
                        checked={isHuluChecked}
                        onChange={handleCheckboxChange}
                    />
                    Hulu
                </label>
                <label style={{ marginRight: '10px' }}>
                    <input
                        type="checkbox"
                        name="disney"
                        checked={isDisneyChecked}
                        onChange={handleCheckboxChange}
                    />
                    Disney+
                </label>
                <label style={{ marginRight: '10px' }}>
                    <input
                        type="checkbox"
                        name="amazonPrime"
                        checked={isAmazonPrimeChecked}
                        onChange={handleCheckboxChange}
                    />
                    Amazon Prime
                </label>
            </div>
            <input type="text" placeholder='Search' className='search' onChange={e => setSearchResults(e.target.value)} />
            <div className="movie-list">
                {filteredMovies.map((movie) => (
                    <div key={movie._id} className="listItem">
                        <div className="movie-box">
                            <h2>{movie.title}</h2>
                            <p>Genre: {movie.genre}</p>
                            <p>Streaming Platforms: {movie.streamingPlatforms.join(', ')}</p>
                            <StarRating
                                initialRating={movieRatings[movie._id] || 0}
                                onRatingChange={(newRating) => handleRateChange(movie._id, newRating)}
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
        </div>
    );
}

export default SearchFeat;
