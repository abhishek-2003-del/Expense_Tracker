import axiosConfig from "./axiosConfig";

export const addTransaction = async (body) => {
    return await axiosConfig("post","http://localhost:3000/transactions", body);
};

export const getTransactions = async () => {
    return await axiosConfig("get", "http://localhost:3000/transactions");
};

export const deleteTransaction = async (id) => {
    return await axiosConfig("delete", `http://localhost:3000/transactions/${id}`);
};

export const updateTransaction = async (id, body) => {
    return await axiosConfig("put", `http://localhost:3000/transactions/${id}`, body);
};
