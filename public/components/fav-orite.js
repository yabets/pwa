let favTemplate = document.createElement('template');
favTemplate.innerHTML = `
    <style>@import"style.css"</style>
    <div class="favorite-box">
        <h1>Favorite Names</h1>
        <table class="favorite-table">
            <thead>
                <td>Name</td>
                <td>Gender</td>
                <td></td>
            </thead>
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
        
        fetch(`/favorites`)
        .then(function(response) {
            return response.json();
        }).then(function(myJson) {
            return myJson
        }).then(function(favorites){
            // adding row to the favorite table
            favorites.forEach(
                (data) => {
                    let tableCellClone = tableCell.cloneNode();
                    let tableRowClone = tableRow.cloneNode();
                    let removeButtonClone = removeButton.cloneNode();

                    tableCellClone.textContent = data.name
                    tableRowClone.appendChild(tableCellClone);

                    tableCellClone = tableCell.cloneNode();
                    tableCellClone.textContent = data.gender
                    tableRowClone.appendChild(tableCellClone);

                    removeButtonClone.addEventListener("click", (event)=>{
                        console.log("Remove from favorite clicked...\nName to be removed: ", event.srcElement.parentElement.cells[0].innerHTML);
                    });
                    tableRowClone.appendChild(removeButtonClone)

                    favoriteTable.appendChild(tableRowClone);
                }
            );
        });  
    }
}
window.customElements.define('fav-orite', FavOrite);