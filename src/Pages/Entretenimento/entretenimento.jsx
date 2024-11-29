import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/footer';
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
          <div className="flex items-center justify-center gap-4 w-[100%]  xl:pt-[8vh] 2xl:pt-[6vh] p-3 dark:bg-[#2E3033] ">
                <div className="border-t w-[7%] flex border-[#C3BEBE]"></div>
                <h1 className="md:text-[36px] text-[16px] font-bold text-black dark:text-white">
                   {t('ENTRETENIMENTO')}
                </h1>
                <div className="border-t w-[7%] border-[#C3BEBE]"></div>
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
