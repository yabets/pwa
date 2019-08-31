(function(){
    'use strict'
    window.onhashchange = function() { 
        let main = document.querySelector("main");
        let nav = document.querySelector("nav-bar");

        if(location.hash === "#home") {
            main.innerHTML = "<name-display></name-display>";
            // selecting menu
            nav.shadowRoot.querySelector("a[href='#home']").classList.toggle("active");
            nav.shadowRoot.querySelector("a[href='#favorites']").classList.remove("active");
            nav.shadowRoot.querySelector("a[href='#login']").classList.remove("active");
        } else if(location.hash === "#favorites") {
            main.innerHTML = "<fav-orite></fav-orite>";
            // selecting menu
            nav.shadowRoot.querySelector("a[href='#favorites']").classList.toggle("active");
            nav.shadowRoot.querySelector("a[href='#home']").classList.remove("active");
            nav.shadowRoot.querySelector("a[href='#login']").classList.remove("active");
        } else if(location.hash === "#login") {
            main.innerHTML = "<log-in></log-in>";
            // selecting menu
            nav.shadowRoot.querySelector("a[href='#login']").classList.toggle("active");            
            nav.shadowRoot.querySelector("a[href='#home']").classList.remove("active");
            nav.shadowRoot.querySelector("a[href='#favorites']").classList.remove("active");
        } else {
            main.innerHTML = "<name-display></name-display>"
            // selecting menu
            nav.shadowRoot.querySelector("a[href='#home']").classList.toggle("active");
            nav.shadowRoot.querySelector("a[href='#favorites']").classList.remove("active");
            nav.shadowRoot.querySelector("a[href='#login']").classList.remove("active");
        }
   }
})();