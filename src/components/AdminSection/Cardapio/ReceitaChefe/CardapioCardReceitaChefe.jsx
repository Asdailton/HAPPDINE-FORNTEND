import React, { useState, useEffect } from "react";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import editar from '../../../../image/CardapioAdmin/Editar.svg';
import ModalReceitaChefe from "./ModalReceitaChefe";
import axios from 'axios'; // Importando axios
import setaDireta from '../../../../image/CardapioAdmin/arrowRight.svg';

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

const CardapioCardReceitaChefe = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [cardapios, setCardapios] = useState([]);
  const [currentCardapio, setCurrentCardapio] = useState(null); // Para armazenar o cardápio atual
  const [carouselRef, setCarouselRef] = useState(null);

  const openModal = (cardapio) => {
    setCurrentCardapio(cardapio);
    setModalIsOpen(true);
  };

  

  const formatarDiaSemana = (data) => {
    return new Date(data).toLocaleDateString('pt-BR', { weekday: 'short' }).replace('.', '');
  };

  const formatarData = (data) => {
    return new Date(data).toLocaleDateString('pt-BR', { day: 'numeric', month: 'short' });
  };

  const fetchCardapios = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8080/receitadochefe/cardapios');
      const data = response.data;
      console.log("Dados recebidos da API:", data);

      const cardapiosFormatados = data.map(item => ({
        id: item.id_cardapio,
        diaSemana: formatarDiaSemana(item.data),
        data: formatarData(item.data),
        pratoPrincipal: item.prato_principal,
        guarnicao: item.guarnicao,
        sobremesa: item.sobremesa,
        salada: item.salada,
        dataCompleta: item.data,
      }));

      const today = new Date();
      const dayOfWeek = today.getDay();
      const thisMonday = new Date(today);
      thisMonday.setDate(today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));

      const allDays = [];
      for (let i = 0; i < 7; i++) {
        const day = new Date(thisMonday);
        day.setDate(thisMonday.getDate() + i);
        allDays.push({
          diaSemana: formatarDiaSemana(day),
          data: formatarData(day),
          pratoPrincipal: 'Nenhum disponível',
          guarnicao: 'Nenhuma disponível',
          sobremesa: 'Nenhuma disponível',
          salada: 'Nenhuma disponível',
          dataCompleta: day.toISOString().split('T')[0],
        });
      }

      cardapiosFormatados.forEach(cardapio => {
        const index = allDays.findIndex(d => d.dataCompleta === cardapio.dataCompleta);
        if (index !== -1) {
          allDays[index] = {
            ...allDays[index],
            pratoPrincipal: cardapio.pratoPrincipal,
            guarnicao: cardapio.guarnicao,
            sobremesa: cardapio.sobremesa,
            salada: cardapio.salada,
            id: cardapio.id,
            dataCompleta: cardapio.dataCompleta,
          };
        }
      });

      setCardapios(allDays);
    } catch (error) {
      console.error('Erro ao buscar os cardápios:', error);

      const today = new Date();
      const dayOfWeek = today.getDay();
      const thisMonday = new Date(today);
      thisMonday.setDate(today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));

      const allDays = [];
      for (let i = 0; i < 7; i++) {
        const day = new Date(thisMonday);
        day.setDate(thisMonday.getDate() + i);
        allDays.push({
          diaSemana: formatarDiaSemana(day),
          data: formatarData(day),
          pratoPrincipal: 'Nenhum disponível',
          guarnicao: 'Nenhuma disponível',
          sobremesa: 'Nenhuma disponível',
          salada: 'Nenhuma disponível',
          dataCompleta: day.toISOString().split('T')[0],
        });
      }

      setCardapios(allDays);
    }
  };

  const atualizarCardapios = async () => {
    await fetchCardapios();
  };

  const closeModal = () => {
    atualizarCardapios(); // Atualiza os cardápios ao fechar o modal
    setModalIsOpen(false);
  };

  useEffect(() => {
    fetchCardapios();
  }, []);

  return (
    <>
    <div className="relative"> {/* Contêiner maior envolvendo carrossel e botão */}
      <div className="flex justify-between items-center"> {/* Contêiner flexível para alinhamento */}
        <Carousel
          infinite
          responsive={responsive}
          centerMode={true}
          arrows={false} // Desativa as setas padrão
          ref={setCarouselRef}
          containerClass="flex overflow-hidden p-4 relative"
          itemClass="flex justify-center mx-4"
        >
          {cardapios.length > 0 ? (
            cardapios.map((cardapio) => (
              <div
                key={cardapio.id}
                className="bg-white p-4 shadow-lg flex flex-col items-center w-[297px] min-w-[297px] h-[268px] min-h-[268px] mx-2"
              >
                <div className="w-full">
                  <div className="flex justify-between">
                    <h1 className="text-[24px] font-semibold text-left">{cardapio.diaSemana}</h1>
                    <button
                      onClick={() => openModal(cardapio)}
                      className="bg-transparent border-none p-0 cursor-pointer"
                      aria-label="Open Modal"
                    >
                      <img src={editar} alt="Editar" />
                    </button>
                  </div>
                  <h2 className="text-[16px] text-[#12818F] font-semibold mt-[-6px] mb-[9px]">
                    {cardapio.data}
                  </h2>
                </div>
                <div className="w-full">
                  {cardapio.pratoPrincipal === 'Nenhum disponível' &&
                  cardapio.guarnicao === 'Nenhuma disponível' &&
                  cardapio.sobremesa === 'Nenhuma disponível' &&
                  cardapio.salada === 'Nenhuma disponível' ? (
                    <p className="text-[13px] text-black text-left">Nenhum cardápio disponível</p>
                  ) : (
                    <>
                      <p className="text-[13px] text-black text-left">{cardapio.pratoPrincipal}</p>
                      <p className="text-[13px] text-black text-left">{cardapio.guarnicao}</p>
                      <p className="text-[13px] text-black text-left">{cardapio.sobremesa}</p>
                      <p className="text-[13px] text-black text-left">{cardapio.salada}</p>
                    </>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p>Nenhum cardápio disponível</p>
          )}
        </Carousel>

        {/* Botão dentro do mesmo contêiner */}
        <button
          onClick={carouselRef ? () => carouselRef.next() : null}
          className='ml-7'
          aria-label="Next Slide"
        >
          <img src={setaDireta} alt="Seta para a direita" className=" lg:h-[90px] xl:h-[90px] 2xl:h-[170px]" />
        </button>
      </div>

      <ModalReceitaChefe
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Modal de Bem Vida"
        pratoPrincipal={currentCardapio?.pratoPrincipal || 'Nenhum disponível'}
        guarnicao={currentCardapio?.guarnicao || 'Nenhuma disponível'}
        sobremesa={currentCardapio?.sobremesa || 'Nenhuma disponível'}
        salada={currentCardapio?.salada || 'Nenhuma disponível'}
        dataCardapio={currentCardapio?.dataCompleta || null}
        idCardapio={currentCardapio?.id || null}
      />
    </div>
  </>
  );
}

export default CardapioCardReceitaChefe;