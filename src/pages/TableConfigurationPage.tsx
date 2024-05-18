import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Typography,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import MyApi from "../services/MyApi";

const Home: React.FC = () => {
  const [startNumber, setStartNumber] = useState("");
  const [endNumber, setEndNumber] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();

  const handleGenerateTable = async () => {
    const parsedStart = parseInt(startNumber);
    const parsedEnd = parseInt(endNumber);

    // Verificar si la conversión fue exitosa y ambos valores son números válidos
    if (!isNaN(parsedStart) && !isNaN(parsedEnd)) {
      setOpenDialog(true);
    } else {
      console.error("Los valores de inicio y fin deben ser números válidos.");
    }
  };

  const confirmGenerateTable = async () => {
    const parsedStart = parseInt(startNumber);
    const parsedEnd = parseInt(endNumber);

    if (!isNaN(parsedStart) && !isNaN(parsedEnd)) {
      try {
        await MyApi.saveNumberRange(parsedStart, parsedEnd);
        navigate("/numbers");
      } catch (error) {
        console.error("Error al guardar el rango de números:", error);
      } finally {
        setOpenDialog(false);
      }
    } else {
      console.error("Los valores de inicio y fin deben ser números válidos.");
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
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Confirmación</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            ¿Está seguro de generar una nueva tabla? Esta acción eliminará la
            tabla actual y todos sus usuarios y números relacionados.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="secondary">
            Cancelar
          </Button>
          <Button onClick={confirmGenerateTable} color="primary">
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Home;
