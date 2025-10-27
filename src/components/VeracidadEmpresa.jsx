import { PropTypes } from "prop-types";

export const VeracidadEmpresa = ({ formState, onInputChange }) => {
  return (
    <section className="mb-6">
      <h2 className="text-xl font-semibold mb-4">
        6. Declaración de Veracidad
      </h2>
      <form className="space-y-5">
        <div className="mb-5">
          <label
            htmlFor="confirmacion"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Confirmación
          </label>
          <p className="text-gray-700 ">
            Declaro que la información suministrada es verídica y actualizada a
            la fecha de hoy.
          </p>
          <div className="flex items-center mt-2">
            <input
              type="checkbox"
              id="confirmacion"
              name="confirmacion"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              onChange={onInputChange}
            />
            <label
              htmlFor="confirmacion"
              className="ml-2 text-sm text-gray-700"
            >
              Acepto esta declaración
            </label>
          </div>
        </div>

        <div className="mb-5">
          <label
            htmlFor="firmaRepresentante"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Firma del representante legal
          </label>
          <input
            type="text"
            id="firmaRepresentante"
            name="firmaRepresentanteLegal"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Nombre del representante legal..."
            value={formState.firmaRepresentanteLegal}
            onChange={onInputChange}
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="fechaFirma"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Fecha de firma
          </label>
          <input
            type="date"
            id="fechaFirma"
            name="fechaFirma"
            placeholder="Fecha de firma"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            value={formState.fechaFirma}
            onChange={onInputChange}
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="contrasena"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Contraseña
          </label>
          <input
            type="password"
            id="contrasena"
            name="contrasena"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Contraseña..."
            value={formState.contrasena}
            onChange={onInputChange}
          />
        </div>
      </form>
    </section>
  );
};

VeracidadEmpresa.propTypes = {
  formState: PropTypes.object.isRequired,
  onInputChange: PropTypes.func.isRequired,
};
