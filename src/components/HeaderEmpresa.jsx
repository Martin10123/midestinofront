import { useContext } from "react";
import { UsuarioContext } from "../context/UsuarioContext";
import { formatearAMonedaColombia } from "./../helpers/herramientas";
import { PropTypes } from "prop-types";

export const HeaderEmpresa = ({ handleAbrirModalCrearActividad }) => {
  const { usuarioActivo } = useContext(UsuarioContext);

  return (
    <div className="my-4 flex justify-between items-start">
      <h2 className="text-4xl font-semibold text-gray-500">
        Lista de actividades
      </h2>

      <div className="flex gap-2">
        <span>
          <h2 className="text-lg font-semibold text-gray-800">
            {usuarioActivo.nombre}
          </h2>
          <p className="text-sm font-semibold text-gray-500 rounded-md">
            {formatearAMonedaColombia(usuarioActivo.ganancias)} pesos de
            ganancia
          </p>
        </span>

        <button
          type="button"
          className="text-white flex items-center p-1 bg-gray-300 hover:bg-gray-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm text-center"
          onClick={handleAbrirModalCrearActividad}
        >
          <svg
            className="w-6 h-6 text-gray-800"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7h-1M8 7h-.688M13 5v4m-2-2h4"
            />
          </svg>
        </button>
        <div
          id="tooltip-update-budget"
          role="tooltip"
          className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 tooltip"
        >
          Agregar actividad
          <div className="tooltip-arrow" data-popper-arrow></div>
        </div>
      </div>
    </div>
  );
};

HeaderEmpresa.propTypes = {
  handleAbrirModalCrearActividad: PropTypes.func.isRequired,
};
