import React, { useEffect, useState } from "react";
import { Chip } from "@mui/material";
import MyApi from "../services/MyApi";

const NumberTable: React.FC = () => {
  const [numbers, setNumbers] = useState<number[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await MyApi.getNumbersInRange(0, 0);
        setNumbers(response);
      } catch (error) {
        console.error("Error al obtener los números:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "30px" }}>
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
              backgroundColor: undefined, // No aplicamos color de fondo
              color: undefined, // No aplicamos color de texto
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default NumberTable;
