import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import UserRegistrationData from "../../model/UserRegistrationData";
import MyApiRegister from "../../services/MyApiRegister";

interface UserRegistrationFormProps {
  onClose: () => void;
}

const UserRegistrationForm: React.FC<UserRegistrationFormProps> = ({
  onClose,
}) => {
  const initialFormData: UserRegistrationData = {
    username: "",
    email: "",
    password: "",
  };

  const [formData, setFormData] =
    useState<UserRegistrationData>(initialFormData);
  const [registering, setRegistering] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegisterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setRegistering(true);

      const { username, email, password } = formData;
      const newUser = await MyApiRegister.register(username, email, password);
      console.log("Usuario registrado exitosamente:", newUser);
      onClose();
    } catch (error) {
      console.error("Error al registrar usuario:", error);
    } finally {
      setRegistering(false);
    }
  };

  return (
    <Dialog
      open={true}
      onClose={onClose}
      aria-labelledby="registration-dialog-title"
    >
      <DialogTitle id="registration-dialog-title">Register</DialogTitle>
      <DialogContent>
        <form onSubmit={handleRegisterSubmit}>
          <TextField
            autoFocus
            margin="dense"
            id="username"
            name="username"
            label="Username"
            type="text"
            fullWidth
            value={formData.username}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            id="email"
            name="email"
            label="Email"
            type="email"
            fullWidth
            value={formData.email}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            id="password"
            name="password"
            label="Password"
            type="password"
            fullWidth
            value={formData.password}
            onChange={handleInputChange}
          />
          <DialogActions>
            <Button onClick={onClose} color="secondary">
              Atras
            </Button>
            <Button type="submit" color="primary" disabled={registering}>
              {registering ? "Registering..." : "Register"}
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UserRegistrationForm;
