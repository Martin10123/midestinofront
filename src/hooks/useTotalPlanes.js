import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { urlGeneral } from "../helpers/apiUrls";
import { useNavigate } from "react-router-dom";
import { formatearAMonedaColombia } from "../helpers/herramientas";

export const useTotalPlanes = ({
  carritoCompras,
  usuarioActivo,
  setCarritoCompras,
  setUsuarioActivo,
}) => {
  const [nombrePlan, setNombrePlan] = useState("");
  const [cantidadPersonas, setCantidadPersonas] = useState(1);
  const [comprando, setComprando] = useState(false);
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
    if (comprando) return; // Evitar múltiples clics

    setComprando(true);

    try {
      // Validación 1: Carrito vacío
      if (carritoCompras.length === 0) {
        toast.error(
          "❌ Tu carrito está vacío. Agrega planes antes de comprar.",
          {
            duration: 4000,
            icon: "🛒",
          }
        );
        setComprando(false);
        return;
      }

      // Validación 2: Nombre del plan
      if (!nombrePlan || nombrePlan.trim().length < 5) {
        toast.error(
          "📝 Por favor, ingresa un nombre para tu plan (mínimo 5 caracteres).",
          {
            duration: 4000,
            icon: "✏️",
          }
        );
        setComprando(false);
        return;
      }

      // Validación 3: Cantidad de personas
      if (!cantidadPersonas || cantidadPersonas < 1) {
        toast.error("👥 La cantidad de personas debe ser al menos 1.", {
          duration: 4000,
          icon: "⚠️",
        });
        setComprando(false);
        return;
      }

      const cantidadPersonasDisponibles = carritoCompras.map(
        (compra) => compra.planEmpresa.personasDisponibles
      );

      const maxPersonasDisponibles = Math.max(...cantidadPersonasDisponibles);

      // Validación 4: Exceso de personas
      if (cantidadPersonas > maxPersonasDisponibles) {
        toast.error(
          `👥 La cantidad de personas no puede ser mayor a ${maxPersonasDisponibles} según los planes seleccionados.\n\nPor favor, reduce el número de personas o elige planes con mayor capacidad.`,
          {
            duration: 5000,
            icon: "⚠️",
          }
        );
        setComprando(false);
        return;
      }

      // Validación 5: Presupuesto insuficiente
      if (presupuestoEsSuficiente) {
        toast.error(
          `💰 Presupuesto insuficiente.\n\nTotal a pagar: ${formatearAMonedaColombia(
            precioFinal
          )}\nTu presupuesto: ${formatearAMonedaColombia(
            usuarioActivo.presupuesto
          )}\n\nPor favor, actualiza tu presupuesto o reduce los planes en tu carrito.`,
          {
            duration: 6000,
            icon: "💳",
          }
        );
        setComprando(false);
        return;
      }

      // Validación 6: Disponibilidad de planes
      for (let i = 0; i < carritoCompras.length; i++) {
        const compra = carritoCompras[i];

        if (compra.cantidad > compra.planEmpresa.cantidadDisponible) {
          toast.error(
            `⚠️ Stock insuficiente para "${compra.planEmpresa.nombre}".\n\nCantidad solicitada: ${compra.cantidad}\nDisponible: ${compra.planEmpresa.cantidadDisponible}\n\nPor favor, ajusta la cantidad en tu carrito.`,
            {
              duration: 5000,
              icon: "📦",
            }
          );
          setComprando(false);
          return;
        }
      }

      // Mostrar toast de procesamiento
      toast.loading("Procesando tu compra...", { id: "comprando" });

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
        ciudades: carritoCompras.map((compra) => compra.planEmpresa.ciudad),
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
        // Dismiss loading toast
        toast.dismiss("comprando");

        // Mostrar animación de éxito
        toast.success(
          "🎉 ¡Compra realizada con éxito!\n\nTus planes han sido confirmados.",
          {
            duration: 3000,
          }
        );

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

        // Esperar un poco antes de navegar para que el usuario vea el mensaje
        setTimeout(() => {
          setComprando(false);
          navigate("/planes-comprados-clientes");
        }, 2000);
      } else {
        toast.dismiss("comprando");
        setComprando(false);
      }
    } catch (error) {
      console.log(error);
      toast.dismiss("comprando");
      const mensajeError =
        error.response?.data?.message ||
        "Ocurrió un error al procesar tu compra. Por favor, inténtalo nuevamente.";
      toast.error(`❌ ${mensajeError}`, {
        duration: 5000,
      });
      setComprando(false);
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
    comprando,
  };
};
