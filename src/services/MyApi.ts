import axios from "./axios";
import User from "../model/UserType";

const MyApi = {
  saveNumberRange: async (start: number, end: number) => {
    try {
      const jwtToken = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${jwtToken}`,
      };
      console.log("peticion en la carga de numeros:", jwtToken);
      const numberRange = { start, end };
      console.log("carga de numeros:", start, end,);
      const response = await axios.post("/numbers", numberRange, {
        headers: headers,
      });

      console.log("Rango de números guardado exitosamente:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error al guardar el rango de números:", error);
      throw error;
    }
  },

  getNumbersInRange: async (start: number, end: number) => {
    try {
      const jwtToken = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${jwtToken}`,
      };

      const response = await axios.get<number[]>(
        `/numbers?start=${start}&end=${end}`,
        { headers: headers }
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

  getUsers: async (): Promise<User[]> => {
    try {
      const jwtToken = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${jwtToken}`,
      };

      const response = await axios.get<User[]>("/users", { headers: headers });

      console.log("Lista de usuarios:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error al obtener la lista de usuarios:", error);
      throw error;
    }
  },

  addUser: async (newUser: User): Promise<User> => {
    try {
      const jwtToken = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${jwtToken}`,
      };

      const response = await axios.post<User>("/scheduleUser", newUser, {
        headers: headers,
      });

      console.log("Usuario agregado exitosamente:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error al agregar usuario:", error);
      throw error;
    }
  },

  addNumberToUser: async (username: string, number: string) => {
    try {
      const jwtToken = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${jwtToken}`,
      };

      const requestData = {
        username: username,
        number: number,
      };

      const response = await axios.post("/add-number", requestData, {
        headers: headers,
      });

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
