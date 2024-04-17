import React, { useEffect, useState } from "react";
import { Chip, CircularProgress, Typography } from "@mui/material";
import AddUserDialog from "./AddUserDialog";
import NumberInfoDialog from "./NumberInfoDialog";
import MyApi from "../services/MyApi";

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
    <div style={{ textAlign: "center", marginTop: "30px" }}>
      <Typography
        variant="h3"
        style={{
          color: "#2196f3",
          marginBottom: "20px",
          fontFamily: "fantasy",
        }}
      >
        Números Generados en la Tabla
      </Typography>
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "200px",
          }}
        >
          <CircularProgress
            color="primary"
            size={100}
            thickness={10}
            sx={{
              color: "#2196f3",
              background: "lightgrey",
              borderRadius: "100%",
            }}
          />
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
                  ? "#f50057"
                  : undefined,
                color: isNumberAssigned(number) ? "white" : undefined,
              }}
              onClick={() => handleChipClick(number)}
            />
          ))}
        </div>
      )}

      {/* Renderizado del diálogo correspondiente */}
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
