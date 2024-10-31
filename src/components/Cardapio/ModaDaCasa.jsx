import React, { useState, useEffect, useCallback } from 'react';
import Modal from 'react-modal'; // Importa o componente Modal para exibição de modais
import fashionOfHome from '../../image/Cardapio/Panela.png'; // Imagem do título
import setaDireita from '../../image/Cardapio/setaDireita.svg'; // Ícone seta direita
import setaEsquerda from '../../image/Cardapio/setaEsquerda.svg'; // Ícone seta esquerda

// Componente ModaDaCasa recebe props 'isOpen' e 'onRequestClose' para controlar o modal
const ModaDaCasa = ({ isOpen, onRequestClose }) => {
  const [cardapios, setCardapios] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [error, setError] = useState(null);

  const fetchCardapios = useCallback(async () => {
    try {
      const response = await fetch('http://127.0.0.1:8080/modadacasa/cardapios');
      const data = await response.json();
      console.log('Dados recebidos da API:', data);

      const formattedDays = getFormattedDays(data);
      setCardapios(formattedDays);
    } catch (err) {
      console.error('Erro ao buscar os cardápios:', err);
      setError('Não foi possível carregar os cardápios.');
    }
  }, []);

  useEffect(() => {
    fetchCardapios();
  }, [fetchCardapios]);

  const getFormattedDays = (data) => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const thisMonday = new Date(today);

    if (dayOfWeek === 0) { // Domingo
      thisMonday.setDate(today.getDate() - 6);
    } else {
      thisMonday.setDate(today.getDate() - (dayOfWeek - 1));
    }

    const allDays = Array.from({ length: 7 }, (_, i) => {
      const day = new Date(thisMonday);
      day.setDate(thisMonday.getDate() + i);
      return {
        diaSemana: formatarDiaSemana(day),
        data: day.toISOString().split('T')[0], // Formato YYYY-MM-DD
        content: 'Nenhum cardápio disponível',
        id: day.toISOString().split('T')[0],
      };
    });

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

    return allDays; // Retorna todos os dias
  };

  const formatarDiaSemana = (data) =>
    new Date(data).toLocaleDateString('pt-BR', { weekday: 'long' }).replace('.', '');

  const formatarData = (data) =>
    new Date(data).toLocaleDateString('pt-BR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).replace(',', '');

  const handleNext = () =>
    setSelectedIndex((prevIndex) => (prevIndex + 1) % cardapios.length);

  const handlePrevious = () =>
    setSelectedIndex((prevIndex) => (prevIndex - 1 + cardapios.length) % cardapios.length);

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

  // Verifica se o comprimento do array é 7
  const isCardapioCompleto = cardapios.length === 7;

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
          <img src={fashionOfHome} className="w-10 md:w-12 h-auto" alt="Moda da Casa" />
          <h1 className="text-[20px] md:text-[36px] font-bold text-white">Moda da Casa</h1>
        </div>

        {/* Navegação entre os dias */}
        <div className="flex items-center gap-4 justify-start mb-6 mt-3">
          <button onClick={handlePrevious} className="focus:outline-none">
            <img src={setaEsquerda} alt="Previous" className="w-4 h-4 hover:opacity-80" />
          </button>

          <h2 className="text-[15px] md:text-[20px] font-bold text-white ">
            {isCardapioCompleto ? (
              `${selectedCardapio.diaSemana}, dia ${formatarData(selectedCardapio.data)}`
            ) : (
              "Cardápio em Produção"
            )}
          </h2>

          <button onClick={handleNext} className="focus:outline-none">
            <img src={setaDireita} alt="Next" className="w-4 h-4 hover:opacity-80" />
          </button>
        </div>

        <div className="text-left text-white font-bold text-[16px]">
          {error ? (
            <p className="text-white">{error}</p>
          ) : (
            <>
              {isCardapioCompleto ? (
                <>
                  <p className="text-[12px] md:text-[16px] mb-1">{selectedCardapio.content.prato_principal}</p>
                  <p className="text-[12px] md:text-[16px] mb-1">{selectedCardapio.content.guarnicao}</p>
                  <p className="text-[12px] md:text-[16px] mb-1">{selectedCardapio.content.sobremesa}</p>
                  <p className="text-[12px] md:text-[16px] mb-1">{selectedCardapio.content.salada}</p>
                </>
              ) : (
                <p className="text-[12px] md:text-[16px] mb-1 text-white">Cardápio em Produção.</p>
              )}
            </>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ModaDaCasa; // Exporta o componente
