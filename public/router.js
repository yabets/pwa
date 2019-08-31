(function(){
    'use strict'
    window.onhashchange = function() { 
        let main = document.querySelector("main");
        if(location.hash === "#home") {
            main.innerHTML = "<name-display></name-display>";
        } else if(location.hash === "#favorites") {
            main.innerHTML = "<fav-orite></fav-orite>";
        } else if(location.hash === "#login") {
            main.innerHTML = "<log-in></log-in>";
        } else {
            main.innerHTML = "<name-display></name-display>"
        }
   }
})();