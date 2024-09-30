import { useTranslation } from 'react-i18next';
import fashionOfHome from '../../image/Cardapio/Panela.png';
import grill from '../../image/Cardapio/Grill.png';
import DBem from '../../image/Cardapio/Folha.png';
import chefe from '../../image/Cardapio/chefe.png';
import Moda from './ModaDaCasa.jsx';
import Grill from './Grill.jsx';
import { useState } from 'react';
import DeBem from './DeBem.jsx';
import Chef from './Chef.jsx';
import DearOfDay from './DearofDay.jsx';
import styles from './HoverButton.module.css'

const Cardapio = () => {
    const { t } = useTranslation();

    const [modaIsOpen, setModaIsOpen] = useState(false);
    const [modaContent, setModaContent] = useState('');

    const [ChefIsOpen, setChefIsOpen] = useState(false);
    const [ChefContent, setChefContent] = useState('');

    const [grillIsOpen, setGrillIsOpen] = useState(false);
    const [grillContent, setGrillContent] = useState('');

    const [deBemContent, setdeBemContent] = useState('');
    const [deBemIsOpen, setBemIsOpen] = useState(false);

    

    const openModa = (content) => {
        setModaContent(content);
        setModaIsOpen(true);
    };

    const closeModa = () => {
        setModaIsOpen(false);
    };

    const openGrill = (conteudo) => {
        setGrillContent(conteudo);
        setGrillIsOpen(true);
    };

    const closeGrill = () => {
        setGrillIsOpen(false);
    };

    const openDeBem = (conteudo) => {
        setdeBemContent(conteudo);
        setBemIsOpen(true);
    };

    const closedeBem = () => {
        setBemIsOpen(false);
    };

    const openChef = (conteudo) => {
        setChefContent(conteudo);
        setChefIsOpen(true);
    };

    const closeChef = () => {
        setChefIsOpen(false);
    };

    return (
        <>
            <div className="flex items-center justify-center gap-4 w-[100%] mt-[8vh] h-[4vh] p-12">
                <div className="border-t w-[10%] flex border-gray-800"></div>
                <h1 className="2xl:text-3xl lg:text-3xl text-2xl font-bold text-black dark:text-white">
                    {t('CARDÁPIO')}
                </h1>
                <div className="border-t w-[10%] border-black"></div>
            </div>

            <div className='flex w-[100%] text-sm font-semibold text-[#7D8389] mb-[30px] justify-center items-center'>
                <p>
                    Clique na modalidade e confira o cardápio!
                </p>
            </div>

            <div className="w-[100%] h-[70vh] lg:h-[80vh] items-center 2xl:h-[57vh] flex justify-center"> 
                <div className='lg:w-[80%] gap-4 h-[80%] lg:h-[60%] 2xl:h-[70%] items-center 2xl:w-[80%] flex flex-wrap justify-center lg:gap-2'>

                    <button
                        className={styles.first}
                        onClick={() => openModa(modaContent)}
                    >
                        <div className='w-[70%] text-sm lg:w-[60%] justify-center items-center gap-4 text-center flex text-white'>
                            <img src={fashionOfHome} className='2xl:w-[14%] w-[15%] lg:w-[20%]' alt="" />
                            <p>Moda da Casa</p>
                        </div>
                    </button>

                    <button 
                       className={styles.second}
                        onClick={() => openDeBem(deBemContent)}
                    >
                        <div className='flex justify-center text-sm items-center text-white gap-4 w-[80%]'>
                            <img src={DBem} className='2xl:w-[7%] w-[9%]' alt="" />
                            <p>De Bem com a Vida</p>
                        </div>
                    </button>

                    <button 
                        className={styles.third}
                        onClick={() => openGrill(grillContent)}
                    >
                        <div className='lg:w-[80%] 2xl:w-[50%] text-sm text-white justify-center items-center gap-4 text-center flex'>
                            <img className='2xl:w-[12%] lg:w-[8%] w-[9%]' src={grill} alt="" />
                            <p>Grill e Bem Estar</p>
                        </div>
                    </button>

                    <button 
                        className={styles.fourth}
                        onClick={() => openChef(ChefContent)}
                    >
                        <div className='flex text-white gap-4 text-sm justify-center items-center lg:w-[80%] 2xl:w-[80%]'>
                            <img src={chefe} className='2xl:w-[6%] w-[8%] lg:w-[5%]' alt="" />
                            <p>Receita do Chefe</p>
                        </div>
                    </button>

                </div>
            </div>

            <Moda
                isOpen={modaIsOpen}
                onRequestClose={closeModa}
                content={modaContent}
            />
            <Grill
                isOpen={grillIsOpen}
                onRequestClose={closeGrill}
            />
            <DeBem
                isOpen={deBemIsOpen}
                onRequestClose={closedeBem} 
            />
            <Chef
                isOpen={ChefIsOpen}
                onRequestClose={closeChef}  
            />
            <DearOfDay />

            <div className='w-[100%] text-[14px] flex 2xl:p-[130px] p-[50px] lg:p-[100px] justify-center items-center 2xl:w-[100%] lg:w-[100%]'>
                <div className='flex-col justify-center items-center gap-4 w-[75%] '>
                    <p className='2xl:mr-[81vh] mb-[20px] text-[18px] text-left'>
                        Deseja receber o cardápio <strong>diretamente </strong> no seu Email?
                    </p>
                    <div className='w-full flex-col lg:flex-row 2xl:flex-row 2xl:gap-[30px] lg:gap-[30px] gap-4 flex lg:items-center'>
                        <div className='2xl:w-[44%] lg:w-[44%] h-[90%]'>
                            <input type="text" className='bg-[#E0E2E5] font-semibold p-3 focus:outline-none w-[100%] h-full' alt='Nome' placeholder='Nome' />
                        </div>
                        <div className='2xl:w-[44%] lg:w-[44%] h-[90%]'>
                            <input type="text" className='bg-[#E0E2E5] font-semibold focus:outline-none p-3 w-full h-full' alt='Email' placeholder='E-mail' />
                        </div>
                        <button className='bg-[#3C3F42] 2xl:w-[8%] lg:w-[10%] text-[18px] mt-[5px] h-[4vh] text-white lg:h-[6vh] 2xl:h-[5vh]'>
                            Enviar
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Cardapio;
