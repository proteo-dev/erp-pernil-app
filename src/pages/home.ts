class HomePage extends HTMLElement {
	constructor() {
		super();
	}

	connectedCallback() {
		this.render();
	}

	render() {
		this.innerHTML = `
			<main-layout></main-layout>
        `;
	}
}

customElements.define('home-page', HomePage);
