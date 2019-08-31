let favTemplate = document.createElement('template');
favTemplate.innerHTML = `
    <style>@import"style.css"</style>
    <div class="favorite-box">
        <h1>Favorite Names</h1>
        <table class="favorite-table">
            <tr>
                <th>Name</th>
                <th>Gender</th>
                <th></th>
            </tr>
            <tr>
                <td data-th="name">Abenezer</td>
                <td data-th="gender">Male</td>
                <td data-th="remove-button"><input type="submit" value="remove"/></td>
            </tr>
            </tr>
            <tr>
                <td data-th="name">Yabets</td>
                <td data-th="gender">Male</td>
                <td data-th="remove-button"><input type="submit" value="remove"/></td>
            </tr>
            <tr>
                <td data-th="name">Mhret</td>
                <td data-th="gender">Female</td>
                <td data-th="remove-button"><input type="submit" value="remove"/></td>
            </tr>
        </table>
    </div>

    <slot></slot> <!-- slotted content appears here -->
`;

class FavOrite extends HTMLElement {
    constructor() {
        // If you define a constructor, always call super() first!
        // This is specific to CE and required by the spec.
        super();

        // Attach a shadow root to the element.
        let shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.appendChild(favTemplate.content.cloneNode(true));
    }
}
window.customElements.define('fav-orite', FavOrite);