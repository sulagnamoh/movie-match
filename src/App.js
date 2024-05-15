import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";

function App() {
    return (
        <Router>
            <div>
                <nav>
                    <Link to="/Home">Home</Link> | 
                    <Link to="/About">About</Link>
                </nav>
                <Routes>
                    <Route path="/" element={<Home />} />  // Root path
                    <Route path="/Home" element={<Home />} />
                    <Route path="/About" element={<About />} />
                    <Route path="*" element={<Home />} />  // Fallback to Home for undefined paths
                </Routes>
            </div>
        </Router>
    );
}

export default App;
