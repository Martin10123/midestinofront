import { PropTypes } from "prop-types";

/**
 * Componente para mostrar la calificación con estrellas
 * @param {number} rating - Calificación del 0 al 5
 * @param {number} totalResenas - Número total de reseñas (opcional)
 * @param {number} size - Tamaño de las estrellas: 'sm', 'md', 'lg' (default: 'md')
 * @param {boolean} clickable - Si las estrellas son clickeables (default: false)
 * @param {function} onStarClick - Función a ejecutar cuando se hace click en una estrella
 */
export const CalificacionEstrellas = ({
  rating = 0,
  totalResenas = null,
  size = "md",
  clickable = false,
  onStarClick = null,
}) => {
  const sizeClasses = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-6 h-6",
  };

  const textSizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };

  const starSize = sizeClasses[size] || sizeClasses.md;
  const textSize = textSizeClasses[size] || textSizeClasses.md;

  return (
    <div className="flex items-center">
      {Array.from({ length: 5 }).map((_, index) => {
        const isFilled = rating > index;
        const valor = index + 1;

        return (
          <svg
            key={index}
            className={`${starSize} ${
              isFilled ? "text-yellow-300" : "text-gray-300"
            } me-1 ${
              clickable
                ? "cursor-pointer hover:scale-110 transition-transform"
                : ""
            }`}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 22 20"
            onClick={() => {
              if (clickable && onStarClick) {
                onStarClick(valor);
              }
            }}
          >
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
          </svg>
        );
      })}
      <p className={`ms-1 ${textSize} font-medium text-gray-500`}>
        {rating ? rating.toFixed(1) : "0.0"}
      </p>
      <p className={`ms-1 ${textSize} font-medium text-gray-500`}>de</p>
      <p className={`ms-1 ${textSize} font-medium text-gray-500`}>5</p>
      {totalResenas !== null && (
        <p className={`ms-1 ${textSize} font-medium text-gray-400`}>
          ({totalResenas} {totalResenas === 1 ? "reseña" : "reseñas"})
        </p>
      )}
    </div>
  );
};

CalificacionEstrellas.propTypes = {
  rating: PropTypes.number,
  totalResenas: PropTypes.number,
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  clickable: PropTypes.bool,
  onStarClick: PropTypes.func,
};
