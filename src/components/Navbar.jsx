import { Link } from "react-router-dom";
import { logo } from "../images";
import { UsuarioContext } from "../context/UsuarioContext";
import { useContext, useEffect, useState } from "react";

export const Navbar = () => {
  const { isUsuarioActivo, usuarioActivo, cerrarSesion } =
    useContext(UsuarioContext);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`shadow sticky top-0 left-0 w-full z-50 transition-colors duration-500 ${
        isScrolled ? "bg-white" : "bg-transparent"
      }`}
    >
      <nav
        className={`border-gray-200 transition-colors duration-500 ${
          isScrolled ? "bg-white" : "bg-[#ffffff26]"
        }`}
      >
        <div className="flex flex-wrap justify-between items-center mx-auto w-[90%] p-4">
          <Link
            to="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img src={logo} className="h-14" alt="Flowbite Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap">
              My Trip
            </span>
          </Link>
          <div className="flex items-center rtl:space-x-reverse">
            {isUsuarioActivo && (
              <div className="flex items-center justify-center gap-2">
                <button
                  className="hidden lg:inline-block py-2 px-6 bg-blue-500 hover:bg-blue-600 text-sm text-white font-bold rounded-md transition duration-200"
                  onClick={cerrarSesion}
                >
                  Cerrar sesión
                </button>

                <Link
                  to={`/perfil/${
                    usuarioActivo.tipoUsuario !== "Empresa"
                      ? usuarioActivo.idCliente
                      : usuarioActivo.idEmpresa
                  }`}
                  className="hidden lg:inline-block p-2 bg-gray-50 hover:bg-gray-300 text-sm text-blue-500 font-bold rounded-full transition duration-200"
                >
                  <svg
                    className="w-6 h-6 text-gray-800"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 6H5m2 3H5m2 3H5m2 3H5m2 3H5m11-1a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2M7 3h11a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Zm8 7a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"
                    />
                  </svg>
                </Link>
              </div>
            )}

            {!isUsuarioActivo && (
              <div className="flex items-center rtl:space-x-reverse">
                <Link
                  to="/ingresar"
                  className="hidden lg:inline-block lg:ml-auto lg:mr-3 py-2 px-6 bg-gray-50 hover:bg-gray-300 text-sm text-blue-500 font-bold rounded-md transition duration-200"
                >
                  Ingresa
                </Link>
                <Link
                  to="tipo-usuario"
                  className="hidden lg:inline-block py-2 px-6 bg-blue-500 hover:bg-blue-700 text-sm text-white font-bold rounded-md transition duration-200"
                >
                  Registrate
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};
