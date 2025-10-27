import { PropTypes } from "prop-types";
import { formatearAMonedaColombia } from "../helpers/herramientas";

export const TarjetaCompraCliente = ({
  planComprado,
  setAbrirDetallesPlan,
  setPlanSeleccionado,
}) => {
  return (
    <div className="flex flex-wrap items-center gap-y-4 py-6">
      <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
        <dt className="text-base font-medium text-gray-500">ID compra:</dt>
        <dd className="mt-1.5 text-base font-semibold text-gray-900">
          <a href="#" className="hover:underline">
            {planComprado.idPlanGuardado}
          </a>
        </dd>
      </dl>

      <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
        <dt className="text-base font-medium text-gray-500">
          Nombre del plan:
        </dt>
        <dd className="mt-1.5 text-base font-semibold text-gray-900">
          {planComprado.nombrePlan}
        </dd>
      </dl>

      <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
        <dt className="text-base font-medium text-gray-500">Fecha compra:</dt>
        <dd className="mt-1.5 text-base font-semibold text-gray-900">
          {planComprado.fechaCompra}
        </dd>
      </dl>

      <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
        <dt className="text-base font-medium text-gray-500">
          Precio total del plan:
        </dt>
        <dd className="mt-1.5 text-base font-semibold text-green-500">
          {formatearAMonedaColombia(planComprado.precioTotalCompra)} pesos
        </dd>
      </dl>

      <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
        <dt className="text-base font-medium text-gray-500">Estado:</dt>
        <dd className="me-2 mt-1.5 inline-flex items-center rounded bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
          <svg
            className="me-1 h-3 w-3"
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
              d="M5 11.917 9.724 16.5 19 7.5"
            />
          </svg>
          Comprado
        </dd>
      </dl>

      <div>
        <button
          className="w-full inline-flex justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 lg:w-auto"
          onClick={() => {
            setAbrirDetallesPlan(true);
            setPlanSeleccionado(planComprado);
          }}
        >
          Ver detalle
        </button>
      </div>
    </div>
  );
};

TarjetaCompraCliente.propTypes = {
  planComprado: PropTypes.object.isRequired,
  setAbrirDetallesPlan: PropTypes.func.isRequired,
  setPlanSeleccionado: PropTypes.func.isRequired,
};
