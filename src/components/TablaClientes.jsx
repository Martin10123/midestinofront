import { PropTypes } from "prop-types";

export const TablaClientes = ({ listaCliente }) => {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">
              Nombre Completo
            </th>
            <th scope="col" className="px-6 py-3">
              Tipo Documento
            </th>
            <th scope="col" className="px-6 py-3">
              Número Documento
            </th>
            <th scope="col" className="px-6 py-3">
              Teléfono
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
          </tr>
        </thead>
        <tbody>
          {listaCliente.map((cliente) => (
            <tr key={cliente.idCliente} className="bg-white border-b">
              <td className="px-6 py-4">{cliente.nombreCompleto}</td>
              <td className="px-6 py-4">{cliente.tipoDocumento}</td>
              <td className="px-6 py-4">{cliente.numeroDocumento}</td>
              <td className="px-6 py-4">{cliente.numeroTelefono}</td>
              <td className="px-6 py-4">{cliente.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

TablaClientes.propTypes = {
  listaCliente: PropTypes.array.isRequired,
};
