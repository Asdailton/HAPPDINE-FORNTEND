import React from "react";

import { FaLinkedinIn } from "react-icons/fa";
import Footer from "./Footer";
import Animation from "./Animation";
import fotoGrupo from '../../image/Sobre_Nos/fotoGrupo.svg';
import fotoAdailton from '../../image/Sobre_Nos/fotoAdailton.svg';
import fotoBia from '../../image/Sobre_Nos/fotoBia.svg';
import fotoIsaLeite from '../../image/Sobre_Nos/fotoIsaLeite.svg'
import fotoIsaRocha from '../../image/Sobre_Nos/fotoIsaRocha.svg'
import fotoJoao from '../../image/Sobre_Nos/fotoJoao.svg';
import fotoMurilo from '../../image/Sobre_Nos/fotoMurilo.svg'
import fotoSara from '../../image/Sobre_Nos/fotoSara.svg'

const dados = [
    { id: 1, integrante: 'Adailton Filho', foto: fotoAdailton },
    { id: 2, integrante: 'Ana Torrecilas', foto: fotoBia },
    { id: 3, integrante: 'Isabela Leite', foto: fotoIsaLeite },
    { id: 4, integrante: 'Isabela Rocha', foto: fotoIsaRocha },
    { id: 5, integrante: 'João Goulart', foto: fotoJoao },
    { id: 6, integrante: 'Murilo Santos', foto: fotoMurilo },
    { id: 7, integrante: 'Sara de Oliveira', foto: fotoSara }
];

const Main = () => {
    return (
        <div className="dark:bg-[#3A3B3E] ">
            <div className="flex flex-col  md:flex-row items-center justify-center 2xl:gap-[5%] lg:gap-[4%] md:pt-[3%] dark:bg-[#3A3B3E] 2xl:px-[5%] lg:px-[7%]  pt-[10%]">
                
                {/* Conteúdo Mobile: Título, Imagem, Texto */}
                <div className="flex flex-col w-full md:hidden md:px-[0%]  "> 
                    <div className="flex items-center justify-center">
                        <div className="flex-1 flex  justify-end">
                            <hr className="border-t border-gray-300 dark:border-gray-600" style={{ width: '40%' }} />
                        </div>
                        <h1 className="md:text-[40px] font-extrabold custom-text-color mb-4 dark:text-white text-center text-[25px] mx-4">
                            QUEM SOMOS?
                        </h1>
                        <div className="flex-1 flex items-center justify-start pl-2 sm:pl-4">
                            <hr className="border-t border-gray-300 dark:border-gray-600" style={{ width: '40%' }} />
                        </div>
                    </div>
                    

                    <div className="flex justify-center mb-4 px-[6%]  md:my-0 my-[4%]">
                        <img className='w-full h-auto object-cover rounded-lg max-w-[600px]' src={fotoGrupo} alt="Foto da equipe do HappDine" />
                    </div>
                    <div className="px-[17%]  md:my-0  my-[4%]">
                        <p className="text-[16px] dark:text-white mb-4">
                            O HAPPDINE iniciou com uma ideia proposta em janeiro de 2024 na 6ª edição do HACKATHON, evento interno de sete dias realizado pela CaP/ETS (Engineering Technical School), onde recebeu a premiação de primeiro lugar. O projeto foi estruturado e, visando implementação na planta de Campinas, o HAPPDINE é desenvolvido como TCC para o terceiro semestre do curso de Desenvolvimento de Sistemas com SENAI e Bosch.
                        </p>
                        
                        <p className="text-[16px] dark:text-white">
                            Formados por integrantes de Digital Solutions das turmas 08, 09 e 10, o HAPPDINE é composto por 7 desenvolvedores: Adailton da Silva Filho, Ana Beatriz Nardy Torrecilas, Isabela Pereira Leite, Isabela Rocha dos Santos, João Vitor de Souza Goulart, Murilo Silva dos Santos e Sara de Oliveira Fernandes.
                        </p>
                    </div>
                  
                </div>

                {/* Layout Desktop: Imagem e Texto Lado a Lado */}
                <div className="hidden md:flex flex-col md:flex-row items-center justify-center 2xl:gap-[5%] lg:gap-[4%] md:pt-[8%]">
                    <div data-aos="fade-up" className="flex flex-col items-center">
                        <img className='2xl:w-[900px] xl:w-[800px] lg:w-[600px] h-auto object-cover rounded-lg' src={fotoGrupo} alt="Foto da equipe do HappDine" />
                    </div>

                    <div data-aos="fade-up" className="flex flex-col justify-center items-start w-full md:w-[500px] lg:w-[600px]">
                        <h1 className="text-[40px] font-extrabold custom-text-color mb-4 dark:text-white">
                            QUEM SOMOS?
                        </h1>
                        <p className="md:text-[16px] text-[12px] mb-4 dark:text-white">
                            O HAPPDINE iniciou com uma ideia proposta em janeiro de 2024 na 6ª edição do HACKATHON, evento interno de sete dias realizado pela CaP/ETS (Engineering Technical School), onde recebeu a premiação de primeiro lugar.
                        </p>
                        <p className="md:text-[16px] text-[12px] dark:text-white">
                        Formados por integrantes de Digital Solutions das turmas 08, 09 e 10, o HAPPDINE é composto por 7 desenvolvedores: Adailton da Silva Filho, Ana Beatriz Nardy Torrecilas, Isabela Pereira Leite, Isabela Rocha dos Santos, João Vitor de Souza Goulart, Murilo Silva dos Santos e Sara de Oliveira Fernandes.
                        </p>
                    </div>
                </div>
            </div>

            <div data-aos="fade-up" className="flex flex-col mt-8 md:mt-16 px-4 sm:px-8 md:px-12 lg:px-16 py-[7%]">
                <div className="2xl:pl-[10%] xl:pl-[5%] lg:pl-[6%]">
                    <h1 className="text-[20px] md:text-[20px] lg:text-[20px] font-sans text-center md:text-left dark:text-white">
                        <strong>Valores</strong> que definem o <strong>HAPPDINE:</strong>
                    </h1>
                </div>
                <div className="mt-[3%]">
                    <Animation data-aos="fade-up" />
                </div>
            </div>

            <div 
                data-aos="fade-up" 
                style={{ background: 'linear-gradient(to right, rgba(46, 48, 51, 1)40%, rgba(78, 82, 86, 1) 100%)' }} 
                className="pt-[30px] md:pt-[60px] pb-[40px] md:pb-[60px] mt-[80px] w-full"
            >
                <div className="flex flex-col items-center justify-start w-full pt-[2%]">
                    <div className="flex flex-col items-center mt-8 md:mt-12">
                        <div className="text-left mb-5 w-full justify-start 2xl:ml-[24%] xl:ml-[26%] lg:ml-[15%] lg:text-left ml-[30%] pb-[4%]">
                            <h1 className="text-[24px] md:text-3xl text-white font-semibold italic">
                                #EQUIPE
                            </h1>
                            <p className="text-[12px] md:text-lg text-white mt-2  lg:mx-0">
                                Conheça os integrantes da equipe <strong>HAPPDINE</strong>
                            </p>
                        </div>
                        <div className="flex flex-wrap justify-center">
                            {dados.map((integrante) => (
                                <div key={integrante.id} className="flex flex-col items-center text-center m-5 sm:m-7 md:m-[3%]">
                                    <img src={integrante.foto} alt={integrante.integrante} className=" md:w-[256px] md:h-[237px] object-cover mb-2 w-[121px] h-[116px]" />
                                    <p className="text-base md:text-lg font-semibold text-white mt-2">
                                        {integrante.integrante}
                                    </p>
                                    <div className="flex justify-center items-center gap-1 mt-2">
                                        <FaLinkedinIn className="text-white text-lg md:text-xl" />
                                        <p className="text-white text-base md:text-lg">|</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Main;
