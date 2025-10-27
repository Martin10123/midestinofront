import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { formatearAMonedaColombia } from "../helpers/herramientas";
import { Link } from "react-router-dom";
import { usePerfilUsuario } from "../hooks";

export const PerfilUsuario = () => {
  const { handleFileChange, handleIconClick, inputFileRef, usuarioActivo } =
    usePerfilUsuario();

  return (
    <main>
      <Navbar />
      <section className="max-w-[50%] my-8 mx-auto p-8 rounded-2xl shadow-lg">
        <div className="w-full">
          <div className="flex items-center space-x-6 border-b border-gray-200 pb-6 relative">
            <figure className="relative">
              <img
                src={
                  usuarioActivo.fotoPerfil ||
                  "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
                }
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
              />

              <div
                className="absolute bottom-0 right-2 bg-gray-500 p-1 rounded-full cursor-pointer"
                onClick={handleIconClick}
              >
                <svg
                  className="w-6 h-6 text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 18V8a1 1 0 0 1 1-1h1.5l1.707-1.707A1 1 0 0 1 8.914 5h6.172a1 1 0 0 1 .707.293L17.5 7H19a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1Z"
                  />
                  <path
                    stroke="currentColor"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              </div>
              <input
                type="file"
                ref={inputFileRef}
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
              />
            </figure>

            <div className="flex flex-col">
              <h2 className="text-3xl font-semibold text-gray-900">
                {usuarioActivo.nombreCompleto || usuarioActivo.nombre}
              </h2>
              <p className="text-md text-gray-500">
                {usuarioActivo.tipoUsuario}
              </p>
              <p className="text-sm text-gray-400">
                @{usuarioActivo.nombreUsuario || usuarioActivo.sector}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 py-8 px-4 gap-4">
            <div>
              <p className="font-semibold">Email</p>
              <p>{usuarioActivo.email || usuarioActivo.correo}</p>
            </div>
            <div>
              <p className="font-semibold">Teléfono</p>
              <p>{usuarioActivo.numeroTelefono || usuarioActivo.telefono}</p>
            </div>

            <div>
              <p className="font-semibold">Tipo de documento</p>
              <p>{usuarioActivo.tipoDocumento || "NIT"}</p>
            </div>
            <div>
              <p className="font-semibold">Número de documento</p>
              <p>{usuarioActivo.numeroDocumento || usuarioActivo.nit}</p>
            </div>

            <div>
              <p className="font-semibold">
                {usuarioActivo.tipoUsuario === "Cliente"
                  ? "Presupuesto"
                  : "Ganancias de la app"}
              </p>
              <p>
                {formatearAMonedaColombia(
                  usuarioActivo.presupuesto || usuarioActivo.ganancias
                )}{" "}
                pesos
              </p>
            </div>
          </div>

          {usuarioActivo.tipoUsuario === "Cliente" && (
            <div className="grid grid-cols-2 gap-4">
              <Link
                to="/inicio-clientes"
                className="w-full py-3 text-center bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none"
              >
                Comprar plan
              </Link>
              <Link
                to="/planes-comprados-clientes"
                className="w-full py-3 text-center bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none"
              >
                Ver mis planes
              </Link>
            </div>
          )}

          {usuarioActivo.tipoUsuario === "Administrador" && (
            <div className="grid grid-cols-2 gap-4">
              <Link
                to="/inicio-administradores"
                className="w-full py-3 text-center bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none"
              >
                Inicio
              </Link>
              <Link
                to="/inicio-clientes"
                className="w-full py-3 text-center bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none"
              >
                Ver lista de planes
              </Link>
            </div>
          )}

          {usuarioActivo.tipoUsuario === "Empresa" && (
            <div className="grid grid-cols-2 gap-4">
              <Link
                to="/inicio-empresas"
                className="w-full py-3 text-center bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none"
              >
                Mis planes
              </Link>
              <Link
                to="/"
                className="w-full py-3 text-center bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none"
              >
                Pagina principal
              </Link>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
};
