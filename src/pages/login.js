import React, { useState } from 'react';
import './Login.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

import user_icon from './components/images/user.png';
import email_icon from './components/images/email.png';
import password_icon from './components/images/password.png';

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function submit(e) {
        e.preventDefault();

        try {
            const res = await axios.post("http://localhost:3000/login", { email, password });
            if (res.data.status === "success") {
                // Store user data in localStorage
                localStorage.setItem('user', JSON.stringify(res.data.user));
                navigate("/profile");
            } else if (res.data.status === "fail") {
                alert("User is not registered");
            }
        } catch (error) {
            alert("Wrong details");
            console.log(error);
        }
    }

    return (
        <div className='container'>
            <div className="header">
                <div className="text">Login</div>
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
            </div>
            <div className="forgot-password-container">
                <button className="forgot-password-button" onClick={() => navigate('/register')}>Register</button>
            </div>
            <div className="submit-container">
                <div className="submit" onClick={submit}>Login</div>
            </div>
        </div>
    );
}

export default Login;
