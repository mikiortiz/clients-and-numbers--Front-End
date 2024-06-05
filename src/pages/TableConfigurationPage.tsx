import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { ClockIcon, ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import MyApi from "../services/MyApi";

interface FormValues {
  startNumber: string;
  endNumber: string;
}

const validationSchema = Yup.object().shape({
  startNumber: Yup.number()
    .required("Inicio requerido")
    .typeError("Debe ser un número"),
  endNumber: Yup.number()
    .required("Fin requerido")
    .typeError("Debe ser un número"),
});

const TableConfiguration = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [isTableGenerated, setIsTableGenerated] = useState(false);
  const [redirectTimer, setRedirectTimer] = useState(20);
  const timerRef = useRef<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkTable = async () => {
      try {
        const numbersInRange = await MyApi.getNumbersInRange(0, 0);
        if (numbersInRange.length > 0) {
          setIsTableGenerated(true);
          setRedirectTimer(20); // Reset the timer
          if (timerRef.current) {
            clearInterval(timerRef.current);
          }
          timerRef.current = window.setInterval(() => {
            setRedirectTimer((prevTimer) => {
              if (prevTimer === 1) {
                clearInterval(timerRef.current as number);
                navigate("/numbers");
              }
              return prevTimer - 1;
            });
          }, 1000);
        }
      } catch (error) {
        console.error(
          "Error al verificar si el usuario tiene un rango de números:",
          error
        );
      }
    };

    checkTable();

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [navigate]);

  const handleGenerateTable = async (
    values: FormValues,
    setSubmitting: (isSubmitting: boolean) => void
  ) => {
    const parsedStart = parseInt(values.startNumber);
    const parsedEnd = parseInt(values.endNumber);

    if (!isNaN(parsedStart) && !isNaN(parsedEnd)) {
      if (isTableGenerated) {
        setOpenDialog(true);
      } else {
        try {
          await MyApi.saveNumberRange(parsedStart, parsedEnd);
          navigate("/numbers");
        } catch (error) {
          console.error("Error al guardar el rango de números:", error);
        } finally {
          setSubmitting(false);
        }
      }
    } else {
      console.error("Los valores de inicio y fin deben ser números válidos.");
      setSubmitting(false);
    }
  };

  const confirmGenerateTable = async (
    values: FormValues,
    setSubmitting: (isSubmitting: boolean) => void
  ) => {
    const parsedStart = parseInt(values.startNumber);
    const parsedEnd = parseInt(values.endNumber);

    if (!isNaN(parsedStart) && !isNaN(parsedEnd)) {
      try {
        await MyApi.saveNumberRange(parsedStart, parsedEnd);
        navigate("/numbers");
      } catch (error) {
        console.error("Error al guardar el rango de números:", error);
      } finally {
        setOpenDialog(false);
        setSubmitting(false);
      }
    } else {
      console.error("Los valores de inicio y fin deben ser números válidos.");
      setSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="w-full max-w-md bg-gray-100 border border-gray-300 shadow-xl rounded-xl p-4 mt-5">
        <h2 className="text-center mb-2 font-semibold text-4xl text-gray-800">
          {isTableGenerated ? "Crear Nueva Tabla" : "Crea tu Primera Tabla"}
        </h2>
        <h2 className="text-center font-semibold text-gray-400">
          Ingresa un rango de números para generar una tabla.
        </h2>
        {isTableGenerated && (
          <div className="mt-2 bg-yellow-300 p-2 rounded-md text-center">
            <ExclamationTriangleIcon className="h-12 w-12 inline-block mb-1 animate-pulse" />
            <span className="inline-block">
              Ya tienes una tabla generada. Por seguridad, tienes{" "}
              <span id="timer">{redirectTimer}</span> segundos
            </span>
            <ClockIcon className="h-6 w-6 inline-block mx-auto animate-spin ml-2" />
            <span>para configurar una nueva.</span>
            <button
              onClick={() => navigate("/numbers")}
              className="bg-purple-500 text-white px-4 py-1 mt-2 rounded-xl hover:bg-purple-700"
            >
              O dirigete a Mi Tabla
            </button>
          </div>
        )}

        <Formik
          initialValues={{ startNumber: "", endNumber: "" }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) =>
            handleGenerateTable(values, setSubmitting)
          }
        >
          {({ isSubmitting, values, setSubmitting }) => (
            <Form>
              <div className="mb-2">
                <label
                  htmlFor="startNumber"
                  className="block mb-1 font-bold text-center text-gray-500"
                >
                  Inicio:
                </label>
                <Field
                  type="number"
                  id="startNumber"
                  name="startNumber"
                  className="w-full px-3 py-2 leading-tight text-gray-700 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Inicio"
                />
                <ErrorMessage
                  name="startNumber"
                  component="p"
                  className="text-red-500"
                />
              </div>
              <div className="mb-2">
                <label
                  htmlFor="endNumber"
                  className="block mb-1 font-bold text-center text-gray-500"
                >
                  Fin:
                </label>
                <Field
                  type="number"
                  id="endNumber"
                  name="endNumber"
                  className="w-full px-3 py-2 leading-tight text-gray-700 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Fin"
                />
                <ErrorMessage
                  name="endNumber"
                  component="p"
                  className="text-red-500"
                />
              </div>
              <button
                type="submit"
                className="w-full px-4 py-4 mt-2 font-bold text-white bg-purple-500 rounded-xl hover:bg-purple-700"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Generando Tabla..." : "Generar Tabla"}
              </button>
              <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <div className="transition-all transform .duration-300">
                  <DialogTitle>Confirmación</DialogTitle>
                  <DialogContent>
                    <p>
                      ¿Está seguro de generar una nueva tabla? Esta acción
                      eliminará la tabla actual y todos sus usuarios y números
                      relacionados.
                    </p>
                  </DialogContent>
                  <DialogActions>
                    <button
                      className="text-gray-700 bg-gray-200 border border-gray-300 py-1 px-3 rounded-md hover:bg-gray-300"
                      onClick={() => setOpenDialog(false)}
                    >
                      Cancelar
                    </button>
                    <button
                      className="text-white bg-blue-500 hover:bg-blue-700 py-1 px-3 rounded-md"
                      onClick={() =>
                        confirmGenerateTable(values, setSubmitting)
                      }
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Confirmando..." : "Confirmar"}
                    </button>
                  </DialogActions>
                </div>
              </Dialog>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default TableConfiguration;
