import React from 'react'
import './Login2.css'
import user_icon from '../Assets/users.png'
import password_icon from '../Assets/password.png'
import role_icon from '../Assets/role.png'
import axios from 'axios';
import  { useState } from 'react';
import {useNavigate} from 'react-router-dom'



export const Login2 = ({ onLogin }) => {

  const handleLoginClick = () => {
      // Perform your login validation here
      // If login is successful, call the onLogin function
      
  };
    const [role, setRole] = useState('');
    const [supervisorId, setSupervisorId] = useState('');
    const [serverMessage, setServerMessage] = useState("");
    const [responseData, setResponseData] = useState('');
    const navigate=useNavigate();

    const handleLogin = async () => {
        try {
          const apiUrl = 'http://localhost:8090/supervisors/login';
          const requestBody = {
            supervisorId: supervisorId,
            role: role,
          };
          const response = await axios.post(apiUrl, requestBody);
          console.log("response de retour"+response);
          console.log("response vide");
          console.log(response.data); // Output the result to the console
          //ce que j'ai ajouté
          console.log("response de retour : voici le role "+role);
          setRole(role);
          const { message } = response.data;
          setServerMessage(message);
          sessionStorage.setItem('isLoggedIn', true);
          //onLogin(userRole);
            onLogin(role);
          
           navigate('/dashboard')
          // Add logic to handle the response as needed (e.g., redirect to a new page)
        } catch (error) {
          setServerMessage(
            "Erreur lors de la connexion. Veuillez vérifier vos informations."
          );
          console.error('Error making login request:', error);
        }
      };
    return(
        <div className='login-container'>
            <div className="login-header">
                <div className="text">Login</div>
                
                <div className="underline"></div>
                <p>{serverMessage}</p>

                <div className="inputs">
                
                <div className="input">
                    <img src={password_icon} alt="" />
                    <input type="password" placeholder='Reference'
                    onChange={(e) => setSupervisorId(e.target.value)}
                    />
                </div>
                <div className="input">
                    <img src={role_icon} alt="" />
                    <input type="text" placeholder='Role'
                    onChange={(e) => setRole(e.target.value)}
                    />
                </div>
                <div className="submit-container">
                <button className={"submit"}  type='button' onClick={handleLogin}>
                        <>Login</>
                </button>
            </div>
            </div>

            </div>
            

        </div>
    )
}