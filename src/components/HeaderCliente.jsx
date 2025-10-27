import { PropTypes } from "prop-types";
import { Link } from "react-router-dom";
import { UsuarioContext } from "../context/UsuarioContext";
import { useContext } from "react";
import { formatearAMonedaColombia } from "./../helpers/herramientas";

export const HeaderCliente = ({ handleOpenModalPresuento, titulo }) => {
  const { usuarioActivo, isUsuarioActivo } = useContext(UsuarioContext);

  return (
    <div className="mb-5 px-6 flex justify-between items-start border-b pb-4">
      <h2 className="text-4xl font-semibold text-gray-800">{titulo}</h2>

      <div className="flex gap-2">
        <span>
          <h2 className="text-lg font-semibold text-gray-800">
            {usuarioActivo.nombreCompleto || "Anónimo"}
          </h2>
          <p className="text-sm font-semibold text-gray-500 rounded-md">
            {formatearAMonedaColombia(usuarioActivo.presupuesto)} pesos
          </p>
        </span>

        {isUsuarioActivo && usuarioActivo.tipoUsuario === "Cliente" && (
          <div className="flex gap-2">
            <div
              id="tooltip-suggest-ideas"
              role="tooltip"
              className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 tooltip"
            >
              Planes
              <div className="tooltip-arrow" data-popper-arrow></div>
            </div>

            <Link
              to="/inicio-clientes"
              className="text-white flex items-center p-1 bg-gray-300 hover:bg-gray-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm text-center"
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
                  d="M9 9a3 3 0 0 1 3-3m-2 15h4m0-3c0-4.1 4-4.9 4-9A6 6 0 1 0 6 9c0 4 4 5 4 9h4Z"
                />
              </svg>
            </Link>

            <button
              type="button"
              onClick={handleOpenModalPresuento}
              className="text-white p-1 bg-gray-300 hover:bg-gray-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm text-center"
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
                  d="M8 17.345a4.76 4.76 0 0 0 2.558 1.618c2.274.589 4.512-.446 4.999-2.31.487-1.866-1.273-3.9-3.546-4.49-2.273-.59-4.034-2.623-3.547-4.488.486-1.865 2.724-2.899 4.998-2.31.982.236 1.87.793 2.538 1.592m-3.879 12.171V21m0-18v2.2"
                />
              </svg>
            </button>
            <div
              id="tooltip-update-budget"
              role="tooltip"
              className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 tooltip"
            >
              Actualizar presupuesto
              <div className="tooltip-arrow" data-popper-arrow></div>
            </div>

            <Link
              to="/planes-seleccionados-clientes"
              className="text-white flex items-center p-1 bg-gray-300 hover:bg-gray-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm text-center"
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
            </Link>
            <div
              id="tooltip-view-sites"
              role="tooltip"
              className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 tooltip"
            >
              Ver sitios seleccionados
              <div className="tooltip-arrow" data-popper-arrow></div>
            </div>

            <Link
              to="/planes-comprados-clientes"
              className="text-white flex items-center p-1 bg-gray-300 hover:bg-gray-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm text-center"
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
                  d="M15.583 8.445h.01M10.86 19.71l-6.573-6.63a.993.993 0 0 1 0-1.4l7.329-7.394A.98.98 0 0 1 12.31 4l5.734.007A1.968 1.968 0 0 1 20 5.983v5.5a.992.992 0 0 1-.316.727l-7.44 7.5a.974.974 0 0 1-1.384.001Z"
                />
              </svg>
            </Link>
            <div
              id="tooltip-purchased-plans"
              role="tooltip"
              className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 tooltip"
            >
              Planes comprados
              <div className="tooltip-arrow" data-popper-arrow></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

HeaderCliente.propTypes = {
  handleOpenModalPresuento: PropTypes.func.isRequired,
  titulo: PropTypes.string.isRequired,
};
