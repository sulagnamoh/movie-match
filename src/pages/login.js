import React, { useState } from 'react';
import './Login.css'
import axios from 'axios';
import{useNavigate, link}from "react-router-dom";

import user_icon from './components/images/user.png'
import email_icon from './components/images/email.png'
import password_icon from './components/images/password.png'

function Login() {
    const history = useNavigate();
    const[email,setEmail] =useState('')
    const[password,setPassword] =useState('')

    async function submit(e) {
        e.preventDefault();

        try {
            await axios.post("http://localhost:3000/",{
                email,password
            } )
            .then(res=> {
                if(res.data === "exist") {
                    history("/home")
                }
                else if(res.data === "notexist") {
                    alert("User is not registered")
                }
            })
            .catch(e=> {
                alert("wrong details")
                console.log(e);
            })
        }
        catch{
            console.log(e);

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
                    <input type="email" onChange={(e)=> {setEmail(e.target.value)}} placeholder="Email" />

                </div>
                <div className="input">
                    <img src={password_icon} alt="" />
                    <input type="password" onChange={(e)=> {setPassword(e.target.value)}} placeholder="Password" />
                </div>
            </div>
            <div className="forgot-password-container">
                <button className="forgot-password-button" onClick={() => window.location.href='/Register'}>Register</button>
            </div>
            <div className="submit-container">
                <div className="submit" onClick={submit}>Login</div>
            </div>
        </div>
    );
}

export default Login;
