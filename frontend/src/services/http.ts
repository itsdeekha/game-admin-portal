import axios from 'axios';
import { HOST_API } from '~/configs/global.config';

const http = axios.create({ baseURL: HOST_API });

http.interceptors.response.use(
  (response) => response.data,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || 'Something went wrong'
    )
);

export default http;
