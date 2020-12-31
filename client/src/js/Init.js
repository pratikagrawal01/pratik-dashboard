import React from 'react';

/**This is to bind navigation link in the Index Api page for focus-unfocus*/
function Init_Nav_Link(){
    const setActive = el => {
        [...el.parentElement.children].forEach(sib => sib.classList.remove('active'))
        el.classList.add('active')    
    }
  
    const a_click= [...document.body.querySelectorAll('a.nav-link')];
    a_click.forEach(el => el.addEventListener('click', e=> setActive(el)))
}

/**This is to bind action-bution to make a backend api call to node server */
function Init_Action_Button(){
    const makeApiCall = el => {
       fetch('/lcudiApi', {
           method:'POST',
           dataType:'jsonp',
           headers:{
               "Content-Type": "application/json"
           },
           body:JSON.stringify(CreateQueryObject(el))
       }).then((result)=>{
           result.json().then((resp)=>{
               document.querySelector('.lucid-output').querySelector('span').innerHTML=SyntaxHighlight(resp);
               if(resp=='Authentication Failure'){
                    window.location.replace("/login");
               }
           })
       }).catch(err=>{
           console.log(err);           
       })
    }
  
    const a_click= [...document.body.querySelectorAll('a.action-button')];
    a_click.forEach(el => el.addEventListener('click', e=> makeApiCall(el)))
}


/**This is to initiate and bind action buttons*/
function Init(){
    Init_Nav_Link();
    Init_Action_Button();
}

/**This is to create a request body for Lucide index api call to backend */
function CreateQueryObject(el){
    var site_element=document.querySelector('div.site-links >a.active');
   // var appliaction_element=document.querySelector('div.api-links >a.active');
    var env_element=document.querySelector('div.env-links >a.active');
    var location_element = el.closest('div.index-api-display').querySelector('a.location');    
    var api_element=el;
    var query_element=el.closest('div.index-api-display').querySelector('.input-param');    
    var myObject = {};
    myObject['application'] = 'api';//appliaction_element.innerHTML;
    myObject['site'] = site_element.innerHTML;
    myObject['environment'] = env_element.innerHTML;
    myObject['location'] = location_element.innerHTML;
    myObject['api'] = api_element.id;
    myObject['queryparam'] = query_element.value;
    return myObject;    
}

/**This is to pretty print the JSON response from lucid with  colors */
function SyntaxHighlight(json) {
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        var cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key';
            } else {
                cls = 'string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
}

export default Init;
