import React, { useState } from 'react';
import axios from 'axios';
import './KycService.css';


export const KycService = () => {
  const [serverMessage, setServerMessage] = useState("");
  const [formData, setFormData] = useState({
    identityNumber: "",
    lastname: "",
    firstname: "",
    gender: "",
    identityType: "",
    birthdayDate: "",
    occupation: "",
    address: "",
    city: "",
    phoneNumber: "",
    nationality: "",
    country: "",
    emissionCountry: "",
    email: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    console.log("data befor sending "+formData)
   try {
      // Effectuer la requête POST avec axios
      const response = await axios.post('http://localhost:8010/api/kyc', formData);

      // Afficher la réponse de la requête dans la console
      console.log(response.data);
      setServerMessage("Your client was created successfully!");
      // Vous pouvez également effectuer des actions supplémentaires en fonction de la réponse ici
    } catch (error) {
      setServerMessage("ERROR, verify your informations!");
      // Gérer les erreurs de la requête ici
      console.error('Erreur lors de la requête POST :', error);
    }
  };

  return (
    <div className="kyc-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <p>{serverMessage}</p>
      <h1 className="kyc-title">KycService</h1>
      <img src="Bankofafrica.png" alt="Logo" className="logo" />

      <form className="kyc-form" style={{ display: 'flex', flexDirection: 'column', width: '300px' }}>
        <label className="kyc-label">
          Identity Number:
          <input className="kyc-input" type="text" name="identityNumber" onChange={handleChange} />
        </label>

        <label>
          Last Name:
          <input className="kyc-input" type="text" name="lastname" onChange={handleChange} />
        </label>

        <label>
          First Name:
          <input className="kyc-input" type="text" name="firstname" onChange={handleChange} />
        </label>

        <label>
          Gender:
          <input className="kyc-input" type="text" name="gender" onChange={handleChange} />
        </label>

        <label>
          Identity Type:
          <input className="kyc-input" type="text" name="identityType" onChange={handleChange} />
        </label>

        <label>
          Birthday Date:
          <input className="kyc-input" type="text" name="birthdayDate" onChange={handleChange} />
        </label>

        <label>
          Occupation:
          <input className="kyc-input" type="text" name="occupation" onChange={handleChange} />
        </label>

        <label>
          Address:
          <input className="kyc-input" type="text" name="address" onChange={handleChange} />
        </label>

        <label>
          City:
          <input className="kyc-input" type="text" name="city" onChange={handleChange} />
        </label>

        <label>
          Phone Number:
          <input className="kyc-input" type="text" name="phoneNumber" onChange={handleChange} />
        </label>

        <label>
          Nationality:
          <input className="kyc-input" type="text" name="nationality" onChange={handleChange} />
        </label>

        <label>
          Country:
          <input className="kyc-input" type="text" name="country" onChange={handleChange} />
        </label>

        <label>
          Emission Country:
          <input className="kyc-input" type="text" name="emissionCountry" onChange={handleChange} />
        </label>

        <label>
          Email:
          <input className="kyc-input" type="text" name="email" onChange={handleChange} />
        </label>

        <button  className="kyc-button" type="button" onClick={handleSubmit}>
          Créer KYC
        </button>
      </form>
    </div>
  );
};


