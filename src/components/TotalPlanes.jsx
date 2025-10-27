import { formatearAMonedaColombia } from "../helpers/herramientas";
import { PropTypes } from "prop-types";
import { useTotalPlanes } from "../hooks";

export const TotalPlanes = ({
  carritoCompras,
  usuarioActivo,
  setCarritoCompras,
  setUsuarioActivo,
}) => {
  const {
    nombrePlan,
    onComprarPlanes,
    precioFinal,
    presupuestoEsSuficiente,
    setNombrePlan,
    cantidadPlanes,
    envio,
    precioConDescuento,
    precioOriginal,
    cantidadPersonas,
    setCantidadPersonas,
  } = useTotalPlanes({
    carritoCompras,
    setCarritoCompras,
    setUsuarioActivo,
    usuarioActivo,
  });

  return (
    <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
      <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
        <p className="text-xl font-semibold text-gray-900">Total de planes</p>

        <div className="space-y-4">
          <div className="space-y-2">
            <dl className="flex items-center justify-between gap-4">
              <dt className="text-base font-normal text-gray-500">
                Precio original
              </dt>
              <dd className="text-base font-medium text-gray-900">
                {formatearAMonedaColombia(precioOriginal)}
              </dd>
            </dl>

            <dl className="flex items-center justify-between gap-4">
              <dt className="text-base font-normal text-gray-500">Descuento</dt>
              <dd className="text-base font-medium text-green-600">
                -{formatearAMonedaColombia(precioOriginal - precioConDescuento)}
              </dd>
            </dl>

            <dl className="flex items-center justify-between gap-4">
              <dt className="text-base font-normal text-gray-500">
                Planes incluidos
              </dt>
              <dd className="text-base font-medium text-gray-900">
                {cantidadPlanes} {cantidadPlanes === 1 ? "plan" : "planes"}
              </dd>
            </dl>

            <dl className="flex items-center justify-between gap-4">
              <dt className="text-base font-normal text-gray-500">Envío</dt>
              <dd className="text-base font-medium text-gray-900">
                {formatearAMonedaColombia(envio)}
              </dd>
            </dl>
          </div>

          <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2">
            <dt className="text-base font-bold text-gray-900">Total</dt>
            <dd
              className={`text-base font-bold text-gray-900 ${
                presupuestoEsSuficiente
                  ? "text-base font-bold text-red-600"
                  : "text-base font-bold text-green-500"
              }`}
            >
              {formatearAMonedaColombia(precioFinal)}
            </dd>
          </dl>
        </div>

        <div className="flex items-center justify-center gap-2 pt-5">
          <button
            className="inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline"
            onClick={onComprarPlanes}
          >
            Comprar planes
            <svg
              className="h-5 w-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 12H5m14 0-4 4m4-4-4-4"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
        <form className="grid grid-cols-[1fr,auto] gap-2">
          <div>
            <label
              htmlFor="voucher"
              className="mb-2 block text-sm font-medium text-gray-900"
            >
              Cual es el nombre de este plan?
            </label>
            <input
              type="text"
              id="voucher"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500"
              placeholder="Plan 1..."
              value={nombrePlan}
              onChange={(e) => setNombrePlan(e.target.value)}
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-900">
              Cuantas personas son?
            </label>
            <input
              type="number"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500"
              placeholder="20..."
              value={cantidadPersonas}
              onChange={(e) => setCantidadPersonas(e.target.value)}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

TotalPlanes.propTypes = {
  carritoCompras: PropTypes.array.isRequired,
  usuarioActivo: PropTypes.object.isRequired,
  setCarritoCompras: PropTypes.func.isRequired,
  setUsuarioActivo: PropTypes.func.isRequired,
};
