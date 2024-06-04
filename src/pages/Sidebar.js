import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

function Sidebar({ isOpen, toggleSidebar }) {
    const handleLogout = () => {
        localStorage.removeItem('user');
        toggleSidebar();
    };

    return (
        <div className={`sidebar ${isOpen ? 'open' : ''}`}>
            <button className="close-btn" onClick={toggleSidebar}>×</button>
            <ul>
                <li><Link to="/home" onClick={toggleSidebar}>Home</Link></li>
                <li><Link to="/profile" onClick={toggleSidebar}>My Profile</Link></li>
                <li><Link to="/favorites" onClick={toggleSidebar}>My Favorites</Link></li>
                <li><Link to="/login" onClick={handleLogout}>Sign Out</Link></li>
                <li><Link to="/login" onClick={toggleSidebar}>Login</Link></li>
                <li><Link to="/search" onClick={toggleSidebar}>Search</Link></li>
            </ul>
        </div>
    );
}

export default Sidebar;
