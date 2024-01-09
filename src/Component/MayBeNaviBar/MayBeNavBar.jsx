import React, {useEffect,useState} from 'react'
import {useLocation} from 'react-router-dom'

export const MayBeNavBar = ({children}) => {
    const location=useLocation();
    const [showNavBar,setShowNavBar] = useState(false);
    useEffect(()=>{
        console.log('this is location ', location)
        if(location.pathname==='/'){
            setShowNavBar(false);
        } else {
            setShowNavBar(true);
        }
    },[location])
  return (
    <div>{ showNavBar && children}</div>
  )
}
