// Login.js
import React from 'react';
import './Login.css';
import { FaUser ,FaLock  } from "react-icons/fa";

export const Login = () => {
  return (
    <div className="container">
      <div className="form-container">
        <div className="header">
          Sign Up
          <div className="underline"></div>
        </div>
        <div className="inputs">
          <div className="input">
            <label className='labellogin'>Email</label>
            <div className='ligneInput'>
              <FaUser />
              <input type="email" placeholder="Email" />
            </div>
          </div>
          <div className="input">
            <label className='labellogin'>Password</label>
            <div className='ligneInput'>
              <FaLock />
              <input type="password" placeholder="Password" />
            </div>
          </div>
        </div>
        <div className="button">
          <button type="submit">Sign Up</button>
        </div>
      </div>
    </div>
  );
};
