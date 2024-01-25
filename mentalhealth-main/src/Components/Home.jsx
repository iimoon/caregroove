import React from 'react'
import CareGrooveLogo from './images/register-page/logo.png'
import { Button, Typography } from '@mui/material'
import './Home.css'
const Home = () => {
  return (
    <div>
        <div className="navbar">
            <div className="logo">
                <img src={CareGrooveLogo}/>
            </div>
            <ul>
                <li><a href='{Home}'>Home</a></li>
                <li><a href='register'>Services</a></li>
                <li><a href='{About}'>Contact</a></li>
                <li><a href='admin-login'>About</a></li>
            </ul>
            <div className="Button-Container">
              <button id='signup-btn' type='Button'>Sign up</button>
              <button id='login-btn' type='Button'>Login</button>
            </div>
        </div>
        <div className="body-main">
          <div className="intro-para">
            <h3>Your path to mental wellness starts here</h3>
            <h4>Embrace happiness and peace of mind with our mental health companion.</h4>
          </div>
          <div className="intro-image"></div>
        </div>
    </div>
  )
}

export default Home