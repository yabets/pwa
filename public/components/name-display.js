let nameDisplay = document.createElement('template');
    nameDisplay.innerHTML = `
        <style>
            @import"style.css"
        </style> 
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
                <!-- TODO:: import font awesome fav icon style on hover to indicate clickable -->
                <!-- TODO:: import font awesome and show approprate geneder icon -->
                <div class="fav">
                    <span>
                        <i class="far fa-star"></i>
                    </span>
                </div>
            </div>
        <slot></slot> <!-- slotted content appears here -->
        `;
let notFound = document.createElement('template');
notFound.innerHTML = `
    <style>
        @import"style.css"
    </style> 
    <div class="box">
        <b>Not Found</b>
    </div>
`;
class NameDisplay extends HTMLElement {
    // TODO:: add getter/setter for name and gender

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

    // Can define constructor arguments if you wish.
    constructor() {
        // If you define a constructor, always call super() first!
        // This is specific to CE and required by the spec.
        super();
        // Attach a shadow root to the element.
        let shadowRoot = this.attachShadow({mode: 'open'});

        // TODO:: step 1: get search keyword

        // TODO:: step 2: fetch the name
        fetch(`/names?name=${q}`)
                .then(function(response) {
                    return response.json();
                })
                .then(function(myJson) {
                    console.log(typeof JSON.stringify(myJson));
                    // TODO :: evaluate response json
                    console.log(typeof myJson);
                    if(typeof myJson === 'Array' && myJson.length > 0) {
                        // name found
                        // TODO:: insert name and gender
                        shadowRoot.appendChild(nameDisplay.content.cloneNode(true));
                    } else {
                        // not found
                        shadowRoot.appendChild(notFound.content.cloneNode(true));
                    }
                });
        
        
        

        // TODO:: add event listenter to mark as favourite

    }
    
}
window.customElements.define('name-display', NameDisplay);