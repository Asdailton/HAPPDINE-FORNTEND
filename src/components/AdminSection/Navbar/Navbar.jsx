 
 
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import sininho from  '../../../image/ModosTemas/ModoClaro/IconesNavbar/sininho.svg'
import en from '../../../image/ModosTemas/ModoClaro/IconesTraducao/TEnglish.png'
import pt from  '../../../image/ModosTemas/ModoClaro/IconesTraducao/TBrasil.png'
import es from '../../../image/ModosTemas/ModoClaro/IconesTraducao/TEspanha.png'
import de from '../../../image/ModosTemas/ModoClaro/IconesTraducao/TAlemanha.png'
 
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
 
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 700) { // Define o breakpoint para telas grandes
        setIsOpen(false);
      }
    };
 
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
 
  const languageIcons = {
    en: en,
    pt: pt,
    es: es,
    de: de
  };
 
  const translationIcon = languageIcons[i18n.language] || languageIcons.en;
 
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setDropdownOpen(false);
  };
 
  return (
    <div className="relative">
      {/* Overlay para fechar o menu mobile quando clicado */}
      {isOpen && (
        <div
          className={`fixed inset-0 bg-black opacity-50 z-40 bg-gray-200`}
          onClick={() => setIsOpen(false)}
        ></div>
      )}
 
      {/* Barra de navegação principal */}
      <div className={`- z-50 navbar-bg shadow-navbar h-[123px] transition-transform duration-300 ease-in-out ${isOpen ? 'lg:hidden' : ''} bg-white text-black`}>
        <div className="container mx-auto flex items-center h-full px-4">
          {/* Div para o logo */}
          <div className="flex-shrink-0">
            <div className="flex flex-col items-start ml-5">
              <div className="relative">
                <Link to="/" className="text-2xl md:text-3xl lg:text-4xl font-extrabold">
                  HAPPDINE
                </Link>
                {/* Ajuste o espaçamento vertical entre HAPPDINE e ADMIN aqui */}
                <span className="text-sm md:text-base" style={{ color: '#B2B9C0', position: 'absolute', top: '95%', left: 0, marginTop: '-8px', fontWeight: '800' }}>
                  ADMIN
                </span>
              </div>
            </div>
          </div>
 
          {/* Div para os itens de navegação */}
          <div className="flex-grow lg:flex lg:items-center lg:justify-center">
            <ul className="hidden lg:flex lg:flex-row lg:items-center lg:gap-4 md:gap-6 lg:gap-8">
              {Menus.map((menu) => (
                <li key={menu.id} className="flex-shrink-0">
                  <Link
                    to={menu.link}
                    // Ajuste o tamanho da fonte aqui para o menu principal
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
            <a href="Sino" className="flex items-center justify-center w-10 h-10 rounded-full text-black">
              <img src={sininho} alt="Notificação" className="w-6 h-6" />
            </a>
            <button
              className="flex items-center justify-center w-10 h-10 rounded-full relative text-black"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <img src={translationIcon} alt="Tradução" className="w-6 h-6" />
              {dropdownOpen && (
                <div className="absolute top-full right-0 mt-2 rounded-lg w-[120px] z-50 bg-gray-900 text-white">
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
          </div>
 
          {/* Botão do menu hambúrguer */}
          <button
            className={`lg:hidden ml-4 p-2 ${isOpen ? 'text-gray-700' : ''}`}
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </div>
 
      {/* Menu lateral para telas pequenas */}
      <div className={`fixed top-0 right-0 h-full bg-gradient-to-r from-secundary to-secundary/90 text-[#000] transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out w-[250px] z-50 bg-white text-black`}>
        <button
          className="absolute top-4 right-4 text-black"
          onClick={() => setIsOpen(false)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <ul className="flex flex-col items-start mt-16 ml-6 space-y-4">
          {Menus.map((menu) => (
            <li key={menu.id}>
              <Link
                to={menu.link}
                // Ajuste o tamanho da fonte aqui para o menu lateral (mobile)
                className="text-base px-4 py-2 transition duration-200 hover:bg-gray-300 rounded-md"
                onClick={() => setIsOpen(false)}
              >
                {t(menu.nameKey)}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
 
export default Navbar;
 