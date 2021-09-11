import React , {useState} from 'react';
import IosArrowDown from 'react-ionicons/lib/MdArrowDropdown';
import IosArrowRight from 'react-ionicons/lib/MdArrowDropright';
import IosContact from 'react-ionicons/lib/MdContact';
import '../css/header.css';
import Logo from '../images/Costco_Logo.png';
import Apps_Logo from '../images/App_icon.svg'

function Header(){

    const[Api, setApi] = useState(() => {return 'Application'});
    const[Site, setSite] = useState(() => {return 'Site'});
    const[Environment, setEnvironment] = useState(() => {return 'Environment'});
    
    return(
        <div className="header-content">  
            <div className="logo-container">
                <img src={Logo} alt="logo" />   
            </div>   
            <nav>
                <ul className="nav-menu">
                    <li> 
                        <a id="Application" href="#">{Api}<IosArrowDown color="white" fontSize=".8rem"/></a>
                        <ul className="nav-sub-menu">
                            <li><a id="API" href="#" onClick={e =>setApi(e.target.text)}>Index</a></li>
                            <li><a id="Config" href="/config" onClick={e =>setApi(e.target.text)}>Config</a></li>
                        </ul>
                    </li>
                    <li> 
                        <a id="Site" href="#">{Site}<IosArrowDown color="white" fontSize=".8rem"/></a>
                        <ul className="nav-sub-menu">
                            <li><a id="BC" href="#">BC<IosArrowRight color="white" fontSize=".8rem"/></a>
                                <ul className="nav-sub-menu">
                                    <li><a id="BC-US" href="#" onClick={e =>setSite(e.target.text)}>BC-US</a></li>
                                    <li><a id="BC-CA" href="#" onClick={e =>setSite(e.target.text)}>BC-CA</a></li>
                                </ul>
                            </li>                            
                            <li><a id="BD" href="#">BD<IosArrowRight color="white" fontSize=".8rem"/></a>
                                <ul className="nav-sub-menu">
                                    <li><a id="BD-US" href="#" onClick={e =>setSite(e.target.text)}>BD-US</a></li>
                                    <li><a id="BD-CA" href="#" onClick={e =>setSite(e.target.text)}>BD-CA</a></li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                    <li> 
                        <a id="Environment" href="#">{Environment}<IosArrowDown color="white" fontSize=".8rem"/></a>
                        <ul className="nav-sub-menu">
                            <li><a id="DEV" href="#" onClick={e =>setEnvironment(e.target.text)}>DEV</a></li>
                            <li><a href="#">DIT<IosArrowRight color="white" fontSize=".8rem"/></a>
                                <ul className="nav-sub-menu">
                                    <li><a id="DIT1" href="#" onClick={e =>setEnvironment(e.target.text)}>DIT1</a></li>
                                    <li><a id="DIT2" href="#" onClick={e =>setEnvironment(e.target.text)}>DIT2</a></li>
                                </ul>
                            </li>
                            <li><a href="#">QA<IosArrowRight color="white" fontSize=".8rem"/></a>
                                <ul className="nav-sub-menu">
                                    <li><a id="QA1" href="#" onClick={e =>setEnvironment(e.target.text)}>QA1</a></li>
                                    <li><a id="QA2" href="#" onClick={e =>setEnvironment(e.target.text)}>QA2</a></li>
                                    <li><a id="QA3" href="#" onClick={e =>setEnvironment(e.target.text)}>QA3</a></li>
                                    <li><a id="QA4" href="#" onClick={e =>setEnvironment(e.target.text)}>QA4</a></li>
                                    <li><a id="QA5" href="#" onClick={e =>setEnvironment(e.target.text)}>QA5</a></li>
                                </ul>
                            </li>
                            <li><a id="PERF" href="#" onClick={e =>setEnvironment(e.target.text)}>PERF</a></li>
                            <li><a id="PROD" href="#" onClick={e =>setEnvironment(e.target.text)}>PROD</a></li>
                        </ul>
                    </li>
                </ul> 
            </nav>
            <div className="profile">
                <span />
                <IosContact color="white" fontSize="3rem"/>
            </div> 
            <div className="profile-logged-in">
                <img src={Logo} alt="logo" />
                <div className="profile-image">                    
                </div>
                <div className="profileDetails">
                    <div className="googleAccount">Google Account</div>
                    <div className="profileFullName"></div>
                    <div className="profileEmail"></div>
                </div>
            </div>
        </div>
    )
}

export default Header;