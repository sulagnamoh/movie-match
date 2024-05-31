import React from 'react';
import './search.css';
import {movies_db} from './Home';
import { useState } from 'react';
import StarRating from './StarRating';

export function SearchFeat() {
    const [searchResults, setSearchResults] = useState("");
    const [movieRatings, setMovieRatings] = useState({});
    const handleRateChange = (movieID, newRating) =>{
      setMovieRatings(lastRatings =>({
          ...lastRatings, [movieID]: newRating
        }));
    };
    
return (
    <div className='search-and-nav'>
      <input type = "text" placeholder='Search' className='search' onChange={e=>setSearchResults(e.target.value)}/>
             <div className="movie-list">
                {movies_db.filter((movie) =>
                  movie.name.toLowerCase().includes(searchResults)).map((movie)=>(
                  <div key={movie.name} className='listItem'> 
                  <div className="movie-box">
                    <h2>{movie.name}</h2>
          <p>{movie.description}</p> 
          <StarRating
            rating={movieRatings[movie.id] || 0}
            rateChanged={(newRating) => handleRateChange(movie.id, newRating)}
          />
        </div>
      </div>
    ))}
   </div>
  </div>
);
}

export default SearchFeat;