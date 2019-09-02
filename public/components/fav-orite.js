import { remove, allFavorites } from "../database/db.js";

let favTemplate = document.createElement('template');
favTemplate.innerHTML = `
    <style>
        .favorite-box{
            padding: 10px;
            width: 85%;
            background-color: #F7F7F7;
            margin: 0 auto;
            box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
            overflow: hidden;
        }
        .favorite-box h1{
        text-align: center;
        }
        .favorite-table{
            width:300px;
            height:100%;
            margin:auto;
            padding: 30px 0;
            background:#34495E;
            color: #fff;
            border-radius: .4em;
            border-collapse: collapse;
        }
        .favorite-table tr {
            border-color: white;
        }
        .favorite-table td{
            padding:10px 5px;
            text-align: center;
            align-items: center;
            border-bottom: 1px solid white;
        }
        .favorite-table th, td {
            margin: .2em .2em;
        }
        .favorite-table thead td{
            color: #dd5;
        }
        .favorite-table input[type="submit"]{
            border: 0px;
            color: #fff;
            text-shadow: 0 1px rgba(0,0,0,0.1); 
            background-color:#357ae8;
            width: 100%;
            height: 100%;
            border-radius:6px;
            border-bottom: solid 1px white;
        
        }
        .favorite-table input[type="submit"]:hover{
            border: 0px;
            text-shadow: 0 1px rgba(0,0,0,0.3);
            background-color:#4d90fe;
            
        }
    </style>
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
        

        allFavorites().then(function(favorites){
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
                        remove(event.srcElement.parentElement.cells[0].innerHTML);
                        let row = event.srcElement.parentElement; // selecting row
                        row.parentElement.removeChild(row); // selecting table and removing child
                    });
                    tableRowClone.appendChild(removeButtonClone)

                    favoriteTable.appendChild(tableRowClone);
                }
            );
        });  
    }
}
window.customElements.define('fav-orite', FavOrite);