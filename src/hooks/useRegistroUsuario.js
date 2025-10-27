import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { urlGeneral } from "../helpers/apiUrls";
import axios from "axios";
import { UsuarioContext } from "../context/UsuarioContext";
import { useForm } from "./useForm";
import { useNavigate } from "react-router-dom";

export const useRegistroUsuario = () => {
  const navigate = useNavigate();
  const { formState, onInputChange } = useForm({
    nombreCompleto: "",
    tipoDocumento: "",
    numeroDocumento: "",
    numeroTelefono: "",
    email: "",
    nombreUsuario: "",
    contrasena: "",
    presupuesto: "",
    tipoUsuario: "Cliente",
  });

  const [responseMessage, setResponseMessage] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [estaCargando, setEstaCargando] = useState(false);
  const { setUsuarioActivo, setIsUsuarioActivo } = useContext(UsuarioContext);

  const validateForm = () => {
    const errors = {};

    // Validación del nombre completo
    if (
      !formState.nombreCompleto.trim() ||
      formState.nombreCompleto.split(" ").length < 2
    ) {
      errors.nombreCompleto =
        "El nombre completo debe contener al menos dos palabras.";
    }

    // Validación del tipo de documento
    if (!formState.tipoDocumento) {
      errors.tipoDocumento = "Selecciona un tipo de documento.";
    }

    // Validación del número de documento
    if (!formState.numeroDocumento || isNaN(formState.numeroDocumento)) {
      errors.numeroDocumento =
        "El número de documento debe ser un número válido.";
    } else if (formState.numeroDocumento.length != 10) {
      // Ajusta según el tipo de documento
      errors.numeroDocumento = "El número de documento debe tener 10 dígitos.";
    }

    // Validación del número de teléfono
    if (
      !formState.numeroTelefono ||
      isNaN(formState.numeroTelefono) ||
      formState.numeroTelefono <= 0
    ) {
      errors.numeroTelefono =
        "El número de teléfono debe ser un número válido.";
    } else if (formState.numeroTelefono.length != 10) {
      // Ajusta según tu formato
      errors.numeroTelefono = "El número de teléfono debe tener 10 dígitos.";
    }

    // Validación del email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formState.email || !emailRegex.test(formState.email)) {
      errors.email = "El email debe ser válido.";
    }

    // Validación del nombre de usuario
    if (!formState.nombreUsuario || formState.nombreUsuario.length < 3) {
      errors.nombreUsuario =
        "El nombre de usuario debe tener al menos 3 caracteres.";
    }

    if (!formState.contrasena || formState.contrasena < 8) {
      errors.contrasena = "La contraseña debe tener al menos 8 caracteres";
    }

    // Validación del presupuesto
    if (
      !formState.presupuesto ||
      isNaN(formState.presupuesto) ||
      formState.presupuesto <= 0
    ) {
      errors.presupuesto = "El presupuesto debe ser un número positivo.";
    }

    return errors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    } else {
      setFormErrors({});
    }

    setEstaCargando(true);

    try {
      const response = await axios.post(
        urlGeneral + "/cliente/agregar",
        formState
      );

      if (response.data.valid) {
        setResponseMessage(response.data.cliente.message);

        localStorage.setItem(
          "usuarioActivo",
          JSON.stringify(response.data.cliente)
        );

        setUsuarioActivo(response.data.cliente);
        setIsUsuarioActivo(true);

        toast.success(response.data.message);

        navigate("/inicio-clientes");
      } else {
        setResponseMessage(
          response.data.cliente.message || "Revise los datos ingresados."
        );
      }
    } catch (error) {
      console.log(error);

      setResponseMessage(
        error.response.data.message || "Error en el registro."
      );
    } finally {
      setEstaCargando(false);
    }
  };

  return {
    formState,
    onInputChange,
    responseMessage,
    formErrors,
    estaCargando,
    handleSubmit,
  };
};
