import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import musica from '../../../components/MusicasJogo/Somchapeu01.mp3'; // Caminho da música
import clubeImg from '../../../image/Jogos/FlappyChicken/Clube/Clube04.png'; // Imagem do clube
import grillImg from '../../../image/Jogos/FlappyChicken/Grill/GrilCenario.png'; // Imagem do grill
import chapeuImg from '../../../image/Jogos/FlappyChicken/Chapeu/Chapeu.png'; // Imagem do chapéu
import backgroundImage from '../../../image/Jogos/FlappyChicken/TelaInicial/TelaInicialFlappyChicken.png'; // Imagem da tela inicial
import voltarImg from '../../../image/Jogos/FlappyChicken/SelecaoCenarios/BotaoVoltar.png'; // Imagem do botão

// Ícones dos frangos
import clubIcon from '../../../image/Jogos/FlappyChicken/Clube/ChickenClube.png';
import grillIcon from '../../../image/Jogos/FlappyChicken/Grill/ChickenGrill.png';
import chapeuIcon from '../../../image/Jogos/FlappyChicken/Chapeu/ChickenChapeu.png';

const CenarioFase = () => {
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false); // Detecta mobile ou tablet
  const [currentIndex, setCurrentIndex] = useState(0); // Controla o carrossel

  useEffect(() => {
    const handleResize = () => {
      setIsMobileOrTablet(window.innerWidth <= 1132); // Definido para dispositivos com largura <= 1132px (mobile e tablets)
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Verifica a largura ao carregar a página

    const audio = new Audio(musica);
    audio.loop = true;
    audio.play();

    return () => {
      window.removeEventListener('resize', handleResize);
      audio.pause();
    };
  }, []);

  // Funções para navegar no carrossel
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % 3);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + 3) % 3);
  };

  const renderCarousel = () => {
    const scenarios = [
      { name: 'CLUBE', img: clubeImg, icon: clubIcon, link: '/entretenimento/flappybird/tela_inicial/tutorial/selecaofase/clube', borderColor: '#00767d' },
      { name: 'GRILL', img: grillImg, icon: grillIcon, link: '/entretenimento/flappybird/tela_inicial/tutorial/selecaofase/grill', borderColor: '#bf29be' },
      { name: 'CHAPEUZINHO', img: chapeuImg, icon: chapeuIcon, link: '/entretenimento/flappybird/tela_inicial/tutorial/selecaofase/chapeu', borderColor: '#004aad' }
    ];

    return (
      <div className="relative flex items-center justify-center">
        <button onClick={prevSlide} className="absolute left-[-40px] text-white font-pixel text-3xl">{"<"}</button>
        <div className="flex justify-center gap-10">
          <div className="relative group flex flex-col items-center">
            <h3 className="text-white font-pixel text-xl mb-4">{scenarios[currentIndex].name}</h3>
            <Link to={scenarios[currentIndex].link}>
              <div className="relative">
                <img
                  src={scenarios[currentIndex].img}
                  alt={scenarios[currentIndex].name}
                  className="w-[300px] h-[300px] object-cover cursor-pointer transition-transform transform group-hover:scale-110 rounded-[53px] border-4"
                  style={{ borderColor: scenarios[currentIndex].borderColor, borderRadius: '53px' }}
                />
                <img
                  src={scenarios[currentIndex].icon}
                  alt={`Ícone do ${scenarios[currentIndex].name}`}
                  className="absolute bottom-[-10px] left-[-10px] w-[100px] h-[100px] transition-transform transform group-hover:scale-110"
                />
              </div>
            </Link>
          </div>
        </div>
        <button onClick={nextSlide} className="absolute right-[-40px] text-white font-pixel text-3xl">{">"}</button>
      </div>
    );
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(${backgroundImage})`,
      }}
    >
      {/* Título centralizado com ajuste para dispositivos móveis e tablets */}
      <div className={`text-center mb-10 px-4 sm:mb-5 md:mb-4 lg:mb-6 ${isMobileOrTablet ? 'transform translate-y-[-50%]' : ''}`}>
        <h2 className="text-white font-pixel text-3xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl mt-4 sm:mt-0">
          ESCOLHA UM CENÁRIO
        </h2>
        <h3 className="text-white font-pixel text-3xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl mt-2">
          PARA COMEÇAR
        </h3>
      </div>

      {/* Carrossel visível para dispositivos móveis e tablets */}
      {isMobileOrTablet ? renderCarousel() : (
        <div className="flex flex-wrap justify-center gap-[100px] mt-10 px-4 mb-6 relative">
          <div className="relative group flex flex-col items-center">
            <h3 className="text-white font-pixel text-xl mb-4">CLUBE</h3>
            <Link to="/entretenimento/flappybird/tela_inicial/tutorial/selecaofase/clube">
              <div className="relative">
                <img
                  src={clubeImg}
                  alt="Clube"
                  className="w-[300px] h-[300px] object-cover cursor-pointer transition-transform transform group-hover:scale-110 rounded-[53px] border-4"
                  style={{ borderColor: '#00767d', borderRadius: '53px' }}
                />
                <img
                  src={clubIcon}
                  alt="Ícone do Clube"
                  className="absolute bottom-[-10px] left-[-10px] w-[100px] h-[100px] transition-transform transform group-hover:scale-110"
                />
              </div>
            </Link>
          </div>

          <div className="relative group flex flex-col items-center">
            <h3 className="text-white font-pixel text-xl mb-4">GRILL</h3>
            <Link to="/entretenimento/flappybird/tela_inicial/tutorial/selecaofase/grill">
              <div className="relative">
                <img
                  src={grillImg}
                  alt="Grill"
                  className="w-[300px] h-[300px] object-cover cursor-pointer transition-transform transform group-hover:scale-110 rounded-[53px] border-4"
                  style={{ borderColor: '#bf29be', borderRadius: '53px' }}
                />
                <img
                  src={grillIcon}
                  alt="Ícone do Grill"
                  className="absolute bottom-[-10px] left-[-10px] w-[130px] h-[130px] transition-transform transform group-hover:scale-110"
                />
              </div>
            </Link>
          </div>

          <div className="relative group flex flex-col items-center">
            <h3 className="text-white font-pixel text-xl mb-4">CHAPEUZINHO</h3>
            <Link to="/entretenimento/flappybird/tela_inicial/tutorial/selecaofase/chapeu">
              <div className="relative">
                <img
                  src={chapeuImg}
                  alt="Chapéu"
                  className="w-[300px] h-[300px] object-cover cursor-pointer transition-transform transform group-hover:scale-110 rounded-[53px] border-4"
                  style={{ borderColor: '#004aad', borderRadius: '53px' }}
                />
                <img
                  src={chapeuIcon}
                  alt="Ícone do Chapéu"
                  className="absolute bottom-[-10px] left-[-10px] w-[110px] h-[110px] transition-transform transform group-hover:scale-110"
                />
              </div>
            </Link>
          </div>
        </div>
      )}

      {/* Botão de Voltar posicionado no canto inferior esquerdo em telas grandes */}
      <Link
        to="/entretenimento/flappybird/tela_inicial"
        className={`absolute ${isMobileOrTablet ? 'left-1/2 transform -translate-x-1/2 bottom-4' : 'left-4 bottom-4'}`}
      >
        <img
          src={voltarImg}
          alt="Voltar"
          className="w-[80px] h-[80px] cursor-pointer transition-transform transform hover:scale-110"
        />
      </Link>
    </div>
  );
};

export default CenarioFase;
