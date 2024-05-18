import axios from "axios";

const instance = axios.create({
  baseURL:  "https://clients-and-numbers.netlify.app/api",
  withCredentials: true,
});

instance.defaults.headers['Access-Control-Expose-Headers'] = '*';
export default instance;
