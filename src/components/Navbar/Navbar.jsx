import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Notificacao from '../Notificacao/Notificacao';

const Menus = [
  { id: 1, nameKey: 'Cardápio', link: '/cardapio' },
  { id: 2, nameKey: 'Sobre nós', link: '/sobre-nos' },
  { id: 3, nameKey: 'Entretenimento', link: '/entretenimento' },
  { id: 4, nameKey: 'Gráficos', link: '/graficos' },
];

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(localStorage.getItem('darkMode') === 'true');
  const [notificationsOpen, setNotificationsOpen] = useState(false); // Estado para notificações
  const [notifications, setNotifications] = useState([]); // Estado para armazenar as notificações

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 700) { // Define o breakpoint para telas grandes
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('dark', darkMode);
    localStorage.setItem('darkMode', darkMode ? 'true' : 'false');
  }, [darkMode]);

  const languageIcons = {
    en: darkMode ? './src/image/ModosTemas/ModoNoturno/IconesTraducao/TEnglish.png' : './src/image/ModosTemas/ModoClaro/IconesTraducao/TEnglish.png',
    pt: darkMode ? './src/image/ModosTemas/ModoNoturno/IconesTraducao/TBrasil.png' : './src/image/ModosTemas/ModoClaro/IconesTraducao/TBrasil.png',
    es: darkMode ? './src/image/ModosTemas/ModoNoturno/IconesTraducao/TEspanha.png' : './src/image/ModosTemas/ModoClaro/IconesTraducao/TEspanha.png',
    de: darkMode ? './src/image/ModosTemas/ModoNoturno/IconesTraducao/TAlemanha.png' : './src/image/ModosTemas/ModoClaro/IconesTraducao/TAlemanha.png'
  };

  const translationIcon = languageIcons[i18n.language] || languageIcons.en;

  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setDropdownOpen(false);
  };






  return (
    <div className="relative">
      {/* Overlay para fechar o menu mobile quando clicado */}
      {isOpen && (
        <div
          className={`fixed inset-0 bg-[#2E3033] opacity-50 z-40 ${darkMode ? 'bg-[#2E3033]' : 'bg-gray-200'}`}
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Barra de navegação principal */}
      <div className={`z-50 border-b dark:border-b-[#555555] h-[123px] transition-transform duration-300 ease-in-out ${isOpen ? 'lg:hidden' : ''} ${darkMode ? 'bg-[#2E3033] text-white' : 'bg-white text-black'}`}>
        <div className="container mx-auto flex items-center h-full px-4">
          {/* Div para o logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="font-black text-2xl md:text-3xl lg:text-4xl font-extrabold ml-5">
              HAPPDINE
            </Link>
          </div>

          {/* Div para os itens de navegação */}
          <div className="flex-grow lg:flex lg:items-center lg:justify-center">
            <ul className="hidden lg:flex lg:flex-row lg:items-center lg:gap-4 md:gap-6 lg:gap-8">
              {Menus.map((menu) => (
                <li key={menu.id} className="flex-shrink-0">
                  <Link
                    to={menu.link}
                    className="text-xs md:text-sm lg:text-base py-4 px-6 transition duration-200"
                  >
                    {t(menu.nameKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Div para os ícones */}
          <div className="flex items-center gap-4 ml-auto">
            <button
              className={`flex items-center justify-center w-10 h-10 rounded-full relative ${darkMode ? 'text-white' : 'text-black'}`}
              onClick={() => setNotificationsOpen(!notificationsOpen)}
            >
              <img src={darkMode ? './src/image/ModosTemas/ModoNoturno/IconesNavbar/Sininho.svg' : './src/image/ModosTemas/ModoClaro/IconesNavbar/Sininho.svg'} alt="Notificação" className="w-6 h-6" />
            </button>
            {/* Exibir notificações se estiver aberto */}
            {notificationsOpen && (
              <Notificacao />
            )}

            <button
              className={`flex items-center justify-center w-10 h-10 rounded-full relative ${darkMode ? 'text-white' : 'text-black'}`}
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <img src={translationIcon} alt="Tradução" className="w-6 h-6" />
              {dropdownOpen && (
                <div className={`absolute top-full right-0 mt-2 rounded-lg w-[120px] z-50 ${darkMode ? 'bg-white text-black' : 'bg-gray-900 text-white'}`}>
                  <button
                    onClick={() => changeLanguage('en')}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                  >
                    English
                  </button>
                  <button
                    onClick={() => changeLanguage('pt')}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                  >
                    Português
                  </button>
                  <button
                    onClick={() => changeLanguage('es')}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                  >
                    Español
                  </button>
                  <button
                    onClick={() => changeLanguage('de')}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                  >
                    Deutsch
                  </button>
                </div>
              )}
            </button>

            <button
              className={`flex items-center justify-center w-10 h-10 rounded-full ${darkMode ? 'text-white' : 'text-black'}`}
              onClick={toggleDarkMode}
            >
              <img src={darkMode ? './src/image/ModosTemas/ModoNoturno/IconesNavbar/Solzinho.svg' : './src/image/ModosTemas/ModoClaro/IconesNavbar/Temaescuro.png'} alt="Modo Noturno" className="w-6 h-6" />
            </button>
          </div>

          {/* Botão do menu hambúrguer */}
          <button
            className={`lg:hidden ml-4 p-2 ${isOpen ? 'text-gray-700' : ''}`}
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-6 h-6"
            >
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Menu de navegação para dispositivos móveis */}
      {isOpen && (
        <div className={`lg:hidden bg-[#2E3033] text-white border-b border-gray-700`}>
          <ul className="flex flex-col">
            {Menus.map((menu) => (
              <li key={menu.id}>
                <Link
                  to={menu.link}
                  className="block px-4 py-4 text-sm hover:bg-gray-200"
                  onClick={() => setIsOpen(false)}
                >
                  {t(menu.nameKey)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
