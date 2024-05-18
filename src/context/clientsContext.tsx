import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";
import MyApi from "../services/MyApi"; // Importa tu módulo de servicios para la API

const UsersContext = createContext();

export const useUsers = () => {
  const context = useContext(UsersContext);

  if (!context) {
    throw new Error("useUsers debe estar dentro de un provider UserProvider");
  }

  return context;
};

export function UserProvider({ children }) {
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    try {
      const userList = await MyApi.getUsers();
      setUsers(userList);
    } catch (error) {
      console.error("Error al obtener la lista de usuarios:", error);
    }
  };

  const addUser = async (newUser) => {
    try {
      const addedUser = await MyApi.addUser(newUser);
      setUsers([...users, addedUser]);
    } catch (error) {
      console.error("Error al agregar usuario:", error);
    }
  };

  const addNumberToUser = async (username, number) => {
    try {
      await MyApi.addNumberToUser(username, number);
      console.log(`Número ${number} agregado al usuario ${username} exitosamente.`);
    } catch (error) {
      console.error(`Error al agregar número ${number} al usuario ${username}:`, error);
    }
  };

  return (
    <UsersContext.Provider value={{ users, getUsers, addUser, addNumberToUser }}>
      {children}
    </UsersContext.Provider>
  );
}

// Agrega validación de PropTypes para 'children'
UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserProvider;
