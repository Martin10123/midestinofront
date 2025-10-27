import { PropTypes } from "prop-types";

export const LegabilidadEmpresa = ({ formState, onInputChange }) => {
  return (
    <section className="mb-6">
      <h2 className="text-xl font-semibold mb-4">
        3. Detalles de Registro Legal
      </h2>
      <form>
        <div className="mb-5">
          <label
            htmlFor="registroMercantil"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Número de registro mercantil
          </label>
          <input
            type="text"
            id="registroMercantil"
            name="numeroRegistroMercantil"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Número de registro mercantil..."
            value={formState.numeroRegistroMercantil}
            onChange={onInputChange}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="fechaRegistro"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Fecha de Registro
          </label>
          <input
            type="date"
            id="fechaRegistro"
            name="fechaRegistro"
            placeholder="Fecha de registro..."
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            value={formState.fechaRegistro}
            onChange={onInputChange}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="entidadRegistro"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Entidad de Registro
          </label>
          <input
            type="text"
            id="entidadRegistro"
            name="entidadRegistro"
            placeholder="Entidad de registro..."
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            value={formState.entidadRegistro}
            onChange={onInputChange}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="tipoSociedad"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Tipo de Sociedad
          </label>
          <input
            type="text"
            id="tipoSociedad"
            name="tipoSociedad"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Ej.: S.A.S., S.A., SRL..."
            value={formState.tipoSociedad}
            onChange={onInputChange}
          />
        </div>
      </form>
    </section>
  );
};

LegabilidadEmpresa.propTypes = {
  formState: PropTypes.object.isRequired,
  onInputChange: PropTypes.func.isRequired,
};
