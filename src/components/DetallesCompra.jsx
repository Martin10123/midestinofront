import { PropTypes } from "prop-types";
import { formatearAMonedaColombia } from "../helpers/herramientas";
import { useEffect, useState } from "react";
import { notfound } from "../images";

export const DetallesCompra = ({
  planSeleccionado,
  setAbrirDetallesPlan,
  setPlanSeleccionado,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imagenError, setImagenError] = useState(false);

  const handlePrevImage = () => {
    if (!planSeleccionado.imagenes || planSeleccionado.imagenes.length === 0) return;
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? planSeleccionado.imagenes.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    if (!planSeleccionado.imagenes || planSeleccionado.imagenes.length === 0) return;
    setCurrentImageIndex((prevIndex) =>
      prevIndex === planSeleccionado.imagenes.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    if (!planSeleccionado.imagenes || planSeleccionado.imagenes.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === planSeleccionado.imagenes.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [planSeleccionado.imagenes]);

  const tieneImagenes = planSeleccionado.imagenes && planSeleccionado.imagenes.length > 0;

  return (
    <div className="overflow-y-auto overflow-x-hidden bg-[#00000094] flex fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-full max-h-full">
      <div className="relative overflow-auto w-full rounded-lg max-w-3xl h-[90%]">
        <div className="relative bg-white shadow-2xl">
          <div className="flex items-center justify-between p-5 border-b rounded-t bg-gradient-to-r from-blue-500 to-indigo-500">
            <h3 className="text-2xl font-bold text-white">
              {planSeleccionado.nombrePlan || "Detalles del Plan"}
            </h3>
            <button
              className="text-white bg-transparent hover:bg-white/20 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center transition-all"
              onClick={() => {
                setAbrirDetallesPlan(false);
                setPlanSeleccionado({});
              }}
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
            {/* Carrusel de imágenes */}
            {tieneImagenes && (
              <div className="relative w-full border-b pb-6">
                <div className="relative h-72 overflow-hidden rounded-xl shadow-lg">
                  <img
                    src={imagenError ? notfound : planSeleccionado.imagenes[currentImageIndex]}
                    onError={() => setImagenError(true)}
                    className="absolute block w-full h-full object-cover -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                    alt={`Imagen ${currentImageIndex + 1}`}
                  />
                </div>
                <div className="flex justify-center items-center pt-4 gap-4">
                  <button
                    type="button"
                    className="flex justify-center items-center h-10 w-10 rounded-full bg-white shadow-md hover:bg-gray-100 transition-all"
                    onClick={handlePrevImage}
                  >
                    <svg
                      className="w-5 h-5 text-gray-600"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 5H1m0 0 4 4M1 5l4-4"
                      />
                    </svg>
                  </button>
                  <span className="text-sm text-gray-600 font-medium">
                    {currentImageIndex + 1} / {planSeleccionado.imagenes.length}
                  </span>
                  <button
                    type="button"
                    className="flex justify-center items-center h-10 w-10 rounded-full bg-white shadow-md hover:bg-gray-100 transition-all"
                    onClick={handleNextImage}
                  >
                    <svg
                      className="w-5 h-5 text-gray-600"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            )}

            {/* Información del plan */}
            <div className="bg-blue-50 rounded-lg p-5">
              <h4 className="text-2xl font-bold text-gray-900 mb-3">
                {planSeleccionado.nombrePlan || "Sin nombre"}
              </h4>

              <div className="space-y-2 text-sm text-gray-600">
                <p>
                  <strong className="text-blue-500">🎉</strong> Bienvenido a <strong>MY TRIP</strong>!
                </p>
                <p>
                  Aquí puedes ver los detalles de tu plan comprado:
                </p>
              </div>
            </div>

            {/* Detalles en grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Nombres de planes */}
              {planSeleccionado.nombrePlanes && planSeleccionado.nombrePlanes.length > 0 && (
                <div className="bg-white border rounded-lg p-4 shadow-sm">
                  <h5 className="font-semibold text-gray-900 mb-2 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Nombre del plan
                  </h5>
                  <ul className="pl-4 list-disc text-sm text-gray-600 space-y-1">
                    {planSeleccionado.nombrePlanes.map((nombre, index) => (
                      <li key={index}>{nombre}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Correos */}
              {planSeleccionado.correos && planSeleccionado.correos.length > 0 && (
                <div className="bg-white border rounded-lg p-4 shadow-sm">
                  <h5 className="font-semibold text-gray-900 mb-2 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Correos
                  </h5>
                  <ul className="pl-4 list-disc text-sm text-gray-600 space-y-1">
                    {planSeleccionado.correos.map((correo, index) => (
                      <li key={index}>{correo}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Teléfonos */}
              {planSeleccionado.telefonos && planSeleccionado.telefonos.length > 0 && (
                <div className="bg-white border rounded-lg p-4 shadow-sm">
                  <h5 className="font-semibold text-gray-900 mb-2 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Teléfonos
                  </h5>
                  <ul className="pl-4 list-disc text-sm text-gray-600 space-y-1">
                    {planSeleccionado.telefonos.map((telefono, index) => (
                      <li key={index}>{telefono}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Horarios */}
              {planSeleccionado.horarios && planSeleccionado.horarios.length > 0 && (
                <div className="bg-white border rounded-lg p-4 shadow-sm">
                  <h5 className="font-semibold text-gray-900 mb-2 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Horarios
                  </h5>
                  <ul className="pl-4 list-disc text-sm text-gray-600 space-y-1">
                    {planSeleccionado.horarios.map((horario, index) => (
                      <li key={index}>{horario}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tipo de sitios */}
              {planSeleccionado.tipoSitios && planSeleccionado.tipoSitios.length > 0 && (
                <div className="bg-white border rounded-lg p-4 shadow-sm">
                  <h5 className="font-semibold text-gray-900 mb-2 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    Tipo de sitios
                  </h5>
                  <ul className="pl-4 list-disc text-sm text-gray-600 space-y-1">
                    {planSeleccionado.tipoSitios.map((tipo, index) => (
                      <li key={index}>{tipo}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Países */}
              {planSeleccionado.paises && planSeleccionado.paises.length > 0 && (
                <div className="bg-white border rounded-lg p-4 shadow-sm">
                  <h5 className="font-semibold text-gray-900 mb-2 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Países
                  </h5>
                  <ul className="pl-4 list-disc text-sm text-gray-600 space-y-1">
                    {planSeleccionado.paises.map((pais, index) => (
                      <li key={index}>{pais}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Precios */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {planSeleccionado.precios && planSeleccionado.precios.length > 0 && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h5 className="font-semibold text-gray-900 mb-2 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Precios unitarios
                  </h5>
                  <ul className="pl-4 list-disc text-sm text-gray-600 space-y-1">
                    {planSeleccionado.precios.map((precio, index) => (
                      <li key={index} className="font-medium text-green-700">
                        {formatearAMonedaColombia(precio)} COP
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {planSeleccionado.precioTotalCompra && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h5 className="font-semibold text-gray-900 mb-2 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Precio total
                  </h5>
                  <p className="text-2xl font-bold text-blue-500">
                    {formatearAMonedaColombia(planSeleccionado.precioTotalCompra)} COP
                  </p>
                </div>
              )}
            </div>

            {/* Información adicional */}
            {planSeleccionado.informacionesGenerales && planSeleccionado.informacionesGenerales.length > 0 && (
              <div className="bg-gray-50 border rounded-lg p-4">
                <h5 className="font-semibold text-gray-900 mb-2 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Información adicional
                </h5>
                <ul className="pl-4 list-disc text-sm text-gray-600 space-y-1">
                  {planSeleccionado.informacionesGenerales.map((info, index) => (
                    <li key={index}>{info}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="flex items-center justify-end gap-3 p-5 border-t border-gray-200 bg-gray-50 rounded-b">
            <button
              type="button"
              className="py-2.5 px-6 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all"
              onClick={() => {
                setAbrirDetallesPlan(false);
                setPlanSeleccionado({});
              }}
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

DetallesCompra.propTypes = {
  planSeleccionado: PropTypes.object.isRequired,
  setAbrirDetallesPlan: PropTypes.func.isRequired,
  setPlanSeleccionado: PropTypes.func.isRequired,
};
