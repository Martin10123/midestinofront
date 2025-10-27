import PropTypes from "prop-types";

export const ListaOpcionesEmpresa = ({ activeTab }) => {
  return (
    <ul className="flex-column space-y space-y-4 text-sm font-medium text-gray-500 md:me-4 mb-4 md:mb-0">
      <li>
        <button
          className={`tabLink inline-flex items-center px-4 py-3 rounded-lg w-full ${
            activeTab === 1
              ? "text-white bg-blue-700"
              : "hover:text-gray-900 bg-gray-50 hover:bg-gray-100"
          }`}
        >
          <svg
            className="w-4 h-4 me-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
          </svg>
          Datos
        </button>
      </li>
      <li>
        <button
          className={`tabLink inline-flex items-center px-4 py-3 rounded-lg w-full ${
            activeTab === 2
              ? "text-white bg-blue-700"
              : "hover:text-gray-900 bg-gray-50 hover:bg-gray-100"
          }`}
        >
          <svg
            className="w-6 h-6 me-2"
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
              d="M18.427 14.768 17.2 13.542a1.733 1.733 0 0 0-2.45 0l-.613.613a1.732 1.732 0 0 1-2.45 0l-1.838-1.84a1.735 1.735 0 0 1 0-2.452l.612-.613a1.735 1.735 0 0 0 0-2.452L9.237 5.572a1.6 1.6 0 0 0-2.45 0c-3.223 3.2-1.702 6.896 1.519 10.117 3.22 3.221 6.914 4.745 10.12 1.535a1.601 1.601 0 0 0 0-2.456Z"
            />
          </svg>
          Contacto
        </button>
      </li>
      <li>
        <button
          className={`tabLink inline-flex items-center px-4 py-3 rounded-lg w-full ${
            activeTab === 3
              ? "text-white bg-blue-700"
              : "hover:text-gray-900 bg-gray-50 hover:bg-gray-100"
          }`}
        >
          <svg
            className="w-6 h-6 me-2"
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
              d="M15 4h3a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h3m0 3h6m-6 7 2 2 4-4m-5-9v4h4V3h-4Z"
            />
          </svg>
          Legalidad
        </button>
      </li>
      <li>
        <button
          className={`tabLink inline-flex items-center px-4 py-3 rounded-lg w-full ${
            activeTab === 4
              ? "text-white bg-blue-700"
              : "hover:text-gray-900 bg-gray-50 hover:bg-gray-100"
          }`}
        >
          <svg
            className="w-6 h-6 me-2"
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
              d="M12 3v7.588a2.5 2.5 0 1 0 2.5 2.5V3m-8 8h3M6 7h2"
            />
          </svg>
          Financiero
        </button>
      </li>
    </ul>
  );
};

ListaOpcionesEmpresa.propTypes = {
  activeTab: PropTypes.number,
};
