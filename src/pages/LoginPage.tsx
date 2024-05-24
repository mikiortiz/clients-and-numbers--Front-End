import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAuth } from "../context/authContext";
import {
  ExclamationTriangleIcon,
  EnvelopeIcon,
  LockClosedIcon,
} from "@heroicons/react/24/solid";
import { UserRegistrationData } from "../model/UserRegistrationData";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Correo electrónico inválido")
    .required("Correo electrónico requerido"),
  password: Yup.string().required("Contraseña requerida"),
});

const LoginPage = () => {
  const { signIn, authErrors, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [focusedField, setFocusedField] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/config");
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async (
    values: UserRegistrationData,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    try {
      await signIn(values);
    } catch (error) {
      console.log("Error al iniciar sesión:", error);
    }
    setSubmitting(false);
  };

  return (
    <div className="flex justify-center items-center">
      <div className="w-full max-w-md bg-gray-100 border border-gray-300 shadow-xl rounded-xl p-4 mt-5">
        <h2 className="text-center mb-2 font-semibold text-4xl text-gray-800">
          INICIAR SESIÓN
        </h2>
        <h2 className="text-center font-semibold text-gray-400">
          "Ingresa y gestiona tus usuarios y números de forma fácil"
        </h2>
        <div
          className="border-t-2 border-purple-300 my-4"
          style={{ width: "108%", marginLeft: -17 }}
        ></div>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-2">
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
                    className="border-none outline-none flex-grow focus:ring-0 bg-gray-100"
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
                    className="border-none outline-none flex-grow focus:ring-0 bg-gray-100"
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
              <button
                type="submit"
                className="bg-purple-500 hover:bg-purple-700 text-white font-semibold py-3 px-4 rounded-xl w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Iniciando Sesión..." : "Iniciar Sesión"}
              </button>
            </Form>
          )}
        </Formik>
        {authErrors && authErrors.length > 0 && (
          <div className="mt-4 p-4 bg-red-500 text-white text-center rounded-md">
            {authErrors.map((err, index) => (
              <p key={index} style={{ color: "white", marginTop: "0.5rem" }}>
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
