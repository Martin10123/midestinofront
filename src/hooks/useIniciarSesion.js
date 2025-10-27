import axios from "axios";
import toast from "react-hot-toast";
import { urlGeneral } from "../helpers/apiUrls";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UsuarioContext } from "../context/UsuarioContext";
import { useForm } from "./useForm";

export const useIniciarSesion = () => {
  const { setUsuarioActivo, setIsUsuarioActivo } = useContext(UsuarioContext);
  const navigate = useNavigate();
  const { formState, onInputChange } = useForm({
    correo: "",
    contrasena: "",
    tipoUsuario: "",
  });

  const onIniciarSesion = async (e) => {
    e.preventDefault();

    if (
      formState.correo.trim() === "" ||
      formState.contrasena.trim() === "" ||
      formState.tipoUsuario.trim() === ""
    ) {
      toast.error("Todos los campos son obligatorios");
      return;
    }

    try {
      let response;

      if (formState.tipoUsuario === "Empresa") {
        response = await axios.post(urlGeneral + "/empresa/iniciar-sesion", {
          correo: formState.correo,
          contrasena: formState.contrasena,
        });

        if (response.data.empresa) {
          localStorage.setItem(
            "usuarioActivo",
            JSON.stringify(response.data.empresa)
          );

          setUsuarioActivo(response.data.empresa);
          setIsUsuarioActivo(true);
        }

        navigate("/inicio-empresas");
      } else {
        response = await axios.post(urlGeneral + "/cliente/iniciar-sesion", {
          email: formState.correo,
          contrasena: formState.contrasena,
        });

        if (response.data.cliente) {
          localStorage.setItem(
            "usuarioActivo",
            JSON.stringify(response.data.cliente)
          );

          setUsuarioActivo(response.data.cliente);
          setIsUsuarioActivo(true);
        }

        if (formState.tipoUsuario === "Administrador") {
          navigate("/inicio-administradores");
        } else {
          navigate("/inicio-clientes");
        }
      }

      toast.success("Inicio de sesión exitoso");
    } catch (error) {
      console.log("Error al iniciar sesión", error);

      toast.error(error.response.data.message);
    }
  };

  return {
    formState,
    onInputChange,
    onIniciarSesion,
  };
};
