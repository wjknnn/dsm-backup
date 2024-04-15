import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 30000,
});

instance.interceptors.response.use(undefined, (err) => {
  throw err;
});

export default instance;
