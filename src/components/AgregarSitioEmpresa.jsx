import { PropTypes } from "prop-types";
import { useAgregarSitioEmpresa } from "./../hooks";

export const AgregarSitioEmpresa = ({
  handleAbrirModalCrearActividad,
  editData,
}) => {
  const { formState, handleSubmit, onInputChange } = useAgregarSitioEmpresa({
    editData,
    handleAbrirModalCrearActividad,
  });

  return (
    <div className="overflow-y-auto overflow-x-hidden fixed bg-[#00000069] top-0 right-0 left-0 z-50 justify-center flex items-center w-full md:inset-0 h-full max-h-full">
      <div className="relative p-4 w-full max-w-2xl h-[95%]">
        <div className="relative h-full overflow-auto bg-white rounded-lg shadow">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
            <h3 className="text-xl font-semibold text-gray-900 ">
              {editData ? "Actualizar" : "Agregar"} actividad
            </h3>
            <button
              type="button"
              onClick={handleAbrirModalCrearActividad}
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
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
            <form
              id="formSitioEmpresa"
              className="form_agregar_sitio"
              onSubmit={handleSubmit}
            >
              <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Imagen del sitio
                </label>
                <input
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  type="file"
                  name="imagen"
                  onChange={onInputChange}
                  disabled={editData}
                />
              </div>
              <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Nombre del sitio
                </label>
                <input
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  type="text"
                  name="nombre"
                  placeholder="Nombre del sitio..."
                  value={formState.nombre}
                  onChange={onInputChange}
                />
              </div>

              <div className="dividir_inputs grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="mb-5">
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Tipo de actividad
                  </label>
                  <select
                    name="tipoSitio"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    value={formState.tipoSitio}
                    onChange={onInputChange}
                  >
                    <option value="Restaurante">Restaurante</option>
                    <option value="Hotel">Hotel</option>
                    <option value="Bar">Bar</option>
                    <option value="Café">Café</option>
                    <option value="Fiesta">Fiesta</option>
                    <option value="Carreras">Carreras</option>
                    <option value="Museo">Museo</option>
                    <option value="Cine">Cine</option>
                    <option value="Teatro">Teatro</option>
                    <option value="Parque">Parque</option>
                    <option value="Playa">Playa</option>
                    <option value="Montaña">Montaña</option>
                    <option value="Río">Río</option>
                    <option value="Lago">Lago</option>
                    <option value="Cascada">Cascada</option>
                    <option value="Bosque">Bosque</option>
                    <option value="Caverna">Caverna</option>
                    <option value="Volcán">Volcán</option>
                    <option value="Isla">Isla</option>
                    <option value="Pueblo">Pueblo</option>
                    <option value="Ciudad">Ciudad</option>
                    <option value="Paisaje">Paisaje</option>
                    <option value="Monumento">Monumento</option>
                    <option value="Iglesia">Iglesia</option>
                    <option value="Catedral">Catedral</option>
                  </select>
                </div>
                <div className="mb-5">
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Dirección
                  </label>
                  <input
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    type="text"
                    name="direccion"
                    placeholder="Dirección..."
                    value={formState.direccion}
                    onChange={onInputChange}
                  />
                </div>
              </div>

              <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Horarios
                </label>
                <input
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  type="text"
                  name="horario"
                  placeholder="10:00 a.m. - 5:00 p.m..."
                  value={formState.horario}
                  onChange={onInputChange}
                />
              </div>

              <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Correo
                </label>
                <input
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  type="email"
                  name="email"
                  placeholder="Correo..."
                  value={formState.email}
                  onChange={onInputChange}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="mb-5">
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Ciudad
                  </label>
                  <select
                    name="pais"
                    id="pais"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    value={formState.pais}
                    onChange={onInputChange}
                  >
                    <option value="">Seleccione un ciudad</option>
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
                <div className="mb-5">
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Método de Pago
                  </label>
                  <select
                    name="metodosPagoAceptados"
                    id="metodosPagoAceptados"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    value={formState.metodosPagoAceptados}
                    onChange={onInputChange}
                  >
                    <option value="">Seleccione un método de pago</option>
                    <option value="tarjeta">Tarjeta</option>
                    <option value="efectivo">Efectivo</option>
                    <option value="transferencia">Transferencia</option>
                    <option value="cualquier forma">Cualquier forma</option>
                  </select>
                </div>
              </div>

              <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Teléfono
                </label>
                <input
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  type="text"
                  name="telefono"
                  placeholder="Teléfono..."
                  value={formState.telefono}
                  onChange={onInputChange}
                />
              </div>

              <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Cantidad de personas disponibles
                </label>
                <input
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  type="number"
                  name="personasDisponibles"
                  placeholder="Cantidad de personas disponibles..."
                  value={formState.personasDisponibles}
                  onChange={onInputChange}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="mb-5">
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Precio
                  </label>
                  <input
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    type="number"
                    name="precio"
                    placeholder="Precio..."
                    value={formState.precio}
                    onChange={onInputChange}
                  />
                </div>
                <div className="mb-5">
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Cantidad
                  </label>
                  <input
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    type="number"
                    name="cantidad"
                    placeholder="Cantidad..."
                    value={formState.cantidad}
                    onChange={onInputChange}
                  />
                </div>
              </div>

              <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Información General
                </label>
                <textarea
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  name="informacionGeneral"
                  placeholder="Información general..."
                  value={formState.informacionGeneral}
                  onChange={onInputChange}
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
              >
                {editData ? "Actualizar" : "Crear"} actividad
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

AgregarSitioEmpresa.propTypes = {
  handleAbrirModalCrearActividad: PropTypes.func.isRequired,
  editData: PropTypes.object,
};
