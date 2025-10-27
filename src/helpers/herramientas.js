export const formatearAMonedaColombia = (monto) => {
  const montoFormateado = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
  }).format(monto);

  return isNaN(monto) ? "$ 0" : montoFormateado;
};
