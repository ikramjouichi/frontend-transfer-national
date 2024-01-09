import React from 'react'
import './TNM.css'
import  { useState } from 'react';
import axios from 'axios';

import user_icon from '../Assets/person.png'
import money_icon from '../Assets/money.png'
import transfert_icon from '../Assets/TransferType.png'
import id_icon from '../Assets/id.png'
import status_icon from '../Assets/status.png'
import fee_icon from '../Assets/fee.png'
import users_icon from '../Assets/users.png'
import Swal from 'sweetalert2';




export const TNM = () => {
  const [serverMessage, setServerMessage] = useState("");
  
    const handleDownloadPdf = async (transferId) => {
        try {
          // Make a GET request to the PDF endpoint with the provided transferId
          const response = await axios.get(`http://localhost:8090/api/pdftransfer/pdftransferMultiple/${transferId}`, {
            responseType: 'blob', // Set the responseType to 'blob' for binary data
          });
      
          // Create a blob from the response data
          const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
      
          // Create a link element to download the PDF
          const link = document.createElement('a');
          link.href = window.URL.createObjectURL(pdfBlob);
          link.download = `transferPdf_${transferId}.pdf`; // Use the transferId in the file name
          link.click();
      
          // Clean up
          window.URL.revokeObjectURL(link.href);
        } catch (error) {
          console.error('Error downloading PDF:', error);
        }
      };
    const [transferData, setTransferData] = useState({
        transferType: '',
        amount: '',
        status: '',
        senderType: '',
        senderID: '',
        recipientIDs:  [],
        feesType: '',
      });
    

      const handleCheck = async () => {
        console.log("Before sending data for check", transferData.senderID);
    
        try {
          // Make a GET request to check if the senderID is blacklisted
          const response = await axios.get(
            `http://localhost:8010/api/siron/is-blacklisted/${transferData.senderID}`
          );
    
          const isBlacklisted = response.data;
    
          console.log("Is Blacklisted:", isBlacklisted);
    
          // You can handle the response as needed, for example, show a message or update the UI.
          if (isBlacklisted) {
            alert("Sender is blacklisted!");
          } else {
            alert("Sender is not blacklisted.");
          }
        } catch (error) {
          console.error("Error checking sender:", error);
        }
      };

      const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'recipientIDs') {
          const recipientsArray = value.split(',');
          setTransferData({ ...transferData, [name]: recipientsArray });
        } else if (name === 'senderID') {  // Correction du nom du champ
          setTransferData({ ...transferData, senderID: value });
        } else {
          setTransferData({ ...transferData, [name]: value });
        }
      };
      
      /*const handleChange = (e) => {
        const { name, value, options } = e.target;
        const selectedValues = Array.from(options)
          .filter((option) => option.selected)
          .map((option) => option.value);
      
        if (name === 'recipientIDs') {
          setTransferData({ ...transferData, [name]: selectedValues });
        } else {
          setTransferData({ ...transferData, [name]: value });
        }
      };*/
    
      const handleSubmit = async () => {
        console.log("avant envoi de donnee"+transferData.amount)
        console.log("avant envoi de donnee status"+transferData.status)
        console.log("avant envoi de donnee senderid"+transferData.senderID)
        console.log("avant envoi de donnee"+transferData.senderType)
        console.log("avant envoi de donneetransferType"+transferData.transferType)
        console.log("avant envoi de donnee feetype"+transferData.feesType)
        console.log("avant envoi de donnee"+transferData.recipientIDs)
        console.log("transfer data:", transferData);

        try {
          const response = await axios.post(
            'http://localhost:8090/api/transfer/createTransferMultiple/1234567891',
            {
                transferType: transferData.transferType,
                amount: parseFloat(transferData.amount), // Assurez-vous que c'est un nombre
                status: transferData.status,
                sender: {
                  type: transferData.senderType,
                  id: transferData.senderID
                },
                recipientId: transferData.recipientIDs,
                feesType: transferData.feesType
              }
        
          );
          const transferId = response.data.transferId;
          console.log("transfer reference:", transferId);
          Swal.fire({
            title: 'Multiple Transfer Successful!',
            text: 'Your transfer has been completed.',
            icon: 'success',
            confirmButtonText: 'OK',
            confirmButtonColor:'#0A779C'
          });

          handleDownloadPdf(transferId);
          console.log("transfer data:", transferData);
          console.log("voici mon response.data");
          console.log(response.data); // log the response if needed
        } catch (error) {
          setServerMessage(
            "ERROR! Verify your informations..."
          );
            console.error('Error creating transfer:', error);
            if (error.response) {
                // La requête a été faite et le serveur a répondu avec un statut différent de 2xx
                console.error('Response data:', error.response.data);
                console.error('Response status:', error.response.status);
                console.error('Response headers:', error.response.headers);
            } else if (error.request) {
                // La requête a été faite mais aucune réponse n'a été reçue
                console.error('No response received. Request:', error.request);
            } else {
                // Une erreur s'est produite lors de la configuration de la requête
                console.error('Error setting up the request:', error.message);
            }
        }
      };

    return(
        <div className='container'>
      <div className="header">
        <div className="text">Enter informations</div>
        <div>check client if blacklisted!</div>
        <div className="underline"></div>
        <p>{serverMessage}</p>
        <div className="inputs">
          <div className="input">
            <img src={transfert_icon} alt="" />
            <select
              className="input"
              name="transferType"
              value={transferData.transferType}
              onChange={handleChange}
            >
            <option value="">Select a Type</option>
              <option value="CASH">CASH</option>
              <option value="DEBIT">DEBIT</option>
            </select>
          </div>
          <div className="input">
            <img src={money_icon} alt="" />
            <input
              type="text"
              placeholder='Amount'
              name="amount"
              value={transferData.amount}
              onChange={handleChange}
            />
          </div>
          <div className="input">
            <img src={status_icon} alt="" />
            <select
              className="input"
              name="status"
              value={transferData.status}
              onChange={handleChange}
            >
               <option value="">Select an option</option>
              <option value="PENDING">PENDING</option>
              <option value="COMPLETED">COMPLETED</option>
              <option value="FAILED">FAILED</option>
              <option value="CANCELED">CANCELED</option>
              <option value="BLOCKED">BLOCKED</option>
              <option value="UNBLOCKED">UNBLOCKED</option>
              <option value="EXPIRED">EXPIRED</option>
            </select>
          </div>
                <div className="input">
                        <img src={user_icon} alt="" />
                        <input
                            type="text"
                            placeholder='Sender Type' 
                            name="senderType"  // Correction du nom de l'attribut
                            value={transferData.senderType}
                            onChange={handleChange}
                        />
                </div>
                    <div className="input">
                        <img src={id_icon} alt="" />
                        <input
                        type="text"
                        placeholder='Sender ID'
                        name="senderID"  // Utilisez le même nom que celui attendu par le serveur
                        value={transferData.senderID}
                        onChange={handleChange}
                        />
    
                    <div className="submit_container">
                    <div className={"submit"} onClick={handleCheck} >
                            <>Check</>
                    </div>
                </div>
                        
                    </div>
                    <div className="input">
                        <img src={users_icon} alt="" />
                        <input
                            type="text"
                            name="recipientIDs"
                            value={transferData.recipientIDs.join(',')} // Transforme le tableau en chaîne
                            onChange={handleChange}
                            placeholder='Recipient ID (comma-separated)'
                            />
                    </div>
                    <div className="input">
                        <img src={fee_icon} alt="" />
                        <select className="input"
                            name="feesType"
                            value={transferData.feesType}
                            onChange={handleChange}>
                            <option value="">Select a Type</option>
                            <option value="ORDERINGCLIENT">ORDERINGCLIENT</option>
                            <option value="BENEFITINGCLIENT">BENEFITINGCLIENT</option>
                            <option value="SHARED">SHARED</option>

                        </select>

                    </div>
                    <div className="submit-container">
                    <div className={"submit"} onClick={handleSubmit}>
                            <>Confirm</>
                    </div>
                </div>
    
                </div>
    

            </div>

        </div>
    )
}
