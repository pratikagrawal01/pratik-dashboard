import React from 'react';
import '../css/header.css';
import Logo from '../images/Costco_Logo.png';
import Apps_Logo from '../images/App_icon.svg'

function Header(){

    
    return(
        <div className="header-content">    
            <div className="apps-logo">
                <img src={Apps_Logo} alt="logo" />   
            </div>
            <div className="logo-container">
                <img src={Logo} alt="logo" />   
            </div>         
        </div>
    )
}

export default Header;