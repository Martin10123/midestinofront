import { PropTypes } from "prop-types";
import { formatearAMonedaColombia } from "../helpers/herramientas";
import { useEffect, useState } from "react";

export const DetallesCompra = ({
  planSeleccionado,
  setAbrirDetallesPlan,
  setPlanSeleccionado,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? planSeleccionado.imagenes.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === planSeleccionado.imagenes.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === planSeleccionado.imagenes.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [planSeleccionado.imagenes.length]);

  return (
    <div className="overflow-y-auto overflow-x-hidden bg-[#00000094] flex fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-full max-h-full">
      <div className="relative overflow-auto w-full rounded-lg max-w-2xl h-[90%]">
        <div className="relative bg-white shadow">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
            <h3 className="text-xl uppercase font-semibold text-gray-900">
              {planSeleccionado.nombrePlan}
            </h3>
            <button
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
              onClick={() => {
                setAbrirDetallesPlan(false);
                setPlanSeleccionado({});
              }}
            >
              <svg
                className="w-3 h-3"
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
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div className="p-4 md:p-5 space-y-4">
            <div className="relative w-full border-b pb-4">
              <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
                <img
                  src={planSeleccionado.imagenes[currentImageIndex]}
                  className="absolute block max-w-full h-auto -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                  alt={`Imagen ${currentImageIndex + 1}`}
                />
              </div>
              <div className="flex justify-center items-center pt-4">
                <button
                  type="button"
                  className="flex justify-center items-center me-4 h-full cursor-pointer group focus:outline-none"
                  onClick={handlePrevImage}
                >
                  <span className="text-gray-400 hover:text-gray-900 group-focus:text-gray-900">
                    <svg
                      className="rtl:rotate-180 w-5 h-5"
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
                    <span className="sr-only">Previous</span>
                  </span>
                </button>
                <button
                  type="button"
                  className="flex justify-center items-center h-full cursor-pointer group focus:outline-none"
                  onClick={handleNextImage}
                >
                  <span className="text-gray-400 hover:text-gray-900 group-focus:text-gray-900">
                    <svg
                      className="rtl:rotate-180 w-5 h-5"
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
                    <span className="sr-only">Next</span>
                  </span>
                </button>
              </div>
            </div>

            <div>
              <h4 className="text-3xl uppercase font-semibold text-gray-900">
                {planSeleccionado.nombrePlan}
              </h4>

              <p className="mt-2 text-sm text-gray-500">
                Bienvenido a <strong>MY TRIP</strong>!
              </p>

              <p className="my-2 text-sm text-gray-500">
                Aquí puedes ver los detalles de tu plan, como el precio, la
                duración, en qué fecha lo compraste, etc.
              </p>

              <ul className="space-y-2 grid grid-cols-2 text-sm text-gray-500">
                <li>
                  <strong>Nombre plan:</strong>
                  <ul className="pl-4 list-disc">
                    {planSeleccionado.nombrePlanes?.map((nombre, index) => (
                      <li key={index}>{nombre}</li>
                    ))}
                  </ul>
                </li>
                <li>
                  <strong>Correos:</strong>
                  <ul className="pl-4 list-disc">
                    {planSeleccionado.correos?.map((correo, index) => (
                      <li key={index}>{correo}</li>
                    ))}
                  </ul>
                </li>
                <li>
                  <strong>Teléfonos:</strong>
                  <ul className="pl-4 list-disc">
                    {planSeleccionado.telefonos?.map((telefono, index) => (
                      <li key={index}>{telefono}</li>
                    ))}
                  </ul>
                </li>
                <li>
                  <strong>Horarios:</strong>
                  <ul className="pl-4 list-disc">
                    {planSeleccionado.horarios?.map((horario, index) => (
                      <li key={index}>{horario}</li>
                    ))}
                  </ul>
                </li>
                <li>
                  <strong>Tipo de sitios:</strong>
                  <ul className="pl-4 list-disc">
                    {planSeleccionado.tipoSitios?.map((tipo, index) => (
                      <li key={index}>{tipo}</li>
                    ))}
                  </ul>
                </li>
                <li>
                  <strong>Países:</strong>
                  <ul className="pl-4 list-disc">
                    {planSeleccionado.paises?.map((pais, index) => (
                      <li key={index}>{pais}</li>
                    ))}
                  </ul>
                </li>
                <li>
                  <strong>Precios unitarios:</strong>
                  <ul className="pl-4 list-disc">
                    {planSeleccionado.precios?.map((precio, index) => (
                      <li key={index}>
                        {formatearAMonedaColombia(precio)} pesos
                      </li>
                    ))}
                  </ul>
                </li>

                <li>
                  <strong>Precio total:</strong>{" "}
                  {formatearAMonedaColombia(planSeleccionado.precioTotalCompra)}{" "}
                  pesos
                </li>

                <li>
                  <strong>Información:</strong>
                  <ul className="pl-4 list-disc">
                    {planSeleccionado.informacionesGenerales?.map(
                      (info, index) => (
                        <li key={index}>{info}</li>
                      )
                    )}
                  </ul>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b">
            <button
              type="button"
              className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100"
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
