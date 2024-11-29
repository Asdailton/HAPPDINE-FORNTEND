import React, { useState } from "react";
import axios from "axios";

const Traducao = () => {
    const [inputText, setInputText] = useState(""); // Texto a ser traduzido
    const [translatedText, setTranslatedText] = useState(""); // Texto traduzido
    const [targetLanguage, setTargetLanguage] = useState("EN"); // Idioma alvo padrão

    const handleTranslate = async () => {
        const apiKey = '5bc4eb4f-79d6-40bc-abf0-58ba19a909a6:fx'; // Substitua pela sua chave da API
        const url = 'https://api-free.deepl.com/v2/translate';

        try {
            const response = await axios.post(url, null, {
                params: {
                    auth_key: apiKey,
                    text: inputText,
                    target_lang: targetLanguage,
                },
            });

            setTranslatedText(response.data.translations[0].text); // Armazena o texto traduzido
        } catch (error) {
            console.error("Erro ao traduzir:", error);
        }
    };

    return (
        <div>
            <h1>Tradutor DeepL</h1>
            <textarea
                rows="4"
                cols="50"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Digite o texto em português"
            />
            <br />
            <select value={targetLanguage} onChange={(e) => setTargetLanguage(e.target.value)}>
                <option value="EN">Inglês</option>
                <option value="DE">Alemão</option>
                <option value="ES">Espanhol</option>
                {/* Adicione mais opções conforme necessário */}
            </select>
            <br />
            <button onClick={handleTranslate}>Traduzir</button>
            <h2>Texto Traduzido:</h2>
            <p>{translatedText}</p>
        </div>
    );
};

export default Traducao;