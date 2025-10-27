import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { urlGeneral } from "../helpers/apiUrls";
import { useNavigate } from "react-router-dom";

export const useTotalPlanes = ({
  carritoCompras,
  usuarioActivo,
  setCarritoCompras,
  setUsuarioActivo,
}) => {
  const [nombrePlan, setNombrePlan] = useState("");
  const [cantidadPersonas, setCantidadPersonas] = useState(1);
  const navigate = useNavigate();

  // Calcular el precio original sin usar reduce
  let precioOriginal = 0;
  for (let i = 0; i < carritoCompras.length; i++) {
    precioOriginal += carritoCompras[i].precioTotal;
  }

  // Calcular el descuento basado en la cantidad de planes
  const cantidadPlanes = carritoCompras.length;
  let descuento = 0;

  if (cantidadPlanes >= 6) {
    descuento = 0.2; // 20% de descuento si tiene 6 o más planes
  } else if (cantidadPlanes >= 3) {
    descuento = 0.1; // 10% de descuento si tiene 3 o más planes
  }

  // Aplicar el descuento
  const precioConDescuento = precioOriginal * (1 - descuento);

  // Costo del envío fijo
  const envio = 10000;

  // Calcular el precio total final
  const precioFinal = precioConDescuento + envio;

  const presupuestoEsSuficiente = usuarioActivo.presupuesto < precioFinal;

  const onComprarPlanes = async () => {
    try {
      if (carritoCompras.length === 0) {
        // Verificar que el carrito de compras no esté vacío
        toast.error("No hay planes en el carrito de compras.");
        return;
      }

      if (nombrePlan.trim().length < 5) {
        // Verificar que el nombre de la compra tenga al menos 5 caracteres
        toast.error("El nombre de la compra debe tener al menos 5 caracteres.");
        return;
      }

      const cantidadPersonasDisponibles = carritoCompras.map(
        (compra) => compra.planEmpresa.personasDisponibles
      );

      const maxPersonasDisponibles = Math.max(...cantidadPersonasDisponibles);

      if (cantidadPersonas < 1) {
        // Verificar que la cantidad de personas sea mayor a 0
        toast.error("La cantidad de personas debe ser mayor a 0.");
        return;
      }

      if (cantidadPersonas > maxPersonasDisponibles) {
        // Verificar que la cantidad de personas no sea mayor al máximo disponible
        toast.error(
          `La cantidad de personas no debe ser mayor a ${maxPersonasDisponibles} según los planes seleccionados.`
        );
        return;
      }

      if (presupuestoEsSuficiente) {
        // Verificar si el presupuesto del usuario es suficiente
        toast.error(
          "Tu presupuesto no es suficiente para completar la compra."
        );
        return;
      }

      for (let i = 0; i < carritoCompras.length; i++) {
        const compra = carritoCompras[i];

        if (compra.cantidad > compra.planEmpresa.cantidadDisponible) {
          toast.error(
            `La cantidad de ${compra.planEmpresa.nombre} no puede ser mayor a la cantidad de planes disponibles. Hay solo ${compra.planEmpresa.cantidadDisponible} disponibles.`
          );
          return; // Detener la compra si alguna cantidad es inválida
        }
      }

      const response = await axios.post(`${urlGeneral}/compras/agregar`, {
        nombrePlan,
        estado: "Comprado",
        nombrePlanes: carritoCompras.map((compra) => compra.planEmpresa.nombre),
        tipoSitios: carritoCompras.map(
          (compra) => compra.planEmpresa.tipoSitio
        ),
        direcciones: carritoCompras.map(
          (compra) => compra.planEmpresa.direccion
        ),
        cantidadesCompradas: carritoCompras.map((compra) => compra.cantidad),
        horarios: carritoCompras.map((compra) => compra.planEmpresa.horario),
        correos: carritoCompras.map((compra) => compra.planEmpresa.email),
        paises: carritoCompras.map((compra) => compra.planEmpresa.pais),
        telefonos: carritoCompras.map((compra) => compra.planEmpresa.telefono),
        imagenes: carritoCompras.map((compra) => compra.planEmpresa.imagen),
        precios: carritoCompras.map((compra) => compra.precioTotal),
        planesPorEmpresa: carritoCompras.map((compra) => compra.planEmpresa.id),
        informacionesGenerales: carritoCompras.map(
          (compra) => compra.planEmpresa.informacionGeneral
        ),
        empresas: carritoCompras.map((compra) => compra.planEmpresa.empresaId),
        personasDisponibles: cantidadPersonas,
        cliente: {
          idCliente: usuarioActivo.idCliente,
        },
      });

      if (response.data.valid) {
        toast.success("Compra realizada con éxito!");

        const usuarioActualizado = {
          ...usuarioActivo,
          presupuesto: usuarioActivo.presupuesto - precioFinal,
        };

        setUsuarioActivo(usuarioActualizado);

        localStorage.removeItem("usuarioActivo");
        localStorage.setItem(
          "usuarioActivo",
          JSON.stringify(usuarioActualizado)
        );

        setCarritoCompras([]);
        navigate("/planes-comprados-clientes");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return {
    precioFinal,
    onComprarPlanes,
    nombrePlan,
    setNombrePlan,
    presupuestoEsSuficiente,
    precioOriginal,
    precioConDescuento,
    cantidadPlanes,
    envio,
    cantidadPersonas,
    setCantidadPersonas,
  };
};
