import React, { useEffect, useState } from "react";
import { Chip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import MyApi from "../services/MyApi";
import User from "../model/UserType";

const UsersList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [editedUser, setEditedUser] = useState({
    firstName: "",
    lastName: "",
    username: "",
  });

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

  const handleEditClick = (user: User) => {
    setSelectedUser(user);
    setEditedUser({
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = async () => {
    if (selectedUser && selectedUser._id) {
      try {
        // Actualizar el usuario con los datos editados
        await MyApi.updateUser(selectedUser._id, editedUser);

        // Obtener el usuario actualizado
        const updatedUser = { ...selectedUser, ...editedUser };

        // Actualizar la lista de usuarios localmente
        const updatedUsers = users.map((user) =>
          user._id === updatedUser._id ? updatedUser : user
        );
        setUsers(updatedUsers);

        setOpen(false);
      } catch (error) {
        console.error("Error al actualizar el usuario:", error);
      }
    }
  };

  return (
    <div className="shadow-lg rounded-lg p-4 w-full overflow-y-full text-center">
      <h2 className="text-4xl font-semibold mb-6">Lista de Usuarios</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map((user) => (
          <div key={user._id} className="relative">
            <div className="bg-white border border-purple-500 rounded-lg p-4">
              <EditIcon
                className="absolute top-2 right-2 cursor-pointer text-purple-500"
                onClick={() => handleEditClick(user)}
              />
              <h3 className="text-lg font-semibold mb-4">
                {user.firstName} {user.lastName}
              </h3>
              <div className="flex items-center justify-center gap-2">
                <p className="text-sm text-gray-500 font-semibold">
                  Nombre de Usuario:
                </p>
                {user.username}
              </div>
              <div className="border-t-2 border-purple-300 my-4"></div>
              <div className="text-sm text-gray-500 font-semibold">
                Números asociados:
                {user.numbers.length === 0 ? (
                  <p className="text-red-500">No hay números asociados aquí.</p>
                ) : (
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
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de edición de usuario */}
      {open && (
        <>
          <div className="fixed inset-0 z-50 bg-black opacity-50"></div>
          <div className="fixed z-50 inset-0 flex items-center justify-center min-h-screen p-4">
            <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-4">
              <h2 className="text-3xl font-bold mb-4">Editar Usuario</h2>
              <label htmlFor="first-name" className="block mb-1">
                Modificar Nombre:
              </label>
              <input
                type="text"
                id="first-name"
                placeholder="Nombre"
                value={editedUser.firstName}
                onChange={(e) =>
                  setEditedUser({ ...editedUser, firstName: e.target.value })
                }
                className="w-full p-2 mb-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <label htmlFor="last-name" className="block mb-1">
                Modificar Apellido:
              </label>
              <input
                type="text"
                id="last-name"
                placeholder="Apellido"
                value={editedUser.lastName}
                onChange={(e) =>
                  setEditedUser({ ...editedUser, lastName: e.target.value })
                }
                className="w-full p-2 mb-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <label htmlFor="new-username" className="block mb-1">
                Modificar Nombre de usuario:
              </label>
              <input
                type="text"
                id="new-username"
                placeholder="Nombre de usuario"
                value={editedUser.username}
                onChange={(e) =>
                  setEditedUser({ ...editedUser, username: e.target.value })
                }
                className="w-full p-2 mb-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <div className="flex justify-center space-x-2">
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-purple-500 text-white rounded-xl font-semibold"
                >
                  Guardar
                </button>
                <button
                  onClick={handleClose}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-xl font-semibold"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UsersList;
