import axios from "axios";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { urlGeneral } from "./../helpers/apiUrls";

export const ResenasModal = ({ planId, onClose }) => {
  const [resenas, setResenas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResenas = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${urlGeneral}/planes/${planId}/resenas`);
        if (response.data && response.data.valid) {
          setResenas(response.data.valoracionesList || []);
        } else {
          setResenas([]);
        }
      } catch (err) {
        console.error(err);
        setError("Error al cargar reseñas");
      } finally {
        setLoading(false);
      }
    };

    if (planId) fetchResenas();
  }, [planId]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-2xl rounded bg-white p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Reseñas</h3>
          <button onClick={onClose} className="text-sm text-gray-600">Cerrar</button>
        </div>

        <div className="mt-4">
          {loading && <p>Cargando reseñas...</p>}
          {error && <p className="text-red-500">{error}</p>}

          {!loading && !error && (
            <div className="space-y-3 max-h-96 overflow-auto">
              {resenas.length === 0 && <p>No hay reseñas aún.</p>}

              {resenas.map((r) => (
                <div key={r.id} className="border rounded p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">Cliente: {r.clienteId}</p>
                      <p className="text-sm text-gray-500">{r.fecha}</p>
                    </div>
                    <div className="flex items-center">
                      <p className="text-yellow-400 font-bold me-2">{r.puntuacion}</p>
                      <p className="text-sm text-gray-500">/ 5</p>
                    </div>
                  </div>
                  {r.comentario && (
                    <p className="mt-2 text-sm text-gray-700">{r.comentario}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

ResenasModal.propTypes = {
  planId: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
};
