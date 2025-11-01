import { useContext, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { urlGeneral } from "../helpers/apiUrls";
import { useForm } from "./useForm";
import { PlanesEmpresaContext } from "../context/PlanesEmpresaContext";
import { UsuarioContext } from "../context/UsuarioContext";

export const useAgregarSitioEmpresa = ({
  editData,
  handleAbrirModalCrearActividad,
}) => {
  const { setPlanesEmpresa } = useContext(PlanesEmpresaContext);
  const { usuarioActivo } = useContext(UsuarioContext);
  const [enviando, setEnviando] = useState(false);
  const { formState, onInputChange } = useForm({
    imagen: null,
    nombre: editData ? editData.nombre : "",
    tipoSitio: editData ? editData.tipoSitio : "Restaurante",
    direccion: editData ? editData.direccion : "",
    horario: editData ? editData.horario : "9:00 AM - 10:00 PM",
    email: editData ? editData.email : "",
    ciudad: editData ? editData.ciudad : "",
    metodosPagoAceptados: editData ? editData.metodosPagoAceptados : "",
    telefono: editData ? editData.telefono : "",
    precio: editData ? editData.precio : "",
    cantidad: editData ? editData.cantidadDisponible : "",
    personasDisponibles: editData ? editData.personasDisponibles : "",
    informacionGeneral: editData ? editData.informacionGeneral : "",
    valoracionPromedio: editData ? editData.valoracionPromedio : 0,
  });

  const validateForm = () => {
    if (!formState.imagen && !editData) {
      toast.error("La imagen del sitio es obligatoria.");
      return false;
    }

    if (!formState.nombre) {
      toast.error("El nombre del sitio es obligatorio.");
      return false;
    }
    if (!formState.direccion) {
      toast.error("La dirección es obligatoria.");
      return false;
    }
    if (!formState.horario) {
      toast.error("El horario es obligatorio.");
      return;
    }
    if (!formState.email) {
      toast.error("El correo electrónico es obligatorio.");
      return false;
    } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
      toast.error("El correo electrónico no es válido.");
      return false;
    }
    if (!formState.telefono) {
      toast.error("El teléfono es obligatorio.");
      return false;
    }
    if (!formState.precio) {
      toast.error("El precio es obligatorio.");
      return false;
    } else if (isNaN(formState.precio) || formState.precio <= 0) {
      toast.error("El precio debe ser un número mayor a 0.");
      return false;
    }
    if (!formState.ciudad) {
      toast.error("La ciudad es obligatoria");
      return false;
    }
    if (!formState.metodosPagoAceptados) {
      toast.error("El método de pago es obligatorio");
      return false;
    }
    if (!formState.cantidad) {
      toast.error("La cantidad es obligatoria.");
      return false;
    } else if (isNaN(formState.cantidad) || formState.cantidad <= 0) {
      toast.error("La cantidad debe ser un número mayor a 0.");
      return false;
    }
    if (!formState.personasDisponibles) {
      toast.error("La cantidad de personas disponibles es obligatoria.");
      return false;
    } else if (
      isNaN(formState.personasDisponibles) ||
      formState.personasDisponibles <= 0
    ) {
      toast.error(
        "La cantidad de personas disponibles debe ser un número mayor a 0."
      );
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setEnviando(true);

    const empresaActiva =
      (usuarioActivo && Object.keys(usuarioActivo).length > 0
        ? usuarioActivo
        : null) ||
      JSON.parse(localStorage.getItem("usuarioActivo")) ||
      {};

    const empresaId =
      empresaActiva.idEmpresa ?? empresaActiva.id ?? empresaActiva.empresaId;

    if (!empresaId) {
      toast.error(
        "No fue posible identificar la empresa activa. Inicia sesión nuevamente."
      );
      setEnviando(false);
      return;
    }

    const formData = new FormData();
    formData.append("imagen", formState.imagen);

    const data = {
      nombre: formState.nombre,
      tipoSitio: formState.tipoSitio,
      direccion: formState.direccion,
      horario: formState.horario,
      email: formState.email,
      ciudad: formState.ciudad,
      metodosPagoAceptados: formState.metodosPagoAceptados,
      telefono: formState.telefono,
      precio: formState.precio,
      cantidadDisponible: formState.cantidad,
      informacionGeneral: formState.informacionGeneral,
      personasDisponibles: formState.personasDisponibles,
      empresaId,
      fechaRegistro: formatearFecha(),
    };

    if (editData) {
      data.id = editData.id; // Se agrega el ID para actualizar
    }

    formData.append(
      "plan",
      new Blob([JSON.stringify(data)], { type: "application/json" })
    );

    try {
      const response = editData
        ? await axios.put(`${urlGeneral}/planes/actualizar`, {
            ...editData,
            nombre: formState.nombre,
            tipoSitio: formState.tipoSitio,
            direccion: formState.direccion,
            horario: formState.horario,
            email: formState.email,
            ciudad: formState.ciudad,
            metodosPagoAceptados: formState.metodosPagoAceptados,
            telefono: formState.telefono,
            precio: formState.precio,
            cantidadDisponible: formState.cantidad,
            personasDisponibles: formState.personasDisponibles,
            informacionGeneral: formState.informacionGeneral,
          })
        : await axios.post(`${urlGeneral}/planes/agregar`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });

      if (response.data.valid) {
        toast.success(
          editData
            ? "Actividad actualizada correctamente."
            : "Actividad creada correctamente."
        );

        const planRespuesta =
          response.data.planEmpresa ??
          response.data.plan ??
          response.data.planGuardado ??
          response.data.planEmpresaGuardada ??
          response.data.data;

        if (editData) {
          setPlanesEmpresa((planes) =>
            planRespuesta
              ? planes.map((plan) =>
                  plan.id === editData.id ? planRespuesta : plan
                )
              : planes
          );
        } else {
          if (planRespuesta) {
            setPlanesEmpresa((planes) => [...planes, planRespuesta]);
          } else if (Array.isArray(response.data.planesList)) {
            setPlanesEmpresa(response.data.planesList);
          }
        }

        handleAbrirModalCrearActividad();
      } else {
        const mensajeError =
          response.data.message ||
          "Ocurrió un error al guardar la actividad. Inténtalo nuevamente.";
        toast.error(mensajeError);
      }
    } catch (error) {
      console.log("Error al enviar el formulario:", error);
      const mensajeError =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        "Error al enviar el formulario. Inténtalo de nuevo.";
      toast.error(mensajeError);
    } finally {
      setEnviando(false);
    }
  };

  const formatearFecha = () => {
    const date = new Date();
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  };

  return {
    formState,
    onInputChange,
    handleSubmit,
    enviando,
  };
};
