import { useState } from "react";
import toast from "react-hot-toast";
import { urlGeneral } from "../helpers/apiUrls";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "./useForm";

export const useRegistroEmpresa = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(1);
  const { formState, onInputChange } = useForm({
    nombre: "",
    razonSocial: "",
    nit: "",
    sector: "",
    fechaFundacion: "",
    direccion: "",
    ciudad: "",
    telefono: "",
    correo: "",
    web: "",
    numeroRegistroMercantil: "",
    fechaRegistro: "",
    entidadRegistro: "",
    tipoSociedad: "",
    nombreRepresentanteLegal: "",
    numeroDocumentoRepresentanteLegal: "",
    cargoPropietario: "",
    nombrePropietarioPrincipal: "",
    certificadoExistencia: "",
    RUT: "",
    estadosFinancieros: "",
    notariaRegistro: "",
    otrosDocumentosLegales: "",
    confirmacion: false,
    firmaRepresentanteLegal: "",
    fechaFirma: "",
    contrasena: "",
  });

  // Función de validación para verificar los campos requeridos
  const validateFields = () => {
    switch (activeTab) {
      case 1:
        return (
          formState.nombre.trim() !== "" &&
          formState.razonSocial.trim() !== "" &&
          formState.nit.trim() !== "" &&
          formState.sector.trim() !== "" &&
          formState.fechaFundacion.trim() !== ""
        );
      case 2:
        return (
          formState.direccion.trim() !== "" &&
          formState.ciudad.trim() !== "" &&
          formState.telefono.trim() !== "" &&
          formState.correo.trim() !== "" &&
          formState.web.trim() !== ""
        );
      case 3:
        return (
          formState.numeroRegistroMercantil.trim() !== "" &&
          formState.fechaRegistro.trim() !== "" &&
          formState.entidadRegistro.trim() !== "" &&
          formState.tipoSociedad.trim() !== ""
        );
      case 4:
        return (
          formState.firmaRepresentanteLegal.trim() !== "" &&
          formState.fechaFirma.trim() !== "" &&
          formState.contrasena.trim() !== ""
        );
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (validateFields()) {
      if (activeTab < 6) {
        setActiveTab(activeTab + 1);
      }
    } else {
      toast.error("Por favor completa todos los campos requeridos");
    }
  };

  const handleBack = () => {
    if (activeTab > 1) {
      setActiveTab(activeTab - 1);
    }
  };

  const onGuardarEmpresa = async () => {
    try {
      // Validación para 'nit'
      if (formState.nit.length < 6) {
        toast.error("El NIT debe ser un número válido.");
        return;
      }

      // Validación para 'nombre'
      if (formState.nombre.length < 2) {
        toast.error("El nombre debe tener al menos 2 caracteres.");
        return;
      }

      // Validación para 'correo'
      if (!/\S+@\S+\.\S+/.test(formState.correo)) {
        toast.error("El correo electrónico debe ser válido.");
        return;
      }

      // Validación para 'telefono'
      if (!/^\d{7,15}$/.test(formState.telefono)) {
        toast.error("El número de teléfono debe tener entre 7 y 15 dígitos.");
        return;
      }

      // Validación para 'fechaFundacion' y 'fechaRegistro'
      const today = new Date();
      const fechaFundacion = new Date(formState.fechaFundacion);
      const fechaRegistro = new Date(formState.fechaRegistro);

      if (fechaFundacion > today) {
        toast.error("La fecha de fundación no puede ser en el futuro.");
        return;
      }

      if (fechaRegistro > today) {
        toast.error("La fecha de registro no puede ser en el futuro.");
        return;
      }

      // Validación para 'contrasena'
      if (formState.contrasena.length < 6) {
        toast.error("La contraseña debe tener al menos 6 caracteres.");
        return;
      }

      if (!formState.confirmacion) {
        toast.error(
          "Debes aceptar la declaración de veracidad para continuar."
        );
        return;
      }

      // Si todas las validaciones pasan, se crea el objeto empresa
      const empresa = {
        nombre: formState.nombre,
        razonSocial: formState.razonSocial,
        nit: formState.nit,
        sector: formState.sector,
        fechaFundacion: formState.fechaFundacion,
        direccion: formState.direccion,
        ciudad: formState.ciudad,
        telefono: formState.telefono,
        correo: formState.correo,
        web: formState.web,
        numeroRegistroMercantil: formState.numeroRegistroMercantil,
        fechaRegistro: formState.fechaRegistro,
        entidadRegistro: formState.entidadRegistro,
        tipoSociedad: formState.tipoSociedad,
        nombreRepresentanteLegal: formState.nombreRepresentanteLegal,
        numeroDocumentoRepresentanteLegal:
          formState.numeroDocumentoRepresentanteLegal,
        cargoPropietario: formState.cargoPropietario,
        nombrePropietarioPrincipal: formState.nombrePropietarioPrincipal,
        certificadoExistencia: formState.certificadoExistencia,
        RUT: formState.RUT,
        estadosFinancieros: formState.estadosFinancieros,
        notariaRegistro: formState.notariaRegistro,
        otrosDocumentosLegales: formState.otrosDocumentosLegales,
        confirmacion: formState.confirmacion,
        firmaRepresentanteLegal: formState.firmaRepresentanteLegal,
        fechaFirma: formState.fechaFirma,
        contrasena: formState.contrasena,
        tipoUsuario: "Empresa",
      };

      const response = await axios.post(
        urlGeneral + "/empresa/agregar",
        empresa
      );

      if (response.data.valid) {
        toast.success(
          "Empresa registrada correctamente. Te notificaremos cuando tu cuenta sea activada por un administrador."
        );

        navigate("/", { replace: true });
      }
    } catch (error) {
      console.log("Error al registrarse", error.response);

      toast.error(error.response.data.message);
    }
  };

  return {
    formState,
    activeTab,
    handleNext,
    handleBack,
    onInputChange,
    onGuardarEmpresa,
  };
};
