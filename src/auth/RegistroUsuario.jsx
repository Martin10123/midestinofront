import { Link } from "react-router-dom";
import { useRegistroUsuario } from "../hooks/useRegistroUsuario";

export const RegistroUsuario = () => {
  const {
    estaCargando,
    formErrors,
    formState,
    handleSubmit,
    onInputChange,
    responseMessage,
  } = useRegistroUsuario();

  return (
    <>
      <div className="pb-5 pt-5 pl-16 text-blue-500 hover:text-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
        <Link to="/">Página principal</Link>
      </div>

      <section className="w-full h-screen p-4 grid grid-cols-2 items-center">
        <form
          className="w-[40rem] m-auto shadow-xl rounded-md p-4"
          onSubmit={handleSubmit}
        >
          <h2 className="text-4xl text-center font-semibold text-gray-900 mb-5">
            Registro de Usuarios
          </h2>

          {responseMessage && (
            <div className="mb-5 text-center text-red-600">
              {responseMessage}
            </div>
          )}

          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Nombre completo
            </label>
            <input
              type="text"
              name="nombreCompleto"
              value={formState.nombreCompleto}
              onChange={onInputChange}
              className={`shadow-sm bg-gray-50 border ${
                formErrors.nombreCompleto ? "border-red-500" : "border-gray-300"
              } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
              placeholder="Nombre completo..."
            />
            {formErrors.nombreCompleto && (
              <span className="text-red-500 text-sm">
                {formErrors.nombreCompleto}
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4 mb-5">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Tipo de documento
              </label>
              <select
                name="tipoDocumento"
                value={formState.tipoDocumento}
                onChange={onInputChange}
                className={`shadow-sm bg-gray-50 border ${
                  formErrors.tipoDocumento
                    ? "border-red-500"
                    : "border-gray-300"
                } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
              >
                <option value="" disabled>
                  Selecciona un tipo de documento
                </option>
                <option value="Cedula">Cédula</option>
                <option value="Cedula extranjera">Cédula extranjera</option>
                <option value="DNI">DNI</option>
                <option value="Pasaporte">Pasaporte</option>
                <option value="RUC">RUC</option>
              </select>
              {formErrors.tipoDocumento && (
                <span className="text-red-500 text-sm">
                  {formErrors.tipoDocumento}
                </span>
              )}
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Número de documento
              </label>
              <input
                type="number"
                name="numeroDocumento"
                value={formState.numeroDocumento}
                onChange={onInputChange}
                className={`shadow-sm bg-gray-50 border ${
                  formErrors.numeroDocumento
                    ? "border-red-500"
                    : "border-gray-300"
                } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
                placeholder="Número de documento..."
              />
              {formErrors.numeroDocumento && (
                <span className="text-red-500 text-sm">
                  {formErrors.numeroDocumento}
                </span>
              )}
            </div>
          </div>

          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Número de teléfono
            </label>
            <input
              type="tel"
              name="numeroTelefono"
              value={formState.numeroTelefono}
              onChange={onInputChange}
              className={`shadow-sm bg-gray-50 border ${
                formErrors.numeroTelefono ? "border-red-500" : "border-gray-300"
              } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
              placeholder="Número de teléfono..."
            />
            {formErrors.numeroTelefono && (
              <span className="text-red-500 text-sm">
                {formErrors.numeroTelefono}
              </span>
            )}
          </div>

          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formState.email}
              onChange={onInputChange}
              className={`shadow-sm bg-gray-50 border ${
                formErrors.email ? "border-red-500" : "border-gray-300"
              } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
              placeholder="tu_email@gmail.com"
            />
            {formErrors.email && (
              <span className="text-red-500 text-sm">{formErrors.email}</span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4 mb-5">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Nombre de usuario
              </label>
              <input
                type="text"
                name="nombreUsuario"
                value={formState.nombreUsuario}
                onChange={onInputChange}
                className={`shadow-sm bg-gray-50 border ${
                  formErrors.nombreUsuario
                    ? "border-red-500"
                    : "border-gray-300"
                } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
                placeholder="Nombre de usuario..."
              />
              {formErrors.nombreUsuario && (
                <span className="text-red-500 text-sm">
                  {formErrors.nombreUsuario}
                </span>
              )}
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Contraseña
              </label>
              <input
                type="password"
                name="contrasena"
                value={formState.contrasena}
                onChange={onInputChange}
                className={`shadow-sm bg-gray-50 border ${
                  formErrors.contrasena ? "border-red-500" : "border-gray-300"
                } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
                placeholder="Contraseña..."
              />
              {formErrors.contrasena && (
                <span className="text-red-500 text-sm">
                  {formErrors.contrasena}
                </span>
              )}
            </div>
          </div>

          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Presupuesto
            </label>
            <input
              type="number"
              name="presupuesto"
              value={formState.presupuesto}
              onChange={onInputChange}
              className={`shadow-sm bg-gray-50 border ${
                formErrors.presupuesto ? "border-red-500" : "border-gray-300"
              } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
              placeholder="Presupuesto..."
            />
            {formErrors.presupuesto && (
              <span className="text-red-500 text-sm">
                {formErrors.presupuesto}
              </span>
            )}
          </div>

          <div className="flex justify-end mb-5">
            <label className="ms-2 text-sm font-medium text-gray-900">
              ¿Ya tienes cuenta?{" "}
              <Link to="/ingresar" className="text-blue-600 hover:underline">
                Inicia sesión
              </Link>
            </label>
          </div>

          <button
            type="submit"
            disabled={estaCargando}
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            {estaCargando ? "Registrando..." : "Registrarse"}
          </button>
        </form>

        <figure>
          <img
            className="w-[90%] object-cover"
            src="/src/images/iniciarSesion.svg"
            alt="Imagen de registro de usuarios"
          />
        </figure>
      </section>
    </>
  );
};
