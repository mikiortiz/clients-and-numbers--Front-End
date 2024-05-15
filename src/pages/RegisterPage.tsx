import { useState, useEffect } from 'react';
import { useAuth } from '../context/authContext';
import { useNavigate } from 'react-router-dom';

const RegisterComponent = () => {
  const { signup, isAuthenticated, authErrors } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
  });
  const [formErrors, setFormErrors] = useState<any>({}); // Added state for form errors
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setFormErrors((prevErrors: any) => ({ ...prevErrors, [name]: "" })); // Clear error on change
  };

  const handleRegister = async () => {
    try {
      await signup(formData);
    } catch (error) {
      console.log('Error al registrar:', error);

      handleAuthError(error); // Call new function to handle errors
    }
  };

  const handleAuthError = (error: any) => {
    if (error?.response?.data) { // Check for response data
      const responseData = error.response.data;

      if (Array.isArray(responseData)) {
        // Yup validation errors (assuming same structure as Login example)
        const mappedErrors = responseData.map((err) => ({
          field: err.field, // Assuming field property exists
          message: err.message,
        }));
        setFormErrors(mappedErrors); // Set form errors with formatted messages
      } else if (typeof responseData === 'string') {
        // Other server errors (single error message)
        setFormErrors([{ message: responseData }]);
      } else {
        // Unknown error structure
        setFormErrors([{ message: 'Ocurrió un error inesperado. Inténtalo de nuevo más tarde.' }]);
      }
    } else {
      console.log("Error desconocido durante el registro:", error);
      setFormErrors([{ message: 'Ocurrió un error inesperado. Inténtalo de nuevo más tarde.' }]);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      console.log("registro:", isAuthenticated);
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div>
      <h2>Registro</h2>
      <input
        type="text"
        placeholder="Correo Electrónico"
        name="email"
        value={formData.email}
        onChange={handleChange}
      />
      {formErrors.email && (
        <p style={{ color: 'red', marginTop: '0.5rem' }}>{formErrors.email.message}</p>
      )} {/* Display email error message */}
      <input
        type="text"
        placeholder="Nombre de Usuario"
        name="username"
        value={formData.username}
        onChange={handleChange}
      />
      {formErrors.username && (
        <p style={{ color: 'red', marginTop: '0.5rem' }}>{formErrors.username.message}</p>
      )} {/* Display username error message */}
      <input
        type="password"
        placeholder="Contraseña"
        name="password"
        value={formData.password}
        onChange={handleChange}
      />
      {formErrors.password && (
        <p style={{ color: 'red', marginTop: '0.5rem' }}>{formErrors.password.message}</p>
      )} {/* Display password error message */}
      <button onClick={handleRegister}>Registrarse</button>
      {authErrors && Array.isArray(authErrors) && (
        <div style={{ marginTop: '1rem' }}>
          {authErrors.map((error, index) => (
            <p key={index} style={{ color: 'red', marginTop: '0.5rem' }}>
              {error.message}
            </p>
          ))}
        </div>
      )} {/* Display general auth errors */}
    </div>
  );
};

export default RegisterComponent;
