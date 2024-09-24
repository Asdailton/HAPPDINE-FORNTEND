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
    items: 2,
    slidesToSlide: 1,
  },
  desktop: {
    breakpoint: { max: 1024, min: 768 },
    items: 2.6,
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
  const { t } = useTranslation();

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  // Função para buscar os feedbacks com axios
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

      // Atualizando o estado com os feedbacks combinados
      setFeedbacks(combinedFeedbacks);
      console.log(combinedFeedbacks)
    } catch (error) {
      console.error('Erro ao buscar os feedbacks:', error);
    }
  };

  // useEffect para buscar os feedbacks quando o componente for montado
  useEffect(() => {
    getFeedbacks();
  }, []);

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
        itemClass="carousel-item p-2"
      >
        {feedbacks.map((review) => (
          <div
            key={review.id}
            className="bg-white p-8 mx-2 shadow-custom-pink min-h-[35vh] w-[90%] mt-[90px] flex flex-col relative"
          >
            <div className="w-full flex justify-between">
              <div>
                <h1 className="text-lg font-semibold">{review.nome}</h1>
                <h2 className="text-md text-[14px] text-[#7D8389]">{review.timestampp}</h2>
              </div>
              <div>
                {/* Renderizando o selo com base na cor */}
                <img className="w-9" src={seloMap[review.corEstrela]} alt="Selo correspondente" />
              </div>
            </div>

            <p className="text-[16px] text-left mt-2">{review.comentario}</p>

            {/* Adicione estas classes para fixar o Stars na parte inferior */}
            <div className="absolute bottom-12 w-full">
              <Stars corRegistrada={review.corEstrela} quantidade={review.estrela}/>
            </div>
          </div>
        ))}
      </Carousel>
      <div className="bg-[#4E5256] mt-[20px] w-[20%] h-[40px] ml-[47px] md:w-[7%] md:mt-[40px] flex">
        <button onClick={openModal} className="w-full justify-center flex items-center">
          <img src={mais} alt={t('abrir modal')} />
        </button>
      </div>
      <ModalComponent isOpen={modalIsOpen} onRequestClose={closeModal} />
    </div>
  );
};

export default Avaliacoes;
