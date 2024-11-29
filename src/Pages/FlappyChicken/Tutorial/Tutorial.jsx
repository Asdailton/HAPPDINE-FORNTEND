import React from 'react';
import { Link } from 'react-router-dom';
import backgroundImage from '../../../image/Jogos/FlappyChicken/TelaInicial/TelaInicialFlappyChicken.png';  // IMAGEM DE FUNDO
import imagemCentralizada from '../../../image/Jogos/FlappyChicken/Tutorial/Tutorial.png';  // IMAGEM QUE QUER CENTRALIZAR
import imagemBotaoProximo from '../../../image/Jogos/FlappyChicken/SelecaoCenarios/BotaoOk.png'; // Imagem para o botão "Próximo"
import backgroundMusic from '../../../components/MusicasJogo/Somchapeu01.mp3'; // Importe o arquivo de áudio

const Tutorial = () => {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen px-4"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Áudio em loop */}
      <audio autoPlay loop>
        <source src={backgroundMusic} type="audio/mp3" />
        Seu navegador não suporta o elemento de áudio.
      </audio>

      {/* Título Pixelado */}
      <h1 className="absolute top-16 text-center text-4xl sm:text-5xl md:text-6xl font-pixel text-white tracking-wider drop-shadow-xl mt-12">
        TUTORIAL
      </h1>

      {/* Centralização da Imagem com tamanho ajustado */}
      <div className="flex justify-center items-center w-full h-full relative">
        <img
          src={imagemCentralizada} // A imagem que você importou
          alt="Imagem Centralizada"
          className="w-[600px] h-[600px] mt-[150px]" // Aumentando a largura e altura da imagem
        />
      </div>

      {/* Imagem clicável para "Próximo" */}
      <div className="flex justify-center mt-4 sm:mt-6 xs:mt-8">
        <Link to="/entretenimento/flappybird/tela_inicial/tutorial/selecaofase">
          <img
            src={imagemBotaoProximo}  // Imagem do botão "Próximo"
            alt="Próximo"
            className="w-[200px] h-auto cursor-pointer transition-transform transform hover:scale-105"
          />
        </Link>
      </div>
    </div>
  );
};

export default Tutorial;
