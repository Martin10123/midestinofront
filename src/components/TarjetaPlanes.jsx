import axios from "axios";
import toast from "react-hot-toast";
import { PropTypes } from "prop-types";
import { useState } from "react";
import { formatearAMonedaColombia } from "../helpers/herramientas";
import { borrar, comprar, editar } from "../images";
import { urlGeneral } from "./../helpers/apiUrls";
import { AgregarSitioEmpresa } from "./AgregarSitioEmpresa";
import { useTarjetaPlanes } from "../hooks";
import { ResenasModal } from "./ResenasModal";

export const TarjetaPlanes = ({
  planEmpresa,
  onEnviarValoracion,
  setPlanesEmpresa,
}) => {
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [selectedRating, setSelectedRating] = useState(null);
  const [comentario, setComentario] = useState("");
  const [showResenasModal, setShowResenasModal] = useState(false);
  const {
    abrirActActividad,
    agregarCarritoCompras,
    handleAbrirModalActActividad,
    planSeleccionado,
    usuarioActivo,
  } = useTarjetaPlanes({ planEmpresa, setPlanesEmpresa });

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
          <div className="relative flex max-w-[24rem] flex-col overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
            <div className="relative m-0 overflow-hidden text-gray-700 bg-transparent rounded-none shadow-none bg-clip-border">
              <img src={planEmpresa.imagen} alt={planEmpresa.nombre} />
            </div>
            <div className="p-6">
              <h4 className="block font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                {planEmpresa.nombre}
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, index) => {
                    const rating = planEmpresa.valoracionPromedio || 0;
                    const isFilled = rating > index;

                    return (
                      <svg
                        key={index}
                        className={`w-4 h-4 cursor-pointer ${
                          isFilled ? "text-yellow-300" : "text-gray-300"
                        } me-1`}
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                        onClick={() => {
                          setSelectedRating(index + 1);
                          setShowCommentModal(true);
                        }}
                      >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                    );
                  })}
                  <button
                    onClick={() => setShowResenasModal(true)}
                    className="ms-2 text-sm text-blue-600 hover:underline"
                  >
                    Ver reseñas
                  </button>
                  <p className="ms-1 text-sm font-medium text-gray-500">
                    {planEmpresa.valoracionPromedio || 0}
                  </p>
                  <p className="ms-1 text-sm font-medium text-gray-500">de</p>
                  <p className="ms-1 text-sm font-medium text-gray-500">5</p>
                </div>
              </h4>
              <p className="block mt-3 font-sans text-xl antialiased font-normal leading-relaxed text-gray-700">
                {planEmpresa.informacionGeneral}
              </p>
              <p className="block mt-2 font-sans text-sm antialiased font-normal leading-relaxed text-gray-700">
                Correo: {planEmpresa.email}
              </p>
              <p className="block mt-2 font-sans text-sm antialiased font-normal leading-relaxed text-gray-700">
                Telefono: {planEmpresa.telefono}
              </p>
              <p className="block mt-2 font-sans text-sm antialiased font-normal leading-relaxed text-gray-700">
                Precio: {formatearAMonedaColombia(planEmpresa.precio)} pesos
              </p>
              <p className="block mt-2 font-sans text-sm antialiased font-normal leading-relaxed text-gray-700">
                Cantidad disponibles: {planEmpresa.cantidadDisponible}
              </p>
              <p className="block mt-2 font-sans text-sm antialiased font-normal leading-relaxed text-gray-700">
                Cantidad de personas disponibles:{" "}
                {planEmpresa.personasDisponibles}
              </p>
            </div>
            <div className="flex items-center justify-between p-6">
              <div className="flex items-center -space-x-3">
                <img
                  alt="natali craig"
                  src={planEmpresa.imagen}
                  className="relative inline-block h-9 w-9 rounded-full border-2 border-white object-cover object-center hover:z-10"
                />
                <img
                  alt="Tania Andrew"
                  src={planEmpresa.imagen}
                  className="relative inline-block h-9 w-9 rounded-full border-2 border-white object-cover object-center hover:z-10"
                />
              </div>
              <div className="flex gap-2 items-center">
                <p className="block font-sans text-base antialiased font-normal leading-relaxed text-inherit">
                  {planEmpresa.fechaRegistro}
                </p>

                {usuarioActivo.tipoUsuario === "Empresa" && (
                  <div className="flex gap-1">
                    <button
                      onClick={() => handleAbrirModalActActividad(planEmpresa)}
                    >
                      <img className="w-5 h-auto" src={editar} alt="editar" />
                    </button>
                    <button onClick={eliminarPlan}>
                      <img className="w-5 h-auto" src={borrar} alt="borrar" />
                    </button>
                  </div>
                )}

                {(usuarioActivo.tipoUsuario === "Cliente" ||
                  planEmpresa.cantidadDisponible <= 0) && (
                  <button onClick={agregarCarritoCompras}>
                    <img className="w5 h-auto" src={comprar} alt="comprar" />
                  </button>
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

      {/* Modal para agregar comentario junto con la valoración */}
      {showCommentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-lg rounded bg-white p-6">
            <h3 className="text-lg font-semibold mb-2">Dejar reseña</h3>
            <p className="text-sm text-gray-600 mb-3">Calificación: {selectedRating} / 5</p>
            <textarea
              value={comentario}
              onChange={(e) => setComentario(e.target.value)}
              placeholder="Opcional: deja un comentario sobre el plan"
              className="w-full h-28 rounded border p-2"
            />
            <div className="flex justify-end gap-2 mt-3">
              <button
                onClick={() => {
                  setShowCommentModal(false);
                  setComentario("");
                }}
                className="px-4 py-2 bg-gray-200 rounded"
              >
                Cancelar
              </button>
              <button
                onClick={async () => {
                  try {
                    await onEnviarValoracion(selectedRating, planEmpresa, comentario);
                  } catch (err) {
                    console.error(err);
                  } finally {
                    setShowCommentModal(false);
                    setComentario("");
                  }
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Enviar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal para ver reseñas */}
      {showResenasModal && (
        <ResenasModal planId={planEmpresa.id} onClose={() => setShowResenasModal(false)} />
      )}
    </>
  );
};

TarjetaPlanes.propTypes = {
  planEmpresa: PropTypes.object.isRequired,
  onEnviarValoracion: PropTypes.func,
  setPlanesEmpresa: PropTypes.func.isRequired,
};
