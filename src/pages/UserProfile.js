import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UserProfile.css';

const UserProfile = () => {
    const [user, setUser] = useState({ email: '', name: '' });
    const [favoriteMovies, setFavoriteMovies] = useState([
        { title: 'Inception', rating: 5, genre: 'Sci-Fi', platform: 'Netflix' },
        { title: 'Interstellar', rating: 4.5, genre: 'Sci-Fi', platform: 'Hulu' },
        { title: 'The Dark Knight', rating: 5, genre: 'Action', platform: 'Disney+' }
    ]);
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

    const validateInputs = () => {
        let valid = true;
        let invalidInput = { title: '', rating: '', genre: '', platform: '' };
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
        if (!validGenres.includes(newMovie.genre))
        {
            invalidInput.genre = 'Genre must be action, horror, and or comedy.';
            valid = false;
        }
        if (!validPlatforms.includes(newMovie.platform))
        {
            invalidInput.platform = 'Platform must be Hulu, Netflix, and or Disney+.';
            valid = false;
        }
        setErrors(invalidInput);
        return valid;
    };

    const addMovie = async() => {
        if (validateInputs()) {
            try{
                const response = await axios.post('http://localhost:3000/api/movies',{
                    title: newMovie.title,
                    genre: newMovie.genre,
                    streamingPlatforms: [newMovie.platform] 
                });
                setFavoriteMovies([...favoriteMovies, {...newMovie, rating: parseFloat(newMovie.rating) }]);
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
            <h1>{user.name}</h1> {/* Display the user's name */}
            <button onClick={goToFavorites}>Favorite Movies</button>
            <ul>
                {favoriteMovies.map((movie, index) => (
                    <li key={index}>
                        {movie.title} - Rating: {movie.rating} - Genre: {movie.genre} - Platform: {movie.platform}
                    </li>
                ))}
            </ul>
            <div className="add-movie">
                <input
                    type="text"
                    name="title"
                    placeholder="Movie Title"
                    value={newMovie.title}
                    onChange={inputChange}/>
                    {errors.title && <div className='error'>{errors.title}</div>}

                <select
                    name="rating"
                    value={newMovie.rating}
                    onChange={inputChange}>
                    <option value="">Select Rating</option>
                    {[0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5].map(num => (
                        <option key={num} value={num}>{num}</option>
                    ))}
                </select>
                {errors.rating && <div className='error'>{errors.rating}</div>}
                
                <input
                    type="text"
                    name="genre"
                    placeholder="Genre"
                    value={newMovie.genre}
                    onChange={inputChange} />
                {errors.genre && <div className='error'>{errors.genre}</div>}

                <input
                    type="text"
                    name="platform"
                    placeholder="Streaming Platform"
                    value={newMovie.platform}
                    onChange={inputChange}/>
                {errors.platform && <div className='error'>{errors.platform}</div>}
                <button onClick={addMovie}>Add Movie</button>
            </div>
        </div>
    );
};

export default UserProfile;
