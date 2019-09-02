import { isFav, add, remove } from "../database/db.js";

let nameDisplay = document.createElement('template');
    nameDisplay.innerHTML = `
        <link rel="stylesheet" href="lib/font-awesome-4.7.0/css/font-awesome.min.css">
        <style>
            @import"style.css"
        </style> 
        <div class="box"></div>
        <slot></slot> <!-- slotted content appears here -->
        `;
let notFound = document.createElement('template');
notFound.innerHTML = `<b>Not Found</b>`;
const getFormatedView = ({name, gender}) => {
    const showGenderIcon = (gender) => {
        if(gender === 'unisex'){
            return '<i class="fa fa-male" aria-hidden="true"></i><i class="fa fa-female" aria-hidden="true"></i>'
        } else {
            return `<i class="fa fa-${gender}" aria-hidden="true"></i>`
        }
    }
    return `<div class="col-70 left">
                <div class="row">
                    <span class="label">Name</span>
                    <span class="value">${name}</span>
                </div>
                <div class="row">
                    <span class="label">Gender</span>
                    <span class="value">${gender}</span>
                </div>
            </div>
            <div class="col-30 right">
                <div class="fav">
                    <span><i class="fa fa-star"></i></span>
                </div>
                <span class="icon">${showGenderIcon(gender)}</span>
            </div>
    `;
}
class NameDisplay extends HTMLElement {
    // A getter/setter for a search property.
    get search() {
        return this.getAttribute('search');
    }

    set search(newValue) {
        this.setAttribute('search', newValue);
    }

    // Can define constructor arguments if you wish.
    constructor() {
        // If you define a constructor, always call super() first!
        // This is specific to CE and required by the spec.
        super();
        // Attach a shadow root to the element.
        let shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.appendChild(nameDisplay.content.cloneNode(true));      

    }

    connectedCallback() {
        this.getNameFromAPI();
    }

    static get observedAttributes() {
        return ['search'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this.getNameFromAPI();
    }

    getNameFromAPI = () => {
        // step 1: get search keyword
        const q = this.search;
        // step 2: fetch the name
        fetch(`/names?name=${q}`)
                .then((response) => response.json())
                .then((myJson) => {
                    if(myJson.length > 0) {
                        this.person = myJson[0]; 
                        isFav(this.person.name).then((resp)=> {
                            this.person.favorite = resp;
                            if(resp) {
                                this.favIcon.classList.add('fav-selected');
                            } else {
                                this.favIcon.classList.remove('fav-selected');
                            }
                        });
                        const view = getFormatedView(this.person);
                        this.shadowRoot.querySelector(".box").innerHTML = view;
                        // TODO:: add event listenter to mark as favourite
                        this.favIcon = this.shadowRoot.querySelector(".fav");
                        this.favIcon.addEventListener('click', this.toggleFavorite)
                    } else {
                        this.shadowRoot.querySelector(".box").innerHTML = `<b>Not Found</b>`;
                    }
                });
    };

    toggleFavorite = () => {
        console.log('toggle fav');
        let done = false;
        if(this.person.favorite) {
            // call remove
            remove(this.person.name);
            done = !done;
        } else {
            // call add
            let toBeAdded = {name:this.person.name.toLowerCase(), gender:this.person.gender};
            add(toBeAdded);
            done = !done;
        }
        if(done) {
            this.favIcon.classList.toggle('fav-selected');
        }
        
    };

    disconnectedCallback() {
        this.favIcon.removeEventListener('click', this.toggleFavorite);
      }
    
}
window.customElements.define('name-display', NameDisplay);