import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Navbar from '../../components/Navbar/Navbar.jsx';
import Carrosel from '../../components/Carrosel/carrosel.jsx';
import Monitoramento from '../../components/Monitoramento/monitoramento.jsx';
import '../../i18n/i18n.js';
import Footer from '../../components/Footer/footer.jsx';
import bannerdown from '../../image/bannerdown.png';
import Avaliacoes from '../../components/FeedBacks/Avaliacoes.jsx';

import ModalComponent from '../../components/FeedBacks/Modal.jsx';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Beneficios from '../../components/Beneficios.jsx';


AOS.init({
  duration: 1200,
  easing: 'ease-in-out',
});

const Home = () => {
  const { t } = useTranslation();


  return (
    <div className="overflow-x-hidden dark:bg-darkBackground">
      <Navbar />
      <Carrosel />
      <Monitoramento />
      <div className=" w-[100%]">
            <img 
        className="w-full 2xl:h-[500px] md:h-auto " 
        src={bannerdown} 
        alt="Banner" 
      />

      </div>

     <div>
      <Beneficios />
     </div>

      <div
        className="w-[100%] md:w-[100%] md:h-[90vh] h-[90vh] bg-fixed"
        style={{
          background: 'linear-gradient(to left, rgba(78, 82, 86, 1) 57%, rgba(46, 48, 51, 1) 100%)',
        }}
      >
        <div className="md:justify-start pl-[45px] md:pl-[80px] pt-[80px] flex">
          <h1 className="text-white text-[40px] font-semibold">{t('#BatePapo!')}</h1>
        </div>
        <div className="justify-start pl-[45px] md:pl-[80px] pt-[2px] flex">
          <h1 className="text-white text-[12px] font-medium">
            {t('Compartilhe todas as suas experiências com o HAPPDINE!')}
          </h1>
        </div>
        <div className='md:pl-[34px]'> 
           <Avaliacoes/>
        </div>
       
        
      </div>
      <Footer/>
    </div>
  );
};

export default Home;
