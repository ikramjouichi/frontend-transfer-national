import React, { useState } from 'react';
import './Dashboard.css';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import {  FaArrowRight } from 'react-icons/fa';
import { IoIosArrowRoundForward } from "react-icons/io";


export const Dashboard = () => { 
  return ( 
     <div className='dashboard'>
       <img src="boa.png" alt="Logo" className="logo" />
       <h1>Hi, Welcome to Bank Of Africa! </h1> 
       {/*<p className="transfer-link">
         Try to start a new transfer 
         <Link to="/TransferService">
           <IoIosArrowRoundForward className="arrow-icon" />
         </Link>
  </p>*/}
     </div>
     
  )
 };