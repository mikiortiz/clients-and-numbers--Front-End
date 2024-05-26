import React, { useState, useEffect } from "react";
import MyApi from "../services/MyApi";
import User from "../model/UserType";

interface AddUserDialogProps {
  open: boolean;
  onClose: () => void;
  selectedNumber: number | null;
}

const AddUserDialog: React.FC<AddUserDialogProps> = ({
  open,
  onClose,
  selectedNumber,
}) => {
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [showExistingUserForm, setShowExistingUserForm] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [searchResults, setSearchResults] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await MyApi.getUsers();
        setUsers(users);
      } catch (error) {
        console.error("Error al obtener la lista de usuarios:", error);
      }
    };

    if (open) {
      fetchUsers();
    }
  }, [open]);

  useEffect(() => {
    if (username.trim() !== "") {
      const results = users.filter((user) =>
        user.username.toLowerCase().includes(username.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [username, users]);

  useEffect(() => {
    setIsButtonDisabled(selectedUser === null);
  }, [selectedUser]);

  const checkFields = () => {
    if (showExistingUserForm) {
      return username.trim() !== "" && selectedNumber !== null;
    } else {
      return (
        firstName.trim() !== "" &&
        lastName.trim() !== "" &&
        username.trim() !== "" &&
        selectedNumber !== null
      );
    }
  };

  const handleFieldChange = () => {
    setIsButtonDisabled(!checkFields());
  };

  const clearFields = () => {
    setFirstName("");
    setLastName("");
    setUsername("");
    setSelectedUser(null);
    setError(null);
  };

  const handleNewUserForm = () => {
    setShowExistingUserForm(false);
    clearFields();
  };

  const handleExistingUserForm = () => {
    setShowExistingUserForm(true);
    clearFields();
  };

  const handleAddUser = async () => {
    try {
      if (!selectedNumber) {
        setError("No se ha seleccionado ningún número.");
        return;
      }

      if (showExistingUserForm) {
        // Aquí se estaba verificando la existencia del usuario
        // Vamos a quitar esta parte para la sección de "Nuevo Usuario"
        await MyApi.addNumberToUser(username, selectedNumber.toString());
        console.log(
          `Número ${selectedNumber} agregado al usuario ${username}.`
        );
      } else {
        // Verificar si el nombre de usuario ya existe
        const userExists = users.some(
          (user) => user.username === username.trim()
        );
        if (userExists) {
          setError("El nombre de usuario ya existe. Por favor, elige otro.");
          return;
        }

        // Agregamos el nuevo usuario sin verificar la existencia
        if (username.trim() === "") {
          setError("Por favor ingresa un nombre de usuario.");
          return;
        }

        const newUser = {
          firstName,
          lastName,
          username,
          numbers: [selectedNumber.toString()],
        };
        await MyApi.addUser(newUser);
        console.log("Usuario agregado exitosamente.");
      }

      setFirstName("");
      setLastName("");
      setUsername("");
      setError(null);
      onClose();
    } catch (error) {
      console.error("Error al realizar la acción:", error);
      setError("Error al realizar la acción. Por favor, inténtelo de nuevo.");
      setFirstName("");
      setLastName("");
      setUsername("");
    }
  };
  const handleUserClick = (selectedUsername: string) => {
    setUsername(selectedUsername);
    setSelectedUser(selectedUsername);
    setIsButtonDisabled(false);
  };

  return (
    <div
      className={`add-user-dialog-container ${open ? "block" : "hidden"}`}
      style={{
        position: "fixed",
        top: 40,
        left: 0,
        width: "100%",
        maxHeight: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="bg-black opacity-50 fixed inset-0"></div>
      <div
        className="bg-purple-200 rounded-xl shadow-lg w-full max-w-md p-4 relative z-10"
        style={{ overflowY: "auto" }}
      >
        <div className="flex justify-center items-center mb-4">
          <h2 className="text-xl font-semibold">¿ Agregar Número a ?</h2>
        </div>
        <div
          className="overflow-auto"
          style={{ maxHeight: "calc(100% - 100px)" }}
        >
          <div className="mb-4">
            <div className="flex justify-center mb-4">
              <button
                className={`px-4 py-2 font-semibold rounded-xl ${
                  !showExistingUserForm
                    ? "bg-purple-500 text-white"
                    : "bg-gray-100"
                } mr-8`}
                onClick={handleNewUserForm}
              >
                Nuevo Usuario
              </button>
              <button
                className={`px-4 py-2 font-semibold rounded-xl ${
                  showExistingUserForm
                    ? "bg-purple-500 text-white"
                    : "bg-gray-100"
                }`}
                onClick={handleExistingUserForm}
              >
                Usuario Existente
              </button>
            </div>

            <p className="text-gray-700">
              Número Seleccionado:
              <span className="inline-block bg-purple-500 rounded-full px-3 py-1 text-white font-semibold ml-2">
                {selectedNumber}
              </span>
            </p>

            <hr className=" my-2 border-purple-500" />
            {showExistingUserForm ? (
              <>
                <label htmlFor="existing-username" className="block mb-2">
                  ¿Nombre de usuario existente?
                </label>
                <input
                  type="text"
                  id="existing-username"
                  placeholder="Buscador de usuarios existente"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    handleFieldChange();
                  }}
                  className="w-full p-2 mb-2 border border-gray-300 rounded-xl"
                  autoComplete="off"
                />
                <ul className="max-h-40 overflow-y-auto border border-gray-300 rounded p-2">
                  {searchResults.map((user) => (
                    <li
                      key={user.username}
                      className={`p-2 ${
                        selectedUser === user.username ? "bg-lightblue" : ""
                      } cursor-pointer`}
                      onClick={() => handleUserClick(user.username)}
                    >
                      {user.username}
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <>
                {error && (
                  <div className="mb-2 text-red-500">
                    <p>{error}</p>
                    
                    <button
                      className="px-4 bg-purple-300 text-gray-700 rounded-xl font-semibold w-full"
                      onClick={() => setShowExistingUserForm(true)}
                    >
                      <p>dirigete a</p>
                      ¿Usuario existente?
                    </button>
                  </div>
                )}
                <label htmlFor="first-name" className="block mb-2">
                  Nombre:
                </label>
                <input
                  type="text"
                  id="first-name"
                  placeholder="Nombre"
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                    handleFieldChange();
                  }}
                  className="w-full p-2 mb-2 border border-gray-300 rounded-xl"
                  autoComplete="off"
                />
                <label htmlFor="last-name" className="block mb-2">
                  Apellido:
                </label>
                <input
                  type="text"
                  id="last-name"
                  placeholder="Apellido"
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                    handleFieldChange();
                  }}
                  className="w-full p-2 mb-2 border border-gray-300 rounded-xl"
                  autoComplete="off"
                />
                <label htmlFor="new-username" className="block mb-2">
                  Nombre de usuario:
                </label>
                <input
                  type="text"
                  id="new-username"
                  placeholder="Nombre de usuario"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    handleFieldChange();
                  }}
                  className="w-full p-2 mb-2 border border-gray-300 rounded-xl"
                  autoComplete="off"
                />
              </>
            )}
          </div>
          <div className="flex mt-8 justify-center space-x-2">
            <button
              onClick={handleAddUser}
              className={`px-4 py-2 bg-purple-500 text-white rounded-xl font-semibold ${
                isButtonDisabled ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isButtonDisabled}
            >
              {showExistingUserForm ? "Agregar Número" : "Agregar"}
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl font-semibold"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUserDialog;
