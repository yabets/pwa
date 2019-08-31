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
    fetch('http://localhost:3000/names')
    .then(function(response) {
      return response.json();
    })
    .then(function(myJson) {
        return displayData(JSON.stringify(myJson))
    });


}());