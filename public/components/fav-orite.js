let favTemplate = document.createElement('template');
favTemplate.innerHTML = `
    <style>@import"style.css"</style>
    <div class="favorite-box">
        <h1>Favorite Names</h1>
        <table class="favorite-table">
            <tr>
                <th>Name</th>
                <th>Gender</th>
                <th></th>
            </tr>
            <slot></slot>
         
        </table>
    </div>
`;

class FavOrite extends HTMLElement {
    // Can define constructor arguments if you wish.
    constructor() {
        // If you define a constructor, always call super() first!
        // This is specific to CE and required by the spec.
        super();
        // Setup a click listener on <app-drawer> itself.


        // Attach a shadow root to the element.
        let shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.appendChild(favTemplate.content.cloneNode(true));

        
        var favoriteTable = this.shadowRoot.querySelector('.favorite-table');
        var tableRow = document.createElement('TR');
        var tableCell = document.createElement('TD');
        var removeButton = document.createElement('INPUT');
        removeButton.value = "Remove";
        removeButton.type = "Submit";
        
        fetch(`/names?favorite=true`).then(function(response) {
            return response.json();
        }).then(function(myJson) {
            return myJson
        }).then(function(favorites){
            // adding row to the favorite table
            favorites.forEach(
                (data) => {
                    console.log('data: ',data);
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
        });  
    }
}
window.customElements.define('fav-orite', FavOrite);