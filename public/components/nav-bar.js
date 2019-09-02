let navTemplate = document.createElement('template');
navTemplate.innerHTML = `
    <style>
        .fav {
            color:grey;
            float:right;
            margin-left:12px;
            margin-top: 8px;
            font-size: 22px;
        }
        
        .fav-selected {
            color: gold;
        }
        nav {
            width: 90%;
            margin: auto;
        }
        nav ul {
            list-style-type: none;
            overflow: hidden;
            background-color: #333;
        }
        
        nav ul li {
            float: left;
        }
        
        nav ul li a {
            display: block;
            color: white;
            text-align: center;
            padding: 14px 16px;
            text-decoration: none;
        }
        
        nav ul li a:hover:not(.active) {
            background-color: #111;
        }
        
        nav {
            display:block;
        }
        
        .active {
            background:brown;
        }
    </style>
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