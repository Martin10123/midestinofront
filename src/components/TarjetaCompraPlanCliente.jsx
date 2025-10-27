import { formatearAMonedaColombia } from "../helpers/herramientas";
import { PropTypes } from "prop-types";
import { useTarjetaCompraPlanCliente } from "./../hooks/useTarjetaCompraPlanCliente";
import toast from "react-hot-toast";

export const TarjetaCompraPlanCliente = ({ compra, setCarritoCompras }) => {
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
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm md:p-6">
      <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
        <a href="#" className="shrink-0 md:order-1">
          <img
            className="h-20 w-20"
            src={compra.planEmpresa.imagen}
            alt="imac image"
          />
        </a>

        <div className="flex items-center justify-between md:order-3 md:justify-end">
          <div className="flex items-center">
            <button
              type="button"
              id="decrement-button"
              data-input-counter-decrement="counter-input"
              className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100"
              onClick={() => handleAgregarCarritoCompras(-1)}
            >
              <svg
                className="h-2.5 w-2.5 text-gray-900"
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
              id="counter-input"
              data-input-counter
              className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0"
              placeholder={cantidadProducto}
              value={cantidadProducto}
              onChange={(e) => setCantidadProducto(e.target.value)}
            />
            <button
              type="button"
              id="increment-button"
              data-input-counter-increment="counter-input"
              className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100"
              onClick={() => handleAgregarCarritoCompras(1)}
              disabled={
                cantidadProducto >= compra.planEmpresa.cantidadDisponible
              }
            >
              <svg
                className="h-2.5 w-2.5 text-gray-900"
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
            <p className="text-base font-bold text-gray-900">
              {formatearAMonedaColombia(compra.precioTotal)}
            </p>
          </div>
        </div>

        <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
          <a
            href="#"
            className="text-base font-medium text-gray-900 hover:underline"
          >
            {compra.planEmpresa.nombre} <br />
            <span className="text-sm font-normal text-gray-500">
              {compra.planEmpresa.informacionGeneral}
            </span>
          </a>

          <div className="flex items-center gap-4">
            <button
              type="button"
              className="inline-flex items-center text-sm font-medium text-red-600 hover:underline"
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
              Eliminar
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
