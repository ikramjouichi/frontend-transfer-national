import React, { useState } from 'react';
import '../TNM/TNM.css';
import axios from 'axios';

import user_icon from '../Assets/person.png';
import money_icon from '../Assets/money.png';
import transfert_icon from '../Assets/TransferType.png';
import id_icon from '../Assets/id.png';
import status_icon from '../Assets/status.png';
import fee_icon from '../Assets/fee.png';
import users_icon from '../Assets/users.png';
import Swal from 'sweetalert2';

export const TransferService = () => {
  const [serverMessage, setServerMessage] = useState("");
  
  
  const handleDownloadPdf = async (transferId) => {
    try {
      // Make a GET request to the PDF endpoint with the provided transferId
      const response = await axios.get(`http://localhost:8090/api/pdftransfer/pdf/${transferId}`, {
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
    sender: {
      type: '',
      id: '',
    },
    recipient: {
      type: '',
      id: '',
    },
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
      const handleCheckRecipient = async () => {
        console.log("Before sending data for check", transferData.senderID);
    
        try {
          // Make a GET request to check if the senderID is blacklisted
          const response = await axios.get(
            `http://localhost:8010/api/siron/is-blacklisted/${transferData.recipient.id}`
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

    // For nested properties like sender and recipient
    if (name.includes('.')) {
      const [outer, inner] = name.split('.');
      setTransferData({
        ...transferData,
        [outer]: {
          ...transferData[outer],
          [inner]: value,
        },
      });
    } else {
      setTransferData({ ...transferData, [name]: value });
    }
  };

  const handleSubmit = async () => {
    console.log('Transfer data  avant posting:', transferData);

    try {
      //console.log('data befor sending :', response.data);
      const response = await axios.post(
        'http://localhost:8090/api/transfer/create/1234567891',
        {
          transferType: transferData.transferType,
          amount: parseFloat(transferData.amount),
          status: transferData.status,
          sender: {
            type: transferData.sender.type,
            id: transferData.sender.id,
          },
          recipient: {
            type: transferData.recipient.type,
            id: transferData.recipient.id,
          },
          feesType: transferData.feesType || 'PENDING',
        }
      );
      // Extract the transferId from the response
    const transferId = response.data.transferId;

    console.log('Transfer reference:', transferId);
    console.log('Response data:', response.data);

    // Call the function to download the PDF with the extracted transferId
    Swal.fire({
      title: 'Transfer Successful!',
      text: 'Your transfer has been completed.',
      icon: 'success',
      confirmButtonText: 'OK',
      confirmButtonColor:'#0A779C'
    });
    handleDownloadPdf(transferId);

      console.log('Response data:', response.data);
      console.log('Response feesType:', response.data.feesType);
    } catch (error) {
      setServerMessage(
        "ERROR! Verify your informations..."
      );
      console.error('Error creating transfer:', error);
      if (error.response) {
        console.error('Response data feetype :', error.response.feesType);
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      } else if (error.request) {
        console.error('No response received. Request:', error.request);
      } else {
        console.error('Error setting up the request:', error.message);
      }
    }
  };

  return (
    <div className="container">
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
              <option value="CASH">CASH</option>
              <option value="DEBIT">DEBIT</option>
            </select>
          </div>
          <div className="input">
            <img src={money_icon} alt="" />
            <input
              type="text"
              placeholder="Amount"
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
              placeholder="Sender Type"
              name="sender.type"
              value={transferData.sender.type}
              onChange={handleChange}
            />
          </div>
          <div className="input">
            <img src={id_icon} alt="" />
            <input
              type="text"
              placeholder="Sender ID"
              name="sender.id"
              value={transferData.sender.id}
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
              placeholder="Recipient Type"
              name="recipient.type"
              value={transferData.recipient.type}
              onChange={handleChange}
            />
          </div>
          <div className='input'>
            <img src={users_icon} alt="" />
            <input
              type="text"
              placeholder="Recipient ID"
              name="recipient.id"
              value={transferData.recipient.id}
              onChange={handleChange}
            />
            <div className="submit_container">
                    <div className={"submit"} onClick={handleCheckRecipient} >
                            <>Check</>
                    </div>
                </div>
          </div>
          <div className="input">
            <img src={fee_icon} alt="" />
            <select
              className="input"
              name="feesType"
              value={transferData.feesType}
              onChange={handleChange}
            >
              <option value="ORDERINGCLIENT">ORDERINGCLIENT</option>
              <option value="BENEFITINGCLIENT">BENEFITINGCLIENT</option>
              <option value="SHARED">SHARED</option>
            </select>
          </div>
          <div className="submit-container">
            <div className="submit" onClick={handleSubmit}>
              <>Confirm</>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
