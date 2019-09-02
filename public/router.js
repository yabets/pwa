(function(){
    'use strict'
    const main = document.querySelector("main");
    const nav = document.querySelector("nav-bar");
    window.onhashchange = () => { 
        changeContent();
   }
   window.onload = () => {
        changeContent();
   }

   const changeContent = () => {
        if(location.hash === "#home") {
            main.innerHTML = "<home-search></home-search>";
        } else if(location.hash === "#favorites") {
            main.innerHTML = "<fav-orite></fav-orite>";
        } else if(location.hash === "#login") {
            main.innerHTML = "<log-in></log-in>";
        } else {
            main.innerHTML = "<name-display></name-display>"
        }
        nav.setAttribute('active', location.hash);
   }
})()