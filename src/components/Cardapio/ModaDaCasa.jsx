import React, { useState, useEffect } from 'react';
import Modal from 'react-modal'; // Importa o componente Modal para exibição de modais
import fashionOfHome from '../../image/Cardapio/Panela.png'; // Imagem do título
import setaDireita from '../../image/Cardapio/setaDireita.svg'; // Ícone seta direita
import setaEsquerda from '../../image/Cardapio/setaEsquerda.svg'; // Ícone seta esquerda

// Componente ModaDaCasa recebe props 'isOpen' e 'onRequestClose' para controlar o modal
const ModaDaCasa = ({ isOpen, onRequestClose }) => {
  const [cardapios, setCardapios] = useState([]); // Armazena cardápios
  const [selectedIndex, setSelectedIndex] = useState(0); // Controla o índice do cardápio selecionado

  // Executa ao montar o componente para buscar os cardápios da API
  useEffect(() => {
    const fetchCardapios = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8080/modadacasa/cardapios'); // Faz requisição à API
        const data = await response.json(); // Converte a resposta para JSON

        // Obtém a data atual e calcula a segunda-feira da semana
        const today = new Date();
        const dayOfWeek = today.getDay();
        const thisMonday = new Date(today);
        thisMonday.setDate(today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));

        // Cria uma lista com os 7 dias da semana atual
        const allDays = [];
        for (let i = 0; i < 7; i++) {
          const day = new Date(thisMonday);
          day.setDate(thisMonday.getDate() + i);
          allDays.push({
            diaSemana: formatarDiaSemana(day), // Nome do dia da semana
            data: day.toISOString().split('T')[0], // Data no formato ISO
            content: 'Nenhum cardápio disponível', // Conteúdo padrão
            id: day.toISOString().split('T')[0], // ID como data
          });
        }

        // Formata os dados recebidos da API
        const cardapiosFormatados = data.map((item) => ({
          id: item.id_cardapio,
          diaSemana: formatarDiaSemana(new Date(item.data)),
          data: new Date(item.data).toISOString().split('T')[0],
          content: {
            prato_principal: item.prato_principal || 'Indisponível',
            guarnicao: item.guarnicao || 'Indisponível',
            sobremesa: item.sobremesa || 'Indisponível',
            salada: item.salada || 'Indisponível',
          },
        }));

        // Substitui o conteúdo dos dias correspondentes aos cardápios
        cardapiosFormatados.forEach((cardapio) => {
          const index = allDays.findIndex((d) => d.data === cardapio.data);
          if (index !== -1) {
            allDays[index] = {
              ...allDays[index],
              content: cardapio.content,
              id: cardapio.id,
            };
          }
        });

        setCardapios(allDays); // Atualiza o estado com todos os dias e cardápios
      } catch (error) {
        console.error('Erro ao buscar os cardápios:', error); // Loga erros na requisição
      }
    };

    fetchCardapios(); // Chama a função para buscar cardápios
  }, []);

  // Função para formatar o nome do dia da semana
  const formatarDiaSemana = (data) => {
    return new Date(data)
      .toLocaleDateString('pt-BR', { weekday: 'long' }) // Converte para string com o dia da semana
      .replace('.', ''); // Remove o ponto do nome do dia
  };

  // Função para formatar a data no formato brasileiro
  const formatarData = (data) => {
    return new Date(data)
      .toLocaleDateString('pt-BR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
      .replace(',', ''); // Remove a vírgula da data
  };

  // Função para ir para o próximo cardápio
  const handleNext = () => {
    setSelectedIndex((prevIndex) => (prevIndex + 1) % cardapios.length);
  };

  // Função para voltar ao cardápio anterior
  const handlePrevious = () => {
    setSelectedIndex((prevIndex) => (prevIndex - 1 + cardapios.length) % cardapios.length);
  };

  // Cardápio atualmente selecionado ou valor padrão se não houver dados
  const selectedCardapio = cardapios[selectedIndex] || {
    diaSemana: 'N/A',
    data: 'N/A',
    content: {
      prato_principal: 'Indisponível',
      guarnicao: 'Indisponível',
      sobremesa: 'Indisponível',
      salada: 'Indisponível',
    },
  };

  // Verifica se o cardápio está disponível
  const isCardapioDisponivel = selectedCardapio.content.prato_principal !== 'Indisponível';

  return (
    <Modal
      isOpen={isOpen} // Define se o modal está aberto
      onRequestClose={onRequestClose} // Fecha o modal ao clicar fora ou no botão fechar
      contentLabel="Moda da Casa" // Rótulo para acessibilidade
      className="bg-white w-[92%] max-w-[600px] h-auto focus:outline-none shadow-lg md:w-[50%] lg:max-w-[600px]"
      overlayClassName="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center"
      shouldCloseOnOverlayClick={true} // Permite fechar ao clicar fora do modal
    >
      <div className="w-full p-8 md:p-10 bg-[#007BC0] h-full">
        {/* Título com imagem e texto */}
        <div className="flex items-center gap-4 mb-1">
          <img src={fashionOfHome} className="w-12 h-auto" alt="Moda da Casa" />
          <h1 className="text-[36px] font-semibold text-white">Moda da Casa</h1>
        </div>

        {/* Navegação entre os dias */}
        <div className="flex items-center gap-4 justify-start mb-6">
          <button onClick={handlePrevious} className="focus:outline-none">
            <img src={setaEsquerda} alt="Previous" className="w-4 h-4 hover:opacity-80" />
          </button>

          <h2 className="text-[20px] font-bold text-white">
            {selectedCardapio.diaSemana}, dia {formatarData(selectedCardapio.data)}
          </h2>

          <button onClick={handleNext} className="focus:outline-none">
            <img src={setaDireita} alt="Next" className="w-4 h-4 hover:opacity-80" />
          </button>
        </div>

        {/* Exibe o conteúdo do cardápio ou mensagem padrão */}
        <div className="text-left text-white font-semibold text-[16px]">
          {isCardapioDisponivel ? (
            <>
              <p className="mb-1">{selectedCardapio.content.prato_principal}</p>
              <p className="mb-1">{selectedCardapio.content.guarnicao}</p>
              <p className="mb-1">{selectedCardapio.content.sobremesa}</p>
              <p className="mb-1">{selectedCardapio.content.salada}</p>
            </>
          ) : (
            <p className="text-white">Ainda estamos preparando o cardápio, volte mais tarde</p>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ModaDaCasa; // Exporta o componente
