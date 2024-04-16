import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Typography, TextField } from "@mui/material";
import MyApi from "../services/MyApi";

const Home: React.FC = () => {
  const [startNumber, setStartNumber] = useState("");
  const [endNumber, setEndNumber] = useState("");
  const navigate = useNavigate();

  const handleGenerateTable = async () => {
    const start = parseInt(startNumber);
    const end = parseInt(endNumber);

    if (!isNaN(start) && !isNaN(end)) {
      try {
        await MyApi.saveNumberRange(start, end);

        navigate("/");
      } catch (error) {
        console.error("Error al guardar el rango de números:", error);
      }
    }
  };

  return (
    <div>
      <Typography variant="h3" align="center" gutterBottom>
        Bienvenido a la Aplicación
      </Typography>
      <Typography variant="body1" align="center" paragraph>
        Esta es tu página de inicio. Ingresa un rango de números para generar
        una tabla.
      </Typography>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <TextField
          label="Inicio"
          value={startNumber}
          onChange={(e) => setStartNumber(e.target.value)}
          type="number"
          variant="outlined"
          style={{ marginRight: "10px" }}
        />
        <TextField
          label="Fin"
          value={endNumber}
          onChange={(e) => setEndNumber(e.target.value)}
          type="number"
          variant="outlined"
          style={{ marginRight: "10px" }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleGenerateTable}
        >
          Generar Tabla
        </Button>
      </div>
    </div>
  );
};

export default Home;
