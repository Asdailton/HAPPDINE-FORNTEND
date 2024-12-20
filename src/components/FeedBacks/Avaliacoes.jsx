import React, { useState, useEffect } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import axios from 'axios';  // Importando axios
import Stars from './Stars.jsx';
import ModalComponent from './Modal.jsx';
import mais from '../../image/+.png';
import seloVerde from '../../image/FeedBacks/green.png';
import seloRoxo from '../../image/FeedBacks/purple.png';
import seloAzul from '../../image/FeedBacks/blue.png';
import seloPreto from '../../image/FeedBacks/preto.png'; // Supondo que você tenha um selo preto
import { useTranslation } from 'react-i18next';

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1024 },
    items: 2.7,
    slidesToSlide: 1,
  },
  desktop: {
    breakpoint: { max: 1500, min: 768 },
    items: 2.1,
    slidesToSlide: 1,
  },
  tablet: {
    breakpoint: { max: 768, min: 464 },
    items: 1,
    slidesToSlide: 1,
  },
  mobile: {
    breakpoint: { max: 640, min: 0 },
    items: 0.2,
    slidesToSlide: 1,
  },
};

const Avaliacoes = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [feedbacks, setFeedbacks] = useState([]);
  const [language, setLanguage] = useState("");
  const { t } = useTranslation();
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  useEffect(() => {
    const storedLanguage = localStorage.getItem("language");
    setLanguage(storedLanguage);

  }, []);

  // Chame getFeedbacks sempre que `language` mudar
    useEffect(() => {
      if (language) {
        getFeedbacks();
      }
    }, [language]);

   // Função para traduzir um texto usando a API do DeepL
   const translateText = async (text, targetLang) => {
    const apiKey = "5bc4eb4f-79d6-40bc-abf0-58ba19a909a6:fx"; // Substitua com sua chave de API do DeepL
    const url = `https://api-free.deepl.com/v2/translate`;
    console.log(targetLang)
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

  // Função para traduzir uma lista de dicionários
  const translateDictionaryList = async (feedbackList, targetLang) => {
    const translatedFeedbacks = [];

    for (let feedback of feedbackList) {
      const translatedFeedback = { ...feedback };

      // Traduzindo os campos de texto
      if (feedback.comentario) {
        translatedFeedback.comentario = await translateText(feedback.comentario, targetLang);
      }
      if (feedback.nome) {
        translatedFeedback.nome = await translateText(feedback.nome, targetLang);
      }
      if (feedback.opcao) {
        translatedFeedback.opcao = await translateText(feedback.opcao, targetLang);
      }

      translatedFeedbacks.push(translatedFeedback);
    }

    return translatedFeedbacks;
  };

  // Função para buscar os feedbacks
  const getFeedbacks = async () => {
    try {
      // Fazendo requisição para as duas URLs usando axios
      const [websiteResponse, restauranteResponse] = await Promise.all([
        axios.get('http://localhost:8080/api/comentarios/website'),
        axios.get('http://localhost:8080/api/comentarios/restaurante'),
      ]);

      // Combinando os dados das duas respostas
      const combinedFeedbacks = [
        ...websiteResponse.data, 
        ...restauranteResponse.data
      ];

      // Traduzindo os feedbacks obtidos
      // Altere o idioma de destino conforme necessário
    // Determine o idioma para tradução (exemplo: en, pt)
    const targetLang = language?.split("-")[0] || "PT"; // Exemplo: pt-BR => pt
    const translatedFeedbacks = await translateDictionaryList(
      combinedFeedbacks,
      targetLang
    );


      // Atualizando o estado com os feedbacks traduzidos
      setFeedbacks(translatedFeedbacks);
      console.log(feedbacks)
      console.log(translatedFeedbacks);
    } catch (error) {
      console.error('Erro ao buscar os feedbacks:', error);
    }
  };


  // Função para formatar o dia da semana
  const formatarDiaSemana = (data) =>
    new Date(data).toLocaleDateString(language, { weekday: 'long' }).replace('.', '');

  // Função para formatar a data
  const formatarData = (data) =>
    new Date(data).toLocaleDateString(language, {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).replace(',', '');
  

  // Mapeamento das cores para os selos
  const seloMap = {
    '#10AAFD': seloAzul,   // Azul
    '#C535BC': seloRoxo,   // Roxo
    '#219557': seloVerde,  // Verde
    '#2E3033': seloPreto,  // Preto
  };

  return (
    <div>
      <Carousel
        responsive={responsive}
        centerMode={true}
        arrows={false}
        infinite={true}
        showDots={false}
        containerClass="carousel-container"
        itemClass="p-2 flex justify-center items-center"
      >
        {feedbacks.map((review) => (
          <div
            key={review.id}
            className="bg-white px-5 py-7 md:px-8 md:py-10  shadow-custom-pink min-h-[23vh] lg:min-h-[37vh] 2xl:min-h-[30vh] w-[100%] lg:w-[120%] mt-[90px] flex flex-col relative"
          >
            <div className="w-full flex justify-between">
              <div>
                <h1 className="text-[10px] lg:text-[18px] font-semibold">{review.nome}</h1>
                <h2 className="text-[6px] lg:text-[14px] text-[#7D8389]">{`${formatarDiaSemana(review.timestampp)}, ${formatarData(review.timestampp)}`}</h2>
              </div>
              <div>
                {/* Renderizando o selo com base na cor */}
                <img className="w-[20px] lg:w-6 2xl:w-8" src={seloMap[review.corEstrela]} alt="Selo correspondente" />
              </div>
            </div>

            <p className="text-[9px] lg:text-[16px] text-left mt-2">{review.comentario}</p>

            {/* Adicione estas classes para fixar o Stars na parte inferior */}
            <div className="absolute bottom-12 w-full">
              <Stars corRegistrada={review.corEstrela} quantidade={review.estrela}/>
            </div>
          </div>
        ))}
      </Carousel>
      <div className="bg-[#4E5256] mt-[20px] w-[20%] h-[40px] ml-[47px] md:ml-[110px]  md:w-[7%] md:mt-[40px] flex">
        <button onClick={openModal} className="w-full justify-center flex items-center">
          <img src={mais} alt={t('abrir modal')} />
        </button>
      </div>
      <ModalComponent isOpen={modalIsOpen} onRequestClose={closeModal} />
    </div>
  );
};

export default Avaliacoes;
