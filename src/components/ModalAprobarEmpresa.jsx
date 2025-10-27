import { PropTypes } from "prop-types";

export const ModalAprobarEmpresa = ({
  empresaSeleccionada,
  validationMessage,
}) => {
  return (
    <div className="overflow-y-auto overflow-x-hidden fixed bg-[#00000069] top-0 right-0 left-0 z-50 justify-center flex items-center w-full md:inset-0 h-full max-h-full">
      <div className="relative p-4 w-full max-w-3xl max-h-full">
        <div className="relative bg-white rounded-lg shadow">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
            <h3 className="text-xl font-semibold text-gray-900">
              Información de la empresa
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
              data-modal-hide="formSitioEmpresaModal"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Cerrar modal</span>
            </button>
          </div>
          <div className="p-4 md:p-5 space-y-4">
            <h2 className="text-3xl text-center pb-4">
              {empresaSeleccionada.nombre}
            </h2>

            <div className="grid gap-4 grid-cols-2">
              <p className="text-base">
                <strong>NIT: </strong>
                {empresaSeleccionada.nit}
              </p>

              <p className="text-base">
                <strong>Correo: </strong>
                {empresaSeleccionada.correo}
              </p>

              <p className="text-base">
                <strong>Ciudad: </strong>
                {empresaSeleccionada.ciudad}
              </p>
              <p className="text-base">
                <strong>Fecha de fundación: </strong>
                {empresaSeleccionada.fechaFundacion}
              </p>

              <p className="text-base">
                <strong>Fecha de registro: </strong>
                {empresaSeleccionada.fechaRegistro}
              </p>

              <p className="text-base">
                <strong>Teléfono: </strong>
                {empresaSeleccionada.telefono}
              </p>
              <p className="text-base">
                <strong>Propietario principal </strong>
                {empresaSeleccionada.nombrePropietarioPrincipal}
              </p>

              <p className="text-base">
                <strong>Representante legal </strong>
                {empresaSeleccionada.nombreRepresentanteLegal}
              </p>

              <p className="text-base">
                <strong>Notaria de registro </strong>
                {empresaSeleccionada.notariaRegistro}
              </p>
              <p className="text-base">
                <strong>Dirección: </strong>
                {empresaSeleccionada.direccion}
              </p>

              <p className="text-base">
                <strong>Entidad registro: </strong>
                {empresaSeleccionada.entidadRegistro}
              </p>

              <p className="text-base">
                <strong>Fecha de firma: </strong>
                {empresaSeleccionada.fechaFirma}
              </p>
            </div>
          </div>

          <div className="flex justify-center items-center space-x-1 text-sm text-gray-700">
            <svg
              fill="none"
              className="w-20 h-20 animate-spin"
              viewBox="0 0 32 32"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clipRule="evenodd"
                d="M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z"
                fill="currentColor"
                fillRule="evenodd"
              />
            </svg>

            <div>
              <p>{validationMessage}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ModalAprobarEmpresa.propTypes = {
  empresaSeleccionada: PropTypes.object.isRequired,
  validationMessage: PropTypes.string.isRequired,
};
