let loginTemplate = document.createElement('template');
loginTemplate.innerHTML = `
    <style>@import"style.css"</style>
    <div class="login-card">
        <h1>Login</h1><br>
        <form>
            <label for="user">Username</label>   
            <input type="text" name="user" id="user">
            <label for="pass">Password</label>   
            <input type="password" name="pass" id="pass">
            <input type="submit" name="login" class="login login-submit" value="login">
        </form>

    </div>
`
class LogIn extends HTMLElement {
    constructor() {
        super();

        let shadowRoot = this.attachShadow({mode:'open'});
        shadowRoot.appendChild(loginTemplate.content.cloneNode(true));
    }
}

window.customElements.define('log-in', LogIn);