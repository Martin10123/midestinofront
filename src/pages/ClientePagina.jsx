import { useContext, useState } from "react";
import { TemplateMainCliente } from "../templates/TemplateMainCliente";
import { PlanesEmpresaContext } from "./../context/PlanesEmpresaContext";
import { TarjetaPlanes } from "./../components/TarjetaPlanes";

export const ClientePagina = () => {
  const { planesEmpresas, setPlanesEmpresa } =
    useContext(PlanesEmpresaContext);

  // Estados para los filtros
  const [nombreFiltro, setNombreFiltro] = useState("");
  const [ciudadFiltro, setCiudadFiltro] = useState("");

  const normalizarTexto = (valor = "") =>
    valor
      .toString()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim();

  // Filtrar planes en función de los filtros
  const extraerCiudadPlan = (plan) => {
    const ciudadCandidata =
      plan?.ciudad ?? plan?.ciudadDestino ?? plan?.ubicacion;

    return typeof ciudadCandidata === "string" ? ciudadCandidata : "";
  };

  const planesFiltrados = planesEmpresas.filter((plan) => {
    const coincideNombre = normalizarTexto(plan.nombre).includes(
      normalizarTexto(nombreFiltro)
    );

    const ciudadPlan = extraerCiudadPlan(plan);
    const coincideCiudad = ciudadFiltro
      ? normalizarTexto(ciudadPlan) === normalizarTexto(ciudadFiltro)
      : true;

    return coincideNombre && coincideCiudad;
  });

  return (
    <TemplateMainCliente titulo="Planes">
      <section>
        <div className="flex justify-end gap-2">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Nombre
            </label>
            <input
              type="text"
              value={nombreFiltro}
              onChange={(e) => setNombreFiltro(e.target.value)}
              className="w-64 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
              placeholder="Nombre del plan"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Ciudad
            </label>
            <select
              value={ciudadFiltro}
              onChange={(e) => setCiudadFiltro(e.target.value)}
              className="w-64 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
            >
              <option value="">Seleccione una ciudad</option>
              <option value="Cartagena">Cartagena</option>
              <option value="Santa Marta">Santa Marta</option>
              <option value="Bogotá">Bogotá</option>
              <option value="Medellín">Medellín</option>
              <option value="Cali">Cali</option>
              <option value="Barranquilla">Barranquilla</option>
              <option value="Manizales">Manizales</option>
              <option value="Pereira">Pereira</option>
              <option value="Armenia">Armenia</option>
              <option value="Ibagué">Ibagué</option>
              <option value="Neiva">Neiva</option>
              <option value="Villavicencio">Villavicencio</option>
              <option value="Pasto">Pasto</option>
              <option value="Popayán">Popayán</option>
              <option value="Tunja">Tunja</option>
              <option value="Yopal">Yopal</option>
              <option value="Valledupar">Valledupar</option>
              <option value="Riohacha">Riohacha</option>
              <option value="Quibdó">Quibdó</option>
              <option value="Montería">Montería</option>
              <option value="Bucaramanga">Bucaramanga</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-4 border-b items-start">
          {planesFiltrados.map((plan) => (
            <TarjetaPlanes
              key={plan.id}
              planEmpresa={plan}
              setPlanesEmpresa={setPlanesEmpresa}
            />
          ))}
        </div>
      </section>
    </TemplateMainCliente>
  );
};
