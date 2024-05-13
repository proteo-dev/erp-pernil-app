import { DB_HOST, API_VERSION } from '../db';

abstract class State {
	private static _data: {
		products: [],
		categories: []
	};
	private static _listeners: Function[] = [];
	private static _apiBaseUrl: string = `${DB_HOST}${API_VERSION}/`;
	static Routes = {
		status: "status",
		auth: "auth",
		users: "users",
		clients: "clients",
		suppliers: "suppliers",
		products: "products",
		combos: "combos",
		movements: "movements",
		categories: "categories",
	}

	static async init() {

		// Probar conexion a la DB. Si no hay, avisar al usuario.
	}

	static subscribe(callback: Function) {
		this._listeners.push(callback);
	}

	private static _executeListeners() {
		for (const cb of State._listeners) {
			cb();
		}
	}

	static get getState() {
		return State._data;
	}

	// GUARDAR EL STATE EN DB PARA QUE SE GUARDE LA ULTIMA PAGINA VISITADA
	static set setState(newState: any) {
		State._data = newState;
		State._executeListeners();
	}

	static async fetchData({ path, method = 'GET', body = {} }) {
		const URL = this._apiBaseUrl + path

		const options: any = {
			method,
			headers: {
				'Content-Type': 'application/json',
			},
		};

		if (Object.values(body)[0] !== undefined)
			options.body = JSON.stringify(body);

		const data = await fetch(URL, options);

		return data.json();
	};
}

export default State;
