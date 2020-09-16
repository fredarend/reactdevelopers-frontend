import axios from 'axios';

const token = localStorage.getItem('@Icetec:token');

const api = axios.create({
  baseURL: 'http://localhost:3333',
});

const config = {
  headers: { Authorization: `Bearer ${token}` },
};

export { api, config };
