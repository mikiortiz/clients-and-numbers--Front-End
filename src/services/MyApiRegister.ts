import axios from "axios";
import UserRegistrationData from "../model/UserRegistrationData";

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

  login: async (email: string, password: string) => {
    const userData = { email, password };
    return axios
      .post(
        "https://clients-and-numbers-a5c8f17020a9.herokuapp.com/api/login",
        userData
      )
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  },

  logout: async () => {
    try {
      await axios.post("https://clients-and-numbers-a5c8f17020a9.herokuapp.com/api/logout");
      console.log("Usuario ha cerrado sesión exitosamente");
      // Aquí puedes redirigir a la página de inicio de sesión u otra página después del logout
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      // Manejar el error si es necesario
    }
  },

  profile: async () => {
    try {
      const response = await axios.get<UserRegistrationData>("https://clients-and-numbers-a5c8f17020a9.herokuapp.com/api/profile");
      const userProfile = response.data;
      console.log("Perfil de usuario obtenido:", userProfile);
      // Aquí puedes actualizar el estado del perfil de usuario en tu frontend
      return userProfile;
    } catch (error) {
      console.error("Error al obtener el perfil del usuario:", error);
      // Manejar el error si es necesario
      throw error;
    }
  },
};

export default MyApiRegister;
