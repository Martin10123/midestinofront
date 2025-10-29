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
    comprando,
  } = useTotalPlanes({
    carritoCompras,
    setCarritoCompras,
    setUsuarioActivo,
    usuarioActivo,
  });

  return (
    <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
      <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-6 shadow-lg">
        <p className="text-2xl font-bold text-gray-900 flex items-center">
          <svg className="w-6 h-6 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
          Resumen del pedido
        </p>

        <div className="space-y-3">
          <div className="bg-gray-50 rounded-lg p-3 space-y-2">
            <dl className="flex items-center justify-between gap-4">
              <dt className="text-base font-normal text-gray-600">
                Precio original
              </dt>
              <dd className="text-base font-medium text-gray-900">
                {formatearAMonedaColombia(precioOriginal)}
              </dd>
            </dl>

            {precioOriginal !== precioConDescuento && (
              <dl className="flex items-center justify-between gap-4">
                <dt className="text-base font-normal text-gray-600 flex items-center">
                  <svg className="w-4 h-4 mr-1 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Descuento aplicado
                </dt>
                <dd className="text-base font-bold text-green-600">
                  -{formatearAMonedaColombia(precioOriginal - precioConDescuento)}
                </dd>
              </dl>
            )}

            <dl className="flex items-center justify-between gap-4">
              <dt className="text-base font-normal text-gray-600">
                Planes incluidos
              </dt>
              <dd className="text-base font-medium text-blue-500">
                {cantidadPlanes} {cantidadPlanes === 1 ? "plan" : "planes"}
              </dd>
            </dl>

            <dl className="flex items-center justify-between gap-4">
              <dt className="text-base font-normal text-gray-600">Envío</dt>
              <dd className="text-base font-medium text-gray-900">
                {formatearAMonedaColombia(envio)}
              </dd>
            </dl>
          </div>

          <dl className="flex items-center justify-between gap-4 border-t-2 border-gray-300 pt-3">
            <dt className="text-lg font-bold text-gray-900">Total a pagar</dt>
            <dd
              className={`text-xl font-bold ${
                presupuestoEsSuficiente
                  ? "text-red-600"
                  : "text-green-600"
              }`}
            >
              {formatearAMonedaColombia(precioFinal)}
            </dd>
          </dl>

          {presupuestoEsSuficiente && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-sm text-red-700 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">Presupuesto insuficiente. Por favor, actualízalo antes de comprar.</span>
              </p>
            </div>
          )}
        </div>

        <button
          className={`w-full inline-flex items-center justify-center gap-2 text-white font-semibold rounded-lg text-base px-5 py-3 transition-all hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed ${
            comprando 
              ? 'bg-gray-400 cursor-wait' 
              : 'bg-green-600 hover:bg-green-700'
          }`}
          onClick={onComprarPlanes}
          disabled={presupuestoEsSuficiente || carritoCompras.length === 0 || comprando}
        >
          {comprando ? (
            <>
              <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Procesando compra...
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {carritoCompras.length === 0 ? "Carrito vacío" : "Proceder al pago"}
            </>
          )}
        </button>
      </div>

      <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-6 shadow-lg">
        <div className="flex items-center mb-4">
          <svg className="w-6 h-6 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p className="text-lg font-bold text-gray-900">
            Detalles de la compra
          </p>
        </div>

        <form className="space-y-4">
          <div>
            <label
              htmlFor="nombrePlan"
              className="mb-2 flex items-center text-sm font-semibold text-gray-700"
            >
              <svg className="w-4 h-4 mr-1.5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
              </svg>
              ¿Cuál es el nombre de este plan?
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="text"
              id="nombrePlan"
              className="block w-full rounded-lg border-2 border-gray-300 bg-gray-50 p-3 text-sm text-gray-900 focus:border-green-500 focus:ring-green-500 transition-all"
              placeholder="Ej: Viaje familiar a Cartagena"
              value={nombrePlan}
              onChange={(e) => setNombrePlan(e.target.value)}
              required
            />
            <p className="mt-1 text-xs text-gray-500">
              Mínimo 5 caracteres para identificar tu plan
            </p>
          </div>

          <div>
            <label 
              htmlFor="cantidadPersonas"
              className="mb-2 flex items-center text-sm font-semibold text-gray-700"
            >
              <svg className="w-4 h-4 mr-1.5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
              </svg>
              ¿Cuántas personas son?
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="number"
              id="cantidadPersonas"
              className="block w-full rounded-lg border-2 border-gray-300 bg-gray-50 p-3 text-sm text-gray-900 focus:border-green-500 focus:ring-green-500 transition-all"
              placeholder="Número de personas"
              value={cantidadPersonas}
              onChange={(e) => setCantidadPersonas(e.target.value)}
              min="1"
              required
            />
            <p className="mt-1 text-xs text-gray-500">
              Debe ser al menos 1 persona
            </p>
          </div>
        </form>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-4">
          <p className="text-xs text-blue-500 flex items-start">
            <svg className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <span>
              Completa estos campos antes de proceder al pago. Son requeridos para procesar tu pedido correctamente.
            </span>
          </p>
        </div>
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
