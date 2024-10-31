import React, { useState, useEffect } from 'react';
import iconeEstrela from '../../image/ModalNotification/Estrela.svg';
import iconeAviso from '../../image/ModalNotification/Aviso.svg';
import iconeMensagem from '../../image/ModalNotification/Mensagem.svg';
import reactangle from '../../image/ModalNotification/Rectangle.svg';
import fecharModoClaro from '../../image/ModalNotification/FecharModoClaro.svg'; 
import fecharModoEscuro from '../../image/ModalNotification/FecharModoEscuro.svg';

const notifications = [
    { id: 1, icone: iconeEstrela, content: 'Cardápio especial de Natal na próxima quarta oiedgqedg pfoguqwf´gçoi rpogu1eqrhgn', imagem: reactangle },
    { id: 2, icone: iconeAviso, content: 'Hoje no restaurante teremos restrições.', imagem: reactangle },
    { id: 3, icone: iconeMensagem, content: 'Veja o cardápio de hoje', imagem: reactangle },   
];

const Notificacao = () => {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const checkDarkMode = () => {
            const storedDarkMode = localStorage.getItem('darkMode');
            setDarkMode(storedDarkMode === 'true');
        };

        checkDarkMode();
        const timerId = setInterval(checkDarkMode, 100);

        return () => clearInterval(timerId);
    }, []);

    const fecharModal = darkMode ? fecharModoEscuro : fecharModoClaro;

    return (
        <div className={`fixed top-0 right-0 mt-2 w-full md:w-[670px] z-50 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'} shadow-lg`}>
            <div className='py-5 px-6 md:py-7 md:px-8 border-b border-gray-300 flex justify-between items-center'>
                <h3 className="font-semibold text-[16px] md:text-[19px]">Notificações</h3>
                <img src={fecharModal} alt="Fechar Modal" className="w-5 h-5 md:w-6 md:h-6" />
            </div>
            
            <ul className="max-h-60 overflow-y-auto">
                {notifications && notifications.length > 0 ? (
                    notifications.map((notification, index) => (
                        <li key={index} className="hover:bg-gray-200">
                           <div className="flex items-center justify-between space-x-2 py-4 px-5 md:py-5 md:px-8 border-t border-gray-300">
                                <img
                                    src={notification.icone}
                                    alt="Categoria"
                                    className="w-5 h-5 md:w-6 md:h-6"
                                />
                                <div className='w-[70%] md:w-[80%]'>
                                   <p className='text-[14px] md:text-[16px] text-left'>{notification.content}</p>
                                </div>
                                <img
                                    src={notification.imagem}
                                    alt="Foto"
                                    className="w-5 h-5 md:w-6 md:h-6"
                                />
                           </div>
                        </li>
                    ))
                ) : (
                    <li className="px-5 py-4 text-gray-500 md:px-8 md:py-5">Nenhuma notificação</li>
                )}
            </ul>
        </div>
    );
};

export default Notificacao;
