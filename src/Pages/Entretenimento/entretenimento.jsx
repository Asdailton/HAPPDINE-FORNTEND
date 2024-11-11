import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import image1 from '../../image/Entretenimento/DineMatchLogo.png'; 
import image2 from '../../image/Entretenimento/FlappyChickenLogo.png'; 

const Entretenimento = () => {
  const { t } = useTranslation();
  
  // Define a largura e altura como variáveis
  const imageSize = { width: '441px', height: '348px' };

  return (
    <div className="bg-lightBackground dark:bg-darkBackground min-h-screen text-lightText dark:text-darkText">
      <Navbar />
      <div className="flex flex-col items-center mb-[160px]">
        <div className="flex items-center w-full mb-[60px]">
          <div className="flex-1 flex justify-end pr-2 sm:pr-4 mt-[110px]">
            <hr className="border-t border-gray-300 dark:border-gray-600" style={{ width: '20%' }} />
          </div>
          <h1 className="mt-[110px] px-4 text-[36px] sm:text-xl md:text-5xl lg:text-3xl font-bold text-center whitespace-nowrap">
            {t('ENTRETENIMENTO')}
          </h1>
          <div className="flex-1 flex justify-start pl-4 sm:pl-4 mt-[110px]">
            <hr className="border-t border-gray-300 dark:border-gray-600" style={{ width: '20%' }} />
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-center items-center mt-9 px-4">
          <div className="flex flex-col items-center mb-10 md:mb-0 md:mr-32">
            <Link to="/entretenimento/dine-match/">
              <img src={image1} alt="DINE MATCH" style={imageSize} />
            </Link>
            <h2 className="font-bold text-[20px] mt-7">DINE MATCH</h2>
            <p className="mt-2 text-center">{t('Por meio dos seus pratos prediletos')}</p>
            <p className="text-center">{t('descubra a fila que mais combina com você!')}</p>
            <Link to="/entretenimento/dine-match">
              <button className="w-[120px] h-[45px] bg-[#4E5256] text-white rounded-none hover:bg-gray-700 transition transform hover:scale-105 mt-7 font-bold">
                {t('INICIAR')}
              </button>
            </Link>
            <div className="block md:hidden w-full border-t border-gray-300 dark:border-gray-600 my-4" />
          </div>

          <div className="hidden md:block h-[80%] border-l border-gray-300 dark:border-gray-600 mx-2" />

          <div className="flex flex-col items-center">
            <Link to="/entretenimento/flappybird/tela_inicial">
              <img src={image2} alt="FLAPPYCHICKEN" style={imageSize} />
            </Link>
            <h2 className="font-bold mt-7 text-[20px]">FLAPPYCHICKEN</h2>
            <p className="mt-2 text-center">{t('Desvie dos obstáculos e se divirta')}</p>
            <p className="text-center">{t('com o FLAPPYCHICKEN')}</p>
            <Link to="/entretenimento/flappybird/tela_inicial">
              <button className="w-[120px] h-[45px] bg-[#4E5256] text-white rounded-none hover:bg-gray-700 transition transform hover:scale-105 mt-7 font-bold"> 
                {t('INICIAR')}
              </button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Entretenimento;
