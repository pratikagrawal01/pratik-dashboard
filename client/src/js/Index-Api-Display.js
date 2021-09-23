import React from 'react';

import {CreateQueryObject, SyntaxHighlight , ValidateInputField , MakeApiCall, MakeIndexApiCall, MakeSearchApiCall,EnableSearch,GetIndexCount,CloseIcon,CopyText} from './Util';
import IosHelp from 'react-ionicons/lib/MdHelp';
import IosHeart from 'react-ionicons/lib/MdHeart';
import IosSearch from 'react-ionicons/lib/MdSearch';
import IosClose from 'react-ionicons/lib/MdClose';
import IosArrowRight from 'react-ionicons/lib/MdArrowDropright';
import CopyOutline from 'react-ionicons/lib/IosCopyOutline';
import '../css/sidebar.css';
import '../css/main.css';
    
function IndexApiDisplay(){
    return(
        <div className="api-display">
            <div className="sidebar">
                <nav>
                    <ul>
                        <li>
                            <a href="#">
                            <IosHeart color="red" fontSize="1.2rem" beat={true}/>Item<IosArrowRight color="white" fontSize=".8rem"/></a>
                                <ul className="sidebar-sub-menu">
                                    <li><a id="Item-Api" href="#" onClick={el => MakeIndexApiCall(el)}>Trigger Indexing</a></li>
                                    <li><a id="Item-Api-History" href="#" onClick={el => MakeIndexApiCall(el)}>Get Index History</a></li>
                                </ul>
                        </li>
                        <li><a href="#">Item-Location<IosArrowRight color="white" fontSize=".8rem"/></a>
                                <ul className="sidebar-sub-menu">
                                    <li><a id="Item-Location-Api" href="#" onClick={el => MakeIndexApiCall(el)}>Trigger Indexing</a></li>
                                    <li><a id="Item-Location-Api-History" href="#" onClick={el => MakeIndexApiCall(el)}>Get Index History</a></li>
                                </ul>
                        </li>
                        <li><a href="#">Item-Stage-Prop<IosArrowRight color="white" fontSize=".8rem"/></a>
                                <ul className="sidebar-sub-menu">
                                    <li><a id="Item-Stg-Live" href="#" onClick={el => MakeIndexApiCall(el)}>Trigger Stage Prop</a></li>
                                    <li><a id="Item-Stg-Live-History" href="#" onClick={el => MakeIndexApiCall(el)}>Get Index History</a></li>
                                </ul>
                        </li>
                        <li><a href="#">Location-Stage-Prop<IosArrowRight color="white" fontSize=".8rem"/></a>
                                <ul className="sidebar-sub-menu">
                                    <li><a id="Item-Location-Stg-Live" href="#" onClick={el => MakeIndexApiCall(el)}>Trigger Stage Prop</a></li>
                                    <li><a id="Item-Location-Stg-Live-History" href="#" onClick={el => MakeIndexApiCall(el)}>Get Index History</a></li>
                                </ul>
                        </li>
                        <li><a href="#" id="Mega-Menu" onClick={el => MakeIndexApiCall(el)}>Mega-Menu</a></li>
                        <li><a href="#" onClick={el => GetIndexCount(el)}>Lucid-Index-Size</a></li>
                        <li><a href="#" onClick={el => EnableSearch(el)}>Search-Query</a></li>
                        <li><a href="/about"><IosHelp color="white" fontSize="1.2rem" beat={true}/>About</a></li>   
                    </ul>
                </nav>
            </div>  
            <div className="index-search-box">
                <div className="index-search-box-move"> 
                    <div className="icon">
                        <IosClose color="Black" fontSize="1.5rem" onClick={(el) => CloseIcon(el)} />
                    </div>                   
                </div>
                <div className="index-search-query">
                        <input type="text" placeholder="_stage?q=kirkland&loc=847"/>
                        <IosSearch color="white" fontSize="1.7rem"  onClick={(el) => MakeSearchApiCall(el)} />
                </div>        
            </div>            
            <div className="lucid-output">	
                <div className="hidden-Response"></div>
                <div className ="tool-buttons">                    
                    <div className="tooltiptext">Copy</div>
                    <a href="#" onClick={el => CopyText(el)}><CopyOutline color="white" beat={true} fontSize="2.0rem"/></a>
                </div>
                <pre id="json-data">
                    <span>
                        <div className="errorMsg">
                            <span/>                           
                        </div>
                    </span>                        
                </pre>
            </div>
        </div>
    )
}

export default IndexApiDisplay;