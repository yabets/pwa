(function (){

    // render's table on favorite.html
    var displayData = function (data) {

        // filtering out those that are favorite
        let favorites = data.filter((value)=>{
            return value.favorite == "true";
        })

        var favoriteTable = document.querySelector('.favorite-table');
        var tableRow = document.createElement('TR');
        var tableCell = document.createElement('TD');
        var removeButton = document.createElement('INPUT');
        removeButton.value = "Remove";
        removeButton.type = "Submit";

        // adding row to the favorite table
        favorites.forEach(
            (data) => {

                let tableCellClone = tableCell.cloneNode();
                let tableRowClone = tableRow.cloneNode();

                tableCellClone.textContent = data.name
                tableRowClone.appendChild(tableCellClone);

                tableCellClone = tableCell.cloneNode();
                tableCellClone.textContent = data.gender
                tableRowClone.appendChild(tableCellClone);

                tableRowClone.appendChild(removeButton.cloneNode())

                favoriteTable.appendChild(tableRowClone);
              }
        );
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
            return displayData(data);
          },
         function(xhr) { console.error(xhr); }
    );


}());