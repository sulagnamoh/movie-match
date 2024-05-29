import React from 'react';
import { useState } from 'react';
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
import UserProfile from './pages/UserProfile';
import Favorites from './pages/Favorites';
import Sidebar from './pages/Sidebar'; 

function App() {
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };
    return (
        <Router>
            <div>
                <header className="header">
                    <h1>Movie Match</h1>
                    <h5>Your guide to finding your new favorite movies!!!</h5>
                </header>
                <nav>
                    <Link to="/home">Home</Link> | 
                    <Link to="/about">User Profile</Link> |
                    <Link to="/profile">User Profile</Link> |
                    <Link to="/favorites">Favorites</Link> 
                </nav>
                <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
                <Routes>
                    <Route path="/" element={<Home />} />  // Root path
                    <Route path="/home" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/profile" element={<UserProfile />} />
                    <Route path="/favorites" element={<Favorites />} /> {/* Add this route */}
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
