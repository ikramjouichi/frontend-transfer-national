import React from 'react'
import './KYC_List.css'
import { Link } from 'react-router-dom';

import  { useState } from 'react';
import {useEffect } from 'react';
import axios from 'axios';

export const KycList = () => {
  const [clients, setClients] = useState([]);
  useEffect(() => {
    // Function to fetch data from the backend
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8010/api/kyc');
        setClients(response.data);
      } catch (error) {
        console.error('Error fetching KYC data:', error);
      }
    };

    // Call the fetch data function
    fetchData();
  }, []);
    return (
        <div className='sirone'>
          <h1>Our Clients</h1>
          <img src="Bankofafrica.png" alt="Logo" className="logo" />
          <Link to="/kycService">
        <button className='buttonGet'>Add</button>
      </Link>
    
        
          <table>
            <thead>
              <tr>
                <th>identityNumber</th>
                <th>lastname</th>
                <th>firstname</th>
                <th>occupation</th>
                <th>phoneNumber</th>
                <th>email</th>
              </tr>
            </thead>
            <tbody>
            {clients.map((client) => (
            <tr key={client.identityNumber}>
              <td>{client.identityNumber}</td>
              <td>{client.lastname}</td>
              <td>{client.firstname}</td>
              <td>{client.occupation}</td>
              <td>{client.phoneNumber}</td>
              <td>{client.email}</td>
            </tr>
          ))}
            </tbody>
          </table>
        </div>
      );
}
