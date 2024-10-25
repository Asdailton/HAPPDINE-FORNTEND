import Modal from 'react-modal' // Importa o componente Modal para exibir uma janela modal.
import grill from '../../image/Cardapio/Grill.png' // Imagem do "Grill".
import { useState, useEffect } from 'react'; // Hooks do React para estado e efeito colateral.

import setaDireita from '../../image/Cardapio/setaDireita.svg' // Imagem da seta direita.
import setaEsquerda from '../../image/Cardapio/setaEsquerda.svg' // Imagem da seta esquerda.

const Grill = ({isOpen, onRequestClose, conteudo}) => { 
  const [cardapios, setCardapios] = useState([]); // Estado para armazenar cardápios.
  const [selectedIndex, setSelectedIndex] = useState(0); // Controla o índice do cardápio exibido.

  // Hook de efeito para buscar dados da API quando o componente é montado.
  useEffect(() => {
    const fetchCardapios = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8080/debemcomavida/cardapios'); 
        const data = await response.json(); // Converte a resposta para JSON.

        const today = new Date(); // Obtém a data atual.
        const dayOfWeek = today.getDay(); // Obtém o dia da semana.
        const thisMonday = new Date(today); 
        thisMonday.setDate(today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1)); // Define a segunda-feira da semana atual.

        const allDays = []; // Cria um array para os sete dias da semana.
        for (let i = 0; i < 7; i++) {
          const day = new Date(thisMonday);
          day.setDate(thisMonday.getDate() + i); // Adiciona um dia à data.
          allDays.push({
            diaSemana: formatarDiaSemana(day),
            data: day.toISOString().split('T')[0], 
            content: 'Nenhum cardápio disponível',
            id: day.toISOString().split('T')[0],
          });
        }

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

        // Integra os cardápios com os dias da semana.
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

        setCardapios(allDays); // Atualiza o estado com os cardápios formatados.
      } catch (error) {
        console.error('Erro ao buscar os cardápios:', error); // Exibe erro em caso de falha na requisição.
      }
    };

    fetchCardapios(); // Chama a função de busca.
  }, []);

  // Formata o nome do dia da semana para exibição.
  const formatarDiaSemana = (data) => {
    return new Date(data)
      .toLocaleDateString('pt-BR', { weekday: 'long' })
      .replace('.', '');
  };

  // Formata a data para o formato "dia de mês de ano".
  const formatarData = (data) => {
    return new Date(data)
      .toLocaleDateString('pt-BR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
      .replace(',', '');
  };

  // Avança para o próximo cardápio.
  const handleNext = () => {
    setSelectedIndex((prevIndex) => (prevIndex + 1) % cardapios.length);
  };

  // Retorna para o cardápio anterior.
  const handlePrevious = () => {
    setSelectedIndex((prevIndex) => (prevIndex - 1 + cardapios.length) % cardapios.length);
  };

  // Cardápio selecionado atualmente.
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

  // Verifica se há um cardápio disponível.
  const isCardapioDisponivel = selectedCardapio.content.prato_principal !== 'Indisponível';

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Moda da Casa"
      className="bg-white w-[92%] max-w-[600px] h-auto focus:outline-none shadow-lg md:w-[50%] lg:max-w-[600px]"
      overlayClassName="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center"
      shouldCloseOnOverlayClick={true}
    >
      <div className="w-full p-8 md:p-10 bg-[#9E2896] h-full">
        <div className="flex items-center gap-4 mb-1">
          <img src={grill} className="w-12 h-auto" alt="Moda da Casa" />
          <h1 className="text-[36px] font-semibold text-white">Grill</h1>
        </div>

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
}

export default Grill;
