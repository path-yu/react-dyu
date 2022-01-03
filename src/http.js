import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://1.116.124.155:3001/api',
  method: 'get',
  timeout: 6000,
});

export default instance;
