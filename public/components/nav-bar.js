let navTemplate = document.createElement('template');
navTemplate.innerHTML = `
    <style>@import"style.css"</style>
    <nav class=".navigation">
        <ul>
            <li><a href="#home" class="active">Home</a></li>
            <li><a href="#favorites">Favorites</a></li>
            <li><a href="#login">Login</a></li>
        </ul>
    </nav>
`
class NavBar extends HTMLElement {
    // A getter/setter for a active property.
    get active() {
        return this.getAttribute('active');
    }

    set active(newValue) {
        this.setAttribute('active', newValue);
    }

    static get observedAttributes() {
        return ['active'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if(oldValue && newValue){
            this.changeActive(oldValue, newValue);
        }
    }

    changeActive = (from, to) => {
        this.shadowRoot.querySelector(`a[href='${from}']`).classList.toggle("active");
        this.shadowRoot.querySelector(`a[href='${to}']`).classList.toggle("active");
            
    }

    constructor() {
        super();

        let shadowRoot = this.attachShadow({mode:'open'});
        shadowRoot.appendChild(navTemplate.content.cloneNode(true));

        // TODO:: set active class based on selected menu
        // selected menu will be passed as attribute
    }
}

window.customElements.define('nav-bar', NavBar);