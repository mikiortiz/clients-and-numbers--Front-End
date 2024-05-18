import { useState } from 'react';
import { useAuth } from '../context/authContext';
import { Alert, Button, TextField } from '@mui/material';

const RegisterComponent = () => {
  const { signup, authErrors } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
  });
  const [formErrors, setFormErrors] = useState<any>({});
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setFormErrors((prevErrors: any) => ({ ...prevErrors, [name]: "" }));
  };

  const handleRegister = async () => {
    try {
      await signup(formData);
      setRegistrationSuccess(true);
    } catch (error) {
      console.log('Error al registrar:', error);
      handleAuthError(error);
    }
  };

  const handleAuthError = (error: any) => {
    // Manejar errores de autenticación
  };

  return (
    <div>
      <h2>Registro</h2>
      <TextField
        type="text"
        placeholder="Correo Electrónico"
        name="email"
        value={formData.email}
        onChange={handleChange}
      />
      {formErrors.email && (
        <Alert severity="error" sx={{ mt: 1 }}>{formErrors.email.message}</Alert>
      )}
      <TextField
        type="text"
        placeholder="Nombre de Usuario"
        name="username"
        value={formData.username}
        onChange={handleChange}
      />
      {formErrors.username && (
        <Alert severity="error" sx={{ mt: 1 }}>{formErrors.username.message}</Alert>
      )}
      <TextField
        type="password"
        placeholder="Contraseña"
        name="password"
        value={formData.password}
        onChange={handleChange}
      />
      {formErrors.password && (
        <Alert severity="error" sx={{ mt: 1 }}>{formErrors.password.message}</Alert>
      )}
      <Button onClick={handleRegister} variant="contained" sx={{ mt: 2 }}>Registrarse</Button>
      {authErrors && Array.isArray(authErrors) && (
        <div style={{ marginTop: '1rem' }}>
          {authErrors.map((error, index) => (
            <Alert key={index} severity="error" sx={{ mt: 1 }}>{error.message}</Alert>
          ))}
        </div>
      )}
      {registrationSuccess && (
        <Alert severity="success" sx={{ mt: 2 }}>¡Registrado con éxito!</Alert>
      )}
    </div>
  );
};

export default RegisterComponent;
