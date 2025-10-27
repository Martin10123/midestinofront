import { ListaOpcionesEmpresa } from "../components/ListaOpcionesEmpresa";
import { DatosEmpresa } from "./../components/DatosEmpresa";
import { ContactoEmpresa } from "./../components/ContactoEmpresa";
import { LegabilidadEmpresa } from "./../components/LegabilidadEmpresa";
import { VeracidadEmpresa } from "./../components/VeracidadEmpresa";
import { Link } from "react-router-dom";
import { useRegistroEmpresa } from "../hooks";

export const RegistroEmpresa = () => {
  const {
    formState,
    activeTab,
    handleBack,
    handleNext,
    onGuardarEmpresa,
    onInputChange,
  } = useRegistroEmpresa();

  const tabContents = {
    1: <DatosEmpresa formState={formState} onInputChange={onInputChange} />,
    2: <ContactoEmpresa formState={formState} onInputChange={onInputChange} />,
    3: (
      <LegabilidadEmpresa formState={formState} onInputChange={onInputChange} />
    ),
    4: <VeracidadEmpresa formState={formState} onInputChange={onInputChange} />,
  };

  return (
    <section className="w-[80%] m-auto p-4">
      <div className="flex flex-col items-center justify-between p-4 bg-white rounded-lg shadow-md mb-6">
        <h2 className="text-4xl font-semibold text-gray-900 mb-5">
          Registro especial para empresas
        </h2>
        <p className="w-[60%] text-gray-500 text-sm font-medium mb-4">
          Bienvenido al portal de registro de empresas de nuestra agencia. Aquí
          podrás ingresar y gestionar toda la información relevante de tu
          empresa, incluyendo datos generales, contacto, legalidad,
          propietarios, y documentación. Este proceso asegura que nuestra
          plataforma cuente con toda la información necesaria para brindarte los
          mejores servicios personalizados.
        </p>

        <Link
          to="/"
          className="text-blue-500 hover:underline border-2 border-blue-5 px-4 py-2 rounded-lg text-sm font-medium"
        >
          Pagina principal
        </Link>
      </div>

      <div className="flex h-full">
        <ListaOpcionesEmpresa activeTab={activeTab} />
        <div className="p-6 bg-gray-50 text-medium text-gray-500 rounded-lg w-full">
          <div className="tabContent w-full rounded-lg">
            {tabContents[activeTab]}
          </div>

          <div className="flex justify-end gap-4 mt-4">
            <button
              onClick={handleBack}
              disabled={activeTab === 1}
              className={`${
                activeTab === 1 ? "opacity-50 cursor-not-allowed" : ""
              } text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center`}
            >
              Volver
            </button>

            <button
              onClick={handleNext}
              disabled={activeTab === 4}
              className={`${
                activeTab === 4 ? "opacity-50 cursor-not-allowed" : ""
              } text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center`}
            >
              Siguiente
            </button>

            <button
              id="saveButton"
              className={`${
                activeTab === 4 ? "" : "hidden"
              } text-white bg-blue-600 hover:bg-blue-5 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center`}
              onClick={onGuardarEmpresa}
            >
              Guardar
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
