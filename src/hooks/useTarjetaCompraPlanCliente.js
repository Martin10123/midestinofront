import { useState } from "react";
import toast from "react-hot-toast";
import { urlGeneral } from "../helpers/apiUrls";
import axios from "axios";

export const useTarjetaCompraPlanCliente = ({ compra, setCarritoCompras }) => {
  const [cantidadProducto, setCantidadProducto] = useState(compra.cantidad);

  const handleAgregarCarritoCompras = (cantidad) => {
    if (cantidadProducto + cantidad < 1) {
      return;
    }

    const nuevaCantidad = cantidadProducto + cantidad;
    setCantidadProducto(nuevaCantidad);

    agregarCarritoCompras(cantidad, nuevaCantidad);
  };

  const agregarCarritoCompras = async (cantidad, nuevaCantidad) => {
    try {
      const response = await axios.post(`${urlGeneral}/carritos/guardar`, {
        planEmpresa: {
          id: compra.planEmpresa.id,
          empresaId: compra.planEmpresa.empresaId,
        },
        cantidad: cantidad,
        precioTotal: compra.planEmpresa.precio,
        fueAprobado: false,
        cliente: {
          idCliente: compra.cliente.idCliente,
        },
      });

      if (response.data.valid) {
        toast.success(response.data.message);

        setCarritoCompras((carritoCompras) => {
          const carritoComprasActualizado = carritoCompras.map((carrito) => {
            if (carrito.id === compra.id) {
              return {
                ...carrito,
                cantidad: nuevaCantidad,
                precioTotal: compra.planEmpresa.precio * nuevaCantidad,
              };
            }

            return carrito;
          });

          return carritoComprasActualizado;
        });
      } else {
        toast.error(
          "Ocurrió un error al agregar el plan al carrito de compras: " +
            response.data.message
        );
      }
    } catch (error) {
      console.log(error);

      toast.error(
        "Ocurrió un error al agregar el plan al carrito de compras, " +
          error.message
      );
    }
  };

  const eliminarCarritoCompras = async () => {
    try {
      const response = await axios.delete(
        `${urlGeneral}/carritos/eliminar/${compra.id}`
      );

      if (response.data.valid) {
        toast.success(response.data.message);

        setCarritoCompras((carritoCompras) => {
          const carritoComprasActualizado = carritoCompras.filter(
            (carrito) => carrito.id !== compra.id
          );

          return carritoComprasActualizado;
        });
      } else {
        toast.error(
          "Ocurrió un error al eliminar el plan del carrito de compras: " +
            response.data.message
        );
      }
    } catch (error) {
      console.log(error);

      toast.error(
        "Ocurrió un error al eliminar el plan del carrito de compras, " +
          error.message
      );
    }
  };

  return {
    cantidadProducto,
    handleAgregarCarritoCompras,
    eliminarCarritoCompras,
    setCantidadProducto,
  };
};
