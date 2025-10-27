import { TablaAdministrador } from "./TablaAdministrador";
import { PropTypes } from "prop-types";

export const TablaEmpresas = ({ todasEmpresas, setTodasEmpresas }) => {
  return (
    <div className="relative mt-6 overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">
              Nombre de la empresa
            </th>
            <th scope="col" className="px-6 py-3">
              Nit
            </th>
            <th scope="col" className="px-6 py-3">
              Correo
            </th>
            <th scope="col" className="px-6 py-3">
              Ciudad
            </th>
            <th scope="col" className="px-6 py-3">
              Fecha fundación
            </th>
            <th scope="col" className="px-6 py-3">
              Fecha registro
            </th>
            <th scope="col" className="px-6 py-3">
              Telefono
            </th>
            <th scope="col" className="px-6 py-3">
              Dirección
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>

        {todasEmpresas.map((empresa) => (
          <TablaAdministrador
            key={empresa.idEmpresa}
            empresa={empresa}
            setTodasEmpresas={setTodasEmpresas}
          />
        ))}
      </table>
    </div>
  );
};

TablaEmpresas.propTypes = {
  todasEmpresas: PropTypes.array.isRequired,
  setTodasEmpresas: PropTypes.func.isRequired,
};
