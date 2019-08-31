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
    constructor() {
        super();

        let shadowRoot = this.attachShadow({mode:'open'});
        shadowRoot.appendChild(navTemplate.content.cloneNode(true));
    }
}

window.customElements.define('nav-bar', NavBar);