import { TemplateMainEmpresa } from "./../templates/TemplateMainEmpresa";
import { TarjetaPlanes } from "./../components/TarjetaPlanes";
import { useContext } from "react";
import { PlanesEmpresaContext } from "../context/PlanesEmpresaContext";

export const EmpresaPagina = () => {
  const { planesEmpresa, setPlanesEmpresa } =
    useContext(PlanesEmpresaContext);

  return (
    <TemplateMainEmpresa titulo="Planes disponibles">
      <section className="w-full py-6 m-auto before:bg-gray-100 before:absolute before:inset-0 before:z-[-1] before:h-full bg-white">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
          {planesEmpresa.map((planEmpresa) => (
            <TarjetaPlanes
              key={planEmpresa.id}
              planEmpresa={planEmpresa}
              setPlanesEmpresa={setPlanesEmpresa}
            />
          ))}
        </div>
      </section>
    </TemplateMainEmpresa>
  );
};
