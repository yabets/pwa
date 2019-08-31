let nameDisplay = document.createElement('template');
    nameDisplay.innerHTML = `
        <style>
            :host {  }
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
    }

    
}
window.customElements.define('name-display', NameDisplay);