import axios from 'axios';

const api = axios.create({baseURL: "https://api.hgbrasil.com/weather"});
const key = 'b2c41726';

export {api,key};