import axios from "axios";

const instance = axios.create({
    baseURL:'http://localhost:3001/api',
    method:'get',
    timeout:6000
});

export default instance;