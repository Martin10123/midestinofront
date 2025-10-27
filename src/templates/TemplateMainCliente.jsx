import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { PropTypes } from "prop-types";
import { HeaderCliente } from "../components/HeaderCliente";
import { useState } from "react";
import { PresupuestoModal } from "../components/PresupuestoModal";

export const TemplateMainCliente = ({ children, titulo }) => {
  const [openModalPresuento, setOpenModalPresuento] = useState(false);

  const handleOpenModalPresuento = () => {
    setOpenModalPresuento(!openModalPresuento);
  };

  return (
    <main className="w-[90%] grid grid-rows-[auto,1fr,auto] m-auto before:bg-gray-100 before:fixed before:inset-0 before:z-[-1] before:h-full rounded-lg shadow-lg">
      <Navbar />

      <section className="p-4 bg-white">
        <HeaderCliente
          handleOpenModalPresuento={handleOpenModalPresuento}
          titulo={titulo}
        />
        {children}
      </section>

      <Footer />

      {openModalPresuento && (
        <PresupuestoModal handleOpenModalPresuento={handleOpenModalPresuento} />
      )}
    </main>
  );
};

TemplateMainCliente.propTypes = {
  children: PropTypes.node.isRequired,
  titulo: PropTypes.string.isRequired,
};
