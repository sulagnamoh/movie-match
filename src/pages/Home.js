import React from 'react';
import MovieList from './MovieList';
import './Home.css';

const goToFavorites = () => {
    window.location.href = './pages/Favorites'; 
};

const Home = () => {
    return (
        <div>
            <div class="header-movies">
            All Movies
            </div>
            <MovieList />
        </div>
    );
};

export default Home;


