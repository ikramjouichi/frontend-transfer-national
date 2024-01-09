import React, { useState } from 'react';
import './WalletService.css'
import { Link } from 'react-router-dom';
import chip_icon from '../Assets/chip.png'

export const WalletService = () => {
  const [id, setId] = useState('');
  const [email, setEmail] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [serverMessage, setServerMessage] = useState("");

  const handleIdChange = (e) => {
    setId(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleButtonClick = async () => {
    try {
      console.log("data befor sending"+id)
      console.log("data befor sending"+email)
      console.log("data befor sending")
      
      const apiUrl = 'http://localhost:8020/api/client/create';
      const requestBody = {
        id: id,
        email: email,
      };
      console.log("data befor sending id"+requestBody.id)
      console.log("data befor sending email"+requestBody.email)
      console.log("c'est tous avant "+ requestBody)
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });
      console.log("voici la repense")
      console.log("data after sending"+responseData)
      setServerMessage("client created successfully!");
      /* if (responseData) {
        console.log("data after sending id", responseData.data.id);
        console.log("data after sending email", responseData.data.email);
      }
      if (!responseData) {
        console.log("data before sending id", responseData.data.id);
        console.log("data before sending email", responseData.data.email);
      }*/
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("data est :", data);
      setResponseData(data);
      console.log("data after setting responseData", responseData);
      if(data){
        console.log("data before sending id", responseData.data.id);
        console.log("data before sending email", responseData.data.email);

      }

    } catch (error) {
      //setServerMessage("ERROR verify client informations!!");
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className='bordergeneral'>
      <h1 className='titleWallet'>Client With Wallet</h1>
      <img src="Bankofafrica.png" alt="Logo" className="logo" />
      <Link to="/clients_details">
        <button className='buttonGet'>Get client</button>
      </Link>

      <div>
      <div className='flexcompo'>
        <div className='formCreation1'>
        <p>{serverMessage}</p>
        <div className='titleCretion'>Create Client With Wallet</div>
            <div className='container1'>
              <div className='inputF'>
                <label ><h5>National Identity Card:</h5></label>
                <input className='label1' type="text" value={id} onChange={handleIdChange} />
              </div>
              <div className='inputF'>
                <label ><h5>Email:</h5></label>
                <input className='label2' type="text" value={email} onChange={handleEmailChange} />
              </div>
              <button className='buttonF' onClick={handleButtonClick}>Validate</button>
              <p className='prospectText'>Or prospect client ? <Link className='createprospect' to="/prospectClient">Create a prospect</Link></p>
            </div>
        </div>
      </div>
      <h4>
       {/*Hello*/} 
      </h4>
        {responseData && (
        <div className="App">
          <div className="container2">
            <h1>Votre Wallet</h1>
            <p> wallet informations the simplest and most programmable.</p>
            <div class="card-container">
        <div class="card">
              <img class="chip" src={chip_icon}/>
              <p class="card-number">{responseData.wallet.number}</p>
              <div class="arrow"></div>
              <p class="card-name">User Id:{responseData.user.id}</p>
              <p class="card-expire"> 05/27</p>
              <p class="bank-name">ID:{responseData.wallet.id}</p>
              <p class="balance">{responseData.wallet.balance} DH</p> 

            </div>
          </div>
          </div>
        </div>
        )}
        
          
      </div>
    </div>
  );
};
/*
    ----------------------
    {responseData && (
                <div className='walletInfo'>
                  <h2>Wallet Information:</h2>
                  <p>ID: {responseData.id}</p>
                  <p>User ID: {responseData.user.id}</p>
                  <p>Email: {responseData.user.email}</p>
                  <p>Wallet ID: {responseData.wallet.id}</p>
                  <p>Wallet Number: {responseData.wallet.number}</p>
                  <p>Balance: {responseData.wallet.balance}</p>
                  <p>Transfer Ceiling: {responseData.wallet.transferCeiling}</p>
                  <p>Daily Ceiling: {responseData.wallet.dailyCeiling}</p>
                  <p>Creation Date: {responseData.wallet.creationDate}</p>
                </div>
              )}

*/
