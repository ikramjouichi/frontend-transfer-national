import React, { children, useState } from 'react'
import { FaBars, FaHome,FaUsers,FaUsersSlash ,FaWallet} from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import { CgArrowsExchangeAltV } from "react-icons/cg";
import { PiUsersFourLight } from "react-icons/pi";
import { MdOutlineRealEstateAgent } from "react-icons/md";

export const Sidebar = ({children , userRole}) => {
    const [ isLoggedIn, setIsLoggedIn ] = useState(false);
  /*const [userRole, setUserRole] = useState('');

  const handleLogin = (role) => {
    // Logic to handle successful login
    setIsLoggedIn(true);
    setUserRole(role);}*/

  const[isOpen , setIsOpen]=useState(false);
  const toggle = () =>setIsOpen(!isOpen)
  const menuItem=[
    {
        path:"/dashboard",
        name:"Home",
        icon:<FaHome />

    },
    {
        path:"/sironeService",
        name:"Sirone Service",
        icon:<FaUsersSlash/>
    },
    {
        path:"/kyclist",
        name:"KYC Service",
        icon:<FaUsers/>
    },
    {
        path:"/walletService",
        name:"Wallet Service",
        icon:<FaWallet />
    },
    {
        path:"/TransferService",
        name:"Transfer Service",
        icon:<CgArrowsExchangeAltV />

    },
    {
        path:"/TNM",
        name:"Multiple Transfer",
        icon:<PiUsersFourLight />
    },
    {
        path:"/CreateAgent",
        name:"Create Agent",
        icon:<MdOutlineRealEstateAgent  />,
        roles: ["ADMIN"],

    }
    
  ]
  return (
    <div className='container'>
        <div style={{width: isOpen ? "200px" : "50px"}} className='sidebar'>
            <div className='top_section'>
                <h1 style={{display: isOpen ? "block" : "none"}} className='logo'></h1>
                <div style={{marginLeft : isOpen ? "50px" : "0px"}} className='bars'>
                    <FaBars onClick={toggle}/>
                </div>
            </div>
            {
                menuItem.map((item,index)=>(
                    // Ajoutez la condition pour vérifier le rôle avant d'afficher le lien
                    (!item.showForRoles || item.showForRoles.includes(userRole)) &&(
                    <NavLink to={item.path} key={index} className="link" activeClassName="active">
                        <div className='icon'>{item.icon}</div>
                        <div style={{display: isOpen ? "block" : "none"}} className='link_text'>{item.name}</div>
                    </NavLink>
                ))
                )
            }
        </div>
        <main>{children}</main>
    </div>
  );
};
export default Sidebar;

/*
,
    {
        path:"/CreateAgent",
        name:"Create Agent",
        icon:<MdOutlineRealEstateAgent  />

    }
*/