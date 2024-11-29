import React from 'react';
import R01 from '../../image/Fotos_Carrosel/main.svg';

function Carrossel() {
  return (
    <div className='relative w-full overflow-hidden'>
      <img
        src={R01}
        alt="Banner"
        className='w-full h-[532px] md:h-[300px] lg:h-[400px] 2xl:h-[550px] sm:h-[100px] object-cover' // Ajuste a altura com base no tamanho da tela
      />
    </div>
  );
}

export default Carrossel;
