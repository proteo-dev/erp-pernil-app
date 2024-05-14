import { Router } from "@vaadin/router";
import State from "../state";

class ProductModal extends HTMLElement {
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
				bottom: 5%;
				top: 5%;
				right: 7.5%;
				left: 7.5%;

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
				background-color: rgba(161, 161, 161, 0.39);
				height: 50px;
				border: none;
				border-radius: 15px;

				position: absolute;
				bottom: 58%;
				left: 70px;
				right: 70px;
				
				color: white;
				font-size: 24px;
				text-align: center;
			}

			form .input::placeholder {
				color: white;
				color: rgba(161, 161, 161, 0.39);
			}

			form .input:focus {
				color: white;
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

			form .checkboxes {
				background-color: rgba(161, 161, 161, 0.39);
				width: 90%;
				height: 11dvh;
				border-radius: 15px;
				
				position: absolute;
				bottom: 27%;
				left: 5%;
				display: flex;
				justify-content: space-around;
				align-items: center;
				margin-top: 15px;
			}

			form .checkboxes div {
				display: flex;
				flex-grow: 1;
				justify-content: center;
				align-items: center;
			}

			form .checkboxes div input {
				width: 27px;
				height: 27px;
				margin-left: 9px;
				accent-color: yellowgreen;
			}

			form .checkboxes div label {
				font-size: 24px;
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
			
			<input type=text placeholder=Nombre required class=input />

			<div class=checkboxes>					
				<div>
					<label for="serviceCheck">Servicio</label>
					<input type=checkbox name=serviceCheck class=checkbox />
				</div>
				
				<div>
					<label for="buyCheck">Compra</label>
					<input type=checkbox name=buyCheck class=checkbox />
				</div>
				
				<div>
					<label for="sellCheck">Venta</label>
					<input type=checkbox name=sellCheck class=checkbox />
				</div>
			</div>
			
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

      const body: any = { name: inputEl.value };

      if (path == State.Routes.subcategories) {
        const ls = State.getState;
        const CategoryId = ls.card_selected.id;

        body.CategoryId = CategoryId;
      }

      State.fetchData({ path, method: "POST", body });
    });
  }
}

customElements.define("product-modal", ProductModal);
