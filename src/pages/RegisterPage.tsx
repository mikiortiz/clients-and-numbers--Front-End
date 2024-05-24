import { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAuth } from "../context/authContext";
import {
  EnvelopeIcon,
  UserIcon,
  LockClosedIcon,
  ClockIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import { UserRegistrationData } from "../model/UserRegistrationData";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Correo electrónico inválido")
    .required("Correo electrónico requerido"),
  username: Yup.string().required("Nombre de usuario requerido"),
  password: Yup.string()
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .required("Contraseña requerida"),
});

const RegisterComponent = () => {
  const { signup, authErrors, setAuthErrors } = useAuth();
  const [registrationMessage, setRegistrationMessage] = useState<string | null>(
    null
  );
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (authErrors.length > 0) {
      const timer = setTimeout(() => {
        setAuthErrors([]);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [authErrors, setAuthErrors]);

  const handleSubmit = async (
    values: UserRegistrationData,
    {
      setSubmitting,
      resetForm,
    }: { setSubmitting: (isSubmitting: boolean) => void; resetForm: () => void }
  ) => {
    try {
      await signup(values);
      setRegistrationMessage("¡Registrado con éxito!");
      resetForm();
      setTimeout(() => {
        setRegistrationMessage(null);
        navigate("/login");
      }, 2000);
    } catch (error: any) {
      console.log("Error en el registro:", error);
    }
    setSubmitting(false);
  };

  return (
    <div className="flex justify-center items-center">
      <div className="w-full max-w-md bg-gray-100 border-2 border-purple-300 shadow-xl rounded-xl p-4 mt-5">
        <h2 className="text-center mb-2 font-semibold text-4xl text-gray-700">
          REGÍSTRATE
        </h2>
        <h2 className="text-center mb-4 font-semibold text-gray-400">
          "Únete y comienza a explorar todas las funcionalidades"
        </h2>
        <div
          className="border-t-2 border-purple-300 my-4"
          style={{ width: "108%", marginLeft: -17 }}
        ></div>
        <Formik
          initialValues={{ email: "", username: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-1">
                <label
                  htmlFor="email"
                  className="block mb-1 font-bold text-center text-gray-500"
                >
                  Correo Electrónico:
                </label>
                <div className="flex items-center border border-gray-400 rounded-md p-2">
                  <EnvelopeIcon
                    className={`h-6 w-6 text-purple-700 mr-2 ${
                      focusedField === "email" ? "animate-bounce" : ""
                    }`}
                  />
                  <Field
                    type="text"
                    id="email"
                    name="email"
                    className="w-full outline-none cursor-pointer bg-gray-100"
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                  />
                </div>
                <ErrorMessage name="email">
                  {(msg) => (
                    <p className="text-red-500 flex items-center">
                      <ExclamationTriangleIcon className="h-6 w-6 text-red-500 mr-2 mt-1" />
                      {msg}
                    </p>
                  )}
                </ErrorMessage>
              </div>
              <div className="mb-1">
                <label
                  htmlFor="username"
                  className="block mb-1 font-bold text-center text-gray-500"
                >
                  Nombre de Usuario:
                </label>
                <div className="flex items-center border border-gray-400 rounded-md p-2">
                  <UserIcon
                    className={`h-6 w-6 text-purple-700 mr-2 ${
                      focusedField === "username" ? "animate-bounce" : ""
                    }`}
                  />
                  <Field
                    type="text"
                    id="username"
                    name="username"
                    className="w-full outline-none cursor-pointer bg-gray-100"
                    onFocus={() => setFocusedField("username")}
                    onBlur={() => setFocusedField(null)}
                  />
                </div>
                <ErrorMessage name="username">
                  {(msg) => (
                    <p className="text-red-500 flex items-center">
                      <ExclamationTriangleIcon className="h-6 w-6 text-red-500 mr-2 mt-1" />
                      {msg}
                    </p>
                  )}
                </ErrorMessage>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block mb-1 font-bold text-center text-gray-500"
                >
                  Contraseña:
                </label>
                <div className="flex items-center border border-gray-400 rounded-md p-2">
                  <LockClosedIcon
                    className={`h-6 w-6 text-purple-700 mr-2 ${
                      focusedField === "password" ? "animate-bounce" : ""
                    }`}
                  />
                  <Field
                    type="password"
                    id="password"
                    name="password"
                    className="w-full outline-none cursor-pointer bg-gray-100"
                    onFocus={() => setFocusedField("password")}
                    onBlur={() => setFocusedField(null)}
                  />
                </div>
                <ErrorMessage name="password">
                  {(msg) => (
                    <p className="text-red-500 flex items-center">
                      <ExclamationTriangleIcon className="h-6 w-6 text-red-500 mr-2 mt-1" />
                      {msg}
                    </p>
                  )}
                </ErrorMessage>
              </div>
              {registrationMessage && (
                <div className="transition-opacity duration-500 ease-in-out opacity-100 py-4 mb-4 mt-4 p-1 bg-green-500 text-white text-center rounded-md relative">
                  <div className="ml-15 flex items-center justify-center px-8 text-lg">
                    {" "}
                    {/* Aumenta el tamaño del texto aquí */}
                    <span>{registrationMessage}</span>
                    <ClockIcon className="animate-spin h-10 w-10 ml-20" />
                  </div>
                </div>
              )}
              {authErrors.length > 0 && (
                <div className="py-4 transition-opacity duration-500 ease-in-out opacity-100 mt-4 mb-4 p-4 bg-red-500 text-white text-center rounded-md">
                  {authErrors.map((err, index) => (
                    <p key={index}>{err.message}</p>
                  ))}
                </div>
              )}
              <div className="text-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-purple-500 hover:bg-purple-700 text-white font-semibold py-3 px-4 rounded-xl w-full"
                >
                  Registrarse
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default RegisterComponent;
