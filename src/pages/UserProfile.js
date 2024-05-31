import React, { useEffect, useState } from 'react';
import './UserProfile.css';

const UserProfile = () => {
    const [user, setUser] = useState({ email: '', name: '' });

    useEffect(() => {
        // Retrieve user data from localStorage
        const userData = JSON.parse(localStorage.getItem('user'));
        if (userData) {
            setUser(userData);
        }
    }, []);

    const favoriteMovies = [
        { title: 'Inception', rating: 5 },
        { title: 'Interstellar', rating: 4.5 },
        { title: 'The Dark Knight', rating: 5 }
    ];

    const goToFavorites = () => {
        window.location.href = './pages/Favorites'; // Adjust the path as needed
    };

    return (
        <div className="profile-page">
            <h1>{user.name}</h1> {/* Display the user's name */}
            <button onClick={goToFavorites}>Favorite Movies</button>
            <ul>
                {favoriteMovies.map((movie, index) => (
                    <li key={index}>
                        {movie.title} - Rating: {movie.rating}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserProfile;
