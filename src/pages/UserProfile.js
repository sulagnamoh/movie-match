import React from 'react';
import './UserProfile.css';

const UserProfile = () => {
  const userName = 'John Doe'; // This would be fetched from your backend in a real app
  const favoriteMovies = [
    { title: 'Inception', rating: 5 },
    { title: 'Interstellar', rating: 4.5 },
    { title: 'The Dark Knight', rating: 5 }
  ];

  const goToFavorites = () => {
    window.location.href = '/favorites'; // Adjust the path as needed
  };

  return (
    <div className="profile-page">
      <h1>{userName}</h1>
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