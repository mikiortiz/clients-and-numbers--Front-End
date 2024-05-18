import { createContext, useContext, useState, ReactNode } from "react";
import PropTypes from "prop-types";
import MyApi from "../services/MyApi"; // Importa tu módulo de servicios para la API
import User from "../model/UserType"; // Importa la interfaz User

// Define el tipo de datos para el contexto
interface UsersContextProps {
  users: User[];
  getUsers: () => Promise<void>;
  addUser: (newUser: User) => Promise<void>;
  addNumberToUser: (username: string, number: string) => Promise<void>;
}

// Define un valor inicial para el contexto
const initialUsersContext: UsersContextProps = {
  users: [],
  getUsers: async () => {},
  addUser: async () => {}, // Elimina los parámetros no utilizados
  addNumberToUser: async () => {}, // Elimina los parámetros no utilizados
};

// Crea el contexto con el valor inicial
const UsersContext = createContext<UsersContextProps>(initialUsersContext);

export const useUsers = () => {
  const context = useContext(UsersContext);

  if (!context) {
    throw new Error("useUsers debe estar dentro de un provider UserProvider");
  }

  return context;
};

interface UserProviderProps {
  children: ReactNode;
}

export function UserProvider({ children }: UserProviderProps) {
  const [users, setUsers] = useState<User[]>([]);

  const getUsers = async () => {
    try {
      const userList = await MyApi.getUsers();
      setUsers(userList);
    } catch (error) {
      console.error("Error al obtener la lista de usuarios:", error);
    }
  };

  const addUser = async (newUser: User) => {
    try {
      const addedUser = await MyApi.addUser(newUser);
      setUsers([...users, addedUser]);
    } catch (error) {
      console.error("Error al agregar usuario:", error);
    }
  };

  const addNumberToUser = async (username: string, number: string) => {
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
