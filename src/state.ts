import { DB_HOST, API_VERSION } from "./db";

abstract class State {
  private static _data: {
    card_selected: HTMLElement;
    products: [];
    categories: [];
    subCategories: [];
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
    subcategories: "subcategories",
  };

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

  static async fetchData({ path, method = "GET", body = {}, query = "" }): Promise<[any, status: number]> {
    const queryString = new URLSearchParams(query).toString();

    const URL = this._apiBaseUrl + path + "?" + queryString;

    const options: any = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (Object.values(body)[0] !== undefined)
      options.body = JSON.stringify(body);

    const response = await fetch(URL, options);
    const data = await response.json();


    return [data, response.status];
  }
}

export default State;
