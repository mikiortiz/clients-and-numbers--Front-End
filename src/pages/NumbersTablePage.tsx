import React, { useEffect, useState } from "react";
import { Chip, LinearProgress } from "@mui/material";
import AddUserDialog from "../componentes/AddUserDialog";
import NumberInfoDialog from "../componentes/NumberInfoDialog";
import MyApi from "../services/MyApi";
import easyCounterLogo from "../../public/images/easy-counter-logo.png";
import { CheckIcon } from "@heroicons/react/24/solid"; // Importar el icono de check

const NumberTable: React.FC = () => {
  const [numbers, setNumbers] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
  const [dialogType, setDialogType] = useState<"addUser" | "numberInfo" | null>(
    null
  );
  const [assignedNumbers, setAssignedNumbers] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await MyApi.getNumbersInRange(0, 0);
        setNumbers(response);

        const assignedNumbers = await getAssignedNumbers();
        setAssignedNumbers(assignedNumbers);
      } catch (error) {
        console.error("Error al obtener los números:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getAssignedNumbers = async () => {
    try {
      const users = await MyApi.getUsers();
      const assignedNumbers = users.flatMap((user) => user.numbers);
      return assignedNumbers;
    } catch (error) {
      console.error("Error al obtener los números asignados:", error);
      return [];
    }
  };

  const handleChipClick = (number: number) => {
    setSelectedNumber(number);
    const isNumberAssigned = assignedNumbers.includes(number.toString());
    if (isNumberAssigned) {
      setDialogType("numberInfo");
    } else {
      setDialogType("addUser");
    }
  };

  const isNumberAssigned = (number: number) => {
    return assignedNumbers.includes(number.toString());
  };

  const updateAssignedNumbers = async () => {
    const updatedAssignedNumbers = await getAssignedNumbers();
    setAssignedNumbers(updatedAssignedNumbers);
  };

  return (
    <div className="text-center p-8">
      <h2 className="text-center mb-2 font-semibold text-4xl text-gray-800">
        Números en la Tabla
      </h2>
      <p className="text-gray-600 mb-4">
        ¡Excelente! tabla generada, selecciona números y gestiona usuarios de
        manera eficiente.
      </p>
      {loading ? (
        <div className="flex justify-center items-center flex-col space-y-4">
          <img
            src={easyCounterLogo}
            alt="Easy Counter Logo"
            className="w-32 h-auto animate-spin"
          />
          <LinearProgress
            color="secondary"
            style={{ width: "50%", borderRadius: "5px" }}
          />
        </div>
      ) : (
        <div className="flex justify-center flex-wrap gap-4">
          {numbers.map((number, index) => {
            const isAssigned = isNumberAssigned(number);
            return (
              <div
                key={index}
                style={{
                  position: "relative",
                  display: "inline-block",
                  transition: "transform 0.3s ease-in-out",
                }}
                onMouseEnter={
                  isAssigned
                    ? (e) => (e.currentTarget.style.transform = "scale(1.1)")
                    : undefined
                }
                onMouseLeave={
                  isAssigned
                    ? (e) => (e.currentTarget.style.transform = "scale(1)")
                    : undefined
                }
              >
                <div className="relative">
                  <Chip
                    label={number.toString()}
                    style={{
                      cursor: "pointer",
                      width: "90px",
                      height: "60px",
                      margin: "4px",
                      padding: "6px",
                      backgroundColor: isAssigned ? "#9c27b0" : undefined,
                      color: isAssigned ? "white" : undefined,
                      fontSize: "25px",
                    }}
                    onClick={() => handleChipClick(number)}
                  />
                  {isAssigned && (
                    <div
                      className="absolute top-3 right-3 flex justify-center items-center bg-green-500 rounded-full"
                      style={{
                        width: "24px",
                        height: "24px",
                        transform: "translate(50%, -50%)",
                      }}
                    >
                      <CheckIcon
                        className="text-white h-10 w-10 stroke-current stroke-2"
                        aria-hidden="true"
                      />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
      {dialogType && (
        <>
          {dialogType === "numberInfo" && (
            <NumberInfoDialog
              open={true}
              onClose={() => {
                setDialogType(null);
                setSelectedNumber(null);
                updateAssignedNumbers();
              }}
              selectedNumber={selectedNumber}
            />
          )}
          {dialogType === "addUser" && (
            <AddUserDialog
              open={true}
              onClose={() => {
                setDialogType(null);
                setSelectedNumber(null);
                updateAssignedNumbers();
              }}
              selectedNumber={selectedNumber}
            />
          )}
        </>
      )}
    </div>
  );
};

export default NumberTable;
