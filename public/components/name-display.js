let nameDisplay = document.createElement('template');
    nameDisplay.innerHTML = `
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
            <div class="box">
                <div class="col-70 left">
                    <div class="row">
                        <span class="label">Name</span>
                        <span class="value">Abeni</span>
                    </div>
                    <div class="row">
                        <span class="label">Gender</span>
                        <span class="value">Male</span>
                    </div>
                </div>
                <div class="col-30 right">
                    <span class="icon">
                        <i class="fa fa-male" aria-hidden="true"></i>
                        male
                    </span>
                </div>
                <div class="fav">
                    <span>
                        <i class="far fa-star"></i>
                    </span>
                </div>
            </div>
        </div>
        <slot></slot> <!-- slotted content appears here -->
        `;
class NameDisplay extends HTMLElement {
    // A getter/setter for a disabled property.
    get disabled() {
        return this.hasAttribute('disabled');
    }
    
    set disabled(val) {
        // Reflect the value of the disabled property as an HTML attribute.
        if (val) {
          this.setAttribute('disabled', '');
        } else {
          this.removeAttribute('disabled');
        }
    }

    // A getter/setter for a gender property.
    get gender() {
        return this.hasAttribute('gender');
    }
    set gender(val) {
        this.reflectValue('gender', val);
    }

    reflectValue(att, val) {
        if(val) {
            this.setAttribute(att, val);
        }else {
            this.removeAttribute(att);
        }
    }

    
    

    // Can define constructor arguments if you wish.
    constructor() {
        // If you define a constructor, always call super() first!
        // This is specific to CE and required by the spec.
        super();
        // Setup a click listener on <app-drawer> itself.
        this.addEventListener('click', e => {
          console.log('Name display clicked');
          console.log(this)
        });

        // Attach a shadow root to the element.
        let shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.appendChild(nameDisplay.content.cloneNode(true));

        shadowRoot.querySelector('#searchBtn').addEventListener('click', e => {
            console.log('search clicked');
            console.log(e);
            let q = this.shadowRoot.querySelector('#search').value;
            fetch(`/names?name=${q}`)
                .then(function(response) {
                    return response.json();
                })
                .then(function(myJson) {
                    console.log(JSON.stringify(myJson));
                    NameDisplay.gender = (JSON.stringify(myJson).gender);
                });
          });
    }
    
}
window.customElements.define('name-display', NameDisplay);