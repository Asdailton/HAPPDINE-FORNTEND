// Importa o componente Modal do React e outras dependências necessárias.
import Modal from 'react-modal';
import reccept from '../../image/Cardapio/chefe.png';
import Calendar from './Calendar'; // (importação não utilizada neste código)
import { useState, useEffect } from 'react'; // Importa hooks do React para gerenciar estado e efeitos colaterais.
import setaDireita from '../../image/Cardapio/setaDireita.svg'; // Imagem da seta para a direita.
import setaEsquerda from '../../image/Cardapio/setaEsquerda.svg'; // Imagem da seta para a esquerda.

// Componente Chef que recebe props: isOpen, onRequestClose e conteudo.
const Chef = ({ isOpen, onRequestClose, conteudo }) => {
  // Declara os estados para armazenar os cardápios e o índice do cardápio selecionado.
  const [cardapios, setCardapios] = useState([]); 
  const [selectedIndex, setSelectedIndex] = useState(0);

  // useEffect para buscar os cardápios quando o componente é montado.
  useEffect(() => {
    const fetchCardapios = async () => {
      try {
        // Faz uma requisição para buscar os cardápios da API.
        const response = await fetch('http://127.0.0.1:8080/receitadochefe/cardapios');
        const data = await response.json(); // Converte a resposta em JSON.
        console.log('Dados recebidos da API:', data);

        const today = new Date(); // Obtém a data atual.
        const dayOfWeek = today.getDay(); // Obtém o dia da semana (0-6).
        const thisMonday = new Date(today); // Cria uma nova data para o dia atual.
        // Ajusta a data para a segunda-feira da semana atual.
        thisMonday.setDate(today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));

        // Cria um array para armazenar todos os dias da semana.
        const allDays = [];
        for (let i = 0; i < 7; i++) {
          const day = new Date(thisMonday);
          day.setDate(thisMonday.getDate() + i); // Adiciona os dias da semana.
          allDays.push({
            diaSemana: formatarDiaSemana(day), // Formata o dia da semana.
            data: day.toISOString().split('T')[0], // Converte a data para o formato ISO.
            content: 'Nenhum cardápio disponível', // Mensagem padrão para dias sem cardápio.
            id: day.toISOString().split('T')[0], // Usa a data como ID.
          });
        }

        // Formata os cardápios recebidos da API.
        const cardapiosFormatados = data.map((item) => ({
          id: item.id_cardapio,
          diaSemana: formatarDiaSemana(new Date(item.data)), // Formata o dia da semana.
          data: new Date(item.data).toISOString().split('T')[0], // Converte a data para o formato ISO.
          content: {
            prato_principal: item.prato_principal || 'Indisponível', // Define prato principal ou 'Indisponível'.
            guarnicao: item.guarnicao || 'Indisponível', // Define guarnição ou 'Indisponível'.
            sobremesa: item.sobremesa || 'Indisponível', // Define sobremesa ou 'Indisponível'.
            salada: item.salada || 'Indisponível', // Define salada ou 'Indisponível'.
          },
        }));

        // Atualiza allDays com os cardápios formatados.
        cardapiosFormatados.forEach((cardapio) => {
          const index = allDays.findIndex((d) => d.data === cardapio.data); // Encontra o índice do dia correspondente.
          if (index !== -1) {
            allDays[index] = {
              ...allDays[index],
              content: cardapio.content, // Atualiza o conteúdo do cardápio.
              id: cardapio.id, // Atualiza o ID do cardápio.
            };
          }
        });

        console.log('Cardápios formatados:', cardapiosFormatados);
        console.log('Todos os dias após merge:', allDays);

        setCardapios(allDays); // Armazena todos os dias com seus cardápios no estado.
      } catch (error) {
        console.error('Erro ao buscar os cardápios:', error); // Registra erros no console.
      }
    };

    fetchCardapios(); // Chama a função para buscar os cardápios.
  }, []); // O array vazio indica que o efeito deve ser executado apenas uma vez após a montagem do componente.

  // Função para formatar o dia da semana.
  const formatarDiaSemana = (data) => {
    return new Date(data)
      .toLocaleDateString('pt-BR', { weekday: 'long' }) // Retorna o dia da semana em português.
      .replace('.', ''); // Remove ponto final, se houver.
  };

  // Função para formatar a data.
  const formatarData = (data) => {
    return new Date(data)
      .toLocaleDateString('pt-BR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
      .replace(',', ''); // Formata a data para o formato desejado.
  };

  // Função para selecionar o próximo cardápio.
  const handleNext = () => {
    setSelectedIndex((prevIndex) => (prevIndex + 1) % cardapios.length); // Incrementa o índice e volta ao início se exceder o número de cardápios.
  };

  // Função para selecionar o cardápio anterior.
  const handlePrevious = () => {
    setSelectedIndex((prevIndex) => (prevIndex - 1 + cardapios.length) % cardapios.length); // Decrementa o índice e vai para o final se ficar negativo.
  };

  // Obtém o cardápio selecionado ou um objeto padrão se não houver cardápio disponível.
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

  // Verifica se o cardápio está disponível.
  const isCardapioDisponivel = selectedCardapio.content.prato_principal !== 'Indisponível';

  return (
    // Componente Modal que exibe os cardápios.
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose} // Função chamada ao fechar o modal.
      contentLabel="Moda da Casa"
      className="bg-white w-[92%] max-w-[600px] h-auto focus:outline-none shadow-lg md:w-[50%] lg:max-w-[600px]" // Estilos do modal.
      overlayClassName="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center" // Estilos para o overlay do modal.
      shouldCloseOnOverlayClick={true} // Permite fechar o modal ao clicar no overlay.
    >
      <div className="w-full p-8 md:p-10 bg-[#12818F] h-full"> {/* Estilos do conteúdo do modal */}
        <div className="flex items-center gap-4 mb-1"> {/* Alinha a imagem e o título */}
          <img src={reccept} className="w-12 h-auto" alt="Moda da Casa" /> {/* Imagem do chefe */}
          <h1 className="text-[36px] font-semibold text-white">Receita do Chefe</h1> {/* Título do modal */}
        </div>

        <div className="flex items-center gap-4 justify-start mb-6"> {/* Container para os botões e título do cardápio */}
          <button onClick={handlePrevious} className="focus:outline-none"> {/* Botão para cardápio anterior */}
            <img 
              src={setaEsquerda} 
              alt="Previous" 
              className="w-4 h-4 hover:opacity-80" // Estilo do botão de seta esquerda
            />
          </button>

          <h2 className="text-[20px] font-bold text-white">
            {selectedCardapio.diaSemana}, dia {formatarData(selectedCardapio.data)} {/* Exibe o dia da semana e data formatada */}
          </h2>

          <button onClick={handleNext} className="focus:outline-none"> {/* Botão para próximo cardápio */}
            <img 
              src={setaDireita} 
              alt="Next" 
              className="w-4 h-4 hover:opacity-80" // Estilo do botão de seta direita
            />
          </button>
        </div>

        <div className="text-left text-white font-semibold text-[16px]"> {/* Estilo para o conteúdo do cardápio */}
          {isCardapioDisponivel ? ( // Verifica se o cardápio está disponível
            <>
              <p className="mb-1">Prato Principal: {selectedCardapio.content.prato_principal}</p>
              <p className="mb-1">Guarnição: {selectedCardapio.content.guarnicao}</p>
              <p className="mb-1">Sobremesa: {selectedCardapio.content.sobremesa}</p>
              <p>Salada: {selectedCardapio.content.salada}</p>
            </>
          ) : (
            <p>Nenhum cardápio disponível para este dia.</p> // Mensagem se não houver cardápio
          )}
        </div>

        <button 
          onClick={onRequestClose} // Fecha o modal ao clicar no botão
          className="mt-6 bg-white text-[#12818F] rounded py-2 px-4" // Estilo do botão de fechar
        >
          Fechar
        </button>
      </div>
    </Modal>
  );
};

export default Chef; // Exporta o componente para uso em outras partes da aplicação.
