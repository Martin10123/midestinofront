import { useContext, useEffect, useState } from "react";
import { PlanesEmpresaContext } from "./PlanesEmpresaContext";
import { PropTypes } from "prop-types";
import axios from "axios";
import { urlGeneral } from "./../helpers/apiUrls";
import { UsuarioContext } from "./UsuarioContext";
import toast from "react-hot-toast";

export const PlanesEmpresaProvider = ({ children }) => {
  const { usuarioActivo } = useContext(UsuarioContext);
  const [planesEmpresas, setPlanesEmpresas] = useState([]);
  const [planesEmpresa, setPlanesEmpresa] = useState([]);

  useEffect(() => {
    if (!usuarioActivo.idEmpresa) {
      return;
    }

    const obtenerPlanes = async () => {
      try {
        const response = await axios.get(
          `${urlGeneral}/planes/empresa/${usuarioActivo.idEmpresa}`
        );

        if (response.data.valid) {
          setPlanesEmpresa(response.data.planesList);
        }
      } catch (error) {
        console.log(error);
      }
    };

    obtenerPlanes();
  }, [usuarioActivo.idEmpresa]);

  useEffect(() => {
    if (usuarioActivo.idEmpresa) {
      return;
    }

    const obtenerTodosPlanes = async () => {
      try {
        const response = await axios.get(`${urlGeneral}/planes/todos`);

        if (response.data.valid) {
          setPlanesEmpresas(response.data.planesList);
        }
      } catch (error) {
        console.log(error);
      }
    };

    obtenerTodosPlanes();
  }, [usuarioActivo.idEmpresa]);

  const fetchPlanes = async () => {
    try {
      if (usuarioActivo.idEmpresa) {
        const response = await axios.get(
          `${urlGeneral}/planes/empresa/${usuarioActivo.idEmpresa}`
        );
        if (response.data.valid) setPlanesEmpresa(response.data.planesList);
      } else {
        const response = await axios.get(`${urlGeneral}/planes/todos`);
        if (response.data.valid) setPlanesEmpresas(response.data.planesList);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onEnviarValoracion = async (puntuacion, planEmpresa, comentario = null) => {
    try {
      const response = await axios.post(
        `${urlGeneral}/planes/${planEmpresa.id}/valoracion`,
        null,
        {
          params: {
            clienteId:
              usuarioActivo.tipoUsuario === "Cliente"
                ? usuarioActivo.idCliente
                : usuarioActivo.idEmpresa,
            puntuacion,
            comentario,
          },
        }
      );

      // backend responde con texto en el body; aceptamos tanto string como ResponseEntity
      const data = response.data;
      if (
        data === "Valoración añadida exitosamente" ||
        (data && data.includes && data.includes("Valoración añadida"))
      ) {
        // refrescar la lista de planes para obtener el promedio actualizado
        await fetchPlanes();
        toast.success("Valoración añadida exitosamente");
      } else {
        toast.error("Ocurrió un error al agregar la valoración");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error al agregar valoración: " + error.message);
    }
  };

  return (
    <PlanesEmpresaContext.Provider
      value={{
        planesEmpresas,
        setPlanesEmpresas,
        planesEmpresa,
        setPlanesEmpresa,
        onEnviarValoracion,
      }}
    >
      {children}
    </PlanesEmpresaContext.Provider>
  );
};

PlanesEmpresaProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
