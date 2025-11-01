import { TemplateMainCliente } from "./../templates/TemplateMainCliente";
import { TarjetaCompraCliente } from "./../components/TarjetaCompraCliente";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { urlGeneral } from "../helpers/apiUrls";
import { UsuarioContext } from "../context/UsuarioContext";
import { DetallesCompra } from "../components/DetallesCompra";

export const PlanesComprados = () => {
  const { usuarioActivo } = useContext(UsuarioContext);
  const [planesComprados, setPlanesComprados] = useState([]);
  const [abrirDetallesPlan, setAbrirDetallesPlan] = useState(false);
  const [planSeleccionado, setPlanSeleccionado] = useState({});

  useEffect(() => {
    if (!usuarioActivo.idCliente) {
      return;
    }

    const obtenerPlanesComprados = async () => {
      try {
        const response = await axios.get(
          `${urlGeneral}/compras/cliente/${usuarioActivo.idCliente}`
        );

        setPlanesComprados(response.data.compraPlanList ?? []);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 404) {
          setPlanesComprados([]);
          return;
        }

        console.error(error);
      }
    };

    obtenerPlanesComprados();
  }, [usuarioActivo.idCliente]);

  return (
    <TemplateMainCliente titulo="Planes comprados">
      <section className="bg-white pb-8 antialiased border-b">
        <div className="mx-auto px-4 2xl:px-0">
          <div className="mx-auto px-6">
            <div className="mt-6 flow-root sm:mt-8">
              <div className="divide-y divide-gray-200">
                {planesComprados.map((planComprado) => (
                  <TarjetaCompraCliente
                    key={planComprado.idPlanGuardado}
                    planComprado={planComprado}
                    setAbrirDetallesPlan={setAbrirDetallesPlan}
                    setPlanSeleccionado={setPlanSeleccionado}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {abrirDetallesPlan && (
        <DetallesCompra
          planSeleccionado={planSeleccionado}
          setAbrirDetallesPlan={setAbrirDetallesPlan}
          setPlanSeleccionado={setPlanSeleccionado}
        />
      )}
    </TemplateMainCliente>
  );
};
