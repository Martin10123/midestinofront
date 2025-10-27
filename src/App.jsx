import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./routes/AppRouter";
import { UsuarioProvider } from "./context/UsuarioProvider";
import { PlanesEmpresaProvider } from "./context/PlanesEmpresaProvider";

function App() {
  return (
    <>
      <BrowserRouter>
        <UsuarioProvider>
          <PlanesEmpresaProvider>
            <AppRouter />
          </PlanesEmpresaProvider>
        </UsuarioProvider>
      </BrowserRouter>

      <Toaster />
    </>
  );
}

export default App;
