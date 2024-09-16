import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Navbar from '../../components/Navbar/Navbar.jsx';
import Carrosel from '../../components/Carrosel/carrosel.jsx';
import Monitoramento from '../../components/Monitoramento/monitoramento.jsx';
import '../../i18n/i18n.js';
import Footer from '../../components/Footer/footer.jsx';
import bannerdown from '../../image/bannerdown.png';
import Avaliacoes from '../../components/Avaliacoes.jsx';
import mais from '../../image/+.png';
import ModalComponent from '../../components/Modal.jsx';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Beneficios from '../../components/Beneficios.jsx';

AOS.init({
  duration: 1200,
  easing: 'ease-in-out',
});

const Home = () => {
  const { t } = useTranslation();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  useEffect(() => {
    AOS.init({
      offset: 200,
      duration: 1000,
      easing: 'ease-in',
      delay: 80,
    });
  }, []);

  return (
    <div className="overflow-x-hidden dark:bg-darkBackground">
      <Navbar />
      <Carrosel />
      <Monitoramento />
      <div className="bg-red-600 w-[100%]">
        <img className="w-full h-full" src={bannerdown} alt="Banner" />
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
        <div className="md:justify-start pl-[80px] pt-[80px] flex">
          <h1 className="text-white text-[40px] font-semibold">{t('#BatePapo!')}</h1>
        </div>
        <div className="justify-start pl-[80px] pt-[2px] flex">
          <h1 className="text-white text-[12px] font-medium">
            {t('Compartilhe todas as suas experiências com o HAPPDINE!')}
          </h1>
        </div>
        <Avaliacoes />
        <div className="bg-[#4E5256] mt-[20px] w-[20%] h-[40px] ml-[47px] md:w-[7%] md:mt-[40px] flex">
          <button onClick={openModal} className="w-full justify-center flex items-center">
            <img src={mais} alt={t('abrir modal')} />
          </button>
        </div>
        <ModalComponent isOpen={modalIsOpen} onRequestClose={closeModal} />
      </div>
      <Footer/>
    </div>
  );
};

export default Home;
