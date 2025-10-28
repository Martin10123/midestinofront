import { useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { urlGeneral } from "../helpers/apiUrls";
import { UsuarioContext } from "../context/UsuarioContext";

export const useModalResenas = ({ planEmpresa, onClose }) => {
  const { usuarioActivo } = useContext(UsuarioContext);
  const [resenas, setResenas] = useState([]);
  const [puntuacionSeleccionada, setPuntuacionSeleccionada] = useState(0);
  const [comentario, setComentario] = useState("");
  const [cargando, setCargando] = useState(false);

  const cargarResenas = async () => {
    try {
      setCargando(true);
      const response = await axios.get(
        `${urlGeneral}/planes/${planEmpresa.id}/resenas`
      );

      if (response.data.valid) {
        setResenas(response.data.valoracionesList || []);
      } else {
        console.error("Error al cargar reseñas:", response.data.message);
        setResenas([]);
      }
    } catch (error) {
      console.error("Error al cargar reseñas:", error);
      toast.error("Error al cargar las reseñas");
      setResenas([]);
    } finally {
      setCargando(false);
    }
  };

  // Cargar reseñas al abrir el modal
  useEffect(() => {
    if (planEmpresa?.id) {
      cargarResenas();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [planEmpresa]);

  const handleEnviarResena = async () => {
    if (!usuarioActivo?.idCliente) {
      toast.error("Debes iniciar sesión como cliente para dejar una reseña");
      return;
    }

    if (puntuacionSeleccionada === 0) {
      toast.error("Por favor selecciona una calificación");
      return;
    }

    try {
      setCargando(true);

      // Crear URLSearchParams para enviar como form data
      const params = new URLSearchParams();
      params.append("clienteId", usuarioActivo.idCliente);
      params.append("puntuacion", puntuacionSeleccionada);
      if (comentario.trim()) {
        params.append("comentario", comentario.trim());
      }

      const response = await axios.post(
        `${urlGeneral}/planes/${planEmpresa.id}/valoracion?${params.toString()}`
      );

      if (response.status === 200) {
        toast.success("Reseña enviada exitosamente");
        
        // Limpiar formulario
        setPuntuacionSeleccionada(0);
        setComentario("");
        
        // Recargar reseñas
        await cargarResenas();
        
        // Opcional: cerrar modal después de un breve delay
        setTimeout(() => {
          onClose();
        }, 1500);
      } else {
        toast.error("Error al enviar la reseña");
      }
    } catch (error) {
      console.error("Error al enviar reseña:", error);
      toast.error(
        error.response?.data || "Error al enviar la reseña. Inténtalo de nuevo."
      );
    } finally {
      setCargando(false);
    }
  };

  return {
    resenas,
    puntuacionSeleccionada,
    comentario,
    setPuntuacionSeleccionada,
    setComentario,
    handleEnviarResena,
    cargarResenas,
    cargando,
    usuarioActivo,
  };
};
