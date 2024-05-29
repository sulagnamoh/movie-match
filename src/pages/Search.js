import React from 'react';
import './search.css';
import {movies_db} from './Home';
import { useState } from 'react';

export function SearchFeat() {
    const [searchResults, setSearchResults] = useState("");
return (
    <div className='search-and-nav'>
<input type = "text" placeholder='Search' className='search' onChange={e=>setSearchResults(e.target.value)}/>
             <div className="movie-list">
                {movies_db.filter((movie) =>
                  movie.name.toLowerCase().includes(searchResults)).map((movie)=>(
                  <div key={movie.name} className='listItem'> 
                  <div className="movie-box">
                    <h2>{movie.name}</h2>
          <p>{movie.description}</p> </div>
                </div>
                ))}
              </div>
              </div>
)
}

export default SearchFeat;