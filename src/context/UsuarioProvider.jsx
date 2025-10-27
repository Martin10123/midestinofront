import { useEffect, useState } from "react";
import { UsuarioContext } from "./UsuarioContext";
import { PropTypes } from "prop-types";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const UsuarioProvider = ({ children }) => {
  const [usuarioActivo, setUsuarioActivo] = useState({});
  const [isUsuarioActivo, setIsUsuarioActivo] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const usuario = localStorage.getItem("usuarioActivo");

    if (usuario) {
      setUsuarioActivo(JSON.parse(usuario));
      setIsUsuarioActivo(true);
    }
  }, []);

  const cerrarSesion = () => {
    setUsuarioActivo({});
    setIsUsuarioActivo(false);
    localStorage.removeItem("usuarioActivo");
    navigate("/");

    toast.success("Sesión cerrada correctamente");
  };

  return (
    <UsuarioContext.Provider
      value={{
        usuarioActivo,
        setUsuarioActivo,
        isUsuarioActivo,
        setIsUsuarioActivo,
        cerrarSesion,
      }}
    >
      {children}
    </UsuarioContext.Provider>
  );
};

UsuarioProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
