import Modal from 'react-modal';
import reccept from '../../image/Cardapio/chefe.png';
import Calendar from './Calendar';
import { useState, useEffect } from 'react';

const Chef = ({ isOpen, onResquestClose, conteudo }) => {
  const [cardapios, setCardapios] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    const fetchCardapios = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8080/receitadochefe/cardapios');
        const data = await response.json();
        console.log('Dados recebidos da API:', data);

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

        console.log('Cardápios formatados:', cardapiosFormatados);
        console.log('Todos os dias após merge:', allDays);

        setCardapios(allDays);
      } catch (error) {
        console.error('Erro ao buscar os cardápios:', error);
      }
    };

    fetchCardapios();
  }, []);

  const formatarDiaSemana = (data) =>
    new Date(data).toLocaleDateString('pt-BR', { weekday: 'long' }).replace('.', '');

  const formatarData = (data) =>
    new Date(data)
      .toLocaleDateString('pt-BR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
      .replace(',', '');

  const handleNext = () => {
    setSelectedIndex((prevIndex) => (prevIndex + 1) % cardapios.length);
  };

  const handlePrevious = () => {
    setSelectedIndex((prevIndex) => (prevIndex - 1 + cardapios.length) % cardapios.length);
  };

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

  const isCardapioDisponivel = selectedCardapio.content.prato_principal !== 'Indisponível';

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onResquestClose}
      contentLabel="Receita do Chefe"
      className="bg-white w-[90%] max-w-[500px] h-auto focus:outline-none shadow-lg md:w-[50%] lg:max-w-[600px]"
      overlayClassName="fixed inset-0 bg-black bg-opacity-20 flex justify-center items-center"
    >
      <div className="w-full h-auto p-4 md:p-10 bg-[#12818F]">
        {conteudo}
        <div className="w-full flex items-center gap-4 py-3">
          <img src={reccept} className="w-[7%] md:w-[5%] h-auto" alt="Receita" />
          <h1 className="text-white text-[36px]  font-semibold">Receita do Chefe</h1>
        </div>

        {/* Header com título e setas de navegação */}
        <div className="flex items-center gap-4 justify-start mb-6">
          <button
            className="text-white text-[12px] hover:text-gray-300 font-light"
            onClick={handlePrevious}
            style={{ fontFamily: 'Arial, sans-serif' }}
          >
            &#9664; {/* Seta para esquerda */}
          </button>

          <h2 className="text-[20px] font-bold text-white">
            {selectedCardapio.diaSemana}, dia {selectedCardapio.data}
          </h2>

          <button
            className="text-white text-[12px] hover:text-gray-300 font-light"
            onClick={handleNext}
            style={{ fontFamily: 'Arial, sans-serif' }}
          >
            &#9654; {/* Seta para direita */}
          </button>
        </div>

        {/* Conteúdo do cardápio */}
        <div className="text-left text-white font-semibold text-[16px]">
          {isCardapioDisponivel ? (
            <>
              <p className="mb-1">{selectedCardapio.content.prato_principal}</p>
              <p className="mb-1">{selectedCardapio.content.guarnicao}</p>
              <p className="mb-1">{selectedCardapio.content.sobremesa}</p>
              <p className="mb-1">{selectedCardapio.content.salada}</p>
            </>
          ) : (
            <p className="text-yellow-400">Cardápio indisponível para este dia.</p>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default Chef;
