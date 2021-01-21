import React from 'react';

import {CreateQueryObject, SyntaxHighlight , ValidateInputField} from './Util';
import IosHelp from 'react-ionicons/lib/MdHelp';
import IosHeart from 'react-ionicons/lib/MdHeart';
import IosSearch from 'react-ionicons/lib/MdSearch';
import IosArrowRight from 'react-ionicons/lib/MdArrowDropright';
import '../css/sidebar.css';
    

const makeApiCall = el => {  
    if(!ValidateInputField()){
        return;
    }        
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

const makeIndexApiCall = el => {  
    document.querySelector('.index-search-box').style.display="none";
    makeApiCall(el);
} 

const makeSearchApiCall = el => {   
    el.target.id='Query';   
    makeApiCall(el);
}

const enableSearch = el => {  
    //document.querySelector('.lucid-output').querySelector('span').innerHTML="";
    document.querySelector('.index-search-box').style.display="block";
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
                                    <li><a id="Item-Api" href="#" onClick={el => makeIndexApiCall(el)}>Trigger Indexing</a></li>
                                    <li><a id="Item-Api-History" href="#" onClick={el => makeIndexApiCall(el)}>Get Index History</a></li>
                                </ul>
                        </li>
                        <li><a href="#">Item-Location<IosArrowRight color="white" fontSize=".8rem"/></a>
                                <ul className="sidebar-sub-menu">
                                    <li><a id="Item-Location-Api" href="#" onClick={el => makeIndexApiCall(el)}>Trigger Indexing</a></li>
                                    <li><a id="Item-Location-Api-History" href="#" onClick={el => makeIndexApiCall(el)}>Get Index History</a></li>
                                </ul>
                        </li>
                        <li><a href="#">Item-Stage-Prop<IosArrowRight color="white" fontSize=".8rem"/></a>
                                <ul className="sidebar-sub-menu">
                                    <li><a id="Item-Stg-Live" href="#" onClick={el => makeIndexApiCall(el)}>Trigger Stage Prop</a></li>
                                    <li><a id="Item-Stg-Live-History" href="#" onClick={el => makeIndexApiCall(el)}>Get Index History</a></li>
                                </ul>
                        </li>
                        <li><a href="#">Location-Stage-Prop<IosArrowRight color="white" fontSize=".8rem"/></a>
                                <ul className="sidebar-sub-menu">
                                    <li><a id="Item-Location-Stg-Live" href="#" onClick={el => makeIndexApiCall(el)}>Trigger Stage Prop</a></li>
                                    <li><a id="Item-Location-Stg-Live-History" href="#" onClick={el => makeIndexApiCall(el)}>Get Index History</a></li>
                                </ul>
                        </li>
                        <li><a href="#">Mega-Menu</a></li>
                        <li><a href="#" onClick={el => enableSearch(el)}>Search-Query</a></li>
                        <li><a href="#"><IosHelp color="white" fontSize="1.2rem" beat={true}/>About</a></li>   
                    </ul>
                </nav>
            </div>  
            <div className="index-search-box">
                <div className="index-search-box-move">                    
                </div>
                <div className="index-search-query">
                        <input type="text" placeholder="_stage?q=kirkland&loc=847"/>
                        <IosSearch color="white" fontSize="1.7rem"  onClick={(el) => makeSearchApiCall(el)} />
                </div>        
            </div>            
            <div className="lucid-output">	
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