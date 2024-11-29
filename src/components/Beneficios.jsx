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
        <div className="w-[100%]  items-center xl:mt-[6%] 2x:mt-[4%]">
            <div className="flex items-center  ">
                <div className="flex-1 flex justify-end pr-2 sm:pr-4">
                    <hr className="border-t border-gray-300 dark:border-gray-600" style={{ width: '20%' }} />
                </div>
                <h1 className=" text-[16px] lg:text-[36px] font-bold px-4 text-3xl sm:text-xl md:text-5xl lg:text-3xl font-semibold text-center whitespace-nowrap text-lightText dark:text-darkText">
                    {t('Benefícios')}
                </h1>
                <div className="flex-1 flex justify-start pl-2 sm:pl-4">
                    <hr className="border-t border-gray-300 dark:border-gray-600" style={{ width: '20%' }} />
                </div>
            </div>

            <div
                className="
                    flex lg:gap-[150px] flex-wrap justify-center px-[90px] 
                    md:gap-40 md:h-[30vh] xl:mb-[4%] 2xl:mb-[1%] h-[40vh] 
                     sm:px-[20px] sm:h-auto
                "
                >
                <div
                    className="flex flex-col justify-center items-center md:w-[16%]"
                >
                    <img
                        src={relogio}
                        className="w-[43px] w-[42px] lg:w-[100px] lg:h-[100px]" // Ajuste o tamanho do ícone do relógio aqui
                        alt={t('Rapidez na execução e funcionalidades')}
                    />
                    <p
                       
                        className="text-[9px] lg:text-[16px] text-center mt-[10px] text-black dark:text-white"
                    >
                        {t('Rapidez na execução e funcionalidades')}
                    </p>
                </div>
                <div
                  
                    className="flex flex-col justify-center items-center md:w-[16%]"
                >
                    <img
                        src={mao}
                        className="w-[52px] h-[46px] lg:w-[80px] lg:h-[80px]" // Ajuste o tamanho do ícone da mão aqui
                        alt={t('Informações na palma da sua mão.')}
                    />
                    <p className="text-[9px] lg:text-[16px] text-center mt-[10px] text-black dark:text-white">
                        {t('Informações na palma da sua mão.')}
                    </p>
                </div>
                <div
                   
                    className="flex flex-col justify-center items-center md:w-[16%]"
                >
                    <img
                        src={quebracabeca}
                        className="w-[49px] h-[46px] lg:w-[90px] lg:h-[90px]" // Ajuste o tamanho do ícone do quebra-cabeça aqui
                        alt={t('Interatividade nas aplicações')}
                    />
                    <p className="text-[9px] lg:text-[16px] text-center mt-[10px] text-black dark:text-white">
                        {t('Interatividade nas aplicações')}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Beneficios;
