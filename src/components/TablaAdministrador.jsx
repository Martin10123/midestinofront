import { PropTypes } from "prop-types";
import { ModalAprobarEmpresa } from "./ModalAprobarEmpresa";
import { useTablaAdministrador } from "../hooks";

export const TablaAdministrador = ({ empresa, setTodasEmpresas }) => {
  const {
    abrirModalAprobar,
    empresaAprobar,
    onAprobarEmpresa,
    validationMessage,
  } = useTablaAdministrador({ empresa, setTodasEmpresas });

  return (
    <tbody>
      <tr className="bg-white border-b hover:bg-gray-50">
        <th
          scope="row"
          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
        >
          {empresa.nombre}
        </th>
        <td className="px-6 py-4">{empresa.nit}</td>
        <td className="px-6 py-4">{empresa.correo}</td>
        <td className="px-6 py-4">{empresa.ciudad}</td>
        <td className="px-6 py-4">{empresa.fechaFundacion}</td>
        <td className="px-6 py-4">{empresa.fechaRegistro}</td>
        <td className="px-6 py-4">{empresa.telefono}</td>
        <td className="px-6 py-4">{empresa.direccion}</td>
        <td className="h-full px-6 py-4">
          {!empresa.empresaTuvoRespuesta ? (
            <div className="flex gap-4">
              <button
                className="font-medium text-blue-600 hover:underline"
                onClick={() => onAprobarEmpresa(true, empresa)}
              >
                Aprobar
              </button>
              <button
                className="font-medium text-blue-600 whitespace-nowrap hover:underline"
                onClick={() => onAprobarEmpresa(false, empresa)}
              >
                No Aprobar
              </button>
            </div>
          ) : (
            <p
              className={`${
                empresa.empresaFueAceptada ? "text-green-500" : "text-red-500"
              }`}
            >
              {empresa.empresaFueAceptada ? "Aprobada" : "No Aprobada"}
            </p>
          )}
        </td>
        <td className="flex absolute right-0 items-center px-6 py-4">
          {abrirModalAprobar && (
            <ModalAprobarEmpresa
              empresaSeleccionada={empresaAprobar}
              validationMessage={validationMessage}
            />
          )}
        </td>
      </tr>
    </tbody>
  );
};

TablaAdministrador.propTypes = {
  empresa: PropTypes.object.isRequired,
  setTodasEmpresas: PropTypes.func.isRequired,
};
