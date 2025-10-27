import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { PropTypes } from "prop-types";

export const TemplateMainAdministrador = ({ children }) => {
  return (
    <main className="w-[90%] grid grid-rows-[auto,1fr,auto] m-auto before:bg-gray-100 before:fixed before:inset-0 before:z-[-1] before:h-full rounded-lg shadow-lg">
      <Navbar />

      <section className="p-4 bg-white">{children}</section>

      <Footer />
    </main>
  );
};

TemplateMainAdministrador.propTypes = {
  children: PropTypes.node.isRequired,
};
