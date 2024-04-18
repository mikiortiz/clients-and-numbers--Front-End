import axios from "axios";

const MyApiRegister = {
  register: async (username: string, email: string, password: string) => {
    const userData = { username, email, password };
    return axios
      .post(
        "https://clients-and-numbers-a5c8f17020a9.herokuapp.com/api/register",
        userData
      )
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  },
};

export default MyApiRegister;
