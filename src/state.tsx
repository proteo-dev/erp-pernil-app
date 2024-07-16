import { DB_HOST, API_VERSION } from "./db";

import React, { createContext, useState } from 'react';

import axios from "axios";
// axios.defaults.withCredentials = true;

const apiBaseUrl = `${DB_HOST}/${API_VERSION}/api`;

const GlobalContext = createContext();

const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, _setState] = useState({
        card_selected: {},
        products: [],
        categories: [],
        subCategories: [],
        routes: {
            status: "status",
            auth: "auth",
            users: "users",
            clients: "clients",
            suppliers: "suppliers",
            products: "products",
            combos: "combos",
            movements: "movements",
            categories: "categories",
            subCategories: "subcategories",
        }
    });

    const fetchData = async ({ method = "GET", data = {}, query = "", path }) => {
        try {
            const response = await axios(`${apiBaseUrl}/${path}?${query}`, {
                method,
                data
            });

            return [response.data, response.status];
        } catch (error) {
            console.log(error);

            if (error.code == "ERR_NETWORK") {
                return [{ response: "No se pudo conectar con el servidor" }, 500]
            }
            const { data, status } = error.response

            return [data, status]
        }
    }

    const setState = (newState) => {
        _setState((prevState) => ({ ...prevState, ...newState }));
    }

    return (
        <GlobalContext.Provider value={{ state, setState, fetchData, }}>
            {children}
        </GlobalContext.Provider>
    );
};

export { GlobalContext, GlobalProvider };
