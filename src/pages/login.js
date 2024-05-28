import React from 'react';
import './Login.css'

import user_icon from './components/images/user.png'
import email_icon from './components/images/email.png'
import password_icon from './components/images/password.png'

function Login() {
    return (
        <div className='container'>
            <div className="header"> 
                <div className="text">Login</div> 
                <div className="underline"></div>
            </div>
            <div className="inputs">
                <div className="input">
                    <img src={user_icon} alt="" />
                    <input type="userid" placeholder="User ID" />
                </div>
                <div className="input">
                    <img src={email_icon} alt="" />
                    <input type="email" placeholder="Email" />
                </div>
                <div className="input">
                    <img src={password_icon} alt="" />
                    <input type="password" placeholder="Password" />
                </div>
            </div>
            <div className="forgot-password-container">
                <button className="forgot-password-button" onClick={() => window.location.href='/forgot-password'}>Forgot Password?</button>
            </div>
            <div className="submit-container">
                <div className="submit">Login</div>
            </div>
        </div>
    );
}

export default Login;
