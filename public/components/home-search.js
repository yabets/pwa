let homeTemplate = document.createElement('template');
    homeTemplate.innerHTML = `
        <style>
            .welcome-box {
                padding: 40px;
                width: 80%;
                background-color: #F7F7F7;
                margin: 0 auto;
                box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
                overflow: hidden;
            }
            .welcome-box input[name="name"]{
                padding: 6px;
                margin-top: 8px;
                font-size: 17px;
                border: 1px grey solid;
            
            }
            .welcome-box input[name="submit"]{
                padding: 6px 10px;
                margin-top: 8px;
                margin-right: 16px;
                background: #ddd;
                font-size: 17px;
                border: none;
                cursor: pointer;
            }
            
            .box {
                border: black solid 1px;
                border-radius: 5px;
                width: 250px;
                padding: 10px;
                margin: 10px;
                height: 2.5em;
            }
            .col-70 {
                width: 70%;
            }
            .col-30 {
                widht: 30%;
            }
            .row {
            }
            .label {
                font-weight: bold;
                font-size: 1em;
            }
            .value {
                font-size: 1em;
            }
            .icon {
                font-size: 2em;
            }
            .left {
                float: left;
            }
            .right {
                float: right;
            }
    
        </style>
        <div class="welcome-box">
            <br/>
            <h1>Welcome</h1>
            <form>
                <input type="text" id="search" name="name" placeholder="Search for name . . .">
                <input type="button" name="submit" value="Search" id="searchBtn">
            </form>
        </div>
        <slot></slot> <!-- slotted content appears here -->
    `;
class HomeSearch extends HTMLElement {
    // Can define constructor arguments if you wish.
    constructor() {
        // If you define a constructor, always call super() first!
        // This is specific to CE and required by the spec.
        super();

        // Attach a shadow root to the element.
        let shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.appendChild(homeTemplate.content.cloneNode(true));
    }

    connectedCallback() {
        this.shadowRoot.querySelector('#searchBtn').addEventListener('click', e => {
            let q = this.shadowRoot.querySelector('#search').value;
            let nameNode = this.shadowRoot.querySelector('name-display');
            if(!nameNode) { 
                nameNode = document.createElement('name-display');
                this.shadowRoot.querySelector('.welcome-box').appendChild(nameNode); 
            } 
            nameNode.setAttribute('search', q);
        });
    }
    
}
window.customElements.define('home-search', HomeSearch);