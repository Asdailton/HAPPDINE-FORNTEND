import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'; 
import backgroundImage from '../../image/Jogos/FlappyChicken/TelaInicial/TelaInicialFlappyChicken.png';  // IMAGEM DE FUNDO
import logo from '../../image/Jogos/FlappyChicken/TelaInicial/Flappychicken.png';  // LOGO FLAPPY CHICKEN
import jogarImg from '../../image/Jogos/FlappyChicken/TelaInicial/BotaoStart.png';  // IMAGEM BOTÃO 'PLAY'
import sairImg from '../../image/Jogos/FlappyChicken/TelaInicial/BotaoSair.png';  // IMAGEM BOTÃO 'SAIR'
import musica from '../../components/MusicasJogo/Somchapeu01.mp3';  // MUSICA DA TELA INICIAL

const FlappyChicken = () => {
  const audioRef = useRef(null);

  // Ler o estado do áudio do localStorage quando o componente for carregado
  const [isMuted, setIsMuted] = useState(() => {
    const savedMutedState = localStorage.getItem('isMuted');
    return savedMutedState ? JSON.parse(savedMutedState) : false; // Padrão: som ativado
  });

  // Efeito para tocar ou pausar o áudio com base no estado de isMuted
  useEffect(() => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch((error) => {
          // Lida com erro caso a reprodução do áudio falhe
          console.error("Erro ao tentar tocar o áudio:", error);
        });
      }
    }
  }, [isMuted]); // Reage a mudanças no estado isMuted

  // Efeito para salvar o estado do áudio no localStorage
  useEffect(() => {
    localStorage.setItem('isMuted', JSON.stringify(isMuted));
  }, [isMuted]);

  // Efeito para tocar o áudio quando o componente for montado e parar quando desmontado
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play().catch((error) => {
        // Lida com erro caso a reprodução do áudio falhe
        console.error("Erro ao tentar tocar o áudio:", error);
      });
    }

    // Função para parar o áudio quando o componente for desmontado
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0; // Reseta o tempo da música para o início
      }
    };
  }, []); // Este efeito é executado apenas uma vez, quando o componente for montado

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
      <audio ref={audioRef} loop>
        <source src={musica} type="audio/mp3" />
        Seu navegador não suporta a tag de áudio.
      </audio>

      {/* ANIMAÇÃO DE QUEDA DA LOGO */}
      <motion.img 
        src={logo}
        alt="Logo"
        className="w-[750px] h-auto mb-6 mt-[-80px] sm:w-[600px] xs:w-[400px] mx-auto"
        initial={{ y: -2000 }}  // INICIA ACIMA DA TELA
        animate={{ y: 0 }}      // A LOGO IRÁ CAIR PARA Y = 0 (CENTRO DA TELA)
        transition={{
          type: 'spring',
          stiffness: 150,   // EFEITO DE QUIQUE
          damping: 20,      // REDUZ O EFEITO DE QUIQUE (FAZENDO A ANIMAÇÃO MAIS SUAVE)
          delay: 0.3,       // ESPERA UM POUCO ANTES DE COMEÇAR
        }}
      />

      {/* Botão Jogar */}
      <div className="flex justify-center gap-4 mt-4 sm:mt-6 xs:mt-8">
        <Link to="/entretenimento/flappybird/tela_inicial/tutorial">
          <img
            src={jogarImg}
            alt="Jogar Flappy Chicken"
            className="w-auto h-[60px] xs:h-[70px] sm:h-[75px] cursor-pointer transition-transform transform hover:scale-105"
          />
        </Link>
      </div>

      {/* Botão Sair */}
      <div className="flex justify-center gap-4 mt-4 sm:mt-6 xs:mt-8">
        <Link to="/entretenimento">
          <img
            src={sairImg}
            alt="Sair"
            className="w-auto h-[60px] xs:h-[70px] sm:h-[75px] cursor-pointer transition-transform transform hover:scale-105"
          />
        </Link>
      </div>
    </div>
  );
};

export default FlappyChicken;
