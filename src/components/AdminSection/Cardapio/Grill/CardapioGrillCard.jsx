import React, { useState, useEffect } from "react"; // Importa React, useState e useEffect
import Carousel from 'react-multi-carousel'; // Importa o componente de carrossel
import 'react-multi-carousel/lib/styles.css'; // Importa estilos do carrossel
import editar from '../../../../image/CardapioAdmin/Editar.svg'; // Importa ícone de edição
import ModalGrill from "./ModalGrill"; // Importa o componente ModalGrill
import axios from 'axios'; // Importa a biblioteca axios para requisições HTTP

// Define os breakpoints para responsividade do carrossel
const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1400 },
    items: 4.7,
    slidesToSlide: 2,
  },
  largeDesktop: {
    breakpoint: { max: 1400, min: 1024 },
    items: 2.5,
    slidesToSlide: 1,
  },
  desktop: {
    breakpoint: { max: 1024, min: 768 },
    items: 2,
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

const CardapioGrillCard = () => {
  // Estados para controle do modal e dos cardápios
  const [modalIsOpen, setModalIsOpen] = useState(false); // Controla a visibilidade do modal
  const [cardapios, setCardapios] = useState([]); // Armazena os cardápios recebidos
  const [currentCardapio, setCurrentCardapio] = useState(null); // Armazena o cardápio atual para o modal

  // Função para abrir o modal e definir o cardápio atual
  const openModal = (cardapio) => {
    setCurrentCardapio(cardapio); // Define o cardápio atual
    setModalIsOpen(true); // Abre o modal
  };

  // Função para fechar o modal e atualizar os cardápios
  const closeModal = () => {
    atualizarCardapios(); // Atualiza os cardápios ao fechar o modal
    setModalIsOpen(false); // Fecha o modal
  };

  // Formata o dia da semana a partir da data
  const formatarDiaSemana = (data) => {
    return new Date(data).toLocaleDateString('pt-BR', { weekday: 'short' }).replace('.', '');
  };

  // Formata a data a partir da data
  const formatarData = (data) => {
    return new Date(data).toLocaleDateString('pt-BR', { day: 'numeric', month: 'short' });
  };

  // Função assíncrona para buscar os cardápios da API
  const fetchCardapios = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8080/grillebemestar/cardapios'); // Requisição GET para a API
      const data = response.data; // Armazena os dados recebidos
      console.log("Dados recebidos da API:", data); // Log dos dados recebidos

      // Formata os cardápios recebidos
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

      // Calcula a data da segunda-feira da semana atual
      const today = new Date();
      const dayOfWeek = today.getDay();
      const thisMonday = new Date(today);
      thisMonday.setDate(today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));

      // Gera uma lista de dias da semana
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

      // Atualiza os cardápios formatados na lista de todos os dias
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

      setCardapios(allDays); // Atualiza o estado com os cardápios
    } catch (error) {
      console.error('Erro ao buscar os cardápios:', error); // Log de erro ao buscar os cardápios

      // Fallback caso ocorra erro, gera a lista de dias da semana padrão
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

      setCardapios(allDays); // Atualiza o estado com a lista padrão
    }
  };

  // Função para atualizar os cardápios
  const atualizarCardapios = async () => {
    await fetchCardapios(); // Chama a função de busca de cardápios
  };

  // useEffect para buscar cardápios ao montar o componente
  useEffect(() => {
    fetchCardapios(); // Chama a função para buscar os cardápios
  }, []);

  return (
    <>
      <Carousel
        responsive={responsive} // Configuração de responsividade
        centerMode={false} // Não centraliza os itens
        arrows={false} // Não exibe setas de navegação
        infinite={true} // Habilita rolagem infinita
        containerClass="flex overflow-hidden p-4" // Classe para o container do carrossel
        itemClass="flex justify-center mx-4" // Classe para cada item do carrossel
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
              <h2 className="text-[16px] text-[#9E2896] font-semibold mt-[-6px] mb-[9px]">
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

      {/* Modal para edição do cardápio */}
      {modalIsOpen && (
        <ModalGrill
          isOpen={modalIsOpen} // Controla a visibilidade do modal
          closeModal={closeModal} // Função para fechar o modal
          cardapio={currentCardapio} // Cardápio atual a ser editado
        />
      )}
    </>
  );
};

export default CardapioGrillCard; // Exporta o componente para uso em outras partes da aplicação
