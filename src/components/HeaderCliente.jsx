import { PropTypes } from "prop-types";
import { Link, useLocation } from "react-router-dom";
import { UsuarioContext } from "../context/UsuarioContext";
import { useContext } from "react";
import { formatearAMonedaColombia } from "./../helpers/herramientas";

export const HeaderCliente = ({ handleOpenModalPresuento, titulo }) => {
  const { usuarioActivo, isUsuarioActivo } = useContext(UsuarioContext);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="mb-6 px-6 py-4 bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Título */}
      <div className="mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">{titulo}</h2>
      </div>

      {/* Header con info del usuario y navegación */}
      <div className="flex justify-between items-center">
        {/* Información del usuario */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
            {usuarioActivo.nombreCompleto?.charAt(0).toUpperCase() || "A"}
          </div>
          <div>
            <h3 className="text-base font-semibold text-gray-800">
              {usuarioActivo.nombreCompleto || "Anónimo"}
            </h3>
            <div className="flex items-center gap-1.5 mt-0.5">
              <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
              </svg>
              <p className="text-sm font-semibold text-green-600">
                {formatearAMonedaColombia(usuarioActivo.presupuesto)}
              </p>
            </div>
          </div>
        </div>

        {/* Navegación */}
        {isUsuarioActivo && usuarioActivo.tipoUsuario === "Cliente" && (
          <nav className="flex items-center gap-2">
            <Link
              to="/inicio-clientes"
              className={`group relative flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                isActive("/inicio-clientes")
                  ? "bg-blue-500 text-white shadow-md"
                  : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
              }`}
              title="Ver planes"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <span className="hidden md:inline">Planes</span>
            </Link>

            <button
              type="button"
              onClick={handleOpenModalPresuento}
              className="group relative flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-all"
              title="Actualizar presupuesto"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="hidden md:inline">Presupuesto</span>
            </button>

            <Link
              to="/planes-seleccionados-clientes"
              className={`group relative flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                isActive("/planes-seleccionados-clientes")
                  ? "bg-blue-500 text-white shadow-md"
                  : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
              }`}
              title="Carrito de compras"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="hidden md:inline">Carrito</span>
            </Link>

            <Link
              to="/planes-comprados-clientes"
              className={`group relative flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                isActive("/planes-comprados-clientes")
                  ? "bg-blue-500 text-white shadow-md"
                  : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
              }`}
              title="Mis compras"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              <span className="hidden md:inline">Mis compras</span>
            </Link>
          </nav>
        )}
      </div>
    </div>
  );
};

HeaderCliente.propTypes = {
  handleOpenModalPresuento: PropTypes.func.isRequired,
  titulo: PropTypes.string.isRequired,
};
