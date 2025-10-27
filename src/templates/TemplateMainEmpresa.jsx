import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { PropTypes } from "prop-types";
import { HeaderEmpresa } from "../components/HeaderEmpresa";
import { AgregarSitioEmpresa } from "./../components/AgregarSitioEmpresa";
import { useState } from "react";

export const TemplateMainEmpresa = ({ children }) => {
  const [abrirCrearActividad, setAbrirCrearActividad] = useState(false);

  const handleAbrirModalCrearActividad = () => {
    setAbrirCrearActividad(!abrirCrearActividad);
  };

  return (
    <main className="w-[90%] grid grid-rows-[auto,1fr,auto] m-auto before:bg-gray-100 before:fixed before:inset-0 before:z-[-1] before:h-full rounded-lg shadow-lg">
      <Navbar />

      <section className="p-4 bg-white">
        <HeaderEmpresa
          handleAbrirModalCrearActividad={handleAbrirModalCrearActividad}
        />

        {children}
      </section>

      <Footer />

      {abrirCrearActividad && (
        <AgregarSitioEmpresa
          handleAbrirModalCrearActividad={handleAbrirModalCrearActividad}
        />
      )}
    </main>
  );
};

TemplateMainEmpresa.propTypes = {
  children: PropTypes.node.isRequired,
};
