import React from "react";
import {
  UserGroupIcon,
  HashtagIcon,
  ShieldCheckIcon,
  SparklesIcon,
} from "@heroicons/react/24/solid";
import easyCounterLogo from "../../public/images/easy-counter-logo.png";

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="text-5xl font-bold text-purple-700 mb-3 text-center sm:text-left">
        Bienvenidos a EasyCOUNTER
      </h1>

      <p className="text-lg text-center mb-8">
        ¡Hola y bienvenidos a EasyCOUNTER! Si buscas una forma innovadora y
        divertida de gestionar a tus clientes y asignarles números, ¡estás en el
        lugar correcto! Nuestra aplicación está diseñada para facilitarte la
        vida y ayudarte a mantener todo bajo control de manera eficiente y
        segura.
      </p>
      <div className="flex flex-col sm:flex-row justify-center items-start w-full mb-4">
        <div className="w-full sm:w-1/3 p-4 bg-gray-100 rounded-lg sm:mr-4 mb-4 sm:mb-0 border-2 border-purple-300 hover:shadow-lg">
          <h2 className="animate-pulse text-lg font-semibold mb-2 text-purple-700">
            ¿Qué es EasyCOUNTER?
          </h2>
          <p>
            EasyCOUNTER es tu asistente personal para la gestión de clientes y
            números. Nuestra plataforma te permite organizar fácilmente tu base
            de datos de clientes y asignarles números de referencia para
            diferentes propósitos, desde rifas hasta entradas para eventos.
          </p>
        </div>
        <div className="flex justify-center w-full sm:w-auto">
          <img
            src={easyCounterLogo}
            alt="Easy Counter Logo"
            className="w-64 h-auto mt-8 mb-8 sm:mt-20 sm:mb-0 text-center animate-bounce"
          />
        </div>
        <div className="w-full sm:w-1/3 p-4 bg-gray-100 rounded-lg sm:ml-4 mb-4 sm:mb-0 border-2 border-purple-300 hover:shadow-lg">
          <h2 className="animate-pulse text-lg font-semibold mb-2 text-purple-700">
            ¿Cómo puede ayudarte EasyCOUNTER?
          </h2>
          <p>
            En EasyCOUNTER, hemos diseñado nuestra aplicación pensando en ti.
            Sabemos lo importante que es mantener tus datos organizados y
            accesibles, y queremos que disfrutes del proceso. Con una interfaz
            amigable y herramientas potentes, te ayudamos a llevar el control de
            tus clientes y sus números de manera eficiente y divertida.
          </p>
        </div>
      </div>
      <div className="w-full mb-8">
        <p className="font-semibold mb-8 text-center text-purple-700 text-3xl">
          Funcionalidades Claves
        </p>
        <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0 w-full">
          <div className="w-full sm:w-1/4 p-4 bg-gray-100 rounded-lg border-2 border-purple-300 hover:shadow-lg">
            <div className="flex items-center mb-2">
              <UserGroupIcon className="h-6 w-6 text-purple-900 mr-2 animate-pulse" />
              <h3 className="font-semibold text-purple-500">
                Gestión de Clientes
              </h3>
            </div>
            <p>
              Registra y actualiza fácilmente la información de tus clientes,
              asegurando que siempre esté al día.
            </p>
          </div>
          <div className="w-full sm:w-1/4 p-4 bg-gray-100 rounded-lg border-2 border-purple-300 hover:shadow-lg">
            <div className="flex items-center mb-2">
              <HashtagIcon className="h-6 w-6 text-purple-900 mr-2 animate-pulse" />
              <h3 className="font-semibold text-purple-500">
                Asignación de Números
              </h3>
            </div>
            <p>
              Asigna y gestiona rangos de números personalizados para cada
              cliente.
            </p>
          </div>
          <div className="w-full sm:w-1/4 p-4 bg-gray-100 rounded-lg border-2 border-purple-300 hover:shadow-lg">
            <div className="flex items-center mb-2">
              <ShieldCheckIcon className="h-6 w-6 text-purple-900 mr-2 animate-pulse" />
              <h3 className="font-semibold text-purple-500">
                Autenticación Segura
              </h3>
            </div>
            <p>
              Mantén tus datos seguros con un sistema de autenticación robusto,
              utilizando tokens en los encabezados HTTP.
            </p>
          </div>
          <div className="w-full sm:w-1/4 p-4 bg-gray-100 rounded-lg border-2 border-purple-300 hover:shadow-lg">
            <div className="flex items-center mb-2">
              <SparklesIcon className="h-6 w-6 text-purple-900 mr-2 animate-pulse" />
              <h3 className="font-semibold text-purple-500">
                Interfaz Intuitiva
              </h3>
            </div>
            <p>
              Navega por la aplicación de manera sencilla, con mensajes claros
              que te guían en cada paso.
            </p>
          </div>
        </div>
      </div>

      <div className="w-full">
        <p className="text-lg font-semibold mb-2">Únete a EasyCOUNTER hoy</p>
        <div
          className="border-t-2 border-purple-300 my-2"
          style={{ width: "100%", marginLeft: -17 }}
        ></div>
        <p>
          Únete a la comunidad de EasyCOUNTER y descubre cómo nuestra aplicación
          puede transformar la manera en que gestionas a tus clientes y asignas
          números. Ya sea para rifas, eventos, clubes, o programas de lealtad,
          EasyCOUNTER es tu solución perfecta.
        </p>
      </div>
    </div>
  );
};

export default HomePage;
