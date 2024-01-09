import React, { useState } from 'react';
import './SironeService.css';
import {useEffect } from 'react';
import axios from 'axios';

export const SironeService = () => {

  
  //pour afficher donner 

  useEffect(() => {
    // Fetch blacklist data when the component mounts
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8010/api/siron/getAllSironeList');
      setBlacklist(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const [blacklist, setBlacklist] = useState([
    // ... Votre liste actuelle ...
  ]);

  const [searchId, setSearchId] = useState('');
  const [newClientId, setNewClientId] = useState('');

  // Nouveaux états pour gérer le formulaire d'ajout
  const [showAddForm, setShowAddForm] = useState(false);
  const [newClientInfo, setNewClientInfo] = useState({
    bclientId: '',
    blacklistingDate: '',
    cause: '',
    supervisor :{
      supervisorId: '',
      role: '',}
  });

  const handleSearch = () => {
    // Logique de recherche actuelle
  };

  const handleAddToBlacklist = () => {
    setShowAddForm(true);
  };

  const handleAddFormSubmit = async () => {
    console.log("data before sending");
    console.log("new client before ", newClientInfo);
    console.log("data before / CLIENT ID ", newClientInfo.bclientId);
    console.log("data before / cause ", newClientInfo.cause);
    console.log("data before / supervisor id ", newClientInfo.supervisor.supervisorId);
    console.log("data before / role ", newClientInfo.supervisor.role);
    console.log("data before / date ", newClientInfo.blacklistingDate);
  
    try {
      // Construisez l'objet de données à envoyer au backend
      const requestData = {
        bclientId: newClientInfo.bclientId,
        blacklistingDate: newClientInfo.blacklistingDate,
        cause: newClientInfo.cause,
        supervisor: {
          supervisorId: newClientInfo.supervisor.supervisorId,
          role: newClientInfo.supervisor.role,
        },
      };
  
      // Envoyez la requête POST au backend
      const response = await axios.post('http://localhost:8010/api/siron/add-to-blacklist', requestData);
  
      // Mettez à jour l'état de la liste noire avec les données du backend
      setBlacklist([...blacklist, response.data]);
  
      // Réinitialisez les états du formulaire après l'ajout
      setNewClientInfo({
        bclientId: '',
        blacklistingDate: '',
        cause: '',
        supervisor: {
          supervisorId: '',
          role: '',
        },
      });
  
      // Masquez le formulaire d'ajout
    setShowAddForm(false);
    } catch (error) {
      console.error('Error adding to blacklist:', error);
      console.log("data after sending");
      console.log("new client after ", newClientInfo);
      console.log("data / CLIENT ID ", newClientInfo.bclientId);
      console.log("data  / cause ", newClientInfo.cause);
      console.log("data  / supervisor id ", newClientInfo.supervisor.supervisorId);
      console.log("data / role ", newClientInfo.supervisor.role);
      console.log("data  / date ", newClientInfo.blacklistingDate);
    }
  };
  

  return (
    <div className='sirone'>
      <h1>Blacklisted Clients</h1>
      <img src="Bankofafrica.png" alt="Logo" className="logo" />

      {/* Barre de recherche par ID */}
      <div className="search-bar flexcompo">
        

        {/* Boutons Rechercher et Ajouter à la liste noire <button  onClick={handleSearch}>Research</button> */}
        
        <button className='button' onClick={handleAddToBlacklist}>Add</button>
      </div>

      {/* Formulaire d'ajout */}
      {showAddForm && (
        <div className="add-form">
          <label>Client ID :</label>
          <input
            className='input'
            type="text"
            value={newClientInfo.bclientId}
            onChange={(e) => setNewClientInfo({ ...newClientInfo, bclientId: e.target.value })}
          />

          <label>Blacklisting Date :</label>
          <input
            className='input'
            type="text"
            value={newClientInfo.blacklistingDate}
            onChange={(e) => setNewClientInfo({ ...newClientInfo, blacklistingDate: e.target.value })}
          />

          <label>Raison :</label>
          <input
            className='input'
            type="text"
            value={newClientInfo.cause}
            onChange={(e) => setNewClientInfo({ ...newClientInfo, cause: e.target.value })}
          />

          <label>Supervisor ID :</label>
          <input
            className='input'
            type="text"
            value={newClientInfo.supervisor.supervisorId}
            onChange={(e) => setNewClientInfo({ ...newClientInfo, supervisor: { ...newClientInfo.supervisor, supervisorId: e.target.value } })}          />

          <label>Role :</label>
          <input
            className='input'
            type="text"
            value={newClientInfo.supervisor.role}
            onChange={(e) => setNewClientInfo({ ...newClientInfo, supervisor: { ...newClientInfo.supervisor, role: e.target.value } })}          />

          <button className='button' onClick={handleAddFormSubmit}>Add to blacklist</button>
        </div>
      )}

      {/* Tableau des clients blacklistés */}
      <table>
        <thead>
          <tr>
            <th>Client ID</th>
            <th>Blacklisting Date</th>
            <th>Raison</th>
            <th>Supervisor ROLE</th>
          </tr>
        </thead>
        <tbody>
        {blacklist.map(client => (
      <tr key={client.bclientId}>
        <td>{client.bclientId}</td>
        <td>{client.blacklistingDate}</td>
        <td>{client.cause}</td>
        <td>{client.supervisor? client.supervisor.role: ""}</td>
      </tr>
    ))}
        </tbody>
      </table>
    </div>
  );
};