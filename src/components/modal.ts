import { Router } from "@vaadin/router";
import State from "../state";

class InputModal extends HTMLElement {
  shadow = this.attachShadow({ mode: "open" });

  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
    this.addStyles();
  }

  addStyles() {
    const style = document.createElement("style");

    style.innerHTML = `
			* {
				margin: 0;
				padding: 0;
				box-sizing: border-box;
			}
			
			form {
				position: absolute;
				bottom: 20%;
				top: 20%;
				right: 30%;
				left: 30%;

				font-weight: bolder;
				background-color: rgba(255, 255, 255);
				border-radius: 27px;
				border: 3px solid rgb(161, 161, 161);
			}

			form .title {
				color: rgb(161, 161, 161);
				font-size: 54px;
			}

			form .input {
				height: 61px;
				background-color: rgba(161, 161, 161, 0.39);

				position: absolute;
				bottom: calc(50% - 25px);
				left: 70px;
				right: 70px;
				
				border: none;
				
				color: white;
				font-size: 24px;
				text-align: center;
				border-radius: 15px;
			}

			form .input::placeholder {
				color: rgba(161, 161, 161, 0.39);
			}

			form .input:focus {
				background-color: rgba(161, 161, 161, 0.39);
			}

			form .titleContainer {
				display: flex;
				justify-content: center;
				align-items: center;
				position: absolute;
				top: 0;
				padding-top: 18px;
				width: 100%;

				font-size: 21px;
				font-weight: bolder;
				color: white;
			}

			form .button {
				position: absolute;
				bottom: -2px;
				right: -2px;
				width: 18vw;

				background-color: white;
				font-size: 54px;
				font-weight: bolder;
				color: rgb(161, 161, 161);
				text-align: center;

				border: none;
				border: 2px solid rgb(161, 161, 161);
				border-radius: 27px 0 27px 0;
				cursor: pointer;
			}

			form .button:hover {
				background-color: rgb(161, 161, 161);
				color: white;
			}
		`;

    this.shadow.appendChild(style);
  }

  render() {
    this.shadow.innerHTML = `
		<form class="form">
			<div class=titleContainer>
			<h3 class=title> NUEVO </h3>
			</div>
			
			<input type=text name=resource placeholder=Nombre required class=input />
			
			<input type=submit value=OK class=button />
		</form>
		`;

    this.addListeners();
  }

  addListeners() {
    const formEl = this.shadow.querySelector(".form") as HTMLElement;

    formEl.addEventListener("submit", () => {
      const inputEl = this.shadow.querySelector(".input") as any;

      const path = this.getAttribute("resource");

      State.fetchData({ path, method: "POST", body: { name: inputEl.value } });
    });
  }
}

customElements.define("input-modal", InputModal);
