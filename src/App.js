import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from 'react-router-dom';
import Home from './pages/Home'; 
import Sidebar from './pages/Sidebar';
import Login from './pages/login';
import Register from './pages/Register';
import Profile from './pages/UserProfile';
import Favorites from './pages/Favorites';
import Search from './pages/Search';

function App() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <Router>
            <div>
                <header className="header">
                    <div className="bold-header">
                        <div style={{ fontSize: '30px' }}>
                            Movie Match 🎥
                        </div>
                    </div>
                    <h5>Your guide to finding your new favorite movies!</h5>
                </header>
                <div className="app-container">
                    <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
                    <div className="main-content">
                        <button className="toggle-btn" onClick={toggleSidebar}>☰</button>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/home" element={<Home />} />
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/favorites" element={<Favorites />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/search" element={<Search />} />
                        </Routes>
                    </div>
                </div>
            </div>
        </Router>
    );
}

export default App;
