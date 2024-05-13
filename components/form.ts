class CustomForm extends HTMLElement {
	shadow = this.attachShadow({ mode: 'open' });

	constructor() {
		super();
	}

	connectedCallback() {
		this.render();
		this.addStyles();
	}

	addStyles() {
		const style = document.createElement('style');

		style.innerHTML = `
			* {
				margin: 0;
				padding: 0;
				box-sizing: border-box;
			}

			.main {
				width: 100%;
				height: 100%;
				border: none;
			}

			input-modal {
				width: 100%;
				height: 100%;
			}
		`;

		this.shadow.appendChild(style);
	}

	render() {
		this.shadow.innerHTML = `
			<div class="main"> 
				<input-modal></input-modal>
			</div>
		`;
	}
}

customElements.define('custom-form', CustomForm);
