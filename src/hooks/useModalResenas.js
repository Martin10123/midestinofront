import { useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { urlGeneral } from "../helpers/apiUrls";
import { UsuarioContext } from "../context/UsuarioContext";

export const useModalResenas = ({
  planEmpresa,
  onClose,
  setPlanesEmpresa,
  onActualizarValoracion,
}) => {
  const { usuarioActivo } = useContext(UsuarioContext);
  const [resenas, setResenas] = useState([]);
  const [puntuacionSeleccionada, setPuntuacionSeleccionada] = useState(0);
  const [comentario, setComentario] = useState("");
  const [cargando, setCargando] = useState(false);

  const obtenerNombreCliente = (resena) => {
    const fallbackNombre =
      usuarioActivo?.nombreCompleto ||
      usuarioActivo?.nombre ||
      usuarioActivo?.nombres ||
      usuarioActivo?.username;

    return (
      resena?.nombreCliente ||
      resena?.clienteNombre ||
      resena?.usuarioNombre ||
      resena?.nombreUsuario ||
      resena?.cliente?.nombre ||
      resena?.cliente?.nombreCompleto ||
      (resena?.clienteId === usuarioActivo?.idCliente ? fallbackNombre : null)
    );
  };

  const actualizarValoracionPlan = (listaResenas) => {
    if (!setPlanesEmpresa || !planEmpresa?.id) {
      return;
    }

    const puntuaciones = listaResenas.map(
      (resena) => Number(resena.puntuacion) || 0
    );

    const promedio =
      listaResenas.length > 0
        ? puntuaciones.reduce((acc, val) => acc + val, 0) /
          listaResenas.length
        : 0;

    setPlanesEmpresa?.((planes) => {
      let huboCambio = false;

      const planesActualizados = planes.map((plan) => {
        if (plan.id !== planEmpresa.id) {
          return plan;
        }

        const promedioActual = Number(plan.valoracionPromedio ?? 0);
        const totalActual =
          plan.totalResenas ?? plan.totalValoraciones ?? plan.numeroValoraciones ?? 0;

        if (
          Math.abs(promedio - promedioActual) < 0.001 &&
          totalActual === listaResenas.length
        ) {
          return plan;
        }

        huboCambio = true;

        return {
          ...plan,
          valoracionPromedio: promedio,
          totalResenas: listaResenas.length,
        };
      });

      return huboCambio ? planesActualizados : planes;
    });

    onActualizarValoracion?.(promedio, listaResenas.length);
  };

  const cargarResenas = async () => {
    try {
      setCargando(true);
      const response = await axios.get(
        `${urlGeneral}/planes/${planEmpresa.id}/resenas`
      );

      if (response.data.valid) {
        const lista = response.data.valoracionesList || [];
        const listaNormalizada = lista.map((resena) => {
          const nombre = obtenerNombreCliente(resena);
          return nombre
            ? {
                ...resena,
                nombreCliente: nombre,
              }
            : resena;
        });

        setResenas(listaNormalizada);
        actualizarValoracionPlan(listaNormalizada);
      } else {
        console.error("Error al cargar reseñas:", response.data.message);
        setResenas([]);
        actualizarValoracionPlan([]);
      }
    } catch (error) {
      console.error("Error al cargar reseñas:", error);
      toast.error("Error al cargar las reseñas");
      setResenas([]);
      actualizarValoracionPlan([]);
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

        setPuntuacionSeleccionada(0);
        setComentario("");

        await cargarResenas();
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
