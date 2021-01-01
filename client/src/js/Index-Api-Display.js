import React from 'react';

import {CreateQueryObject, SyntaxHighlight} from './Util';

import '../css/main.css';
    

const makeApiCall = el => {        
    document.querySelector('body').classList.add('overlay');
    fetch('/lcudiApi', {
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

function IndexApiBuild(props){  

    return(       
            <div className="index-api-display">	
                <div className="location-links">
				  <a className="nav-link location" href="#home">{props.site}</a>
				</div>
                <div className="index-api">	
                    <a href="#" onClick={(el)=> makeApiCall(el)} className="action-button shadow animate red" id="Item API">Item API</a>
                    <a href="#" onClick={(el)=> makeApiCall(el)} className="action-button shadow animate red" id="Location API">Location API</a>
                </div>
                <div className="stage-live-api">
                    <a href="#" onClick={(el)=> makeApiCall(el)} className="action-button shadow animate red" id="Item Stg-Live">Item Stg-Live</a>
                    <a href="#" onClick={(el)=> makeApiCall(el)} className="action-button shadow animate red" id="Location Stg-Live">Location Stg-Live</a>
                </div>
                <div className="index-api-history">	
                    <a href="#" onClick={(el)=> makeApiCall(el)} className="action-button shadow animate green" id="Item API History">Item API History</a>
                    <a href="#" onClick={(el)=> makeApiCall(el)} className="action-button shadow animate green" id="Location History">Location History</a>
                </div>
                <div className="stage-live-api-history">
                    <a href="#" onClick={(el)=> makeApiCall(el)} className="action-button shadow animate green" id="Item Stg-Live History">Item Stg-Live History</a>
                    <a href="#" onClick={(el)=> makeApiCall(el)} className="action-button shadow animate green" id="Location Stg-Live History">Loc Stg-Live History</a>
                </div>
                <div className="index-input-param">
                    <input className="input-param" type="text" id="queryParam" placeholder="_stage?q=kirkland&loc=847" />
                </div>
                <div className="index-query-button">
                     <a href="#" onClick={(el)=> makeApiCall(el)} className="action-button shadow animate green" id="Query">Query</a>
                </div>
            </div>
    )
}
function IndexApiDisplay(){
    return(
        <div className="api-display">
            <div className="api-body-main">
                <IndexApiBuild site="US"/>
                <br/><br/>
                <IndexApiBuild site="CA"/>               
            </div>
            <div className="lucid-output">	
               <pre id="json-data">
                   <span>
                        Response from the Lucid API will be displayed here.</span>
                </pre>
            </div>
        </div>
    )
}


  

export default IndexApiDisplay;