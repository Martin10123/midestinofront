import { PropTypes } from "prop-types";
import { useModalResenas } from "../hooks/useModalResenas";

export const ModalResenas = ({ planEmpresa, onClose }) => {
  const {
    resenas,
    puntuacionSeleccionada,
    comentario,
    setPuntuacionSeleccionada,
    setComentario,
    handleEnviarResena,
    cargando,
    usuarioActivo,
  } = useModalResenas({ planEmpresa, onClose });

  if (!planEmpresa) return null;

  const formatearFecha = (fecha) => {
    const date = new Date(fecha);
    return date.toLocaleDateString("es-CO", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-blue-100">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900">
                Reseñas de {planEmpresa.nombre}
              </h2>
              <div className="flex items-center mt-2">
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, index) => {
                    const rating = planEmpresa.valoracionPromedio || 0;
                    const isFilled = rating > index;
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
                </div>
                <p className="ms-2 text-lg font-medium text-gray-700">
                  {planEmpresa.valoracionPromedio
                    ? planEmpresa.valoracionPromedio.toFixed(1)
                    : "0.0"}{" "}
                  de 5
                </p>
                <p className="ms-2 text-sm text-gray-500">
                  ({resenas.length}{" "}
                  {resenas.length === 1 ? "reseña" : "reseñas"})
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-full"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Contenido scrolleable */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Formulario para agregar reseña - Solo para clientes */}
          {usuarioActivo?.tipoUsuario === "Cliente" && (
            <div className="mb-6 p-5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border-2 border-blue-200">
              <h3 className="text-lg font-semibold mb-3 text-blue-900">
                Escribe tu reseña
              </h3>

              {/* Selector de estrellas */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tu calificación
                </label>
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, index) => {
                    const valor = index + 1;
                    const isFilled = puntuacionSeleccionada >= valor;
                    return (
                      <button
                        key={index}
                        type="button"
                        onClick={() => setPuntuacionSeleccionada(valor)}
                        className="transition-transform hover:scale-125"
                      >
                        <svg
                          className={`w-10 h-10 cursor-pointer ${
                            isFilled ? "text-yellow-400" : "text-gray-300"
                          } hover:text-yellow-300`}
                          fill="currentColor"
                          viewBox="0 0 22 20"
                        >
                          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                      </button>
                    );
                  })}
                  <span className="ml-3 text-sm font-medium text-gray-700">
                    {puntuacionSeleccionada > 0
                      ? `${puntuacionSeleccionada} estrella${
                          puntuacionSeleccionada > 1 ? "s" : ""
                        }`
                      : "Selecciona una calificación"}
                  </span>
                </div>
              </div>

              {/* Campo de comentario */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tu comentario (opcional)
                </label>
                <textarea
                  value={comentario}
                  onChange={(e) => setComentario(e.target.value)}
                  placeholder="Cuéntanos tu experiencia con este plan..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  rows="4"
                />
              </div>

              {/* Botón de enviar */}
              <button
                onClick={handleEnviarResena}
                disabled={puntuacionSeleccionada === 0 || cargando}
                className={`w-full py-3 px-4 rounded-lg font-medium transition-all ${
                  puntuacionSeleccionada === 0 || cargando
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-blue-500 text-white hover:bg-blue-600 hover:shadow-lg transform hover:scale-105"
                }`}
              >
                {cargando ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Enviando...
                  </div>
                ) : (
                  "Publicar reseña"
                )}
              </button>
            </div>
          )}

          {/* Lista de reseñas */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-3 text-gray-800">
              Todas las reseñas
            </h3>

            {cargando && resenas.length === 0 ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                <p className="mt-4 text-gray-600">Cargando reseñas...</p>
              </div>
            ) : resenas.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <svg
                  className="w-20 h-20 text-gray-300 mx-auto mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                  />
                </svg>
                <p className="text-gray-600 text-lg font-medium">
                  Aún no hay reseñas para este plan
                </p>
                <p className="text-gray-500 text-sm mt-2">
                  ¡Sé el primero en dejar una reseña!
                </p>
              </div>
            ) : (
              resenas.map((resena) => (
                <div
                  key={resena.id}
                  className="p-4 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow bg-white"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
                        {resena.nombreCliente 
                          ? resena.nombreCliente.charAt(0).toUpperCase()
                          : "U"}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">
                          {resena.nombreCliente || `Usuario ${resena.clienteId}`}
                        </p>
                        <p className="text-xs text-gray-500">
                          {formatearFecha(resena.fecha)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center bg-yellow-50 px-3 py-1 rounded-full">
                      {Array.from({ length: 5 }).map((_, index) => {
                        const isFilled = resena.puntuacion > index;
                        return (
                          <svg
                            key={index}
                            className={`w-4 h-4 ${
                              isFilled ? "text-yellow-400" : "text-gray-300"
                            }`}
                            fill="currentColor"
                            viewBox="0 0 22 20"
                          >
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                          </svg>
                        );
                      })}
                      <span className="ml-2 text-sm font-medium text-gray-700">
                        {resena.puntuacion}
                      </span>
                    </div>
                  </div>
                  {resena.comentario && (
                    <p className="text-gray-700 mt-2 pl-15 leading-relaxed">
                      {resena.comentario}
                    </p>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <button
            onClick={onClose}
            className="w-full py-3 px-4 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

ModalResenas.propTypes = {
  planEmpresa: PropTypes.object,
  onClose: PropTypes.func.isRequired,
};
