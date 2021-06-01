import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://34.70.202.69:3232'
});