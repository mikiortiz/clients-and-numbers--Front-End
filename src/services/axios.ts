import axios from "axios";

const instance = axios.create({
  baseURL: "https://clients-and-numbers-a5c8f17020a9.herokuapp.com/api",
  withCredentials: true,
});

instance.defaults.headers["Access-Control-Expose-Headers"] = "*";
export default instance;
