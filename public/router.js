(function(){
    'use strict'
    window.onhashchange = function() { 
        let main = document.querySelector("main");
        if(location.hash === "#home") {
            console.log("was here home");
            main.innerHTML = "<name-display></name-display>";
            console.log("value: ", main.innerHTML)
        } else if(location.hash === "#favorites") {
            console.log("was here favorite");
            main.innerHTML = "<fav-orite></fav-orite>";
            console.log("value: ", main.innerHTML)
        } else if(location.hash === "#login") {
            console.log("was here login");
            main.innerHTML = "<log-in></log-in>";
            console.log("value: ", main.innerHTML)
        } else {
            console.log("in else")
            main.innerHTML = "<name-display></name-display>"
        }
   }
})();