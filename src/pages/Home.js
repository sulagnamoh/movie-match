import React from 'react';
import './MovieList.css'; // Import CSS for styling


  // Sample movie data
  export const movies_db = [
    { id: 1, name: 'Inception', description: 'A mind-bending thriller about dreams and reality.' },
    { id: 2, name: 'The Shawshank Redemption', description: 'A story of hope and friendship in a prison.' },
    { id: 3, name: 'The Godfather', description: 'A classic mafia saga of power, loyalty, and betrayal.' },
    { id: 4, name: 'The Dark Knight', description: 'A gritty and intense superhero drama with the Joker.' },
    { id: 5, name: 'Pulp Fiction', description: 'A non-linear story of crime and redemption.' },
    { id: 6, name: 'Forrest Gump', description: 'A heartwarming tale of an ordinary man living an extraordinary life.' },
    { id: 7, name: 'Fight Club', description: 'An exploration of masculinity and consumerism in modern society.' },
    { id: 8, name: 'The Matrix', description: 'A sci-fi action film that explores the nature of reality.' },
    { id: 9, name: 'Goodfellas', description: 'An inside look into the world of organized crime.' },
    { id: 10, name: 'The Lord of the Rings: The Fellowship of the Ring', description: 'The first installment of a fantasy epic.' },
    { id: 11, name: 'The Silence of the Lambs', description: 'A psychological thriller about a young FBI agent and a brilliant criminal profiler.' },
    { id: 12, name: 'Schindler\'s List', description: 'A powerful story of courage and humanity during the Holocaust.' },
    { id: 13, name: 'Gladiator', description: 'An epic historical drama set in ancient Rome.' },
    { id: 14, name: 'The Departed', description: 'A crime thriller about an undercover cop and a mole in the police department.' }
  ];

  export function MovieList() {
  // return (

  //   <div className="movie-list">
  //     {movies_db.map((movie) => (
  //       <div key={movie.id} className="movie-box">
  //         <h2>{movie.name}</h2>
  //         <p>{movie.description}</p>
  //       </div>
  //     ))}
  //   </div>
  // );
}

export default MovieList;


