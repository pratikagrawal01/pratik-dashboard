import React from 'react';

import {CreateQueryObject, SyntaxHighlight} from './Util';
import IosHelp from 'react-ionicons/lib/MdHelp';
import IosHeart from 'react-ionicons/lib/MdHeart';
import IosEye from 'react-ionicons/lib/MdEye';
import IosArrowRight from 'react-ionicons/lib/MdArrowDropright';
import '../css/sidebar.css';
    

const makeApiCall = el => {          
    document.querySelector('body').classList.add('overlay');
    fetch('/api/lcudiApi', {
       method:'POST',
       dataType:'jsonp',
       headers:{
           "Content-Type": "application/json"
       },
       body:JSON.stringify(CreateQueryObject(el))
    }).then((result)=>{
        document.querySelector('body').classList.remove('overlay');
        result.json().then((resp)=>{
           document.querySelector('.lucid-output').querySelector('span').innerHTML=SyntaxHighlight(resp);
           if(resp=='Authentication Failure'){
                window.location.replace("/login");
           }
       })
   }).catch(err=>{
        document.querySelector('body').classList.remove('overlay');
        console.log(err);           
   })
}

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
                                    <li><a id="Item-Api" href="#" onClick={el => makeApiCall(el)}>Trigger Indexing</a></li>
                                    <li><a id="Item-Api-History" href="#" onClick={el => makeApiCall(el)}>Get Index History</a></li>
                                </ul>
                        </li>
                        <li><a href="#"><i className="fas fa-qrcode"></i>Item-Location<IosArrowRight color="white" fontSize=".8rem"/></a>
                                <ul className="sidebar-sub-menu">
                                    <li><a id="Item-Location-Api" href="#" onClick={el => makeApiCall(el)}>Trigger Indexing</a></li>
                                    <li><a id="Item-Location-Api-History" href="#" onClick={el => makeApiCall(el)}>Get Index History</a></li>
                                </ul>
                        </li>
                        <li><a href="#"><i className="fas fa-qrcode"></i>Item-Stage-Prop<IosArrowRight color="white" fontSize=".8rem"/></a>
                                <ul className="sidebar-sub-menu">
                                    <li><a id="Item-Stg-Live" href="#" onClick={el => makeApiCall(el)}>Trigger Stage Prop</a></li>
                                    <li><a id="Item-Stg-Live-History" href="#" onClick={el => makeApiCall(el)}>Get Index History</a></li>
                                </ul>
                        </li>
                        <li><a href="#"><i className="fas fa-qrcode"></i>Location-Stage-Prop<IosArrowRight color="white" fontSize=".8rem"/></a>
                                <ul className="sidebar-sub-menu">
                                    <li><a id="Item-Location-Stg-Live" href="#" onClick={el => makeApiCall(el)}>Trigger Stage Prop</a></li>
                                    <li><a id="Item-Location-Stg-Live-History" href="#" onClick={el => makeApiCall(el)}>Get Index History</a></li>
                                </ul>
                        </li>
                        <li><a href="#"><i className="fas fa-qrcode"></i>Mega-Menu</a></li>
                        <li><a href="#"><i className="fas fa-qrcode"></i>Search-Query</a></li>
                        <li><a href="#"><IosHelp color="white" fontSize="1.2rem" beat={true}/>About</a></li>   
                    </ul>
                </nav>
            </div>
            <div className="lucid-output">	
               <pre id="json-data">
                   <span/>                        
                </pre>
            </div>
        </div>
    )
}


  

export default IndexApiDisplay;