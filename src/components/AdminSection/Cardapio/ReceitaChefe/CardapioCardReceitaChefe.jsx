import React from "react";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import editar from '../../../../image/CardapioAdmin/Editar.svg';
import { useState } from "react";
import ModalReceitaChefe from "./ModalReceitaChefe";

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
      items: 2,
      slidesToSlide: 1,
    },
    tablet: {
      breakpoint: { max: 768, min: 464 },
      items: 1, // Permite que um card e meio apareçam
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };
  
  const cardapios = [
    { id: 1, diaSemana: 'Seg', data: '1 Mar', content: "Filé de frango grelhado; Iscas de fígado aceboladas; Omelete; Kibe de cenoura; Berinjela; Legumes sauté; 4 Tipos de Saladas; Melão" },
    { id: 2, diaSemana: 'Ter', data: '2 Mar', content: 'Filé de frango grelhado; Iscas de fígado aceboladas; Omelete; Kibe de cenoura; Berinjela; Legumes sauté; 4 Tipos de Saladas; Melão' },
    { id: 3, diaSemana: 'Qua', data: '3 Mar', content: 'Filé de frango grelhado; Iscas de fígado aceboladas; Omelete; Kibe de cenoura; Berinjela; Legumes sauté; 4 Tipos de Saladas; Melão' },
    { id: 4, diaSemana: 'Qui', data: '4 Mar', content: 'Filé de frango grelhado; Iscas de fígado aceboladas; Omelete; Kibe de cenoura; Berinjela; Legumes sauté; 4 Tipos de Saladas; Melão' },
    { id: 5, diaSemana: 'Sexta', data: '5 Mar', content: 'Filé de frango grelhado; Iscas de fígado aceboladas; Omelete; Kibe de cenoura; Berinjela; Legumes sauté; 4 Tipos de Saladas; Melão' },
  ];
const CardapioCardReceitaChefe = () =>{
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => setModalIsOpen(true);
    const closeModal = () => setModalIsOpen(false);
    return(
        <Carousel
        responsive={responsive}
        centerMode={true}
        arrows={true}
        containerClass="flex overflow-hidden p-4"
        itemClass="flex justify-center mx-4 " // Ajusta a margem horizontal entre os cards
      >
        {cardapios.map(cardapio => (
          <div
            key={cardapio.id}
            className="bg-white p-4 shadow-lg flex flex-col items-center w-[297px] min-w-[297px] h-[268px] min-h-[268px]"
          >
            <div className='w-full'>
              <div className='flex justify-between'>
                <h1 className="text-[24px] font-semibold text-left">{cardapio.diaSemana}</h1>
                <button
                onClick={openModal}
                className="bg-transparent border-none p-0 cursor-pointer"
                aria-label="Open Modal" // For accessibility
              >
                <img 
                  src={editar} 
                  alt="Folha" 
                  className="" 
                />
              </button>
              </div>
              
              <h2 className="text-[16px] text-[#12818F] font-semibold mt-[-6px] mb-[9px]">{cardapio.data}</h2>
            </div>
            
            <div className="w-full mt-2">
              {cardapio.content.split(';').map((item, index) => (
                <p key={index} className="text-[13px] text-black-700 text-left">{item.trim()}</p>
              ))}
            </div>
            <ModalReceitaChefe
        isOpen={modalIsOpen} 
        onRequestClose={closeModal} 
        contentLabel="Modal Grill e Bem estar" 
      />
          </div>
        ))}
      </Carousel>
    )
}

export default CardapioCardReceitaChefe;