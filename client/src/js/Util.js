/**This is to create a request body for Lucide index api call to backend */
export const CreateQueryObject=(el) => {
    var element=el.target;
    var myObject = {};
    myObject['application']= findIdByText(document.querySelector("div.header-content a[id='Application']"));    
    myObject['environment']= findIdByText(document.querySelector("div.header-content a[id='Environment']"));
    var site = findIdByText(document.querySelector("div.header-content a[id='Site']"));
    myObject['site']= site.split('-')[0];
    myObject['location']= site.split('-')[1];
    myObject['api']= element.id;    
    myObject['queryParam']= document.querySelector('.index-search-query input').value;
    console.log(myObject);
    return myObject;    
}

/**This is to pretty print the JSON response from lucid with  colors */
export const SyntaxHighlight=(json) => {
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g, function (match) {
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

export const ValidateInputField=() => {
    try{
        findIdByText(document.querySelector("div.header-content a[id='Application']"));  
    }catch(err){
        document.querySelector('.lucid-output').querySelector('div.errorMsg span').innerHTML= "Error...!!Please Select the Application from the menu.";
        return false;
    }    
    try{
        findIdByText(document.querySelector("div.header-content a[id='Site']"));    
    }catch(err){
        document.querySelector('.lucid-output').querySelector('div.errorMsg span').innerHTML= "Error...!!Please Select the Site from the menu";
        return false;
    }
    try{
        findIdByText(document.querySelector("div.header-content a[id='Environment']")); 
    }catch(err){
        document.querySelector('.lucid-output').querySelector('div.errorMsg span').innerHTML= "Error...!!Please Select the Environment from the menu.";
        return false;
    }
    return true;
}

function findIdByText(el){
    var element =null;
    el.closest("li").querySelector('ul').querySelectorAll('a').forEach((elem) => {
        if(elem.text===el.text) {
            element=elem;
        }
    });
    return element.id;
}

export const EnableSearch = el => {  
    //document.querySelector('.lucid-output').querySelector('span').innerHTML="";
    document.querySelector('.index-search-box').style.display="block";
}

export const CloseIcon = el => {
    document.querySelector('.index-search-box').style.display="none";
}

export const CopyText = el => {
    navigator.clipboard.writeText(document.querySelector('.lucid-output').querySelector('.hidden-Response').innerHTML);
}

export const MakeApiCall = el => {  
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
        result.json().then((resp)=>{
           document.querySelector('.lucid-output').querySelector('span').innerHTML=SyntaxHighlight(resp);
           document.querySelector('.lucid-output').querySelector('.hidden-Response').innerHTML=resp;
           if(resp=='Authentication Failure'){
                window.location.replace("/login");
           }
       })       
       document.querySelector('.lucid-output').querySelector('.tool-buttons').style.display="block";
       document.querySelector('body').classList.remove('overlay');
   }).catch(err=>{
        document.querySelector('body').classList.remove('overlay');
        console.log(err);   
        document.querySelector('.lucid-output').querySelector('.tool-buttons').style.display="none";        
   })
}

export const MakeIndexApiCall = el => {  
    document.querySelector('.index-search-box').style.display="none";
    MakeApiCall(el);
} 

export const MakeSearchApiCall = el => {   
    el.target.id='Query';   
    MakeApiCall(el);
}

