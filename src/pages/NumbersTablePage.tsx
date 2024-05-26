import React, { useEffect, useState } from "react";
import { Chip, LinearProgress } from "@mui/material";
import AddUserDialog from "../componentes/AddUserDialog";
import NumberInfoDialog from "../componentes/NumberInfoDialog";
import MyApi from "../services/MyApi";
import easyCounterLogo from "../../public/images/easy-counter-logo.png";

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
          <img src={easyCounterLogo} alt="Easy Counter Logo" className="w-32 h-auto animate-spin" />
          <LinearProgress color="secondary" style={{ width: '50%', borderRadius: '5px' }} />
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {numbers.map((number, index) => (
            <Chip
              key={index}
              label={number.toString()}
              style={{
                margin: "5px",
                width: 70,
                cursor: "pointer",
                backgroundColor: isNumberAssigned(number)
                  ? "#9c27b0"
                  : undefined,
                color: isNumberAssigned(number) ? "white" : undefined,
              }}
              onClick={() => handleChipClick(number)}
            />
          ))}
        </div>
      )}
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
    </div>
  );
};

export default NumberTable;
