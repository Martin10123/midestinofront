import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { urlGeneral } from "../helpers/apiUrls";
import axios from "axios";
import { UsuarioContext } from "../context/UsuarioContext";

export const usePresupuestoModal = ({ handleOpenModalPresuento }) => {
  const { usuarioActivo, setUsuarioActivo } = useContext(UsuarioContext);

  const [presupuesto, setPresupuesto] = useState(
    Number(usuarioActivo.presupuesto)
  );

  const onGuardarPresupuesto = async () => {
    if (presupuesto <= 0) {
      toast.error("El presupuesto no puede ser negativo");
      return;
    }

    try {
      const response = await axios.put(
        `${urlGeneral}/cliente/actualizar/${usuarioActivo.idCliente}`,
        {
          ...usuarioActivo,
          presupuesto,
        }
      );

      if (response.data.valid) {
        setUsuarioActivo(response.data.cliente);

        localStorage.removeItem("usuarioActivo");

        localStorage.setItem(
          "usuarioActivo",
          JSON.stringify(response.data.cliente)
        );

        toast.success("Presupuesto actualizado correctamente");

        handleOpenModalPresuento();
      }
    } catch (error) {
      console.log(error);

      toast.error(
        "Ocurrió un error al actualizar el presupuesto" + error.response.data
      );
    }
  };

  return {
    presupuesto,
    setPresupuesto,
    onGuardarPresupuesto,
  };
};
