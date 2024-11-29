import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { useTranslation } from 'react-i18next';
import DeBemComAVida from '../../image/ModosTemas/ModoClaro/IconesMonitoramento/DBemCVida.svg'; 
import ReceitaChefe from '../../image/ModosTemas/ModoClaro/IconesMonitoramento/ReceitaChefe.svg'; 
import ModaCasa from '../../image/ModosTemas/ModoClaro/IconesMonitoramento/ModaCasa.svg'; 
import Grill from '../../image/ModosTemas/ModoClaro/IconesMonitoramento/Grill.svg'; 
import Footer from '../../components/Footer/footer.jsx';
import LayoutGraphic from '../../components/Charts/Layout.jsx';
import BarChartMobile from '../../components/Charts/BarChartMobile.jsx';

const Grafico = () => {
  const { t } = useTranslation();
  const [selectedDay, setSelectedDay] = useState(1);
  const [larguraTela, setLarguraTela] = useState(window.innerWidth);

  // Função para atualizar a largura da tela
  const atualizarLargura = () => {
    setLarguraTela(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', atualizarLargura);
    return () => {
      window.removeEventListener('resize', atualizarLargura);
    };
  }, []);

  // Define tamanhos com base na largura da tela
  const tamanhoIcone = larguraTela < 1000 ? 'w-6 h-6' : 'w-8 h-8';
  const espacoEntreIcones = larguraTela < 1000 ? 'space-x-5' : 'space-x-20';
  const tamanhoGrafico = larguraTela < 1000 ? 'max-w-[10%]' : 'max-w-[50%]';
  const tamanhoFonte = larguraTela < 1000 ? 'text-[6px]' : 'text-base'; // Adjust font size based on screen width
  return (
    <div className="bg-lightBackground dark:bg-darkBackground ">
      
      <div className="flex items-center w-full mb-6 mt-[90px]">
        <div className="flex-1 flex justify-end pr-2 sm:pr-4">
          <hr className="border-t border-gray-300 dark:border-gray-600" style={{ width: '10%' }} />
        </div>
        <h1 className=" text-[16px] lg:text-[36px] font-bold px-4 text-3xl sm:text-xl md:text-5xl lg:text-3xl font-semibold text-center whitespace-nowrap text-lightText dark:text-darkText">
          {t('MONITORAMENTO_REAL')}
        </h1>
        <div className="flex-1 flex justify-start pl-2 sm:pl-4">
          <hr className="border-t border-gray-300 dark:border-gray-600" style={{ width: '10%' }} />
        </div>
      </div>

      <div className="mb-12 sm:mb-16 md:mb-24 lg:mb-32 mt-[70px]">
        <div className="flex flex-col items-center">
          
      {/* Seção Filas */}
      <div className="flex flex-col items-center mb-3">
        <p className="text-sm md:text-base font-medium mb-2 text-center text-lightText dark:text-darkText">
          {t('Filas em tempo real')}
        </p>
        <div className="flex justify-center w-full h-auto object-cover">
          <div className="flex-none w-1/2" /> {/* Div vazia para empurrar o LayoutGraphic para a direita */}
          <LayoutGraphic className="max-w-[90%]" /> {/* Ajuste a largura do gráfico */}
        </div>
      </div>

          {/* Ícones */}
          <div className={`flex flex-row items-center mb-[5%] ${espacoEntreIcones}`}>
            <div className="flex items-center">
              <img src={ModaCasa} alt="Moda da Casa" className={tamanhoIcone + ' mr-2'} />
              <span className={`${tamanhoFonte} text-lightText dark:text-darkText`}>{t('Moda da Casa')}</span>
            </div>
            <div className="flex items-center">
              <img src={Grill} alt="Grill e Bem Estar" className={tamanhoIcone + ' mr-2'} />
              <span className={`${tamanhoFonte} text-lightText dark:text-darkText`}>{t('Grill e Bem Estar')}</span>
            </div>
            <div className="flex items-center">
              <img src={DeBemComAVida} alt="De Bem com a Vida" className={tamanhoIcone + ' mr-2'} />
              <span className={`${tamanhoFonte} text-lightText dark:text-darkText`}>{t('De Bem com a Vida')}</span>
            </div>
            <div className="flex items-center">
              <img src={ReceitaChefe} alt="Receita do Chefe" className={tamanhoIcone + ' mr-2'} />
              <span className={`${tamanhoFonte} text-lightText dark:text-darkText`}>{t('Receita do Chefe')}</span>
            </div>
          </div>

          {/* Seção Gráfico */}
          <div className="flex flex-col items-center">
            <p className="text-sm md:text-base font-medium mb-2 text-center text-lightText dark:text-darkText">
              {t('Gráfico Pessoas nas Filas x Horário')}
            </p>
            <div className={`w-full ${tamanhoGrafico} h-auto object-cover flex justify-center , backgroundColor: '#ffffff' `}>
              <BarChartMobile selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
            </div>
          </div>
        </div>
      </div>
      
     
     
    </div>
  );
}

export default Grafico;