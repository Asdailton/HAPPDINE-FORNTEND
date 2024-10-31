import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
 
const Footer = () => {
    const { t } = useTranslation();
 
    return (
        <>
            
            <footer className="flex flex-col p-6 md:p-12 lg:p-24  border-t dark:border-t-[#555555] dark:bg-[#2E3033]">
                <div className="flex-1 flex justify-end pr-2 sm:pr-0">
                    <hr className="border-t border-black mt-[30px] mb-[30px]" style={{ width: '0%' }} />
                </div>
                <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center">
                    <h1 className="text-2xl md:text-4xl font-bold text-[#4E5256] dark:text-white">HAPPDINE</h1>
                    <div className="flex flex-col md:flex-row md:justify-end gap-4 md:gap-8 mt-4 md:mt-0 w-full">
                        <Link to="/sobre-nos" className="text-left md:text-lg font-semibold text-[#4E5256] dark:text-white">
                            {t('Sobre nós')}
                        </Link>
                        <Link to="/graficos" className="text-left md:text-lg font-semibold text-[#4E5256] dark:text-white">
                            {t('Gráficos')}
                        </Link>
                        <Link to="/entretenimento" className="text-left md:text-lg font-semibold text-[#4E5256] dark:text-white">
                            {t('Entretenimento')}
                        </Link>
                    </div>
                </div>
                <div className="mt-6">
                    <div className="w-full h-0.5 bg-black dark:bg-white"></div> {/* Linha abaixo do conteúdo */}
                </div>
                <p className="text-base md:text-lg font-semibold mt-6 text-left text-[#4E5256] dark:text-white">
                    {t('© Robert Bosch GmbH 2024, all rights reserved')}
                </p>
            </footer>
        </>
    );
};
 
export default Footer;