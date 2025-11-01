import { useContext, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { UsuarioContext } from "../context/UsuarioContext";
import { chatService } from "../services/chatService";
import { formatearAMonedaColombia } from "../helpers/herramientas";
import ReactMarkdown from "react-markdown";

const DEFAULT_SUGGESTIONS = [
  "Quiero un itinerario para Cartagena",
  "¿Qué planes hay para familias?",
  "Necesito ideas con presupuesto de $500000",
  "Recomiéndame playas cerca",
];

const createInitialMessages = () => [
  {
    text: "¡Hola! 👋 Soy tu asistente virtual de My Trip. ¿En qué puedo ayudarte hoy?",
    sender: "bot",
    timestamp: new Date(),
    suggestions: DEFAULT_SUGGESTIONS,
  },
];

const CITY_KEYWORDS = [
  { name: "Cartagena", variants: ["cartagena", "cartagena de indias"] },
  { name: "Barranquilla", variants: ["barranquilla"] },
  { name: "Santa Marta", variants: ["santa marta", "santamarta", "taganga"] },
  { name: "Bogotá", variants: ["bogota", "bogotá"] },
  { name: "Medellín", variants: ["medellin", "medellín"] },
  { name: "San Andrés", variants: ["san andres", "san andrés"] },
  { name: "Cali", variants: ["cali"] },
];

const INTEREST_KEYWORDS = {
  playa: ["playa", "playas", "mar", "isla", "islas", "arena", "sol", "snorkel", "buceo"],
  historia: ["historia", "histórico", "historico", "muralla", "castillo", "fortaleza", "museo"],
  gastronomia: [
    "gastronomia",
    "gastronomía",
    "comida",
    "restaurante",
    "restaurantes",
    "cenar",
    "cena",
    "almuerzo",
    "degustación",
    "degustacion",
  ],
  aventura: [
    "aventura",
    "adrenalina",
    "extremo",
    "kayak",
    "excursion",
    "excursión",
    "tour",
    "deportes",
    "senderismo",
  ],
  naturaleza: ["naturaleza", "ecologico", "ecológico", "parque", "manglar", "reserva", "flora", "fauna"],
  cultura: ["cultura", "arte", "musica", "música", "festival", "teatro"],
  relax: ["relax", "relajación", "relajacion", "spa", "descanso", "bienestar", "romantico", "romántico"],
  familia: ["familia", "niños", "ninos", "kids"],
  compras: ["compras", "shopping", "tiendas", "mercado", "artesanias", "artesanías", "souvenirs"],
  nightlife: ["fiesta", "rumba", "bar", "bares", "nocturna", "discoteca", "nightlife"],
};

const extractBudget = (message) => {
  const budgetRegex = /(?:\$|cop|pesos|presupuesto|costo|precio)[^\d]*(\d[\d.,\s]*)/i;
  const match = message.match(budgetRegex);
  if (!match) return undefined;

  const numeric = match[1].replace(/[^\d]/g, "");
  if (!numeric) return undefined;

  const value = Number(numeric);
  if (Number.isNaN(value) || value <= 0) return undefined;

  return value;
};

const extractDuration = (message) => {
  const durationRegex = /(\d{1,2})\s*(?:dias|días|day|days)/i;
  const match = message.match(durationRegex);
  if (!match) return undefined;
  const value = Number.parseInt(match[1], 10);
  return Number.isNaN(value) ? undefined : value;
};

const extractPersons = (message) => {
  const personsRegex = /(\d{1,2})\s*(?:personas|personas|people|personas?)/i;
  const match = message.match(personsRegex);
  if (!match) return undefined;
  const value = Number.parseInt(match[1], 10);
  return Number.isNaN(value) ? undefined : value;
};

const extractCity = (message) => {
  const lower = message.toLowerCase();
  const cityMatch = CITY_KEYWORDS.find((city) =>
    city.variants.some((variant) => lower.includes(variant))
  );
  return cityMatch ? cityMatch.name : undefined;
};

const extractInterests = (message) => {
  const lower = message.toLowerCase();
  const matches = new Set();

  Object.entries(INTEREST_KEYWORDS).forEach(([interest, keywords]) => {
    if (keywords.some((keyword) => lower.includes(keyword))) {
      matches.add(interest);
    }
  });

  return matches.size ? Array.from(matches) : undefined;
};

const markdownComponents = {
  p: ({ children }) => (
    <p className="text-sm leading-relaxed text-gray-700 mb-2 last:mb-0">{children}</p>
  ),
  strong: ({ children }) => <strong className="text-gray-900">{children}</strong>,
  em: ({ children }) => <em className="text-gray-700">{children}</em>,
  ul: ({ children }) => (
    <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 mb-2 last:mb-0">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal list-inside space-y-1 text-sm text-gray-700 mb-2 last:mb-0">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="leading-relaxed">{children}</li>,
  h1: ({ children }) => (
    <h2 className="text-base font-semibold text-blue-700 mb-2 mt-3 first:mt-0">{children}</h2>
  ),
  h2: ({ children }) => (
    <h3 className="text-sm font-semibold text-blue-700 mb-2 mt-3 first:mt-0 uppercase tracking-wide">
      {children}
    </h3>
  ),
  h3: ({ children }) => (
    <h4 className="text-sm font-semibold text-blue-700 mb-2 mt-3 first:mt-0">{children}</h4>
  ),
  br: () => <br className="my-1" />,
};

export const Chatbot = () => {
  const usuarioContext = useContext(UsuarioContext);
  const usuarioActivo = usuarioContext?.usuarioActivo || {};
  const isCliente = usuarioActivo?.tipoUsuario === "Cliente";
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(() => createInitialMessages());
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!isCliente) {
      setIsOpen(false);
      setMessages(createInitialMessages());
      setInputMessage("");
    }
  }, [isCliente]);

  if (!isCliente) {
    return null;
  }

  const buildChatPayload = (userMessage) => {
    const payload = {
      mensajeUsuario: userMessage,
    };

    if (usuarioActivo?.idCliente) {
      payload.clienteId = usuarioActivo.idCliente;
    }

    const presupuesto = extractBudget(userMessage);
    if (presupuesto !== undefined) {
      payload.presupuestoMaximo = presupuesto;
    }

    const duracion = extractDuration(userMessage);
    if (duracion !== undefined) {
      payload.duracionDias = duracion;
    }

    const personas = extractPersons(userMessage);
    if (personas !== undefined) {
      payload.numeroPersonas = personas;
    }

    const intereses = extractInterests(userMessage);
    if (intereses !== undefined) {
      payload.intereses = intereses;
    }

    const ciudadDestino = extractCity(userMessage);
    if (ciudadDestino !== undefined) {
      payload.ciudadDestino = ciudadDestino;
    }

    return payload;
  };

  const getBotResponse = async (userMessage) => {
    try {
      setIsLoading(true);

      const payload = buildChatPayload(userMessage);
      const response = await chatService.generarRespuesta(payload);

      if (!response.valid) {
        toast.error(response.message || "No fue posible generar una respuesta");
      } else if (response.message) {
        toast.success(response.message, { duration: 2500 });
      }

      return {
        text:
          response.respuesta ||
          response.message ||
          "No pude generar el itinerario en este momento. Intenta nuevamente más tarde.",
        planesSugeridos: response.planesSugeridos || [],
        isError: !response.valid,
      };
    } catch (error) {
      console.error("Error al obtener respuesta del chatbot:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Error al comunicarse con el asistente";
      toast.error(errorMessage);
      return {
        text: "Lo siento, hubo un problema al procesar tu mensaje. Intenta de nuevo más tarde.",
        planesSugeridos: [],
        isError: true,
      };
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async (message = null) => {
    const textToSend = message || inputMessage.trim();
    if (!textToSend || isLoading) return;

    const userMessage = {
      text: textToSend,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");

    const loadingMessageId = Date.now();
    const loadingMessage = {
      id: loadingMessageId,
      text: "Escribiendo...",
      sender: "bot",
      timestamp: new Date(),
      isLoading: true,
    };
    setMessages((prev) => [...prev, loadingMessage]);

    try {
      const response = await getBotResponse(textToSend);

      setMessages((prev) => {
        const filtered = prev.filter((msg) => msg.id !== loadingMessageId);
        return [
          ...filtered,
          {
            text: response.text,
            sender: "bot",
            timestamp: new Date(),
            planesSugeridos: response.planesSugeridos,
            isError: response.isError,
          },
        ];
      });
    } catch {
      setMessages((prev) => prev.filter((msg) => msg.id !== loadingMessageId));
    }
  };

  const handleSuggestionClick = (suggestion) => {
    handleSendMessage(suggestion);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center"
        aria-label="Abrir chatbot"
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
        )}
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 z-40 w-96 h-[600px] bg-white rounded-lg shadow-2xl flex flex-col border border-gray-200">
          <div className="bg-blue-600 text-white p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Asistente My Trip</h3>
                <p className="text-xs text-blue-100">En línea</p>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-2 ${
                    msg.sender === "user"
                      ? "bg-blue-600 text-white rounded-br-none"
                      : `bg-white text-gray-800 rounded-bl-none shadow-sm border ${
                          msg.isError ? "border-red-300" : "border-gray-200"
                        }`
                  }`}
                >
                  {msg.isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        />
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.4s" }}
                        />
                      </div>
                      <p className="whitespace-pre-line text-sm italic text-gray-500">{msg.text}</p>
                    </div>
                  ) : (
                    <>
                      {msg.sender === "bot" ? (
                        <ReactMarkdown
                          className="space-y-2"
                          components={markdownComponents}
                        >
                          {msg.text}
                        </ReactMarkdown>
                      ) : (
                        <p className="whitespace-pre-line text-sm">{msg.text}</p>
                      )}

                      {msg.suggestions && msg.sender === "bot" && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {msg.suggestions.map((suggestion, idx) => (
                            <button
                              key={idx}
                              onClick={() => handleSuggestionClick(suggestion)}
                              className="text-xs bg-blue-50 hover:bg-blue-100 text-blue-700 px-3 py-1 rounded-full transition-colors"
                            >
                              {suggestion}
                            </button>
                          ))}
                        </div>
                      )}

                      {msg.planesSugeridos && msg.planesSugeridos.length > 0 && (
                        <div className="mt-3 space-y-3">
                          <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                            Planes sugeridos
                          </p>
                          <div className="space-y-3">
                            {msg.planesSugeridos.map((plan) => (
                              <div
                                key={plan.id}
                                className="border border-blue-100 bg-blue-50/60 rounded-md p-3 text-xs text-left space-y-2"
                              >
                                <p className="text-sm font-semibold text-blue-800">{plan.nombrePlan}</p>
                                <div className="space-y-1 text-gray-700">
                                  {plan.tipoSitio && (
                                    <p>
                                      <span className="font-medium">Tipo:</span> {plan.tipoSitio}
                                    </p>
                                  )}
                                  {plan.ciudad && (
                                    <p>
                                      <span className="font-medium">Ciudad:</span> {plan.ciudad}
                                    </p>
                                  )}
                                  {plan.precio !== null && plan.precio !== undefined && (
                                    <p>
                                      <span className="font-medium">Precio:</span> {formatearAMonedaColombia(plan.precio)}
                                    </p>
                                  )}
                                  {plan.horario && (
                                    <p>
                                      <span className="font-medium">Horario:</span> {plan.horario}
                                    </p>
                                  )}
                                  {plan.valoracionPromedio !== null && plan.valoracionPromedio !== undefined && (
                                    <p>
                                      <span className="font-medium">Valoración:</span>{" "}
                                      {Number(plan.valoracionPromedio).toFixed(1)} / 5
                                    </p>
                                  )}
                                  {plan.informacionGeneral && (
                                    <p className="text-[11px] text-gray-600 line-clamp-3">
                                      {plan.informacionGeneral}
                                    </p>
                                  )}
                                  {plan.comentariosDestacados && plan.comentariosDestacados.length > 0 && (
                                    <div className="pt-1">
                                      <p className="font-medium">Comentarios:</p>
                                      <ul className="list-disc list-inside space-y-1 text-[11px] text-gray-600">
                                        {plan.comentariosDestacados.map((comentario, idx) => (
                                          <li key={idx}>{comentario}</li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t border-gray-200 bg-white rounded-b-lg">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Describe tu viaje ideal..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={!inputMessage.trim() || isLoading}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
