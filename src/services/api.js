import axios from 'axios';

const api = axios.create({baseURL: "https://api.hgbrasil.com/weather"});
const key = '';

export {api,key};