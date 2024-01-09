import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Sidebar } from './Component/Sidebar.jsx';
import  {Dashboard}  from './Component/Dashboard/Dashboard.jsx';
import { SironeService } from './Component/SironeService/SironeService.jsx';
import { KycService } from './Component/KycService/KycService.jsx';
import { WalletService } from './Component/WalletService/WalletService.jsx';
import { TransferService } from './Component/TransferService/TransferService.jsx';
import { ProspectClient } from './Component/ProspectClient/prospectClient.jsx';
import { Login2 } from './Component/Login2/login2.jsx';
import { TNM } from './Component/TNM/TNM.jsx';
import { MayBeNavBar } from './Component/MayBeNaviBar/MayBeNavBar.jsx';
import { CreateAgent } from './Component/CreateAgent/CreateAgent.jsx';
import { ClientDetails } from './Component/Client_Details/clients_details.jsx';
import { KycList } from './Component/KYC_List/KycList.jsx';
import React, { useState } from 'react';

function App() {
  const [ isLoggedIn, setIsLoggedIn ] = useState(false);
  const [userRole, setUserRole] = useState('');

  const handleLogin = (role) => {
    // Logic to handle successful login
    setIsLoggedIn(true);
    setUserRole(role);
  };
  return (
    <BrowserRouter>
    {isLoggedIn ? (
      <Sidebar>
      
      <Routes>
      
        <Route path='/dashboard' element={<Dashboard/>} />
        <Route path='/sironeService' element={<SironeService/>} /> 
        <Route path='/kycService' element={<KycService/>} />
        <Route path='/walletService' element={<WalletService/>} /> 
        <Route path='/TransferService' element={<TransferService/>} /> 
        <Route path='/prospectClient' element={<ProspectClient/>} />
        <Route path='/TNM' element={<TNM/>} />
        <Route path='/clients_details' element={<ClientDetails/>} />
        <Route path='/kyclist' element={<KycList/>} />
        {userRole === 'ADMIN' && (
        <Route path='/createAgent' element={<CreateAgent/>} />
        )}
      </Routes>
      </Sidebar>
      ) : (
        
        <Login2 onLogin={handleLogin} />
      )}
    </BrowserRouter>
  );

  

}

export default App;