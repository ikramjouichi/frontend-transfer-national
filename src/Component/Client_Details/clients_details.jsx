import React, { useState } from 'react'
import './Client_Details.css'
import axios from 'axios';
import chip_icon from '../Assets/chip.png'

export const ClientDetails = () => {
 const [clientData, setClientData] = useState({});
 const [clientId, setClientId] = useState('');
 const [error, setError] = useState(null);
 const [newBalance, setNewBalance] = useState('');
 const searchClient = async (event) => {
  event.preventDefault();

  try {
    const response = await axios.get(`http://localhost:8020/api/client/find/${clientId}`);
    setClientData(response.data);
  } catch (error) {
    setError('Error fetching client data. Please check the client ID.');
    console.error('Error fetching client data:', error);
  }
};

const updateBalance = async (event) => {
  event.preventDefault();

  try {
    const response = await axios.put(`http://localhost:8020/api/wallet/update/${clientData.wallet.id}/${newBalance}`);
    // Mettre à jour les données du client après la mise à jour du solde
    setClientData((prevData) => ({
      ...prevData,
      wallet: {
        ...prevData.wallet,
        balance: parseFloat(newBalance),
      },
    }));
    setNewBalance(''); // Effacer le champ après la mise à jour
  } catch (error) {
    setError('Error updating balance. Please check the input.');
    console.error('Error updating balance:', error);
  }
};

 return (
    <div className="transfer-8">
      <h1>Get Client Wallet</h1>
      <img src="Bankofafrica.png" alt="Logo" className="logo" />

      <form className='form1' onSubmit={searchClient}>
        <label>
          Look for a client with NIC:
          <input
            type="text"
            name="nic"
            value={clientId}
            onChange={(e) => setClientId(e.target.value)}
          />
        </label>
        <button type="submit">Research</button>
      </form>
      {Object.keys(clientData).length > 0 && (
        <div>
          <h2>Client Details</h2>
          <p>Email: {clientData.user.email}</p>
          
          <p>Creation Date: {clientData.wallet.creationDate}</p>

          {/* Add more details as needed */}

          {/* Uncomment and modify the update balance form as needed */}
          <form onSubmit={updateBalance} >
          <div class="card-container">
        <div class="card">
              <img class="chip" src={chip_icon}/>
              <p class="card-number">{clientData.wallet.number}</p>
              <div class="arrow"></div>
              <p class="card-name">User Id :{clientData.id}</p>
              <p class="card-expire"> 05/27</p>
              <p class="bank-name">ID:{clientData.wallet.id}</p>
              <p class="balance">{clientData.wallet.balance} DH</p> 

            </div>
          </div>
            <label>
              Add Balance:
              <input type="text" name="newBalance" 
                value={newBalance}
                onChange={(e) => setNewBalance(e.target.value)}
                />
            </label>
            <button type="submit">Update</button>
          </form> 
        </div>
      )}

      {error && <p className="error-message">{error}</p>}
    </div>
  );
};