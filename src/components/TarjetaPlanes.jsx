import axios from "axios";
import toast from "react-hot-toast";
import { PropTypes } from "prop-types";
import { useEffect, useState } from "react";
import { formatearAMonedaColombia } from "../helpers/herramientas";
import { borrar, comprar, editar, notfound } from "../images";
import { urlGeneral } from "./../helpers/apiUrls";
import { AgregarSitioEmpresa } from "./AgregarSitioEmpresa";
import { ModalResenas } from "./ModalResenas";
import { useTarjetaPlanes } from "../hooks";

export const TarjetaPlanes = ({
  planEmpresa,
  setPlanesEmpresa,
}) => {
  const [modalResenasAbierto, setModalResenasAbierto] = useState(false);
  const [imagenError, setImagenError] = useState(false);
  const [valoracion, setValoracion] = useState(
    planEmpresa.valoracionPromedio || 0
  );
  const [totalResenas, setTotalResenas] = useState(
    planEmpresa.totalResenas ??
      planEmpresa.totalValoraciones ??
      planEmpresa.numeroValoraciones ??
      0
  );
  
  const {
    abrirActActividad,
    agregarCarritoCompras,
    handleAbrirModalActActividad,
    planSeleccionado,
    usuarioActivo,
    agregandoCarrito,
  } = useTarjetaPlanes({ planEmpresa, setPlanesEmpresa });

  useEffect(() => {
    setValoracion(planEmpresa.valoracionPromedio || 0);
    setTotalResenas(
      planEmpresa.totalResenas ??
        planEmpresa.totalValoraciones ??
        planEmpresa.numeroValoraciones ??
        0
    );
  }, [
    planEmpresa.valoracionPromedio,
    planEmpresa.totalResenas,
    planEmpresa.totalValoraciones,
    planEmpresa.numeroValoraciones,
  ]);

  const eliminarPlan = async () => {
    try {
      toast((t) => (
        <div>
          <h1 className="text-lg font-bold">
            ¿Estás seguro de eliminar el plan?
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
              onClick={async () => {
                const response = await axios.delete(
                  `${urlGeneral}/planes/eliminar/${planEmpresa.id}`
                );

                if (response.data.valid) {
                  setPlanesEmpresa((planes) =>
                    planes.filter((plan) => plan.id !== planEmpresa.id)
                  );

                  toast.success("Plan eliminado correctamente");
                } else {
                  toast.error("Ocurrió un error al eliminar el plan");
                }

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
    }
  };

  return (
    <>
      <div className="flex justify-center items-center">
        <div className="max-w-[720px] mx-auto">
          <div className="relative flex max-w-[24rem] flex-col overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="relative m-0 overflow-hidden text-gray-700 bg-transparent rounded-none shadow-none bg-clip-border h-64">
              <img 
                src={imagenError ? notfound : planEmpresa.imagen} 
                alt={planEmpresa.nombre}
                onError={() => setImagenError(true)}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h4 className="block font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900 mb-2">
                {planEmpresa.nombre}
              </h4>
              
              <div className="flex items-center mb-3">
                {Array.from({ length: 5 }).map((_, index) => {
                  const isFilled = valoracion > index;

                  return (
                    <svg
                      key={index}
                      className={`w-5 h-5 ${
                        isFilled ? "text-yellow-400" : "text-gray-300"
                      } me-1`}
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 20"
                    >
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                  );
                })}
                <p className="ms-2 text-sm font-medium text-gray-700">
                  {valoracion.toFixed(1)} de 5
                </p>
                <p className="ms-2 text-xs text-gray-500">
                  ({totalResenas} {totalResenas === 1 ? "reseña" : "reseñas"})
                </p>
                <button
                  onClick={() => setModalResenasAbierto(true)}
                  className="ms-3 text-sm text-blue-500 hover:text-blue-700 hover:underline font-medium"
                >
                  Ver reseñas
                </button>
              </div>

              <p className="block mt-3 font-sans text-base antialiased font-normal leading-relaxed text-gray-600 line-clamp-3">
                {planEmpresa.informacionGeneral}
              </p>
              
              <div className="mt-4 space-y-1 text-sm text-gray-600">
                <p className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {planEmpresa.email}
                </p>
                <p className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {planEmpresa.telefono}
                </p>
                <p className="flex items-center font-semibold text-green-600 text-lg mt-2">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {formatearAMonedaColombia(planEmpresa.precio)} COP
                </p>
                <div className="flex gap-4 mt-2">
                  <p className="flex items-center text-xs">
                    <span className="font-medium mr-1">Disponibles:</span>
                    <span className={`px-2 py-1 rounded-full ${planEmpresa.cantidadDisponible > 5 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {planEmpresa.cantidadDisponible}
                    </span>
                  </p>
                  <p className="flex items-center text-xs">
                    <span className="font-medium mr-1">Capacidad:</span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                      {planEmpresa.personasDisponibles} personas
                    </span>
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between pt-4 p-6 border-t">
              <div className="flex items-center text-xs text-gray-500">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {planEmpresa.fechaRegistro}
              </div>

              <div className="flex gap-2 items-center">
                {usuarioActivo.tipoUsuario === "Empresa" && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleAbrirModalActActividad(planEmpresa)}
                      className="p-2 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors"
                      title="Editar plan"
                    >
                      <img className="w-5 h-5" src={editar} alt="editar" />
                    </button>
                    <button 
                      onClick={eliminarPlan}
                      className="p-2 rounded-lg bg-red-50 hover:bg-red-100 transition-colors"
                      title="Eliminar plan"
                    >
                      <img className="w-5 h-5" src={borrar} alt="borrar" />
                    </button>
                  </div>
                )}

                {usuarioActivo.tipoUsuario === "Cliente" && planEmpresa.cantidadDisponible > 0 && (
                  <button 
                    onClick={agregarCarritoCompras}
                    disabled={agregandoCarrito}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                      agregandoCarrito 
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                        : 'bg-green-600 text-white hover:bg-green-700 hover:shadow-md transform hover:scale-105'
                    }`}
                    title="Agregar al carrito"
                  >
                    {agregandoCarrito ? (
                      <>
                        <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span className="text-xs">Agregando...</span>
                      </>
                    ) : (
                      <>
                        <img className="w-4 h-4" src={comprar} alt="comprar" />
                        <span className="text-xs">Agregar</span>
                      </>
                    )}
                  </button>
                )}

                {usuarioActivo.tipoUsuario === "Cliente" && planEmpresa.cantidadDisponible <= 0 && (
                  <span className="px-4 py-2 bg-gray-200 text-gray-600 rounded-lg font-medium">
                    Agotado
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {abrirActActividad && (
        <AgregarSitioEmpresa
          handleAbrirModalCrearActividad={handleAbrirModalActActividad}
          editData={planSeleccionado}
        />
      )}

      {/* Modal de reseñas */}
      {modalResenasAbierto && (
        <ModalResenas
          planEmpresa={planEmpresa}
          setPlanesEmpresa={setPlanesEmpresa}
          onActualizarValoracion={(promedio, total) => {
            setValoracion(promedio);
            setTotalResenas(total);
          }}
          onClose={() => setModalResenasAbierto(false)}
        />
      )}
    </>
  );
};

TarjetaPlanes.propTypes = {
  planEmpresa: PropTypes.object.isRequired,
  setPlanesEmpresa: PropTypes.func.isRequired,
};
