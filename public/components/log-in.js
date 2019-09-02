let loginTemplate = document.createElement('template');
loginTemplate.innerHTML = `
    <style>
        .login-card {
            padding: 40px;
            width: 270px;
            background-color: #F7F7F7;
            margin: 0 auto 10px;
            border-radius: 2px;
            box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
            overflow: hidden;
        }
        
        .login-card h1 {
            font-weight: 100;
            text-align: center;
            font-size: 2.3em;
        }
        
        .login-card input[type=submit] {
            width: 100%;
            display: block;
            margin-bottom: 10px;
        }
        
        .login-card input[type=text], input[type=password] {
            height: 40px;
            font-size: 16px;
            width: 100%;
            margin-bottom: 10px;
            margin-top: 5px;
            -webkit-appearance: none;
            background: #fff;
            border: 1px solid #d9d9d9;
            border-top: 1px solid #c0c0c0;
            padding: 0 8px;
            box-sizing: border-box;
            -moz-box-sizing: border-box;
        }
        
        .login-card input[type=text]:hover, input[type=password]:hover {
            border: 1px solid #b9b9b9;
            border-top: 1px solid #a0a0a0;
            -moz-box-shadow: inset 0 1px 2px rgba(0,0,0,0.1);
            -webkit-box-shadow: inset 0 1px 2px rgba(0,0,0,0.1);
            box-shadow: inset 0 1px 2px rgba(0,0,0,0.1);
        }
        
        .login-card label{
            font-size: 16px;
            font-family: 'Arial', sans-serif;
            font-weight: 700;
            padding-bottom: 10px;
        }
        
        .login {
            text-align: center;
            font-size: 14px;
            font-family: 'Arial', sans-serif;
            font-weight: 700;
            height: 36px;
            padding: 0 4px;
        }
        
        .login-submit {
            border: 0px;
            color: #fff;
            text-shadow: 0 1px rgba(0,0,0,0.1); 
            background-color: #4d90fe;
        }
        
        .login-submit:hover {
            border: 0px;
            text-shadow: 0 1px rgba(0,0,0,0.3);
            background-color: #357ae8;
        }
        
        .login-card a {
            text-decoration: none;
            color: #666;
            font-weight: 400;
            text-align: center;
            display: inline-block;
            opacity: 0.6;
            transition: opacity ease 0.5s;
        }
        
        .login-card a:hover {
            opacity: 1;
        }
    </style>
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