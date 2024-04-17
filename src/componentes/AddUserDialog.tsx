import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  Divider,
  Tab,
  Tabs,
} from "@mui/material";
import MyApi from "../services/MyApi";

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

  const handleAddUser = async () => {
    try {
      if (!selectedNumber) {
        console.error("No se ha seleccionado ningún número.");
        return;
      }

      if (showExistingUserForm) {
        await MyApi.addNumberToUser(username, selectedNumber.toString());
        console.log(
          `Número ${selectedNumber} agregado al usuario ${username}.`
        );
      } else {
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
      onClose();
    } catch (error) {
      console.error("Error al realizar la acción:", error);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          width: "600px",
          height: "600px",
          overflowY: "hidden",
        },
      }}
    >
      <DialogTitle>
        Agregar Número a{" "}
        {showExistingUserForm ? "Usuario Existente" : "Nuevo Usuario"}
      </DialogTitle>
      <Tabs
        value={showExistingUserForm ? 1 : 0}
        onChange={(_, newValue) =>
          setShowExistingUserForm(newValue === 1 ? true : false)
        }
        centered
      >
        <Tab label="Nuevo Usuario" />
        <Tab label="Usuario Existente" />
      </Tabs>
      <DialogContent dividers>
        <Typography variant="body1" gutterBottom>
          Número Seleccionado: {selectedNumber}
        </Typography>
        <Divider sx={{ my: 2 }} />
        {showExistingUserForm ? (
          <TextField
            label="Nombre de usuario existente"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
            margin="normal"
          />
        ) : (
          <>
            <TextField
              label="Nombre"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Apellido"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Nombre de usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              fullWidth
              margin="normal"
            />
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleAddUser} color="primary">
          {showExistingUserForm ? "Agregar Número" : "Agregar"}
        </Button>
        <Button onClick={() => setShowExistingUserForm(!showExistingUserForm)}>
          {showExistingUserForm
            ? "Agregar Nuevo Usuario"
            : "Agregar Número a Usuario Existente"}
        </Button>
        <Button onClick={onClose} color="secondary">
          Cancelar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddUserDialog;
