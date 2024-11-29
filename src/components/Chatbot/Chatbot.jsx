import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import chatbot from '../../image/ChatBot/chatbotao.png';
import avatarbot from '../../image/ChatBot/chatbot.png';
import iconchat from '../../image/ChatBot/icon-chat.svg';
import closechat from '../../image/ChatBot/close.svg';
import './ChatBot.css';

function Chat() {
  const [messages, setMessages] = useState([]);
  const [options, setOptions] = useState([])
  const [startDate, setStartDate] = useState("");
  const [isOpen, setIsOpen] = useState(false); // abrir e fechar o chat
  const [language, setLanguage] = useState("pt-BR"); // idioma padrão

  const colors = ["#10AAFD", "#007BC0", "#C535BC", "#00884A", "#18837E"];

  // Ref para a última mensagem
  const endOfMessagesRef = useRef(null);

  // Função para formatar a data
  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Função para formatar a hora
  const formatTime = (date) => {
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  // Função para tradução usando a API do DeepL
  const translateText = async (text, targetLang) => {
    const apiKey = "5bc4eb4f-79d6-40bc-abf0-58ba19a909a6:fx"; // Substitua com sua chave de API do DeepL
    const url = `https://api-free.deepl.com/v2/translate`;

    try {
      const response = await axios.post(url, null, {
        params: {
          auth_key: apiKey,
          text: text,
          target_lang: targetLang.toUpperCase(), // DeepL usa o código do idioma em maiúsculo
        },
      });

      if (response.data && response.data.translations) {
        return response.data.translations[0].text;
      } else {
        throw new Error("Erro ao traduzir");
      }
    } catch (error) {
      console.error("Erro ao traduzir:", error);
      return text; // Retorna o texto original caso falhe
    }
  };

  const speak = (text, options) => {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = language === "pt-BR" ? "pt-BR" : language === "en" ? "en-US" : "es-ES";
    speech.rate = 1;
    speech.pitch = 1;
  
    // Filtrar vozes femininas
    const voices = window.speechSynthesis.getVoices();
    const femaleVoice = voices.find(voice => voice.name.toLowerCase().includes('female'));
  
    if (femaleVoice)
   {
      speech.voice = femaleVoice;
    }
  
    window.speechSynthesis.speak(speech);
  };

  // Inicia o chat
  useEffect(() => {
    const startChat = async () => {
      try {
        const today = new Date();
        setStartDate(formatDate(today)); // Define a data inicial da conversa
  
        const response = await axios.get("http://localhost:8080/api/chat/start");
  
        if (typeof response.data !== "object") {
          throw new Error("Resposta inesperada da API. Verifique o endpoint.");
        }
  
        const initialMessage = response.data;
        initialMessage.timestamp = new Date();
        
        // Traduzir o conteúdo
        const translatedMessage = await translateText(initialMessage.content, language);
        initialMessage.content = translatedMessage;

        //Traduzir as opções (botões)
        for (let i = 0; i < initialMessage.options.length; i++) {
          // Traduza cada item individualmente
          const translatedOption = await translateText(initialMessage.options[i], language);
          
          // Atualiza a lista com o item traduzido
          initialMessage.options[i] = translatedOption;
      }
      
      // Após a tradução, você pode atualizar as opções
      setOptions(initialMessage.options);

    
        setMessages([initialMessage]);
  
        // Fala a mensagem traduzida quando o chat for aberto
        if (isOpen) speak(initialMessage.content, initialMessage.options);
      } catch (error) {
        console.error("Erro ao iniciar o chat:", error);
      }
    };
  
    startChat();
  }, [isOpen, language]); 
  // Rola até a última mensagem ao atualizar mensagens ou abrir o chat
  useEffect(() => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Função para enviar uma mensagem
  const sendMessage = async (message) => {
    const optionPortugues = await translateText(message, 'pt')
    const userMessage = {
      content: message,
      type: "user",
      timestamp: new Date(),
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);


    const response = await axios.post("http://localhost:8080/api/chat", { content: optionPortugues, type: "user" });
    const botMessage = { ...response.data, timestamp: new Date() };

    // Traduzir a resposta do bot também
    botMessage.content = await translateText(botMessage.content, language);
   
    
    //traduzir as opções
    for (let i = 0; i < botMessage.options.length; i++) {
      // Traduza cada item individualmente
      const translatedOption = await translateText(botMessage.options[i], language);
      
      // Atualiza a lista com o item traduzido
      botMessage.options[i] = translatedOption;
      
     }
     setOptions(botMessage.options)
    

    setMessages((prevMessages) => [...prevMessages, botMessage]);

    // Fala quando o bot responder
    if (botMessage.content) speak(botMessage.content);
  };
  

  // Alternar entre abrir e fechar o chat
  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

 
  // Obtendo o idioma do localStorage ou usando o padrão
  useEffect(() => {
    const storedLanguage = localStorage.getItem("language");
    setLanguage(storedLanguage);
   
  }, []);

  return (
    <>
      <div className={`chatbot-container ${isOpen ? 'open' : 'closed'}`}>
        {/* Banner Fixo */}
        <div className="chatbot-header fixed top-0 left-0 right-0 bg-[#333333] w-full flex justify-center items-center h-[32px] z-10">
          <img src={chatbot} alt="Chatbot" />
        </div>

        {/* Conteúdo do Chat */}
        <div className="chatbot-content w-full h-full bg-[#2E3033] pt-[60px]"> {/* Compensação do banner com padding-top */}
          <div className="messages-container">
            {startDate && (
              <div className="text-center mt-[65px] mb-[10px] text-[13px] text-gray-500">
                <p>{startDate}</p>
              </div>
            )}
            <div className="chatbot-messages">
              {messages.map((msg, index) => (
                <div className="flex flex-col" key={index}>
                  <div
                    className={`flex items-end max-w-2xl w-[90%] ${msg.type === "user" ? "ml-auto m-[10px] justify-end" : "justify-start m-[10px]"}`}
                  >
                    {msg.type === "bot" && (
                      <img src={avatarbot} alt="Avatar" className="w-[10%] rounded-full mr-3" />
                    )}
                    <div className={`p-6 text-[10px] ${msg.type === "user" ? "bg-[#10AAFD] text-white" : "bg-[#4E5256] text-white"}`}>
                      <p>{msg.content}</p>
                      {msg.type === "bot" && msg.options && msg.options.length > 0 && (
                        <div className="mt-2">
                          {options.map((option, index) => (
                            <button
                              key={index}
                              onClick={() => sendMessage(option)}
                              style={{
                                backgroundColor: colors[index % colors.length],
                                color: "white",
                                padding: "10px",
                                border: "none",
                                margin: "5px",
                              }}
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className={`text-right text-xs text-gray-400 mb-16 mr-16 ${msg.type === 'user' ? 'ml-auto' : ''}`}>
                    {msg.timestamp && formatTime(new Date(msg.timestamp))}
                  </div>
                </div>
              ))}
              {/* Referência para a última mensagem */}
              <div ref={endOfMessagesRef}></div>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-4 right-4 flex flex-col items-end">
        <button
          onClick={toggleChat}
          className="flex items-center justify-center w-12 h-12 bg-gray-800 text-white rounded-full shadow-lg hover:bg-gray-700 focus:outline-none transition-all duration-300"
        >
          {isOpen ? (
            <img src={closechat} alt="Fechar Chat" width={35} className="p-1" />
          ) : (
            <img src={iconchat} alt="Abrir Chat" width={35} className="p-1" />
          )}
        </button>
      </div>

      {/* Botões para trocar o idioma */}
      
    </>
  );
}

export default Chat;
