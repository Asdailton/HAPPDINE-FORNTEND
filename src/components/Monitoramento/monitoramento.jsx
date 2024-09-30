import React from 'react';
import { useTranslation } from 'react-i18next';
import Filas from '../../image/Monitoramento/Fila.png';
import Grafico from '../../image/Monitoramento/Grafico.png'; 
import DeBemComAVida from '../../image/ModosTemas/ModoClaro/IconesMonitoramento/DBemCVida.svg'; 
import ReceitaChefe from '../../image/ModosTemas/ModoClaro/IconesMonitoramento/ReceitaChefe.svg'; 
import ModaCasa from '../../image/ModosTemas/ModoClaro/IconesMonitoramento/ModaCasa.svg'; 
import Grill from '../../image/ModosTemas/ModoClaro/IconesMonitoramento/Grill.svg'; 

const Monitoramento = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center min-h-screen pt-[100px] px-4 bg-lightBackground dark:bg-darkBackground">
      {/* Área acima do monitoramento */}
      <div className="w-full bg-lightBackground dark:bg-darkBackground">
        {/* Conteúdo da área */}
      </div>

      <div className="flex items-center w-full mb-6">
        <div className="flex-1 flex justify-end pr-2 sm:pr-4">
          <hr className="border-t border-gray-300 dark:border-gray-600" style={{ width: '20%' }} />
        </div>
        
        <h1 className="px-4 text-3xl sm:text-xl md:text-5xl lg:text-3xl font-semibold text-center whitespace-nowrap text-lightText dark:text-darkText">
          {t('Monitoramento Rápido')}
        </h1>

        <div className="flex-1 flex justify-start pl-2 sm:pl-4">
          <hr className="border-t border-gray-300 dark:border-gray-600" style={{ width: '20%' }} />
        </div>

      </div>

      <div className="mb-12 sm:mb-16 md:mb-24 lg:mb-32 mt-[80px]">
        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          <div className="flex flex-col items-center mb-10 md:mb-0">
            <p className="text-sm md:text-base font-medium mb-2 text-center hidden md:block text-lightText dark:text-darkText">
              {t('Filas em tempo real')}
            </p>
            <img src={Filas} alt="Imagem 1" className="w-full max-w-[552px] h-auto object-cover" />
            
            <div className="hidden md:flex flex-row items-center mt-4 space-x-6">
              <div className="flex items-center">
                <img src={ModaCasa} alt="Moda da Casa" className="w-8 h-8 shadow-md transition-shadow duration-500 ease-in-out hover:shadow-2xl" />
                <span className="ml-2 text-base text-lightText dark:text-darkText">{t('Moda da Casa')}</span>
              </div>

              <div className="flex items-center">
                <img src={Grill} alt="Grill e Bem Estar" className="w-8 h-8 shadow-md transition-shadow duration-500 ease-in-out hover:shadow-2xl" />
                <span className="ml-2 text-base text-lightText dark:text-darkText">{t('Grill e Bem Estar')}</span>
              </div>

              <div className="flex items-center">
                <img src={DeBemComAVida} alt="De Bem com a Vida" className="w-8 h-8 shadow-md transition-shadow duration-500 ease-in-out hover:shadow-2xl" />
                <span className="ml-2 text-base text-lightText dark:text-darkText">{t('De Bem com a Vida')}</span>
              </div>

              <div className="flex items-center">
                <img src={ReceitaChefe} alt="Receita do Chefe" className="w-8 h-8 shadow-md transition-shadow duration-500 ease-in-out hover:shadow-2xl" />
                <span className="ml-2 text-base text-lightText dark:text-darkText">{t('Receita do Chefe')}</span>
              </div>
            </div>

            <div className="flex md:hidden flex-row items-center mt-4 space-x-6">
              <div className="relative group">
                <img src={ModaCasa} alt="Moda da Casa" className="w-8 h-8 shadow-md transition-shadow duration-500 ease-in-out hover:shadow-2xl" />
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max bg-gray-700 dark:bg-gray-800 text-white text-xs p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                  {t('Moda da Casa')}
                </div>
              </div>

              <div className="relative group">
                <img src={Grill} alt="Grill e Bem Estar" className="w-8 h-8 shadow-md transition-shadow duration-500 ease-in-out hover:shadow-2xl" />
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max bg-gray-700 dark:bg-gray-800 text-white text-xs p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                  {t('Grill e Bem Estar')}
                </div>
              </div>

              <div className="relative group">
                <img src={DeBemComAVida} alt="De Bem com a Vida" className="w-8 h-8 shadow-md transition-shadow duration-500 ease-in-out hover:shadow-2xl" />
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max bg-gray-700 dark:bg-gray-800 text-white text-xs p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                  {t('De Bem com a Vida')}
                </div>
              </div>

              <div className="relative group">
                <img src={ReceitaChefe} alt="Receita do Chefe" className="w-8 h-8 shadow-md transition-shadow duration-500 ease-in-out hover:shadow-2xl" />
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max bg-gray-700 dark:bg-gray-800 text-white text-xs p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                  {t('Receita do Chefe')}
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center mt-10">
            <p className="text-sm md:text-base font-medium mb-2 text-center hidden md:block text-lightText dark:text-darkText">
              {t('Gráfico Pessoas nas filas x Horário')}
            </p>
            <img src={Grafico} alt="Imagem 2" className="w-full max-w-[552px] h-auto object-cover" />
          </div>
          
        </div>
      </div>

      {/* Área abaixo do monitoramento */}
    
    </div>
  );
};

export default Monitoramento;
 