import Modal from 'react-modal'; // Importa o componente Modal do react-modal.
import DBem from '../../image/Cardapio/Folha.png'; // Importa imagem para o modal.
import { useState, useEffect, useCallback } from 'react'; // Importa hooks do React.
import setaDireita from '../../image/Cardapio/setaDireita.svg'; // Importa ícone da seta direita.
import setaEsquerda from '../../image/Cardapio/setaEsquerda.svg'; // Importa ícone da seta esquerda.

// Componente DeBem que recebe props para controlar abertura e fechamento do modal.
const DeBem = ({ isOpen, onRequestClose }) => {
  // Define estados para armazenar cardápios, índice selecionado e possíveis erros.
  const [cardapios, setCardapios] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [error, setError] = useState(null);

  // Função que busca os cardápios na API.
  const fetchCardapios = useCallback(async () => {
    try {
      const response = await fetch('http://127.0.0.1:8080/debemcomavida/cardapios'); // Chama a API.
      const data = await response.json(); // Converte resposta para JSON.
      console.log('Dados recebidos da API:', data); // Log dos dados recebidos.

      const formattedDays = getFormattedDays(data); // Formata os dias e cardápios.
      setCardapios(formattedDays); // Atualiza estado com os cardápios formatados.
    } catch (err) {
      console.error('Erro ao buscar os cardápios:', err); // Exibe erro no console.
      setError('Não foi possível carregar os cardápios.'); // Define mensagem de erro.
    }
  }, []);

  // Executa a função fetchCardapios apenas uma vez ao montar o componente.
  useEffect(() => {
    fetchCardapios();
  }, [fetchCardapios]);

  // Função que formata os dias da semana com base nos dados recebidos.
  const getFormattedDays = (data) => {
    const today = new Date(); // Obtém a data atual.
    const dayOfWeek = today.getDay(); // Obtém o dia da semana (0 = domingo).
    const thisMonday = new Date(today); 
    thisMonday.setDate(today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1)); // Calcula a segunda-feira da semana atual.

    // Cria uma lista com todos os dias da semana.
    const allDays = Array.from({ length: 7 }, (_, i) => {
      const day = new Date(thisMonday);
      day.setDate(thisMonday.getDate() + i); // Define cada dia.
      return {
        diaSemana: formatarDiaSemana(day),
        data: day.toISOString().split('T')[0], // Formata a data como string ISO.
        content: 'Nenhum cardápio disponível', // Conteúdo padrão.
        id: day.toISOString().split('T')[0],
      };
    });

    // Substitui dias na lista com os cardápios recebidos da API.
    data.forEach((item) => {
      const index = allDays.findIndex((d) => d.data === new Date(item.data).toISOString().split('T')[0]);
      if (index !== -1) {
        allDays[index] = {
          ...allDays[index],
          content: {
            prato_principal: item.prato_principal || 'Indisponível',
            guarnicao: item.guarnicao || 'Indisponível',
            sobremesa: item.sobremesa || 'Indisponível',
            salada: item.salada || 'Indisponível',
          },
          id: item.id_cardapio,
        };
      }
    });

    return allDays; // Retorna a lista formatada.
  };

  // Função para formatar o dia da semana.
  const formatarDiaSemana = (data) => 
    new Date(data).toLocaleDateString('pt-BR', { weekday: 'long' }).replace('.', '');

  // Função para formatar a data no formato 'dia de mês de ano'.
  const formatarData = (data) => 
    new Date(data).toLocaleDateString('pt-BR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).replace(',', '');

  // Avança para o próximo cardápio na lista.
  const handleNext = () => 
    setSelectedIndex((prevIndex) => (prevIndex + 1) % cardapios.length);

  // Volta para o cardápio anterior na lista.
  const handlePrevious = () => 
    setSelectedIndex((prevIndex) => (prevIndex - 1 + cardapios.length) % cardapios.length);

  // Define o cardápio selecionado com base no índice atual.
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

  // Renderiza o modal com o conteúdo.
  return (
    <Modal
      isOpen={isOpen} // Controla se o modal está aberto.
      onRequestClose={onRequestClose} // Fecha o modal ao clicar fora.
      contentLabel="De Bem Com a Vida"
      className="bg-white w-[92%] max-w-[600px] h-auto shadow-lg md:w-[50%] lg:max-w-[600px]"
      overlayClassName="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center"
      shouldCloseOnOverlayClick={true}
    >
      <div className="w-full p-8 md:p-10 bg-[#219557] h-full">
        <div className="flex items-center gap-4 mb-1">
          <img src={DBem} className="w-12 h-auto" alt="Moda da Casa" />
          <h1 className="text-[36px] font-semibold text-white">De Bem Com a Vida</h1>
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
          {error ? (
            <p className="text-white">{error}</p>
          ) : isCardapioDisponivel ? (
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

export default DeBem;
