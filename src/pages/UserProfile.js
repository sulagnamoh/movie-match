import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UserProfile.css';

const UserProfile = () => {
    const [user, setUser] = useState({ email: '', name: '' });
    const [favoriteMovies, setFavoriteMovies] = useState([    ]);
    const [newMovie, setNewMovie] = useState({ title: '', rating: '', genre: '', platform: '' });
    const [errors, setErrors] = useState({title: '', rating: '', genre: '', platform: '' });
    const validGenres = ['Action', 'Horror', 'Comedy'];
    const validPlatforms = ['Netflix', 'Hulu', 'Disney+', 'Amazon Prime'];
    useEffect(() => {
        // Retrieve user data from localStorage
        const userData = JSON.parse(localStorage.getItem('user'));
        if (userData) {
            setUser(userData);
        }
    }, []);

    const goToFavorites = () => {
        window.location.href = './pages/Favorites'; // Adjust the path as needed
    };
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    };
    const validateInputs = async () => {
        let valid = true;
        let invalidInput = { title: '', rating: '', genre: '', platform: '' };

        const normalizedGenre = newMovie.genre.toLowerCase();
        const normalizedPlatform = newMovie.platform.toLowerCase();
        const validGenresLower = validGenres.map(genre => genre.toLowerCase());
        const validPlatformsLower = validPlatforms.map(platform => platform.toLowerCase());
        
        if (!newMovie.title) 
        {
            invalidInput.title = 'Title is required.';
            valid = false;
        }
        if (!newMovie.rating || newMovie.rating < 1 || newMovie.rating > 5) 
        {
            invalidInput.rating = 'Rating must be between 1 and 5.';
            valid = false;
        }

        
        if (!validGenresLower.includes(normalizedGenre)) {
            invalidInput.genre = 'Genre must be Action, Horror, or Comedy.';
            valid = false;
        }

        if (!validPlatformsLower.includes(normalizedPlatform)) {
            invalidInput.platform = 'Platform must be Hulu, Netflix, Amazon Prime, or Disney+.';
            valid = false;
        }

        setErrors(invalidInput);
        return valid;
    };
   

    const addMovie = async() => {
        if (validateInputs()) {
            try{
                const response = await axios.get(`http://localhost:3000/api/movies?title=${newMovie.title}`);
            const existingMovie = response.data.find(movie => movie.title.toLowerCase() === newMovie.title.toLowerCase());
            if (existingMovie) {
                setErrors({ title: 'Movie already included.' });
                return;
            }

                const capitalizedGenre = capitalizeFirstLetter(newMovie.genre);
                const capitalizedPlatform = capitalizeFirstLetter(newMovie.platform);
                const capitalizedTitle = capitalizeFirstLetter(newMovie.title);
                await axios.post('http://localhost:3000/api/movies',{
                    title: capitalizedTitle,
                    genre: capitalizedGenre,
                    streamingPlatforms: [capitalizedPlatform]
                });
                setFavoriteMovies([...favoriteMovies, { ...newMovie, genre: capitalizedGenre, platform: capitalizedPlatform, rating: parseFloat(newMovie.rating) }]);
                setNewMovie({ title: '', rating: '', genre: '', platform: '' });
            } catch (error) {
                console.error('Error adding movies:' , error);
            }
        }
    };

    const inputChange = (n) => {
        const { name, value } = n.target;
        setNewMovie(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <div className="profile-page">
            <h1>{user.name}'s Profile</h1> {/* Display the user's name */}
            <button onClick={goToFavorites}>Favorite Movies</button>
            <ul>
                {favoriteMovies.map((movie, index) => (
                    <li key={index}>
                        {movie.title} - Rating: {movie.rating} - Genre: {movie.genre} - Platform: {movie.platform}
                    </li>
                ))}
            </ul>
            <div className="add-movie">
            {errors.title && <div className='error'>{errors.title}</div>}
                <input
                    type="text"
                    name="title"
                    placeholder="Movie Title"
                    value={newMovie.title}
                    onChange={inputChange}/>
                    
                {errors.rating && <div className='error'>{errors.rating}</div>}
                <select
                    name="rating"
                    value={newMovie.rating}
                    onChange={inputChange}>
                    <option value="">Select Rating</option>
                    {[0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5].map(num => (
                        <option key={num} value={num}>{num}</option>
                    ))}
                </select>
                
                {errors.genre && <div className='error'>{errors.genre}</div>}
                <input
                    type="text"
                    name="genre"
                    placeholder="Genre"
                    value={newMovie.genre}
                    onChange={inputChange} />
                
                {errors.platform && <div className='error'>{errors.platform}</div>}
                <input
                    type="text"
                    name="platform"
                    placeholder="Streaming Platform"
                    value={newMovie.platform}
                    onChange={inputChange}/>
                
                <button onClick={addMovie}>Add Movie</button>
            </div>
        </div>
    );
};

export default UserProfile;
