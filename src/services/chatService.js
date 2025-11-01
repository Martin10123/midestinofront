import axios from "axios";
import { urlGeneral } from "../helpers/apiUrls";

export const chatService = {
  async generarRespuesta(payload) {
    const endpoint = `${urlGeneral}/chat/itinerario`;

    const sanitizedPayload = Object.fromEntries(
      Object.entries(payload).filter(([, value]) => value !== undefined)
    );

    try {
      const response = await axios.post(endpoint, sanitizedPayload, {
        headers: {
          "Content-Type": "application/json",
        },
        validateStatus: () => true,
      });

      return {
        ...response.data,
        status: response.status,
      };
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data) {
        return {
          ...error.response.data,
          status: error.response.status,
        };
      }

      throw error;
    }
  },
};
