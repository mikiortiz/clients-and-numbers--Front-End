import axios from "axios";

const instance = axios.create({
  baseURL:  "http://localhost:3000/api",
  withCredentials: true,
});

instance.defaults.headers['Access-Control-Expose-Headers'] = '*';
export default instance;
