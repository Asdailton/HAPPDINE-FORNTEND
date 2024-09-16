import React from "react";

const Footer = () => {
    return (
        <footer className="flex flex-col p-6 md:p-12 lg:p-24 dark:bg-[#2E3033]">
            <div className="flex flex-col md:flex-row md:justify-between items-center md:w-full">
                <div>
                    <h1 className="text-2xl md:text-4xl font-extrabold text-[#4E5256] dark:text-white">HAPPDINE</h1>
                </div>
                <div className="flex flex-col md:flex-row md:justify-end gap-4 md:gap-8 mt-6 md:mt-0 w-full md:ml-auto">
                    <a href="#" className="text-center md:text-lg font-semibold dark:text-white">Sobre Nós</a>
                    <a href="#" className="text-center md:text-lg font-semibold dark:text-white">Gráficos</a>
                    <a href="#" className="text-center md:text-lg font-semibold dark:text-white">Entretenimento</a>
                </div>
            </div>
            <div className="mt-6">
               <div className="w-full h-0.5 bg-black dark:bg-white"></div>
            </div>
            <p className="text-base md:text-lg font-semibold mt-6 text-center md:text-left dark:text-white">
                © Robert Bosch GmbH 2024, all rights reserved
            </p>
        </footer>
    );
}

export default Footer;
