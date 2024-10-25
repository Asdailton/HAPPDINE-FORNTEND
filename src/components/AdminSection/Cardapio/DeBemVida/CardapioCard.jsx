import React, { useState, useEffect } from 'react'; // Importa React e hooks useState e useEffect
import Carousel from 'react-multi-carousel'; // Importa o componente de carrossel
import 'react-multi-carousel/lib/styles.css'; // Importa estilos do carrossel
import editar from '../../../../image/CardapioAdmin/Editar.svg'; // Importa a imagem do ícone de edição
import ModalBemVida from './ModalBemVida'; // Importa o componente ModalBemVida
import axios from 'axios'; // Importa a biblioteca axios para fazer requisições HTTP

// Define as configurações de responsividade para o carrossel
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

// Componente principal CardapioCardBemVida
const CardapioCardBemVida = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false); // Estado para controlar a abertura do modal
  const [cardapios, setCardapios] = useState([]); // Estado para armazenar a lista de cardápios
  const [currentCardapio, setCurrentCardapio] = useState(null); // Estado para armazenar o cardápio atual selecionado

  // Função para abrir o modal com o cardápio selecionado
  const openModal = (cardapio) => {
    setCurrentCardapio(cardapio); // Define o cardápio atual
    setModalIsOpen(true); // Abre o modal
  };

  // Função para fechar o modal e atualizar a lista de cardápios
  const closeModal = () => {
    atualizarCardapios(); // Atualiza os cardápios ao fechar o modal
    setModalIsOpen(false); // Fecha o modal
  };

  // Formata o dia da semana em português
  const formatarDiaSemana = (data) => {
    return new Date(data).toLocaleDateString('pt-BR', { weekday: 'short' }).replace('.', '');
  };

  // Formata a data em um formato amigável
  const formatarData = (data) => {
    return new Date(data).toLocaleDateString('pt-BR', { day: 'numeric', month: 'short' });
  };

  // Função assíncrona para buscar os cardápios da API
  const fetchCardapios = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8080/debemcomavida/cardapios'); // Faz a requisição GET
      const data = response.data; // Armazena os dados recebidos
      console.log("Dados recebidos da API:", data); // Log dos dados

      // Formata os dados recebidos
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

      // Lógica para determinar a data da semana atual (começando na segunda-feira)
      const today = new Date();
      const dayOfWeek = today.getDay();
      const thisMonday = new Date(today);
      thisMonday.setDate(today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));

      const allDays = [];
      // Cria um array para os próximos 7 dias
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

      // Atualiza allDays com os cardápios formatados
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

      setCardapios(allDays); // Atualiza o estado com todos os cardápios
    } catch (error) {
      console.error('Erro ao buscar os cardápios:', error); // Log de erro

      // Em caso de erro, mantém a lógica de dias da semana
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

      setCardapios(allDays); // Atualiza o estado com os dias da semana sem cardápios disponíveis
    }
  };

  // Função para atualizar a lista de cardápios
  const atualizarCardapios = async () => {
    await fetchCardapios(); // Rechama a função de busca
  };

  // Hook para buscar os cardápios ao montar o componente
  useEffect(() => {
    fetchCardapios(); // Chama a função de busca de cardápios
  }, []);

  return (
    <>
      <Carousel
        responsive={responsive} // Define a responsividade do carrossel
        centerMode={false} // Não centraliza o item ativo
        infinite={true} // Permite rolagem infinita
        arrows={true} // Mostra setas de navegação
        containerClass="flex overflow-hidden p-4" // Classe do contêiner do carrossel
        itemClass="flex justify-center mx-4" // Classe dos itens no carrossel
      >
        {cardapios.map((cardapio) => ( // Mapeia os cardápios para renderizar cada um
          <div
            key={cardapio.id} // A chave única do cardápio
            className="bg-white p-4 shadow-lg flex flex-col items-center w-[297px] min-w-[297px] h-[268px] min-h-[268px] mx-2"
          >
            <div className="w-full">
              <div className="flex justify-between">
                <h1 className="text-[24px] font-semibold text-left">{cardapio.diaSemana}</h1>
                <button
                  onClick={() => openModal(cardapio)} // Abre o modal ao clicar
                  className="bg-transparent border-none p-0 cursor-pointer"
                  aria-label="Open Modal"
                >
                  <img src={editar} alt="Editar" /> {/* Ícone de edição */}
                </button>
              </div>
              <h2 className="text-[16px] text-[#00884A] font-semibold mt-[-6px] mb-[9px]">
                {cardapio.data} {/* Exibe a data formatada */}
              </h2>
            </div>
            <div className="w-full">
              {cardapio.pratoPrincipal === 'Nenhum disponível' &&
              cardapio.guarnicao === 'Nenhuma disponível' &&
              cardapio.sobremesa === 'Nenhuma disponível' &&
              cardapio.salada === 'Nenhuma disponível' ? (
                <p className="text-[13px] text-black text-left">Nenhum cardápio disponível</p> // Mensagem quando não há cardápio
              ) : (
                <>
                  <p className="text-[13px] text-black text-left">
                    
                    {cardapio.pratoPrincipal} {/* Exibe o prato principal */}
                  </p>
                  <p className="text-[13px] text-black text-left">
                    
                    {cardapio.guarnicao} {/* Exibe a guarnição */}
                  </p>
                  <p className="text-[13px] text-black text-left">
                   
                    {cardapio.sobremesa} {/* Exibe a sobremesa */}
                  </p>
                  <p className="text-[13px] text-black text-left">
                   
                    {cardapio.salada} {/* Exibe a salada */}
                  </p>
                </>
              )}
            </div>
          </div>
        ))}
      </Carousel>
      {modalIsOpen && ( // Renderiza o modal se estiver aberto
        <ModalBemVida
          cardapio={currentCardapio} // Passa o cardápio atual para o modal
          onClose={closeModal} // Passa a função de fechamento
        />
      )}
    </>
  );
};

export default CardapioCardBemVida; // Exporta o componente para uso em outros arquivos
