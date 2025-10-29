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
      toast.error("💰 El presupuesto debe ser mayor a $0", {
        duration: 4000,
        icon: '⚠️',
      });
      return;
    }

    if (presupuesto === usuarioActivo.presupuesto) {
      toast.error("📝 No has realizado ningún cambio en el presupuesto", {
        duration: 3000,
        icon: 'ℹ️',
      });
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

        toast.success("✅ Presupuesto actualizado correctamente", {
          duration: 4000,
          icon: '💰',
        });

        handleOpenModalPresuento();
      }
    } catch (error) {
      console.log(error);

      toast.error(
        `❌ Ocurrió un error al actualizar el presupuesto: ${error.response?.data || error.message}`,
        {
          duration: 5000,
        }
      );
    }
  };

  return {
    presupuesto,
    setPresupuesto,
    onGuardarPresupuesto,
    usuarioActivo,
  };
};
