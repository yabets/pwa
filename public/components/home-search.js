let homeTemplate = document.createElement('template');
    homeTemplate.innerHTML = `
        <style>
            @import"style.css"
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

        shadowRoot.querySelector('#searchBtn').addEventListener('click', e => {
            let q = this.shadowRoot.querySelector('#search').value;
            let nameNode = document.createElement('name-display');
            nameNode.setAttribute('search', q);
            shadowRoot.querySelector('.welcome-box').appendChild(nameNode);
        });
    }
    
}
window.customElements.define('home-search', HomeSearch);