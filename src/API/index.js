import axios from 'axios';

// const $prodHost = axios.create({
//   baseURL: 'https://zhuro-converter-server.herokuapp.com/',
// });

const $host = axios.create({
  baseURL: 'http://localhost:5000',
});

export default $host;
