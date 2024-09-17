import React, { useState } from 'react';
import folha from '../../../../image/CardapioAdmin/Folha.svg';
import ModalBemVida from './ModalBemVida';
import Card from './CardapioCard';
import Modal from 'react-modal';

// Certifique-se de que `#root` existe no seu HTML
Modal.setAppElement('#root');

const SectionDeBemVida = () => {


  return (
    <div className="w-full bg-[#00884A] pt-[63px] pb-[63px] px-[50px] flex items-start space-x-6 justify-between">
      <div className="flex flex-col justify-center items-center mt-[60px]">

          <img 
            src={folha} 
            alt="Folha" 
            className="mb-4 w-[72px]" 
          />

        <p className="text-white text-lg">De Bem Com a Vida</p>
      </div>
      <div className="w-full sm:w-[90%] md:w-[80%] lg:w-[80%] xl:w-[80%] 2xl:w-[86%] mx-auto">
        <Card />
      </div>
     
    </div>
  );
};

export default SectionDeBemVida;
