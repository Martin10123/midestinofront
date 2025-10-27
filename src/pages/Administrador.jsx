import { useEffect, useState } from "react";
import { TemplateMainAdministrador } from "../templates/TemplateMainAdministrador";
import axios from "axios";
import { urlGeneral } from "./../helpers/apiUrls";
import { TablaEmpresas } from "../components/TablaEmpresas";
import { TablaClientes } from "../components/TablaClientes";

export const Administrador = () => {
  const [todasEmpresas, setTodasEmpresas] = useState([]);
  const [listaCliente, setListaCliente] = useState([]);
  const [cualVer, setCualVer] = useState("empresas"); // Estado para controlar la pestaña activa

  // Obtener empresas
  useEffect(() => {
    const getEmpresas = async () => {
      try {
        const response = await axios.get(urlGeneral + "/empresa/todas");
        setTodasEmpresas(response.data);
      } catch (error) {
        console.error("Error al obtener empresas: ", error);
      }
    };
    getEmpresas();
  }, []);

  // Obtener clientes
  useEffect(() => {
    const getClientes = async () => {
      try {
        const response = await axios.get(urlGeneral + "/cliente/todos");
        setListaCliente(response.data);
      } catch (error) {
        console.error("Error al obtener los clientes: ", error);
      }
    };
    getClientes();
  }, []);

  return (
    <TemplateMainAdministrador>
      <section className="w-full">
        <div className="p-2 relative overflow-x-auto">
          <h2 className="text-3xl text-gray-700 font-bold mb-4">
            Bienvenido Administrador
          </h2>

          {/* Tabs para cambiar entre empresas y clientes */}
          <div className="mb-4">
            <button
              className={`px-4 py-2 mr-2 ${
                cualVer === "empresas"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              } rounded`}
              onClick={() => setCualVer("empresas")}
            >
              Ver Empresas
            </button>
            <button
              className={`px-4 py-2 ${
                cualVer === "clientes"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              } rounded`}
              onClick={() => setCualVer("clientes")}
            >
              Ver Clientes
            </button>
          </div>

          {/* Mostrar la tabla correspondiente según el tab seleccionado */}
          {cualVer === "empresas" && (
            <TablaEmpresas
              todasEmpresas={todasEmpresas}
              setTodasEmpresas={setTodasEmpresas}
            />
          )}
          {cualVer === "clientes" && (
            <TablaClientes
              listaCliente={listaCliente}
              setListaCliente={setListaCliente}
            />
          )}
        </div>
      </section>
    </TemplateMainAdministrador>
  );
};
