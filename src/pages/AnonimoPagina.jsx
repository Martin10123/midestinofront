import { Link } from "react-router-dom";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { SectionAnonimo } from "../components/SectionAnonimo";
import { TarjetaPlanesAnonimo } from "../components/TarjetaPlanesPromocional";
import { planesPromocionales } from "../helpers/TarjetasPromocionales";
import { useContext } from "react";
import { UsuarioContext } from "../context/UsuarioContext";
import { CaruselDeInformacion } from "../components/CaruselDeInformacion";

export const AnonimoPagina = () => {
  const { usuarioActivo, isUsuarioActivo } = useContext(UsuarioContext);

  const rutas = {
    Cliente: "/inicio-clientes",
    Empresa: "/inicio-empresas",
    Administrador: "/inicio-administradores",
  };

  const enviarA = !isUsuarioActivo
    ? "/inicio-clientes"
    : rutas[usuarioActivo.tipoUsuario] || "/";

  return (
    <main>
      <Navbar />

      <figure className="absolute w-full h-full top-0 -z-10 bg-cover">
        <img
          src="/src/images/fondo1.jpg"
          alt="fondo"
          className="w-full h-full object-cover filter brightness-75"
        />
      </figure>

      <section className="relative flex flex-col items-start justify-center h-screen pl-40">
        <div className="w-[40%] px-8 shadow-xl rounded-lg">
          <h1 className="text-7xl m-0 mb-6 font-extrabold text-white leading-tight">
            Bienvenido a <span className="text-blue-400">My Trip</span>
          </h1>
          <p className="pt-6 text-xl font-medium text-gray-200">
            <span className="text-white">Descubre</span> la forma más fácil de
            planificar tus vacaciones soñadas. Desde destinos exóticos hasta
            escapadas locales, en My Trip te ayudamos a organizar cada detalle
            para que disfrutes de una experiencia inolvidable. ¡Únete y comienza
            a explorar hoy mismo!
          </p>

          <div className="flex space-x-4 mt-8">
            <Link
              to={enviarA}
              className="py-3 px-6 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-200"
            >
              Ver Planes
            </Link>
            <a
              href="#planes"
              id="conocerMasBtn"
              className="py-3 px-6 bg-white text-blue-500 font-semibold rounded-md hover:bg-gray-100 transition duration-200"
            >
              Conocer más
            </a>
          </div>
        </div>
      </section>

      <SectionAnonimo />

      <CaruselDeInformacion />

      <section id="planes" className="px-10 py-40 bg-gray-100">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
          ¡Tipos de planes que puedes encontrar aqui!
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {planesPromocionales.map((plan, index) => (
            <TarjetaPlanesAnonimo key={index} plan={plan} />
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
};
