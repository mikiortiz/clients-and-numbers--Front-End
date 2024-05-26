import React, { useEffect, useState } from "react";
import MyApi from "../services/MyApi";
import User from "../model/UserType";
import { InformationCircleIcon } from "@heroicons/react/24/solid";

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
          <InformationCircleIcon className="h-6 w-6 mr-2 text-purple-500" />
          <h2 className="text-xl font-semibold">Información del Número</h2>
        </div>
        <div className="text-center">
          {user ? (
            <>
              <p className="text-gray-700">
                <strong>Número:</strong> {selectedNumber}
              </p>
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
              Número no asignado a ningún usuario.
            </p>
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
