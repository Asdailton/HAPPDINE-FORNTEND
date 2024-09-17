import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import relogioLight from '../image/ModosTemas/ModoClaro/Iconesbeneficios/relogio.png';
import quebracabecaLight from '../image/ModosTemas/ModoClaro/Iconesbeneficios/quebracabeca.png';
import maoLight from '../image/ModosTemas/ModoClaro/Iconesbeneficios/maosegurando.png';

import relogioDark from '../image/ModosTemas/ModoNoturno/IconesBeneficios/relogio.png';
import quebracabecaDark from '../image/ModosTemas/ModoNoturno/IconesBeneficios/quebracabeca.png';
import maoDark from '../image/ModosTemas/ModoNoturno/IconesBeneficios/mao.png';

function Beneficios() {
    const { t } = useTranslation();
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        // Função para ler e definir o valor de darkMode
        const checkDarkMode = () => {
            const storedDarkMode = localStorage.getItem('darkMode');
            setDarkMode(storedDarkMode === 'true');
        };

        // Verifica o modo escuro quando o componente é montado
        checkDarkMode();

        // Adiciona um temporizador para verificar mudanças no localStorage a cada segundo
        const timerId = setInterval(checkDarkMode, 100);

        // Remove o temporizador ao desmontar o componente
        return () => clearInterval(timerId);
    }, []); // Dependência vazia para garantir que o useEffect rode apenas na montagem

    // Define imagens com base no estado darkMode
    const relogio = darkMode ? relogioDark : relogioLight;
    const quebracabeca = darkMode ? quebracabecaDark : quebracabecaLight;
    const mao = darkMode ? maoDark : maoLight;

    return (
        <div className="w-[100%]  items-center">
            <div className="flex items-center mt-[4%] 2xl:mt[2%]">
                <div className="flex-1 flex justify-end pr-2 sm:pr-4">
                    <hr className="border-t border-gray-300 dark:border-gray-600" style={{ width: '20%' }} />
                </div>

                <h1 className="px-4 text-3xl sm:text-xl md:text-5xl lg:text-3xl font-semibold text-center whitespace-nowrap text-lightText dark:text-darkText">
                    {t('Benefícios')}
                </h1>

                <div className="flex-1 flex justify-start pl-2 sm:pl-4">
                    <hr className="border-t border-gray-300 dark:border-gray-600" style={{ width: '20%' }} />
                </div>
            </div>

            <div className="flex gap-[150px] flex-wrap justify-center px-[90px] md:gap-40 md:h-[40vh] mb-[5%]">
                <div
                    
                    className="flex flex-col justify-center items-center md:w-[16%]"
                >
                    <img
                        src={relogio}
                        className="w-[100px] h-[100px]" // Ajuste o tamanho do ícone do relógio aqui
                        alt={t('Rapidez na execução e funcionalidades')}
                    />
                    <p
                       
                        className="text-center mt-[10px] text-black dark:text-white"
                    >
                        {t('Rapidez na execução e funcionalidades')}
                    </p>
                </div>
                <div
                  
                    className="flex flex-col justify-center items-center md:w-[16%]"
                >
                    <img
                        src={mao}
                        className="w-[80px] h-[80px]" // Ajuste o tamanho do ícone da mão aqui
                        alt={t('Informações na palma da sua mão.')}
                    />
                    <p className="text-center mt-[10px] text-black dark:text-white">
                        {t('Informações na palma da sua mão.')}
                    </p>
                </div>
                <div
                   
                    className="flex flex-col justify-center items-center md:w-[16%]"
                >
                    <img
                        src={quebracabeca}
                        className="w-[90px] h-[90px]" // Ajuste o tamanho do ícone do quebra-cabeça aqui
                        alt={t('Interatividade nas aplicações')}
                    />
                    <p className="text-center mt-[10px] text-black dark:text-white">
                        {t('Interatividade nas aplicações')}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Beneficios;
