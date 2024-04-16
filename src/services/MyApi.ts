import axios from "axios";

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
      const response = await axios.get<number[]>( // Specify the expected response type
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
};

export default MyApi;
