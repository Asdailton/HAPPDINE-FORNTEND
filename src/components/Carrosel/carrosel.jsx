import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import R01 from '../../image/Fotos_Carrosel/restaurante-01.jpg'
import R02 from '../../image/Fotos_Carrosel/restaurante-02.jpg'
import R03 from '../../image/Fotos_Carrosel/restaurante-03.jpg'


function Carrosel() {
  const slides = [ R01, R02, R03];

  return (
    <div className='relative w-full overflow-hidden'>
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 3000, // Tempo entre transições (em milissegundos)
          disableOnInteraction: false, // Continua o autoplay mesmo se o usuário interagir
        }}
        loop={true} // Permite que o carrossel seja infinito
        className="w-full" // Garante que o Swiper ocupe toda a largura do contêiner pai
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className='w-full'>
            <img
              src={slide}
              alt={`Slide ${index}`}
              className='w-full h-[532px] md:h-[300px] lg:h-[400px] 2xl:h-[500px] sm:h-[100px] object-cover' // Ajuste a altura com base no tamanho da tela
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Carrosel;
