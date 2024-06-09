import React, { useEffect, useState } from "react";
import MyApi from "../services/MyApi";
import User from "../model/UserType";
import clientsAndNumbersLogo from "../../public/images/clients-and-numbers.logo-Photoroom.png";
import { InformationCircleIcon, UserIcon } from "@heroicons/react/24/solid";
import { LinearProgress } from "@mui/material";

interface NumberInfoDialogProps {
  open: boolean;
  onClose: () => void;
  selectedNumber: number | null;
}

const NumberInfoDialog: React.FC<NumberInfoDialogProps> = ({
  open,
  onClose,
  selectedNumber,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserByNumber = async () => {
      try {
        if (selectedNumber !== null) {
          const users = await MyApi.getUsers();
          const foundUser = users.find((user) =>
            user.numbers.includes(selectedNumber.toString())
          );
          setUser(foundUser || null);
        }
      } catch (error) {
        console.error("Error al obtener el usuario por número:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserByNumber();
  }, [selectedNumber]);

  return (
    <div
      className={`number-info-dialog-container ${open ? "block" : "hidden"}`}
      style={{
        position: "fixed",
        top: 60,
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
        className="bg-gray-100 rounded-lg shadow-lg w-full max-w-md p-4 relative z-10 flex flex-col items-center"
        style={{ overflowY: "auto" }}
      >
        <div className="flex justify-center items-center mb-4">
          <InformationCircleIcon className="h-6 w-6 mr-2 text-purple-700 animate-pulse" />
          <h2 className="text-xl font-semibold">Información del Número</h2>
        </div>
        <div className="text-center">
          {loading ? (
            <div className="mb-4">
              <img
                src={clientsAndNumbersLogo}
                alt="Easy Counter Logo"
                className="w-20 h-auto animate-spin mb-4 ml-12"
              />
              <LinearProgress color="secondary" />
              <p className="text-gray-700">Esperando usuario...</p>
            </div>
          ) : (
            <>
              <div className="mb-4">
                <span
                  className="text-white rounded-md px-3 py-1 bg-purple-700"
                  style={{
                    fontSize: "20px",
                    width: "90px",
                    height: "60px",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "10px",
                  }}
                >
                  {selectedNumber}
                </span>
              </div>
              <div className="mb-4">
                <div className="flex items-center mb-2">
                  <UserIcon className="h-6 w-6 mr-2 text-purple-700 animate-pulse" />
                  <h3 className="text-lg font-semibold">
                    Información del Usuario:
                  </h3>
                </div>
                {user ? (
                  <>
                    <p className="text-gray-700">
                      <strong>Nombre:</strong> {user.firstName}
                    </p>
                    <p className="text-gray-700">
                      <strong>Apellido:</strong> {user.lastName}
                    </p>
                    <p className="text-gray-700">
                      <strong>Nombre de Usuario:</strong> {user.username}
                    </p>
                  </>
                ) : (
                  <p className="text-gray-700">
                    No se encontró información del usuario.
                  </p>
                )}
              </div>
            </>
          )}
        </div>
        <div className="flex justify-center mt-4">
          <button
            onClick={onClose}
            className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-700"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default NumberInfoDialog;
