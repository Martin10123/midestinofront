import { PropTypes } from "prop-types";
import { usePresupuestoModal } from "../hooks";
import { formatearAMonedaColombia } from "../helpers/herramientas";

export const PresupuestoModal = ({ handleOpenModalPresuento }) => {
  const { onGuardarPresupuesto, presupuesto, setPresupuesto, usuarioActivo } =
    usePresupuestoModal({ handleOpenModalPresuento });

  const presupuestos = [50000, 100000, 250000, 500000, 1000000, 2000000];

  return (
    <div className="overflow-y-auto overflow-x-hidden fixed top-0 bg-[#00000069] right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-full max-h-full">
      <div className="relative p-4 w-full max-w-2xl max-h-full">
        <div className="relative bg-white rounded-xl shadow-2xl">
          {/* Header con gradiente */}
          <div className="flex items-center justify-between p-6 border-b rounded-t bg-gradient-to-r from-green-600 to-emerald-600">
            <div>
              <h3 className="text-2xl font-bold text-white">
                💰 Actualizar Presupuesto
              </h3>
              <p className="text-sm text-green-100 mt-1">
                Configura el monto disponible para tus planes
              </p>
            </div>
            <button
              type="button"
              className="text-white bg-white/20 hover:bg-white/30 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center transition-all"
              onClick={handleOpenModalPresuento}
            >
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Cerrar modal</span>
            </button>
          </div>

          <div className="p-6 space-y-6">
            {/* Presupuesto actual */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 font-medium">Presupuesto actual</p>
                  <p className="text-2xl font-bold text-blue-600 mt-1">
                    {formatearAMonedaColombia(usuarioActivo.presupuesto)}
                  </p>
                </div>
                <div className="bg-blue-100 p-3 rounded-full">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Opciones rápidas */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                📊 Selección rápida
              </label>
              <div className="grid grid-cols-3 gap-3">
                {presupuestos.map((monto) => (
                  <button
                    key={monto}
                    type="button"
                    onClick={() => setPresupuesto(monto)}
                    className={`p-3 rounded-lg border-2 transition-all text-center ${
                      presupuesto === monto
                        ? 'border-green-600 bg-green-50 text-green-700 font-bold'
                        : 'border-gray-200 hover:border-green-400 hover:bg-green-50 text-gray-700'
                    }`}
                  >
                    <span className="text-sm">{formatearAMonedaColombia(monto)}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Input personalizado */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                ✏️ Monto personalizado
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 text-lg font-bold">$</span>
                </div>
                <input
                  type="number"
                  className="shadow-sm bg-gray-50 border-2 border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-green-500 focus:border-green-500 block w-full pl-8 pr-4 py-3 font-semibold"
                  placeholder="Ingresa el monto..."
                  value={presupuesto}
                  onChange={(e) => setPresupuesto(Number(e.target.value))}
                  min="0"
                />
              </div>
              {presupuesto > 0 && (
                <p className="mt-2 text-sm text-gray-600">
                  💡 Nuevo presupuesto: <span className="font-bold text-green-600">{formatearAMonedaColombia(presupuesto)}</span>
                </p>
              )}
              {presupuesto <= 0 && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  El presupuesto debe ser mayor a $0
                </p>
              )}
            </div>

            {/* Comparación visual */}
            {presupuesto > 0 && presupuesto !== usuarioActivo.presupuesto && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm font-medium text-yellow-800 mb-2">📈 Cambio de presupuesto</p>
                <div className="flex items-center justify-between text-sm">
                  <div>
                    <p className="text-gray-600">Anterior</p>
                    <p className="font-bold text-gray-800">{formatearAMonedaColombia(usuarioActivo.presupuesto)}</p>
                  </div>
                  <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                  <div>
                    <p className="text-gray-600">Nuevo</p>
                    <p className="font-bold text-green-600">{formatearAMonedaColombia(presupuesto)}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer con botones */}
          <div className="flex items-center gap-3 p-6 border-t border-gray-200 rounded-b bg-gray-50">
            <button
              type="button"
              className="flex-1 py-3 px-5 text-sm font-medium text-gray-700 bg-white rounded-lg border-2 border-gray-300 hover:bg-gray-100 hover:border-gray-400 focus:z-10 focus:ring-4 focus:ring-gray-200 transition-all"
              onClick={handleOpenModalPresuento}
            >
              Cancelar
            </button>
            <button
              type="button"
              className="flex-1 text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-3 text-center transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={onGuardarPresupuesto}
              disabled={presupuesto <= 0}
            >
              💾 Guardar cambios
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

PresupuestoModal.propTypes = {
  handleOpenModalPresuento: PropTypes.func.isRequired,
};
