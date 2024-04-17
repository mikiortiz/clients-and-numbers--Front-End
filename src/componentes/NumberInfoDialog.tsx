import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import MyApi from "../services/MyApi";
import User from "../model/UserType";

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
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Información del Número</DialogTitle>
      <DialogContent>
        {user ? (
          <>
            <Typography variant="body1">Número: {selectedNumber}</Typography>
            <Typography variant="body1">Nombre: {user.firstName}</Typography>
            <Typography variant="body1">Apellido: {user.lastName}</Typography>
            <Typography variant="body1">Usuario: {user.username}</Typography>
          </>
        ) : (
          <Typography variant="body1">
            Número no asignado a ningún usuario.
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NumberInfoDialog;
