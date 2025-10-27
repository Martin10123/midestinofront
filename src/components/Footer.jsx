import { Link } from "react-router-dom";
import { correo, facebook, instagram, logo, whatsapp } from "../images";
import { useContext } from "react";
import { UsuarioContext } from "../context/UsuarioContext";

export const Footer = () => {
  const { isUsuarioActivo } = useContext(UsuarioContext);

  return (
    <footer className="w-full bg-white">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-8 py-10 max-sm:max-w-sm max-sm:mx-auto gap-y-8">
          <div className="col-span-full mb-10 lg:col-span-2 lg:mb-0">
            <a href="#" className="flex justify-center lg:justify-start">
              <img className="w-40 h-auto" src={logo} alt="Logo" />
            </a>
            <p className="py-8 text-sm text-gray-500 lg:max-w-xs text-center lg:text-left">
              My trip es una plataforma que te permite planificar tus viajes de
              la forma más sencilla y rápida. Desde destinos exóticos hasta
              escapadas locales, en My Trip te ayudamos a organizar cada detalle
              para que disfrutes de una experiencia inolvidable. ¡Únete y
              comienza a explorar hoy mismo!
            </p>
            {!isUsuarioActivo && (
              <Link
                to="/tipo-usuario"
                className="py-2.5 px-5 h-9 block w-fit bg-blue-600 rounded-lg shadow-sm text-xs text-white mx-auto transition-all  duration-500 hover:bg-blue-700 lg:mx-0"
              >
                Registrarse
              </Link>
            )}
          </div>
          <div className="lg:mx-auto text-left ">
            <h4 className="text-lg text-gray-900 font-medium mb-7">My Trip</h4>
            <ul className="text-sm  transition-all duration-500">
              <li className="mb-6">
                <a className="text-gray-600 hover:text-gray-900">Home</a>
              </li>
              <li className="mb-6">
                <a className=" text-gray-600 hover:text-gray-900">About</a>
              </li>
              <li className="mb-6">
                <a className=" text-gray-600 hover:text-gray-900">Pricing</a>
              </li>
              <li>
                <a className=" text-gray-600 hover:text-gray-900">Features</a>
              </li>
            </ul>
          </div>
          <div className="lg:mx-auto text-left ">
            <h4 className="text-lg text-gray-900 font-medium mb-7">
              Productos
            </h4>
            <ul className="text-sm  transition-all duration-500">
              <li className="mb-6">
                <a className="text-gray-600 hover:text-gray-900">
                  Figma UI System
                </a>
              </li>
              <li className="mb-6">
                <a className=" text-gray-600 hover:text-gray-900">
                  Icons Assets
                </a>
              </li>
              <li className="mb-6">
                <a className=" text-gray-600 hover:text-gray-900">
                  Responsive Blocks
                </a>
              </li>
              <li>
                <a className=" text-gray-600 hover:text-gray-900">
                  Components Library
                </a>
              </li>
            </ul>
          </div>
          <div className="lg:mx-auto text-left">
            <h4 className="text-lg text-gray-900 font-medium mb-7">Recursos</h4>
            <ul className="text-sm  transition-all duration-500">
              <li className="mb-6">
                <a className="text-gray-600 hover:text-gray-900">FAQs</a>
              </li>
              <li className="mb-6">
                <a className=" text-gray-600 hover:text-gray-900">
                  Quick Start
                </a>
              </li>
              <li className="mb-6">
                <a className=" text-gray-600 hover:text-gray-900">
                  Documentation
                </a>
              </li>
              <li>
                <a className=" text-gray-600 hover:text-gray-900">User Guide</a>
              </li>
            </ul>
          </div>
          <div className="lg:mx-auto text-left">
            <h4 className="text-lg text-gray-900 font-medium mb-7">Noticias</h4>
            <ul className="text-sm  transition-all duration-500">
              <li className="mb-6">
                <a className="text-gray-600 hover:text-gray-900">News</a>
              </li>
              <li className="mb-6">
                <a className=" text-gray-600 hover:text-gray-900">
                  Tips & Tricks
                </a>
              </li>
              <li className="mb-6">
                <a className=" text-gray-600 hover:text-gray-900">
                  New Updates
                </a>
              </li>
              <li>
                <a className=" text-gray-600 hover:text-gray-900">Events</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="py-7 border-t border-gray-200">
          <div className="flex items-center justify-center flex-col lg:justify-between lg:flex-row">
            <span className="text-sm text-gray-500 ">
              ©<a href="https://pagedone.io/">My Trip</a> 2024, All rights
              reserved.
            </span>
            <div className="flex mt-4 space-x-4 sm:justify-center lg:mt-0 ">
              <a
                className="w-9 h-9 rounded-full flex justify-center items-center"
                target="_blank"
                href="#"
              >
                <img src={whatsapp} alt="whatsapp" />
              </a>
              <a
                className="w-9 h-9 rounded-full flex justify-center items-center"
                target="_blank"
                href="#"
              >
                <img src={correo} alt="correo" />
              </a>
              <a
                className="w-9 h-9 rounded-full flex justify-center items-center"
                target="_blank"
                href="#"
              >
                <img src={facebook} alt="facebook" />
              </a>
              <a
                className="w-9 h-9 rounded-full flex justify-center items-center"
                target="_blank"
                href="#"
              >
                <img src={instagram} alt="instagram" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
