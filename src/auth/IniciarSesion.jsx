import { Link } from "react-router-dom";
import { useIniciarSesion } from "../hooks";

export const IniciarSesion = () => {
  const { formState, onIniciarSesion, onInputChange } = useIniciarSesion();

  return (
    <>
      <div className="pb-5 pt-5 pl-16 text-blue-500 hover:text-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
        <Link to="/">Página principal</Link>
      </div>

      <section className="w-full h-screen p-4 grid grid-cols-2 items-center">
        <form
          className="w-[27rem] m-auto shadow-xl rounded-md p-4"
          onSubmit={onIniciarSesion}
        >
          <h2 className="text-4xl text-center font-semibold text-gray-900 mb-5">
            Iniciar sesión
          </h2>

          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Tipo de usuario
            </label>
            <select
              id="tipoUsuario"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              name="tipoUsuario"
              value={formState.tipoUsuario}
              onChange={onInputChange}
            >
              <option value="" disabled>
                Selecciona
              </option>
              <option value="Administrador">Administrador</option>
              <option value="Empresa">Empresa</option>
              <option value="Cliente">Cliente</option>
            </select>
          </div>

          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Correo
            </label>
            <input
              type="email"
              id="email"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="luis@gmail.com..."
              name="correo"
              value={formState.correo}
              onChange={onInputChange}
            />
          </div>

          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              placeholder="contraseña..."
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              name="contrasena"
              value={formState.contrasena}
              onChange={onInputChange}
            />
          </div>

          <div className="flex justify-end mb-5">
            <label className="ms-2 text-sm font-medium text-gray-900">
              Aún no tienes cuenta?{" "}
              <Link
                to="/tipo-usuario"
                className="text-blue-600 hover:underline"
              >
                Registrate
              </Link>
            </label>
          </div>

          <button
            type="submit"
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Iniciar sesión
          </button>
        </form>

        <figure className="">
          <img
            className="w-[90%] object-cover"
            src="/src/images/iniciarSesion.svg"
            alt="images iniciarSesion"
          />
        </figure>
      </section>
    </>
  );
};
