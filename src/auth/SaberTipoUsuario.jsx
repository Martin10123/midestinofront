import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "./../components/Navbar";

export const SaberTipoUsuario = () => {
  const navigate = useNavigate();

  return (
    <section className="before:fixed before:w-full before:h-screen before:bg-gray-50 before:top-0 before:left-0 before:-z-10">
      <Navbar />

      <section className="grid items-center">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16">
          <div className="bg-white shadow-md border border-gray-200 rounded-lg p-8 md:p-12 mb-8">
            <div className="bg-blue-100 text-blue-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded-md mb-2">
              <svg
                className="w-2.5 h-2.5 me-1.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 14"
              >
                <path d="M11 0H2a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm8.585 1.189a.994.994 0 0 0-.9-.138l-2.965.983a1 1 0 0 0-.685.949v8a1 1 0 0 0 .675.946l2.965 1.02a1.013 1.013 0 0 0 1.032-.242A1 1 0 0 0 20 12V2a1 1 0 0 0-.415-.811Z" />
              </svg>
              Ofertas de Viajes
            </div>
            <h1 className="text-gray-900 text-3xl md:text-5xl font-extrabold mb-2">
              Encuentra los mejores planes para tus vacaciones familiares
            </h1>
            <p className="text-lg font-normal text-gray-500 mb-6">
              Descubre ofertas de viaje y paquetes diseñados para disfrutar al
              máximo en familia. Desde escapadas de fin de semana hasta grandes
              aventuras, encuentra el plan ideal que se ajuste a tu presupuesto
              y crea recuerdos inolvidables con quienes más quieres.
            </p>
            <Link
              to="/"
              className="inline-flex justify-center items-center py-2.5 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300"
            >
              Leer más
              <svg
                className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </Link>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white shadow-md border border-gray-200 rounded-lg p-8 md:p-12">
              <a
                href="#"
                className="bg-green-100 text-green-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded-md mb-2"
              >
                <svg
                  className="w-2.5 h-2.5 me-1.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 18"
                >
                  <path d="M17 11h-2.722L8 17.278a5.512 5.512 0 0 1-.9.722H17a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1ZM6 0H1a1 1 0 0 0-1 1v13.5a3.5 3.5 0 1 0 7 0V1a1 1 0 0 0-1-1ZM3.5 15.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2ZM16.132 4.9 12.6 1.368a1 1 0 0 0-1.414 0L9 3.55v9.9l7.132-7.132a1 1 0 0 0 0-1.418Z" />
                </svg>
                Empresas
              </a>
              <h2 className="text-gray-900 text-3xl font-extrabold mb-2">
                Registrate como empresa
              </h2>
              <p className="text-lg font-normal text-gray-500 mb-4">
                Si eres una empresa y quieres publicar tus ofertas ingresa aquí,
                el administrador de la plataforma se pondrá en contacto contigo.
              </p>
              <div>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  #usuarios
                </span>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  #viajes
                </span>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  #planes
                </span>
              </div>
              <button
                className="w-[50%] py-3 mt-4 px-6 bg-blue-500 hover:bg-blue-700 text-sm text-white font-bold rounded-md transition duration-200"
                onClick={() => navigate("/registro-empresas")}
              >
                Registrarse
              </button>
            </div>
            <div className="bg-white shadow-md border border-gray-200 rounded-lg p-8 md:p-12">
              <a
                href="#"
                className="bg-purple-100 text-purple-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded-md mb-2"
              >
                <svg
                  className="w-2.5 h-2.5 me-1.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 4 1 8l4 4m10-8 4 4-4 4M11 1 9 15"
                  />
                </svg>
                Clientes
              </a>
              <h2 className="text-gray-900 text-3xl font-extrabold mb-2">
                Registrate como usuario
              </h2>
              <p className="text-lg font-normal text-gray-500 mb-4">
                Si eres un usuario y quieres buscar oferta ingresa aquí, podras
                ver las ofertas de las empresas y contactarlas para obtener más
                información sobre sus ofertas.
              </p>
              <div className="">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  #usuarios
                </span>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  #viajes
                </span>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  #planes
                </span>
              </div>
              <button
                className="w-[50%] py-3 mt-4 px-6 bg-blue-500 hover:bg-blue-700 text-sm text-white font-bold rounded-md transition duration-200"
                onClick={() => navigate("/registro-usuarios")}
              >
                Registrarse
              </button>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};
