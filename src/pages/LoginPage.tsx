import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { UserRegistrationData } from "../model/UserRegistrationData";

const LoginPage = () => {
  const { signIn, authErrors, isAuthenticated } = useAuth();
  const [formData, setFormData] = useState<UserRegistrationData>({
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState<
    Record<string, string | undefined>
  >({});
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setFormErrors((prevErrors: any) => ({ ...prevErrors, [name]: "" }));
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await signIn(formData);
    } catch (error) {
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
      console.log("Error al iniciar sesión:", error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      console.log("redirecciona?");
      navigate("/config");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="flex justify-center items-center mt-20">
      <div className="w-full max-w-md bg-white border border-gray-300 shadow-xl rounded-xl p-6">
        <h2 className="text-center mb-4 font-bold text-3xl text-blue-500">
          Iniciar Sesión
        </h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block mb-1 font-bold text-center text-blue-500"
            >
              Correo Electrónico:
            </label>
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
            <label
              htmlFor="password"
              className="block mb-1 font-bold text-center text-blue-500"
            >
              Contraseña:
            </label>
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
            Iniciar Sesión
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
      </div>
    </div>
  );
};

export default LoginPage;
