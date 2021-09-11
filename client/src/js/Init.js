import Cookies from 'js-cookie';

import '../css/main.css';

/**This is to bind navigation link in the Index Api page for focus-unfocus*/
function Init_Nav_Link(){
    const setActive = el => {
        [...el.parentElement.children].forEach(sib => sib.classList.remove('active'))
        el.classList.add('active')    
    }
  
    const a_click= [...document.body.querySelectorAll('a.nav-link')];
    a_click.forEach(el => el.addEventListener('click', e=> setActive(el)))
}

/*This will fetch the user details from cookes and set the user profile*/
function SetUserName(){
    const userName= Cookies.get('auth-user');
    const userImg= Cookies.get('auth-picture');
    const userEmail= Cookies.get('auth-email');
    if(userName){
        document.querySelector(".header-content .profile").style.display="none";  
        document.querySelector(".header-content .profile").style.opacity="0";
        document.querySelector(".header-content .profile-logged-in").style.display="flex";       
        document.querySelector(".header-content .profile-logged-in").style.opacity="1"; 
        if(userName){
            document.querySelector(".header-content .profile-logged-in div.profileFullName").innerHTML=userName; 
        }
        if(userEmail){
            document.querySelector(".header-content .profile-logged-in div.profileEmail").innerHTML=userEmail; 
        }
        if(userImg){
            document.querySelector(".header-content .profile-image").style.background=`url(${userImg})`;
            document.querySelector(".header-content .profile-image").style.backgroundSize='contain';
        }
    }else {
        document.querySelector(".header-content .profile-logged-in").style.display="none";  
        document.querySelector(".header-content .profile-logged-in").style.opacity="0";
        document.querySelector(".header-content .profile").style.display="flex"; 
        document.querySelector(".header-content .profile").style.opacity="1"; 
    }    
    console.log(userName);
}


/**This is to initiate and bind action buttons*/
function Init(){
    Init_Nav_Link();    
    SetUserName();
    drag();
}

function drag(){
    dragElement(document.querySelector("div.index-search-box"));

    function dragElement(elmnt) {
        var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;        
        document.querySelector("div.index-search-box-move").onmousedown = dragMouseDown;
        

        function dragMouseDown(e) {
            e = e || window.event;
            e.preventDefault();            
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            document.onmousemove = elementDrag;
        }

        function elementDrag(e) {
            e = e || window.event;
            e.preventDefault();
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
            elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
        }

        function closeDragElement() {
            document.onmouseup = null;
            document.onmousemove = null;
        }
    }

}



export default Init;
