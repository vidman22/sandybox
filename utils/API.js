import axios from "axios";

export default axios.create({
    baseURL: '/EPICData/',
    responseType: 'json'
})