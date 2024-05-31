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
    const [isComedyChecked, setIsComedyChecked] = useState(false);
    const [isActionChecked, setIsActionChecked] = useState(false);
    const [isHorrorChecked, setIsHorrorChecked] = useState(false);
    const [isHuluChecked, setIsHuluChecked] = useState(false);
    const [isNetflixChecked, setIsNetflixChecked] = useState(false);
    const [isDisneyChecked, setIsDisneyChecked] = useState(false);
    const [isPrimeChecked, setisPrimeChecked] = useState(false);

    const handleCheckboxChange = (event) => {
      const {name, checked } = event.target;
      if (name === 'comedy') {
        setIsComedyChecked(checked);
    } else if (name === 'action') {
        setIsActionChecked(checked);
    } else if (name === 'horror') {
      setIsHorrorChecked(checked);
    } else if (name === 'netflix') {
      setIsNetflixChecked(checked)
    } else if (name === 'hulu') {
      setIsHuluChecked(checked);
    } else if (name === 'disney') {
      setIsDisneyChecked(checked);
    } else if (name === 'prime') {
      setisPrimeChecked(checked);
    }
   };

   const filteredMovies = movies_db
          .filter((movie) => {
              let genreMatch = true;
              if (isComedyChecked || isActionChecked || isHorrorChecked) {
                genreMatch = (isComedyChecked && movie.genre === 'comedy') ||
                             (isActionChecked && movie.genre === 'action') ||
                             (isHorrorChecked && movie.genre === 'horror');
                             
            }
            let platformMatch = true;
            if (isNetflixChecked || isHuluChecked || isDisneyChecked) {
              platformMatch = (isNetflixChecked && movie.platform === 'netflix') ||
                              (isHuluChecked && movie.platform === 'hulu') ||
                              (isDisneyChecked && movie.platform === 'disney') ||
                              (isPrimeChecked && movie.platform === 'prime');
          }
 
            return genreMatch && platformMatch;
        })
 .filter((movie) => movie.name.toLowerCase().includes(searchResults));
 
return (
       <div className='search-and-nav'>
     <div style={{marginLeft: '20px', marginRight: '5px'}}>
           Genres:
         
     <label style={{ marginRight: '10px'}}>
       <input
         type="checkbox"
         name="comedy"
         checked={isComedyChecked}
         onChange={handleCheckboxChange}
       />
        Comedy
     </label>
     <label style={{ marginRight: '10px'}}>
       <input
         type="checkbox"
         name="action"
         checked={isActionChecked}
         onChange={handleCheckboxChange}
         />
       Action
     </label>
     <label style={{ marginRight: '10px'}}>
       <input
         type="checkbox"
         name="horror"
         checked={isHorrorChecked}
         onChange={handleCheckboxChange}
       />
        Horror
        </label>
     <label style={{ marginRight: '10px' }}>
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
                   name="prime"
                   checked={isPrimeChecked}
                   onChange={handleCheckboxChange}
               />
               Prime
           </label>
     </div>
      <input type = "text" placeholder='Search' className='search' onChange={e=>setSearchResults(e.target.value)}/>
             <div className="movie-list">
             {filteredMovies.map((movie) => (
                   <div key={movie.name} className="listItem">
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