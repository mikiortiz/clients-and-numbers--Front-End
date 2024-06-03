import React, { useEffect, useState } from "react";
import { Chip } from "@mui/material";
import MyApi from "../services/MyApi";
import User from "../model/UserType";

const UsersList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await MyApi.getUsers();
        setUsers(fetchedUsers);
      } catch (error) {
        console.error("Error al obtener la lista de usuarios:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="shadow-lg rounded-lg p-4 w-full overflow-y-full text-center">
      <h2 className="text-4xl font-semibold mb-6">Lista de Usuarios</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map((user) => (
          <div key={user._id}>
            <div className="bg-white border border-purple-500 rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-4">
                {user.firstName} {user.lastName}
              </h3>
              <div className="flex items-center justify-center gap-2">
                <p className="text-sm text-gray-500 font-semibold">
                  Nombre de Usuario:
                </p>
                {user.username}
              </div>
              <div
                className="border-t-2 border-purple-300 my-4"
                style={{ width: "100%" }}
              ></div>
              <p className="text-sm text-gray-500 font-semibold">
                Números asociados:
                <div className="flex flex-wrap gap-2 mt-2">
                  {user.numbers.map((number) => (
                    <Chip
                      key={number}
                      label={number.toString()}
                      style={{
                        cursor: "pointer",
                        width: "70px",
                        height: "40px",
                        backgroundColor: "#9c27b0",
                        color: "white",
                        fontSize: "20px",
                      }}
                    />
                  ))}
                </div>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersList;
