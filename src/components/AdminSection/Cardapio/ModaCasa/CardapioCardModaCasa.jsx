import React, { useState, useEffect } from "react";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import editar from '../../../../image/CardapioAdmin/Editar.svg';
import ModalModaCasa from "./ModalModaCasa";
import axios from 'axios';

const responsive = {
  superLargeDesktop: { breakpoint: { max: 4000, min: 1400 }, items: 4.7, slidesToSlide: 2 },
  largeDesktop: { breakpoint: { max: 1400, min: 1024 }, items: 2.5, slidesToSlide: 1 },
  desktop: { breakpoint: { max: 1024, min: 768 }, items: 2, slidesToSlide: 1 },
  tablet: { breakpoint: { max: 768, min: 464 }, items: 1, slidesToSlide: 1 },
  mobile: { breakpoint: { max: 464, min: 0 }, items: 1, slidesToSlide: 1 },
};

const CardapioCardModaCasa = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [cardapios, setCardapios] = useState([]);
  const [currentCardapio, setCurrentCardapio] = useState(null);

  const openModal = (cardapio) => {
    setCurrentCardapio(cardapio);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    atualizarCardapios();
  };

  const formatarData = (data, options) =>
    new Date(data).toLocaleDateString('pt-BR', options).replace('.', '');

  const fetchCardapios = async () => {
    try {
      const { data } = await axios.get('http://127.0.0.1:8080/modadacasa/cardapios');
      console.log("Dados recebidos da API:", data);

      const cardapiosFormatados = data.map((item) => ({
        id: item.id_cardapio,
        diaSemana: formatarData(item.data, { weekday: 'short' }),
        data: formatarData(item.data, { day: 'numeric', month: 'short' }),
        pratoPrincipal: item.prato_principal,
        guarnicao: item.guarnicao,
        sobremesa: item.sobremesa,
        salada: item.salada,
        dataCompleta: item.data,
      }));

      const cardapiosCompletos = preencherDiasFaltantes(cardapiosFormatados);
      setCardapios(cardapiosCompletos);
    } catch (error) {
      console.error('Erro ao buscar os cardápios:', error);
      setCardapios(preencherDiasFaltantes([]));
    }
  };

  const preencherDiasFaltantes = (cardapiosFormatados) => {
    const hoje = new Date();
    const segundaFeira = new Date(hoje.setDate(hoje.getDate() - (hoje.getDay() || 7) + 1));

    const semana = Array.from({ length: 7 }, (_, i) => {
      const dia = new Date(segundaFeira);
      dia.setDate(segundaFeira.getDate() + i);
      return {
        diaSemana: formatarData(dia, { weekday: 'short' }),
        data: formatarData(dia, { day: 'numeric', month: 'short' }),
        pratoPrincipal: 'Nenhum disponível',
        guarnicao: 'Nenhuma disponível',
        sobremesa: 'Nenhuma disponível',
        salada: 'Nenhuma disponível',
        dataCompleta: dia.toISOString().split('T')[0],
      };
    });

    cardapiosFormatados.forEach((cardapio) => {
      const index = semana.findIndex((dia) => dia.dataCompleta === cardapio.dataCompleta);
      if (index !== -1) semana[index] = { ...semana[index], ...cardapio };
    });

    return semana;
  };

  const atualizarCardapios = () => fetchCardapios();

  useEffect(() => {
    fetchCardapios();
  }, []);

  return (
    <>
      <Carousel
        responsive={responsive}
        centerMode={false}
        arrows={true}
        infinite={true}
        containerClass="flex overflow-hidden p-4"
        itemClass="flex justify-center mx-4"
      >
        {cardapios.map((cardapio) => (
          <div
            key={cardapio.dataCompleta}
            className="bg-white p-4 shadow-lg flex flex-col items-center w-[297px] min-w-[297px] h-[268px] min-h-[268px]"
          >
            <div className="w-full">
              <div className="flex justify-between">
                <h1 className="text-[24px] font-semibold">{cardapio.diaSemana}</h1>
                <button
                  onClick={() => openModal(cardapio)}
                  className="bg-transparent border-none p-0 cursor-pointer"
                  aria-label="Open Modal"
                >
                  <img src={editar} alt="Editar" />
                </button>
              </div>
              <h2 className="text-[16px] text-[#007BC0] font-semibold mt-[-6px] mb-[9px]">
                {cardapio.data}
              </h2>
            </div>
            <div className="w-full">
              {cardapio.pratoPrincipal === 'Nenhum disponível' &&
              cardapio.guarnicao === 'Nenhuma disponível' &&
              cardapio.sobremesa === 'Nenhuma disponível' &&
              cardapio.salada === 'Nenhuma disponível' ? (
                <p className="text-[13px] text-black">Nenhum cardápio disponível</p>
              ) : (
                <>
                  <p className="text-[13px] text-black">{cardapio.pratoPrincipal}</p>
                  <p className="text-[13px] text-black">{cardapio.guarnicao}</p>
                  <p className="text-[13px] text-black">{cardapio.sobremesa}</p>
                  <p className="text-[13px] text-black">{cardapio.salada}</p>
                </>
              )}
            </div>
          </div>
        ))}
      </Carousel>

      <ModalModaCasa
        isOpen={modalIsOpen}
        closeModal={closeModal}
        cardapio={currentCardapio}
      />
    </>
  );
};

export default CardapioCardModaCasa;
