import { Route, Routes } from "react-router-dom";
import { AnonimoPagina } from "./../pages/AnonimoPagina";
import { IniciarSesion } from "./../auth/IniciarSesion";
import { RegistroEmpresa } from "./../auth/RegistroEmpresa";
import { RegistroUsuario } from "./../auth/RegistroUsuario";
import { SaberTipoUsuario } from "./../auth/SaberTipoUsuario";
import { ClientePagina } from "./../pages/ClientePagina";
import { EmpresaPagina } from "./../pages/EmpresaPagina";
import { PlanesSeleccionadosCliente } from "./../pages/PlanesSeleccionadosCliente";
import { PlanesComprados } from "./../pages/PlanesComprados";
import { NotFound404 } from "./../components/NotFound404";
import { UsuarioContext } from "./../context/UsuarioContext";
import { useContext } from "react";
import { Administrador } from "../pages/Administrador";
import { PerfilUsuario } from "../pages/PerfilUsuario";

export const AppRouter = () => {
  const { usuarioActivo, isUsuarioActivo } = useContext(UsuarioContext);

  return (
    <Routes>
      <Route path="/" element={<AnonimoPagina />} />

      {!isUsuarioActivo && (
        <>
          <Route path="/tipo-usuario" element={<SaberTipoUsuario />} />
          <Route path="/registro-usuarios" element={<RegistroUsuario />} />
          <Route path="/registro-empresas" element={<RegistroEmpresa />} />
          <Route path="/ingresar" element={<IniciarSesion />} />
        </>
      )}

      {usuarioActivo.tipoUsuario === "Administrador" && (
        <>
          <Route path="/inicio-administradores" element={<Administrador />} />
        </>
      )}

      {usuarioActivo.tipoUsuario !== "Empresa" && (
        <>
          <Route path="/inicio-clientes" element={<ClientePagina />} />
          <Route
            path="/planes-seleccionados-clientes"
            element={<PlanesSeleccionadosCliente />}
          />
          <Route
            path="/planes-comprados-clientes"
            element={<PlanesComprados />}
          />
        </>
      )}

      <Route path="/perfil/:id" element={<PerfilUsuario />} />

      {usuarioActivo.tipoUsuario === "Empresa" && (
        <>
          <Route path="/inicio-empresas" element={<EmpresaPagina />} />
        </>
      )}

      <Route path="*" element={<NotFound404 />} />
    </Routes>
  );
};
