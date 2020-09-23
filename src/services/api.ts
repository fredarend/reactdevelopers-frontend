import axios from 'axios';

const token = localStorage.getItem('@Icetec:token');

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const config = {
  headers: { Authorization: `Bearer ${token}` },
};

export { api, config };
