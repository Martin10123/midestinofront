import axios from "axios";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { urlGeneral } from "../helpers/apiUrls";
import { UsuarioContext } from "../context/UsuarioContext";

export const useTarjetaPlanes = ({ planEmpresa }) => {
  const { usuarioActivo } = useContext(UsuarioContext);
  const [planSeleccionado, setPlanSeleccionado] = useState({});
  const [abrirActActividad, setAbrirActActividad] = useState(false);
  const [agregandoCarrito, setAgregandoCarrito] = useState(false);

  const handleAbrirModalActActividad = (planActualizar) => {
    if (planActualizar) {
      setPlanSeleccionado(planActualizar);
    } else {
      console.log("No hay plan seleccionado");

      setPlanSeleccionado({});
    }

    setAbrirActActividad(!abrirActActividad);
  };

  const agregarCarritoCompras = async () => {
    setAgregandoCarrito(true);
    try {
      const response = await axios.post(`${urlGeneral}/carritos/guardar`, {
        planEmpresa: {
          id: planEmpresa.id,
          empresaId: planEmpresa.empresaId,
        },
        cantidad: 1,
        precioTotal: planEmpresa.precio,
        fueAprobado: false,
        cliente: {
          idCliente: usuarioActivo.idCliente,
        },
      });

      if (response.data.valid) {
        toast.success(response.data.message);
      } else {
        toast.error(
          "Ocurrió un error al agregar el plan al carrito de compras: " +
            response.data.message
        );
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        console.log(error);
        toast.error(
          "Ocurrió un error al agregar el plan al carrito de compras, " +
            error.message
        );
      }
    } finally {
      setAgregandoCarrito(false);
    }
  };

  return {
    handleAbrirModalActActividad,
    agregarCarritoCompras,
    planSeleccionado,
    abrirActActividad,
    usuarioActivo,
    agregandoCarrito,
  };
};
