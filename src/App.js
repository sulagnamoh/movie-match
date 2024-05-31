import React from 'react';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
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
        <div>
        <header className="header">
                     <h1>Movie Match </h1>
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
            
            </div>
          </div>
                   <Routes>
                    <Route path="/home" element={<Home />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/favorites" element={<Favorites />} />
                    {/* <Route path="*" element={<Home />} />  // Fallback to Home for undefined paths */}
                    <Route path="/Login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/Search" element={<Search />} />
                </Routes>
        </div>
      </Router>
      </div>
    );
}

export default App;
