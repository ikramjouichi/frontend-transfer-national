import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export const ProspectClient = () => {
  const [serverMessage, setServerMessage] = useState("");

  const [id, setId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [responseData, setResponseData] = useState(null);

  const handleIdChange = (e) => {
    setId(e.target.value);
  };

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleButtonClick = async () => {
    console.log("data befor sending :")
    console.log("data befor sending id :"+ id)
    console.log("data befor sending fn :"+ firstName)
    console.log("data befor sending ln :"+ lastName)
    console.log("data befor sending phone :"+ phoneNumber)



    try {
      // Construct the request body
      const requestBody = {
        id: id,
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
      };

      // Send the POST request using Axios
      const response = await axios.post('http://localhost:8020/api/prospect/create', requestBody);

      // Handle the response data (you can update the state or perform other actions)
      setResponseData(response.data);
      setServerMessage("client PROSPECT created successfully!");
      // Reset form fields after successful request
      setId('');
      setFirstName('');
      setLastName('');
      setPhoneNumber('');
    } catch (error) {
      setServerMessage("ERROR, verify Prospect informations!");
      console.error('Error creating prospect:', error);
    }
  };

  return (
    <div className='bordergeneral'>
      <h1 className='titleWallet'>Prospect Client</h1>
      <img src="Bankofafrica.png" alt="Logo" className="logo" />

      {/* Logo et autres éléments peuvent être ajoutés ici selon vos besoins */}

      <div>
        <div className='flexcompo'>
          <div className='formCreation1'>
          <p>{serverMessage}</p>
            <div className='titleCretion'>Create Prospect Client</div>
            <div className='container1'>
              <div className='inputF'>
                <label><h5>ID :</h5></label>
                <input className='label1' type="text" value={id} onChange={handleIdChange} />
              </div>
              <div className='inputF'>
                <label><h5>First Name :</h5></label>
                <input className='label2' type="text" value={firstName} onChange={handleFirstNameChange} />
              </div>
              <div className='inputF'>
                <label><h5>Last Name :</h5></label>
                <input className='label3' type="text" value={lastName} onChange={handleLastNameChange} />
              </div>
              <div className='inputF'>
                <label><h5>Phone Number :</h5></label>
                <input className='label4' type="text" value={phoneNumber} onChange={handlePhoneNumberChange} />
              </div>
              <button className='buttonF' onClick={handleButtonClick}>Create Prospect</button>
             {/* <p className='walletText'>Or create a client with a wallet? <Link className='createWallet' to="/walletservice">Create a client with wallet</Link></p>*/}
            </div>
          </div>
        </div>
        {/* La section affichant les détails du prospect peut être ajoutée ici si nécessaire */}
      </div>
    </div>
  );
};


