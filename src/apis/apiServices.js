import axios from "axios";
const PRODUCTS__URL = "product-order";
const ORDER__URL = "orders";
const BASE_URL = "https://estella-app-api.herokuapp.com/api";

export const getListProducts = (page, limit) => {
    return axios.get(`${BASE_URL}/${PRODUCTS__URL}?page=${page}&limit=${limit}`, {
        Accept: "application/json",
        "Content-Type": "application/json",
    });
};
export const postProduct = (data) => {
    return axios.post(`${BASE_URL}/${PRODUCTS__URL}`, data, {
        Accept: "application/json",
        "Content-Type": "application/json",
    });
};
export const getProductById = (id) => {
    return axios.get(`${BASE_URL}/${PRODUCTS__URL}/${id}`, {
        Accept: "application/json",
        "Content-Type": "application/json",
    });
};
export const putProduct = (id, data) => {
    return axios.put(`${BASE_URL}/${PRODUCTS__URL}/${id}`, data, {
        Accept: "application/json",
        "Content-Type": "application/json",
    });
};

// _-----------------------

export const postOrder = (data) => {
    return axios.post(`${BASE_URL}/${ORDER__URL}`, data, {
        Accept: "application/json",
        "Content-Type": "application/json",
    });
};
export const putOrderIsFinish = (id) => {
    return axios.put(
        `${BASE_URL}/${ORDER__URL}/${id}`,
        {
            isFinish: true,
        },
        {
            Accept: "application/json",
            "Content-Type": "application/json",
        }
    );
};
export const putOrder = (id, data) => {
    return axios.put(
        `${BASE_URL}/${ORDER__URL}/${id}`,
        {
            ...data,
        },
        {
            Accept: "application/json",
            "Content-Type": "application/json",
        }
    );
};
export const getListOrders = (page, limit) => {
    return axios.get(`${BASE_URL}/${ORDER__URL}?page=${page}&limit=${limit}`, {
        Accept: "application/json",
        "Content-Type": "application/json",
    });
};
export const getRevenue = (page, limit) => {
    return axios.get(`${BASE_URL}/${ORDER__URL}/revenue`, {
        Accept: "application/json",
        "Content-Type": "application/json",
    });
};
export const getListOrdersShipped = (page, limit) => {
    return axios.get(`${BASE_URL}/${ORDER__URL}/finish?page=${page}&limit=${limit}`, {
        Accept: "application/json",
        "Content-Type": "application/json",
    });
};
export const getOrderById = (id) => {
    return axios.get(`${BASE_URL}/${ORDER__URL}/${id}`, {
        Accept: "application/json",
        "Content-Type": "application/json",
    });
};
export const searchOrderByKey = (key) => {
    return axios.get(`${BASE_URL}/${ORDER__URL}/search?q=${key}`, {
        Accept: "application/json",
        "Content-Type": "application/json",
    });
};
