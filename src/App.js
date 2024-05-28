import React from 'react';
import { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import SearchBar from './pages/SearchBar';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Genres from './pages/Genres';
import Streaming from './pages/Streaming';
import Sidebar from './pages/Sidebar';
import Login from './pages/Login'

function App() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [searchResults, setSearchResults] = useState([]);


 const handleSearch = (searchTerm) => {
   // Here you would implement the logic to fetch search results based on the searchTerm
   // For demonstration, let's just update the search results state with the search term
   setSearchResults([searchTerm]);
 };
 const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

    return (
        <div>
        <header className="header">
                     <h1>Movie Match</h1>
                     <h5>Your guide to finding your new favorite movies!!!</h5>
                 </header>                 
        <Router>
            <div className='main-content-2'>
   <nav className='header-2'>

   All Movies
   </nav>
   </div>
        <div className="app-container">
          <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
          <div className="main-content">
            <button className="toggle-btn" onClick={toggleSidebar}>☰</button>
            <div style={{ display: 'flex', alignItems: 'center' }}>
            <div className="search-and-nav">
              <SearchBar onSearch={handleSearch} />
              <nav className='nav-links'>
                    Genres
                     <Link to="/home">Horror</Link>  
                     <Link to="/home">Comedy</Link> 
                     <Link to="/home">Action</Link> 
                     Streaming Platforms
                     <Link to="/about">Netflix</Link>
                     <Link to="/about">Hulu</Link>
                     <Link to="/about">Disney+</Link>
                 </nav>
                 </div>
            </div>
            <Routes>
              <Route path="/genres" element={<Genres />} />
              <Route path="/streaming" element={<Streaming />} />
              <Route path="/" element={<Home />} />
            </Routes>
            <ul>
              {searchResults.map((result, index) => (
                <li key={index}>{result}</li>
              ))}
            </ul>
          </div>
                   <Routes>
                    <Route path="/home" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    {/* <Route path="*" element={<Home />} />  // Fallback to Home for undefined paths */}
                    <Route path="/Login" element={<Login />} />
                </Routes>
        </div>
      </Router>
      </div>
    );
}

export default App;
