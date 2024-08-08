// axios.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://localhost:7218'
});

export default instance;
