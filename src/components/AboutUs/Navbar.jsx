import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const Menus = [
  { id: 1, nameKey: 'Home', link: '/#' },
  { id: 2, nameKey: 'Sobre nós', link: '/#sobre_nos' },
  { id: 3, nameKey: 'Entretenimento', link: '/#entretenimento' },
  { id: 4, nameKey: 'Gráficos', link: '/#graficos' },
];

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(localStorage.getItem('darkMode') === 'true');

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('dark', darkMode);
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const languageIcons = {
    en: './src/image/Icons/USA.png',
    pt: './src/image/Icons/Brasil.png',
    es: './src/image/Icons/Espanha.png',
    de: './src/image/Icons/Alemanha.png'
  };

  const translationIcon = languageIcons[i18n.language] || languageIcons.en;

  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  return (
    <div className="relative border-b">
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      <div className={`relative navbar-bg shadow-navbar w-full h-[123px] transition-transform duration-300 ease-in-out ${isOpen ? 'lg:hidden' : ''}`}>
        <div className="container mx-auto flex items-center h-full px-4">
          <h1 className="text-2xl md:text-5xl lg:text-5xl font-extrabold custom-text-color ml-5 flex-shrink-0">
            HAPPDINE
          </h1>
          <button
            className={`lg:hidden ml-auto p-2 ${isOpen ? 'text-gray-700' : ''}`}
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
          <nav className={`hidden lg:flex lg:items-center lg:justify-center flex-grow ${isOpen ? 'hidden' : ''}`}>
            <ul className="flex flex-row items-center gap-8">
              {Menus.map((menu) => (
                <li key={menu.id} className="flex-shrink-0">
                  <a
                    href={menu.link}
                    className="text-xl py-4 px-6 transition duration-200"
                  >
                    {t(menu.nameKey)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className={`hidden lg:flex gap-2 ml-auto lg:ml-8 flex-shrink-0 ${isOpen ? 'hidden' : ''}`}>
            <a href="Sino" className="flex items-center justify-center w-[90px] h-10 rounded-full">
              <img src="./src/image/ModosTemas/ModoClaro/IconesNavbar/sininho.svg" alt="Notificação" className="w-[32.14px] h-[28.71px]" />
            </a>
            <button
              className="flex items-center justify-center w-[90px] h-10 rounded-full relative"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <img src={translationIcon} alt="Tradução" className="w-[32.68px] h-[32.68px]" />
              {dropdownOpen && (
                <div className="absolute top-full right-0 bg-white shadow-lg mt-2 rounded-lg w-[120px] z-50">
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
              className="flex items-center justify-center w-[90px] h-10 rounded-full"
              onClick={toggleDarkMode}
            >
              <img src={darkMode ? './src/image/ModosTemas/ModoEscuro/IconesNavbar/TemaClaro.png' : './src/image/ModosTemas/ModoClaro/IconesNavbar/Temaescuro.png'} alt="Modo Noturno" className="w-[31px] h-[31px]" />
            </button>
          </div>
        </div>
      </div>
      <div className={`fixed top-0 right-0 h-full bg-gradient-to-r from-secundary to-secundary/90 text-[#000] transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out w-[250px] z-50`}>
        <button
          className="absolute top-4 right-4 text-[#000]"
          onClick={() => setIsOpen(false)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <ul className="flex flex-col items-start mt-16 ml-6 space-y-4">
          {Menus.map((menu) => (
            <li key={menu.id}>
              <a
                href={menu.link}
                className="text-xl px-4 py-2 transition duration-200"
                onClick={() => setIsOpen(false)}
              >
                {t(menu.nameKey)}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex flex-col items-start mt-8 ml-6 gap-2">
          <a href="Notificação" className="w-[90px] h-10 rounded-full">
            <img src="./src/image/ModosTemas/ModoClaro/IconesNavbar/sininho.svg" alt="Notificação" className="w-[32.14px] h-[28.71px]" />
          </a>
          <button
            className="w-[90px] h-10 rounded-full relative"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <img src={translationIcon} alt="Tradução" className="w-[32.68px] h-[32.68px]" />
            {dropdownOpen && (
              <div className="absolute top-full right-0 bg-white shadow-lg mt-2 rounded-lg w-[120px] z-50">
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
            className="w-[90px] h-10 rounded-full outline-none"
            onClick={toggleDarkMode}
          >
            <img src={darkMode ? './src/image/ModosTemas/ModoEscuro/IconesNavbar/TemaClaro.png' : './src/image/ModosTemas/ModoClaro/IconesNavbar/Temaescuro.png'} alt="Modo Noturno" className="w-[31px] h-[31px]" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
