import React from 'react';


/**This is to create a request body for Lucide index api call to backend */
export const CreateQueryObject=(el) => {
    var element=el.target;
    var site_element=document.querySelector('div.site-links >a.active');
    var appliaction_element=document.querySelector('div.api-links >a.active');
    var env_element=document.querySelector('div.env-links >a.active');
    var location_element = element.closest('div.index-api-display').querySelector('a.location');   
    var query_element=element.closest('div.index-api-display').querySelector('.input-param');    
    var myObject = {};
    myObject['application'] = appliaction_element.innerHTML;
    myObject['site'] = site_element.innerHTML;
    myObject['environment'] = env_element.innerHTML;
    myObject['location'] = location_element.innerHTML;
    myObject['api'] = element.id;
    myObject['queryparam'] = query_element.value;
    return myObject;    
}

/**This is to pretty print the JSON response from lucid with  colors */
export const SyntaxHighlight=(json) => {
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
