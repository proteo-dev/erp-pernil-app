import State from '../src/state';
import { Router } from '@vaadin/router';

class Layout extends HTMLElement {
	shadow = this.attachShadow({ mode: 'open' });

	constructor() {
		super();
	}

	connectedCallback() {
		this.render();
		this.addStyles();
		this.listenListeners();
	}

	addStyles() {
		const style = document.createElement('style');

		style.innerHTML = `
			* {
				margin: 0;
				padding: 0;
				box-sizing: border-box;
				text-decoration: none;
			}

			navbar {
				display: flex;
				align-items: center;
				justify-content: space-between;
				width: 100%;
				height: 100%;
				padding: 0 27px;
				background-color: rgba(255, 255, 255, 0.63);
				border-radius: 27px;
			}

			navbar .logo {
				font-size: 36px;
				font-weight: bold;
				cursor: pointer;
			}

			navbar .logo:hover {
				color: steelblue;
			}
			
			ul {
				display: flex;
				font-size: 27.9px;
				list-style: none;
			}

			ul li {
				margin: 0 18px;
				cursor: pointer;
			}

			ul li:hover {
				color: steelblue;
			}
		`;

		this.shadow.appendChild(style);
	}

	render() {
		this.shadow.innerHTML = `
			<navbar>
				<div class="logo">DASHBOARD</div>

				<ul>
					<li>Compras</li>
					<li>Ventas</li>
				</ul>
			</navbar>
		`;
	}

	listenListeners() {
		const logoEl = this.shadow.querySelector('.logo') as HTMLElement;
		const items = this.shadow.querySelectorAll('li');

		const goToPage = (data: any) => {
			const page = data.target.innerHTML.toLowerCase().trim();
			Router.go(`/home/${page}`);
		};

		items.forEach((e) => e.addEventListener('click', goToPage));
		logoEl.addEventListener('click', () => Router.go('/home'));
	}
}

customElements.define('main-layout', Layout);
