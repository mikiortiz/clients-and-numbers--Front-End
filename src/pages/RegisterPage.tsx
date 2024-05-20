import React, { useState } from 'react';
import { useAuth } from '../context/authContext';

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

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await signup(formData);
      setRegistrationSuccess(true);
    } catch (error) {
      console.log('Error al registrar:', error);
      handleAuthError(error);
    }
  };

  const handleAuthError = (error: any) => {
    if (error.response && error.response.data && error.response.data.errors) {
      const serverErrors = error.response.data.errors;
      const mappedErrors: any = {};
      serverErrors.forEach((err: any) => {
        mappedErrors[err.field] = `${
          err.field.charAt(0).toUpperCase() + err.field.slice(1)
        } ${err.message}`;
      });
      setFormErrors(mappedErrors);
    } else {
      console.log("Error desconocido durante el registro:", error);
      setFormErrors([{ message: 'Ocurrió un error inesperado. Inténtalo de nuevo más tarde.' }]);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="w-full max-w-md bg-white border border-gray-300 shadow-xl rounded-xl p-6 mt-10">
        <h2 className="text-center mb-4 font-bold text-3xl text-blue-500">Registro</h2>
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-1 font-bold text-center text-blue-500">Correo Electrónico:</label>
            <input
              type="text"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border border-gray-400 rounded-md p-2 w-full"
            />
            {formErrors.email && (
              <p style={{ color: "red" }}>{formErrors.email}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="username" className="block mb-1 font-bold text-center text-blue-500">Nombre de Usuario:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="border border-gray-400 rounded-md p-2 w-full"
            />
            {formErrors.username && (
              <p style={{ color: "red" }}>{formErrors.username}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-1 font-bold text-center text-blue-500">Contraseña:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="border border-gray-400 rounded-md p-2 w-full"
            />
            {formErrors.password && (
              <p style={{ color: "red" }}>{formErrors.password}</p>
            )}
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
          >
            Registrarse
          </button>
        </form>
        {authErrors && authErrors.length > 0 && (
          <div style={{ marginTop: "1rem" }}>
            {authErrors.map((err: any, index: number) => (
              <p key={index} style={{ color: "red", marginTop: "0.5rem" }}>
                {err.message}
              </p>
            ))}
          </div>
        )}
        {registrationSuccess && (
          <p style={{ color: "green", marginTop: "1rem" }}>¡Registrado con éxito!</p>
        )}
      </div>
    </div>
  );
};

export default RegisterComponent;
