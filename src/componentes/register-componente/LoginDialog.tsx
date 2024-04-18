import React, { useState } from "react";
import MyApiRegister from "../../services/MyApiRegister";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
} from "@mui/material";
import UserRegistrationData from "../../model/UserRegistrationData";
import UserRegistrationForm from "../register-componente/UserRegistrationForm";

interface LoginDialogProps {
  open: boolean;
  onClose: () => void;
}

const LoginDialog: React.FC<LoginDialogProps> = ({ open, onClose }) => {
  const [formData, setFormData] = useState<UserRegistrationData>({
    username: "",
    email: "",
    password: "",
  });

  const [showRegistrationForm, setShowRegistrationForm] =
    useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { email, password } = formData;
      await MyApiRegister.login(email, password);
      console.log("Inicio de sesión exitoso");
      onClose();
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };

  const handleOpenRegistrationForm = () => {
    setShowRegistrationForm(true);
  };

  const handleCloseRegistrationForm = () => {
    setShowRegistrationForm(false);
  };

  const handleCloseDialog = () => {
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleCloseDialog}>
      <DialogTitle>Iniciar Sesión</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            type="email"
            name="email"
            label="Email"
            value={formData.email}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            type="password"
            name="password"
            label="Contraseña"
            value={formData.password}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <Button onClick={onClose} color="secondary">
            Atras
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Iniciar Sesión
          </Button>
          <Button
            onClick={handleOpenRegistrationForm}
            variant="outlined"
            color="primary"
          >
            Registrarse
          </Button>
        </form>
      </DialogContent>

      {showRegistrationForm && (
        <UserRegistrationForm onClose={handleCloseRegistrationForm} />
      )}
    </Dialog>
  );
};

export default LoginDialog;
