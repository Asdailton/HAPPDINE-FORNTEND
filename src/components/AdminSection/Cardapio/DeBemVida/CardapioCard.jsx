import React, { useState, useEffect } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import editar from '../../../../image/CardapioAdmin/Editar.svg';
import ModalBemVida from './ModalBemVida';

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1400 },
    items: 3.8,
    slidesToSlide: 1,
  },
  largeDesktop: {
    breakpoint: { max: 1400, min: 1024 },
    items: 1.8,
    slidesToSlide: 1,
  },
  desktop: {
    breakpoint: { max: 1024, min: 768 },
    items: 1.2,
    slidesToSlide: 1,
  },
  tablet: {
    breakpoint: { max: 768, min: 464 },
    items: 1,
    slidesToSlide: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
};

const CardapioCardBemVida = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [cardapios, setCardapios] = useState([]);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  // Função para formatar a data como "Seg" e "1 Mar"
  const formatarDiaSemana = (data) => {
    return new Date(data).toLocaleDateString('pt-BR', { weekday: 'short' }).replace('.', '');
  };

  const formatarData = (data) => {
    return new Date(data).toLocaleDateString('pt-BR', { day: 'numeric', month: 'short' });
  };

  // Fazer a requisição para a API
  useEffect(() => {
    const fetchCardapios = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8080/debemcomavida/cardapios');
        const data = await response.json();

        // Mapear a resposta da API para o formato que o componente espera
        const cardapiosFormatados = data.map(item => ({
          id: item.id_cardapio,
          diaSemana: formatarDiaSemana(item.data),
          data: formatarData(item.data),
          content: `${item.prato_principal}; ${item.guarnicao}; Sobremesa: ${item.sobremesa}; Salada: ${item.salada}`,
        }));

        setCardapios(cardapiosFormatados);
      } catch (error) {
        console.error('Erro ao buscar os cardápios:', error);
      }
    };

    fetchCardapios();
  }, []);

  return (
    <Carousel
      responsive={responsive}
      centerMode={true}
      arrows={true}
      containerClass="flex overflow-hidden p-4"
      itemClass="flex justify-center mx-4"
    >
      {cardapios.map(cardapio => (
        <div
          key={cardapio.id}
          className="bg-white p-4 shadow-lg flex flex-col items-center w-[297px] min-w-[297px] h-[268px] min-h-[268px] mx-2"
        >
          <div className='w-full'>
            <div className='flex justify-between'>
              <h1 className="text-[24px] font-semibold text-left">{cardapio.diaSemana}</h1>
              <button
                onClick={openModal}
                className="bg-transparent border-none p-0 cursor-pointer"
                aria-label="Open Modal"
              >
                <img 
                  src={editar} 
                  alt="Editar" 
                  className="" 
                />
              </button>
            </div>
            
            <h2 className="text-[16px] text-[#00884A] font-semibold mt-[-6px] mb-[9px]">{cardapio.data}</h2>
          </div>
          
          <div className="w-full">
            {cardapio.content.split(';').map((item, index) => (
              <p key={index} className="text-[13px] text-black text-left">{item.trim()}</p>
            ))}
          </div>
          <ModalBemVida
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Modal de Bem Vida"
          />
        </div>
      ))}
    </Carousel>
  );
}

export default CardapioCardBemVida;