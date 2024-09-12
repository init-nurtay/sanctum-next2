import axios from 'axios';

export const clientAxios = axios.create({
    baseURL: "",
    headers: {
        Accept: "application/json",
    }
})
