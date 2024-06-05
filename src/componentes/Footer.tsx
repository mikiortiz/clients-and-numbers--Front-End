import React from "react";
import githubIcon from "../../public/images/github.png";
import linkedinIcon from "../../public/images/linkedin.png";
import gmailIcon from "../../public/images/gmail.png";
import whatsappIcon from "../../public/images/whatsapp.png";

const Footer: React.FC = () => {
  return (
    <footer className="w-full mt-8 p-1 bg-gray-300 rounded-lg border-t-2 border-purple-500 flex flex-wrap items-center">
      <div className="flex flex-col flex-grow text-left ml-4">
        <p className="text-xs mb-2">
          Miguel Ortiz, Junior FullStack Developer web. Año 2024
          <br />
          Si deseas conocer más sobre mi trabajo o contactar conmigo, aquí
          tienes mis enlaces de contacto:
        </p>
      </div>
      <div className="flex flex-wrap justify-end items-center ml-auto mr-4 mt-2">
        <div className="flex flex-col items-center mr-4 mb-4">
          <a
            href="https://github.com/mikiortiz"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={githubIcon} alt="GitHub" className="h-8 w-8 mt-2" />
          </a>
          <span className="text-xs text-purple-700 hover:underline font-semibold">
            GitHub
          </span>
        </div>
        <div className="flex flex-col items-center mr-4 mb-4">
          <a
            href="https://www.linkedin.com/in/miguel-ortiz-9736b32a5/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={linkedinIcon}
              alt="LinkedIn"
              className="h-8 w-8 mt-2 mb-1"
            />
          </a>
          <span className="text-xs text-purple-700 hover:underline font-semibold">
            LinkedIn
          </span>
        </div>
        <div className="flex flex-col items-center mr-4 mb-4">
          <a
            href="mailto:ortizmichel390@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={gmailIcon} alt="Gmail" className="h-8 w-8 mt-2 mb-1" />
          </a>
          <span className="text-xs text-purple-700 hover:underline font-semibold">
            Correo
          </span>
        </div>
        <div className="flex flex-col items-center mb-4 mr-10">
          <a
            href="https://wa.me/5492622517454?text=Hola,%20soy%20Miguel%20Ortiz%20Junior%20FullStack%20Developer%20web.%20Envíame%20un%20mensaje%20para%20contactarme."
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={whatsappIcon}
              alt="WhatsApp"
              className="h-8 w-8 mt-2 mb-1"
            />
          </a>
          <span className="text-xs text-purple-700 hover:underline font-semibold">
            WhatsApp
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
