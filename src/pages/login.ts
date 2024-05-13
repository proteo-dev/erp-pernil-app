import { Router } from '@vaadin/router';

class LoginPage extends HTMLElement {
	constructor() {
		super();
	}

	connectedCallback() {
		this.render();
		this.addListeners();
	}

	render() {
		this.innerHTML = `
            <main class="login__container">
                <h1 class="login__title"> P E R N I L </h1>
                
                <form class="login__form" autocomplete="off">                
                    <input type="name" name="username" placeholder="U S E R N A M E" required>
                    <input type="password" name="password" placeholder="P A S S W O R D" required>
                    <button type="submit" name="button">Login</button>
                </form>
            </main>
        `;
	}

	addListeners() {
		const formEl = this.querySelector('.login__form') as HTMLFormElement;

		formEl.addEventListener('submit', async (e) => {
			e.preventDefault();

			const username = formEl.username.value;
			const password = formEl.password.value;

			console.log('username -->', username);
			console.log('password -->', password);

			// Lógica de login.

			Router.go('/home');
		});
	}
}

customElements.define('login-page', LoginPage);
