import React, { useState, useEffect } from "react"; // Importa React e hooks useState e useEffect
import Carousel from 'react-multi-carousel'; // Importa o componente Carousel
import 'react-multi-carousel/lib/styles.css'; // Importa os estilos do Carousel
import editar from '../../../../image/CardapioAdmin/Editar.svg'; // Importa a imagem do ícone de editar
import ModalReceitaChefe from "./ModalReceitaChefe"; // Importa o componente do modal
import axios from 'axios'; // Importa a biblioteca axios para requisições HTTP

// Define a configuração de responsividade do Carousel
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

// Define o componente funcional CardapioCardReceitaChefe
const CardapioCardReceitaChefe = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false); // Estado para controlar a abertura do modal
    const [cardapios, setCardapios] = useState([]); // Estado para armazenar os cardápios
    const [currentCardapio, setCurrentCardapio] = useState(null); // Para armazenar o cardápio atual

    // Função para abrir o modal com o cardápio atual
    const openModal = (cardapio) => {
        setCurrentCardapio(cardapio);
        setModalIsOpen(true);
    };

    // Formata o dia da semana a partir de uma data
    const formatarDiaSemana = (data) => {
        return new Date(data).toLocaleDateString('pt-BR', { weekday: 'short' }).replace('.', '');
    };

    // Formata a data para o formato desejado
    const formatarData = (data) => {
        return new Date(data).toLocaleDateString('pt-BR', { day: 'numeric', month: 'short' });
    };

    // Função assíncrona para buscar os cardápios da API
    const fetchCardapios = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8080/receitadochefe/cardapios'); // Faz a requisição para a API
            const data = response.data; // Obtém os dados da resposta
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

            // Cria um array com os dias da semana atual
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

            // Atualiza os dias da semana com os cardápios formatados
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

            setCardapios(allDays); // Atualiza o estado dos cardápios
        } catch (error) {
            console.error('Erro ao buscar os cardápios:', error);

            // Em caso de erro, define todos os cardápios como "Nenhum disponível"
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

            setCardapios(allDays); // Atualiza o estado com os dias
        }
    };

    // Atualiza os cardápios ao fechar o modal
    const closeModal = () => {
        atualizarCardapios(); // Atualiza os cardápios ao fechar o modal
        setModalIsOpen(false);
    };

    // Executa a busca de cardápios ao montar o componente
    useEffect(() => {
        fetchCardapios();
    }, []);

    return (
        <>
            <Carousel
                responsive={responsive} // Passa a configuração de responsividade
                centerMode={false} // Não ativa o modo de centro
                arrows={true} // Ativa as setas de navegação
                infinite={true} // Ativa a rolagem infinita
                containerClass="flex overflow-hidden p-4" // Classes do container
                itemClass="flex justify-center mx-4" // Classes dos itens
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
                                    onClick={() => openModal(cardapio)} // Passa o cardápio atual ao abrir o modal
                                    className="bg-transparent border-none p-0 cursor-pointer"
                                    aria-label="Open Modal" // Acessibilidade
                                >
                                    <img 
                                        src={editar} 
                                        alt="Editar" // Texto alternativo para a imagem
                                    />
                                </button>
                            </div>
                            
                            <h2 className="text-[16px] text-[#12818F] font-semibold mt-[-6px] mb-[9px]">{cardapio.data}</h2>
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
                ))}
            </Carousel>
            
            <ModalReceitaChefe 
                isOpen={modalIsOpen} // Passa a prop de abertura do modal
                onRequestClose={closeModal} // Passa a função de fechar o modal
                cardapio={currentCardapio} // Passa o cardápio atual para o modal
            />
        </>
    );
};

export default CardapioCardReceitaChefe; // Exporta o componente
