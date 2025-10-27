import { useContext, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UsuarioContext } from "../context/UsuarioContext";
import axios from "axios";
import { urlGeneral } from "../helpers/apiUrls";

export const usePerfilUsuario = () => {
  const { usuarioActivo, setUsuarioActivo } = useContext(UsuarioContext);
  const inputFileRef = useRef(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!usuarioActivo.idCliente) {
      return;
    }

    if (Number(id) === usuarioActivo.idCliente) {
      return;
    } else {
      navigate("/inicio-clientes");
    }
  }, [usuarioActivo.idCliente, id, navigate]);

  const handleIconClick = () => {
    inputFileRef.current.click(); // Simula el clic en el input de archivo
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const idUsuario = usuarioActivo.idCliente || usuarioActivo.idEmpresa;
        const isEmpresaOCliente =
          usuarioActivo.tipoUsuario !== "Empresa" ? "cliente" : "empresa";

        const formData = new FormData();
        formData.append("imagen", file);

        const response = await axios.post(
          `${urlGeneral}/${isEmpresaOCliente}/foto-perfil/${idUsuario}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.data.valid) {
          const usuarioActualizado = {
            ...usuarioActivo,
            fotoPerfil:
              usuarioActivo.tipoUsuario !== "Empresa"
                ? response.data.cliente.fotoPerfil
                : response.data.empresa.fotoPerfil,
          };

          // Actualizar el contexto y localStorage
          setUsuarioActivo(usuarioActualizado);
          localStorage.removeItem("usuarioActivo");
          localStorage.setItem(
            "usuarioActivo",
            JSON.stringify(usuarioActualizado)
          );
        } else {
          alert("Error al actualizar la foto de perfil.");
        }
      } catch (error) {
        console.error("Error al subir la imagen:", error);
        alert("Error al subir la imagen.");
      }
    }
  };

  return { usuarioActivo, inputFileRef, handleIconClick, handleFileChange };
};
