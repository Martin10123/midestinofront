import { useState } from "react";
import toast from "react-hot-toast";
import { urlGeneral } from "../helpers/apiUrls";
import axios from "axios";

export const useTablaAdministrador = ({ empresa, setTodasEmpresas }) => {
  const [empresaAprobar, setEmpresaAprobar] = useState({});
  const [abrirModalAprobar, setAbrirModalAprobar] = useState(false);
  const [validationMessage, setValidationMessage] = useState(
    "Verificando información..."
  );

  const validationMessages = [
    "Validando datos...",
    "Revisando base de datos...",
    "Comprobando documentos...",
    "Comprobando registros...",
  ];

  const onAprobarEmpresa = (fueAceptada, empresaAprobar) => {
    setAbrirModalAprobar(true);
    setEmpresaAprobar(empresaAprobar);
    let messageIndex = 0;

    // Change the validation message every 2 seconds
    const messageInterval = setInterval(() => {
      setValidationMessage(validationMessages[messageIndex]);
      messageIndex = (messageIndex + 1) % validationMessages.length;
    }, 2000);

    // Display modal for 10 seconds before making the API call
    setTimeout(async () => {
      clearInterval(messageInterval);
      setAbrirModalAprobar(false);

      try {
        const response = await axios.put(
          urlGeneral + `/empresa/actualizar/${empresa.idEmpresa}`,
          {
            ...empresa,
            empresaFueAceptada: fueAceptada,
            empresaTuvoRespuesta: true,
          }
        );

        if (response.data.valid) {
          setTodasEmpresas((prevEmpresas) => {
            return prevEmpresas.map((empresa) => {
              if (empresa.idEmpresa === response.data.empresa.idEmpresa) {
                return response.data.empresa;
              }
              return empresa;
            });
          });
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.error(error);
        toast.error("Hubo un error en la aprobación de la empresa.");
      } finally {
        setEmpresaAprobar({});
      }
    }, 10000);
  };

  return {
    onAprobarEmpresa,
    abrirModalAprobar,
    empresaAprobar,
    validationMessage,
  };
};
