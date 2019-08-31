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

    // loading json from given url
    function loadJSON(path, success, error)
    {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function()
        {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    if (success)
                        success(JSON.parse(xhr.responseText));
                } else {
                    if (error)
                        error(xhr);
                }
            }
        };
        xhr.open("GET", path, true);
        xhr.send();
    }


    loadJSON('http://localhost:3000/names',
        function(data) { 
            var favorites =  data.filter((value)=>{
                return value.favorite == "true";
            });
            
            //do something with favorite
        },
        function(xhr) { console.error(xhr); }
    );

    

})();