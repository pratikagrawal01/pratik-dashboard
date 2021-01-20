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

/**This is to initiate and bind action buttons*/
function Init(){
    Init_Nav_Link();    
}
export default Init;
