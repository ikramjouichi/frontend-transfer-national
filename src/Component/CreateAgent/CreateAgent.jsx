import React from 'react'
import './CreateAgent.css'

import id_icon from '../Assets/id.png'
import users_icon from '../Assets/users.png'
import axios from 'axios';
import  { useState ,useEffect } from 'react';


export const CreateAgent = () => {
  const [supervisorId, setSupervisorId] = useState('');
  const [role, setRole] = useState('');
  const [serverMessage, setServerMessage] = useState("");

  const handleCreateAgent = async () => {
    console.log('voici supervisor id', supervisorId);
    console.log('voici role', role);
    try {
      const apiUrl = 'http://localhost:8090/supervisors/create';
      const requestBody = {
        supervisorId: supervisorId,
        role: role,
      };
      
      // Utiliser Axios pour effectuer la requête POST
      const response = await axios.post(apiUrl, requestBody);
      
      setServerMessage("Agent Created successfully !");
      // Traiter la réponse si nécessaire
      console.log('Response:', response.data);
    } catch (error) {
      setServerMessage(
        "Erreur lors de la connexion. Veuillez vérifier vos informations."
      );
      // Gérer les erreurs
      console.error('Error creating agent:', error);
    }
  };

    return(
        <div className='container'>
            <div className="header">
                <div className="text">Create Agent</div>
                <div className="underline"></div>
                <p>{serverMessage}</p>
                <div className="inputs">
                    <div className="input">
                        <img src={id_icon} alt="" />
                        <input type="text" placeholder='supervisor ID' value={supervisorId}
                          onChange={(e) => setSupervisorId(e.target.value)}/>
                        
                    </div>
                    <div className="input">
                        <img src={users_icon} alt="" />
                        <input type="text" placeholder='Role' value={role}
                          onChange={(e) => setRole(e.target.value)} />
                </div>

                    <div className="submit-container">
                        <button className="submit" onClick={handleCreateAgent}>Create</button>
                    </div>
                </div>
                
    

            </div>

        </div>
        
    )
}
