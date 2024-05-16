import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';

function App() {
    return (
        <Router>
            <div>
                <header className="header">
                    <h1>Movie Match</h1>
                    <h5>Your guide to finding your new favorite movies!</h5>
                </header>
                <nav>
                    <Link to="/home">Home</Link> | 
                    <Link to="/about">User Profile</Link>
                </nav>
                <Routes>
                    <Route path="/" element={<Home />} />  // Root path
                    <Route path="/home" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="*" element={<Home />} />  // Fallback to Home for undefined paths
                </Routes>
                <button>Search</button>
                <Dropdown className="d-inline mx-2" autoClose="outside">
                    <Dropdown.Toggle id="dropdown-autoclose-outside">
                        Filters
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item href="#">Genre</Dropdown.Item>
                        <Dropdown.Item href="#">Most Popular</Dropdown.Item>
                        <Dropdown.Item href="#">idk</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </Router>
    );
}

export default App;
