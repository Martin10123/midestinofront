import { useContext, useEffect, useState } from "react";
import { TarjetaCompraPlanCliente } from "../components/TarjetaCompraPlanCliente";
import { TotalPlanes } from "../components/TotalPlanes";
import { TemplateMainCliente } from "../templates/TemplateMainCliente";
import { UsuarioContext } from "../context/UsuarioContext";
import axios from "axios";
import { urlGeneral } from "../helpers/apiUrls";

export const PlanesSeleccionadosCliente = () => {
  const [carritoCompras, setCarritoCompras] = useState([]);
  const { usuarioActivo, setUsuarioActivo } = useContext(UsuarioContext);

  useEffect(() => {
    if (!usuarioActivo.idCliente) {
      return;
    }

    const obtenerCarritoCompras = async () => {
      try {
        const response = await axios.get(
          `${urlGeneral}/carritos/cliente/${usuarioActivo.idCliente}`
        );

        setCarritoCompras(response.data.carritosList);
      } catch (error) {
        console.log(error);
      }
    };

    obtenerCarritoCompras();
  }, [usuarioActivo.idCliente]);

  return (
    <TemplateMainCliente titulo="Carrito de compras">
      <section className="bg-white pb-8 antialiased border-b">
        <div className="mx-auto px-6">
          <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
            <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
              {carritoCompras.map((compra) => (
                <TarjetaCompraPlanCliente
                  key={compra.id}
                  compra={compra}
                  setCarritoCompras={setCarritoCompras}
                />
              ))}
            </div>

            <TotalPlanes
              carritoCompras={carritoCompras}
              usuarioActivo={usuarioActivo}
              setCarritoCompras={setCarritoCompras}
              setUsuarioActivo={setUsuarioActivo}
            />
          </div>
        </div>
      </section>
    </TemplateMainCliente>
  );
};
