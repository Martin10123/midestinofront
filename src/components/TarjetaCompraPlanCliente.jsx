import { formatearAMonedaColombia } from "../helpers/herramientas";
import { PropTypes } from "prop-types";
import { useTarjetaCompraPlanCliente } from "./../hooks/useTarjetaCompraPlanCliente";
import toast from "react-hot-toast";
import { notfound } from "../images";
import { useState } from "react";

export const TarjetaCompraPlanCliente = ({ compra, setCarritoCompras }) => {
  const [imagenError, setImagenError] = useState(false);
  const {
    cantidadProducto,
    eliminarCarritoCompras,
    handleAgregarCarritoCompras,
    setCantidadProducto,
  } = useTarjetaCompraPlanCliente({ compra, setCarritoCompras });

  const eliminarProductoCarritoCompras = () => {
    try {
      toast((t) => (
        <div>
          <h1 className="text-lg font-bold">
            ¿Estás seguro de eliminar este plan del carrito de compra?
          </h1>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => {
                toast.dismiss(t.id);
              }}
              className="bg-gray-500 text-white px-4 py-2 rounded-md"
            >
              Cancelar
            </button>
            <button
              onClick={() => {
                eliminarCarritoCompras();
                toast.dismiss(t.id);
              }}
              className="bg-red-500 text-white px-4 py-2 rounded-md"
            >
              Eliminar
            </button>
          </div>
        </div>
      ));
    } catch (error) {
      console.log(error);

      toast.error(
        "Ocurrió un error al eliminar el plan del carrito de compras"
      );
    }
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm md:p-6 mb-4 hover:shadow-md transition-shadow">
      <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
        <a href="#" className="shrink-0 md:order-1">
          <img
            className="h-20 w-20 rounded-lg object-cover border"
            src={imagenError ? notfound : compra.planEmpresa.imagen}
            onError={() => setImagenError(true)}
            alt={compra.planEmpresa.nombre}
          />
        </a>

        <div className="flex items-center justify-between md:order-3 md:justify-end">
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              onClick={() => handleAgregarCarritoCompras(-1)}
              disabled={cantidadProducto <= 1}
              title="Disminuir cantidad"
            >
              <svg
                className="h-3 w-3 text-gray-900"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 2"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h16"
                />
              </svg>
            </button>
            <input
              type="text"
              className="w-12 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0"
              placeholder={cantidadProducto}
              value={cantidadProducto}
              onChange={(e) => setCantidadProducto(e.target.value)}
              readOnly
            />
            <button
              type="button"
              className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              onClick={() => handleAgregarCarritoCompras(1)}
              disabled={cantidadProducto >= compra.planEmpresa.cantidadDisponible}
              title={cantidadProducto >= compra.planEmpresa.cantidadDisponible ? "No hay más disponibilidad" : "Aumentar cantidad"}
            >
              <svg
                className="h-3 w-3 text-gray-900"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 18"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 1v16M1 9h16"
                />
              </svg>
            </button>
          </div>
          <div className="text-end md:order-4 md:w-32">
            <p className="text-lg font-bold text-green-600">
              {formatearAMonedaColombia(compra.precioTotal)}
            </p>
            <p className="text-xs text-gray-500">
              {formatearAMonedaColombia(compra.planEmpresa.precio)} c/u
            </p>
          </div>
        </div>

        <div className="w-full min-w-0 flex-1 space-y-3 md:order-2 md:max-w-md">
          <a
            href="#"
            className="text-base font-semibold text-gray-900 hover:underline line-clamp-1"
          >
            {compra.planEmpresa.nombre}
          </a>
          <p className="text-sm font-normal text-gray-600 line-clamp-2">
            {compra.planEmpresa.informacionGeneral}
          </p>

          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full font-medium">
              {compra.planEmpresa.cantidadDisponible} disponibles
            </span>
            <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full font-medium">
              Hasta {compra.planEmpresa.personasDisponibles} personas
            </span>
          </div>

          <div className="flex items-center gap-4 pt-2">
            <button
              type="button"
              className="inline-flex items-center text-sm font-medium text-red-600 hover:text-red-700 hover:underline transition-colors"
              onClick={eliminarProductoCarritoCompras}
            >
              <svg
                className="me-1.5 h-5 w-5"
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
                  d="M6 18 17.94 6M18 18 6.06 6"
                />
              </svg>
              Eliminar del carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

TarjetaCompraPlanCliente.propTypes = {
  compra: PropTypes.object.isRequired,
  setCarritoCompras: PropTypes.func.isRequired,
};
