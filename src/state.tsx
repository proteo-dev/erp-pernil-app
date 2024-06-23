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

    const fetchData = async ({ method = "GET", data, query = "", path = "" }) => {
        const response = await axios(`${apiBaseUrl}/${path}?${query}`, {
            method,
            data
        });

        return [response.data, response.status];
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
