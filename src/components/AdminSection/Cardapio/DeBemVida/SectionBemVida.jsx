import React, { useState } from 'react'; // Importa o React e useState, embora useState não esteja sendo usado aqui.
import folha from '../../../../image/CardapioAdmin/Folha.svg'; // Importa a imagem da folha.

import Card from './CardapioCard'; // Importa o componente CardapioCard.
import Modal from 'react-modal'; // Importa o Modal da biblioteca react-modal.

// Certifique-se de que `#root` existe no seu HTML
Modal.setAppElement('#root'); // Define o elemento de app para acessibilidade do Modal.

const SectionDeBemVida = () => {
  // Componente funcional SectionDeBemVida
  return (
    <div className="w-full bg-[#00884A] pt-[63px] pb-[63px] px-[50px] flex items-start space-x-6 justify-between">
      {/* Div principal com classes de estilo para largura, cor de fundo, padding e layout flex */}
      <div className="flex flex-col justify-center items-center mt-[60px]">
        {/* Div para o título e a imagem */}
        <img 
          src={folha} // Fonte da imagem
          alt="Folha" // Texto alternativo para a acessibilidade
          className="mb-4 w-[72px]" // Classe para margem e largura da imagem
        />

        <p className="text-white text-lg">De Bem Com a Vida</p>
        {/* Texto do título, estilizado em branco e com tamanho de fonte grande */}
      </div>
      <div className="w-full sm:w-[90%] md:w-[80%] lg:w-[80%] xl:w-[80%] 2xl:w-[86%] mx-auto">
        {/* Div para os cards, responsiva com diferentes larguras em breakpoints */}
        <Card /> 
        {/* Renderiza o componente Card que provavelmente exibe os itens do cardápio */}
      </div>
    </div>
  );
};

export default SectionDeBemVida; // Exporta o componente SectionDeBemVida
