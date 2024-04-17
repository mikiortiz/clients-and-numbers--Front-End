import axios from "axios";
import User from "../model/UserType";

interface ApiResponse<T> {
  data: T;
}

const MyApi = {
  saveNumberRange: async (start: number, end: number) => {
    const numberRange = { start, end };

    try {
      const response = await axios.post(
        "https://clients-and-numbers-a5c8f17020a9.herokuapp.com/api/numbers",
        numberRange
      );
      console.log("Rango de números guardado exitosamente:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error al guardar el rango de números:", error);
      throw error;
    }
  },

  getNumbersInRange: async (start: number, end: number) => {
    try {
      const response = await axios.get<number[]>(
        `https://clients-and-numbers-a5c8f17020a9.herokuapp.com/api/numbers?start=${start}&end=${end}`
      );
      console.log("Números recuperados:", response.data);
      return response.data;
    } catch (error) {
      console.error(
        "Error al recuperar los números en el rango especificado:",
        error
      );
      throw error;
    }
  },

  getUsers(): Promise<User[]> {
    return axios
      .get<User[]>(
        "https://clients-and-numbers-a5c8f17020a9.herokuapp.com/api/users"
      )
      .then((response: ApiResponse<User[]>) => {
        const users = response.data;
        console.log("Lista de usuarios:", users);
        return users;
      })
      .catch((error) => {
        throw error;
      });
  },

  addUser(newUser: User): Promise<User> {
    return axios
      .post<User>(
        "https://clients-and-numbers-a5c8f17020a9.herokuapp.com/api/register",
        newUser
      )
      .then((response: ApiResponse<User>) => response.data)
      .catch((error) => {
        throw error;
      });
  },

  addNumberToUser: async (username: string, number: string) => {
    try {
      const requestData = {
        username: username,
        number: number,
      };

      const response = await axios.post(
        "https://clients-and-numbers-a5c8f17020a9.herokuapp.com/api/add-number",
        requestData
      );

      console.log(
        `Número ${number} agregado al usuario ${username} exitosamente.`
      );
      return response.data;
    } catch (error) {
      console.error(
        `Error al agregar número ${number} al usuario ${username}:`,
        error
      );
      throw error;
    }
  },
};

export default MyApi;
