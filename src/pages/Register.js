import './Register.css';
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";

import user_icon from './components/images/user.png';
import email_icon from './components/images/email.png';
import password_icon from './components/images/password.png';

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const navigate = useNavigate();

    async function submit(e) {
        e.preventDefault();

        try {
            const res = await axios.post("http://localhost:3000/register", { email, password, name });
            if (res.data === "exist") {
                alert("User already exists");
            } else if (res.data === "notexist") {
                alert("User created");
                // Navigate to UserProfile with user data
                navigate('/profile', { state: { email, name } });
            }
        } catch (error) {
            alert("Registration failed");
            console.log(error);
        }
    }

    return (
        <div className='container'>
            <div className="header">
                <div className="text">Register</div>
                <div className="underline"></div>
            </div>
            <div className="inputs">
                <div className="input">
                    <img src={email_icon} alt="" />
                    <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                </div>
                <div className="input">
                    <img src={password_icon} alt="" />
                    <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                </div>
                <div className="input">
                    <img src={password_icon} alt="" />
                    <input type="name" onChange={(e) => setName(e.target.value)} placeholder="Name" />
                </div>
            </div>
            <div className="forgot-password-container">
                <Link to="/login" className="forgot-password-button">Login</Link>
            </div>
            <div className="submit-container">
                <div className="submit" onClick={submit}>Register</div>
            </div>
        </div>
    );
}

export default Register;
