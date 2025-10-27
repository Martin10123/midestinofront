import { PropTypes } from "prop-types";

export const TarjetaPlanesAnonimo = ({ plan }) => {
  return (
    <div className="flex justify-center items-center">
      <div className="max-w-[720px] mx-auto">
        <div className="relative flex max-w-[24rem] flex-col overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
          <div className="relative m-0 overflow-hidden text-gray-700 bg-transparent rounded-none shadow-none bg-clip-border">
            <img src={plan.imagen} alt={plan.titulo} />
          </div>
          <div className="p-6">
            <h4 className="block font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
              {plan.titulo}
            </h4>
            <p className="block mt-3 font-sans text-xl antialiased font-normal leading-relaxed text-gray-700">
              {plan.descripcion}
            </p>
            <p className="block mt-2 font-sans text-sm antialiased font-normal leading-relaxed text-gray-700">
              Correo: {plan.correo}
            </p>
            <p className="block mt-2 font-sans text-sm antialiased font-normal leading-relaxed text-gray-700">
              Teléfono: {plan.telefono}
            </p>
            <p className="block mt-2 font-sans text-sm antialiased font-normal leading-relaxed text-gray-700">
              Precio: {plan.precio}
            </p>
            <p className="block mt-2 font-sans text-sm antialiased font-normal leading-relaxed text-gray-700">
              Cantidad disponibles: {plan.cantidadDisponibles}
            </p>
          </div>
          <div className="flex items-center justify-between p-6">
            <div className="flex items-center -space-x-3">
              <img
                alt="natali craig"
                src={plan.imagen}
                className="relative inline-block h-9 w-9 rounded-full border-2 border-white object-cover object-center hover:z-10"
              />
              <img
                alt="Tania Andrew"
                src={plan.imagen}
                className="relative inline-block h-9 w-9 rounded-full border-2 border-white object-cover object-center hover:z-10"
              />
            </div>
            <p className="block font-sans text-base antialiased font-normal leading-relaxed text-inherit">
              {plan.fecha}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

TarjetaPlanesAnonimo.propTypes = {
  plan: PropTypes.shape({
    titulo: PropTypes.string,
    descripcion: PropTypes.string,
    correo: PropTypes.string,
    telefono: PropTypes.string,
    precio: PropTypes.string,
    cantidadDisponibles: PropTypes.number,
    imagen: PropTypes.string,
    fecha: PropTypes.string,
  }),
};
