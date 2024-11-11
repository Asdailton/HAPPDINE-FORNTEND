import React, { useEffect, useRef, useState } from 'react';

import backgroundImage from '../../../image/Jogos/FlappyChicken/Chapeu/Chapeu.png'; // IMAGEM DO FUNDO DO JOGO
import birdImage from '../../../image/Jogos/FlappyChicken/Chapeu/ChickenChapeu.png'; // IMAGEM DO FRANGO (PERSONAGEM)
import pipeImage1 from '../../../image/Jogos/FlappyChicken/Chapeu/TroncoBosch.png'; // OBSTÁCULO 01 / TRONCO NORMAL
import pipeImage2 from '../../../image/Jogos/FlappyChicken/Chapeu/TroncoFurado.png'; // OBSTÁCULO 02 / TRONCO COM BURACO
import pipeImage3 from '../../../image/Jogos/FlappyChicken/Chapeu/TroncoComTucano.png'; // OBSTÁCULO 03 / TRONCO COM TUCANO


const FlappyBird = () => {

    const canvasRef = useRef(null); // REFERÊNCIA AO ELEMENTO CANVAS

    // ESTADOS DE CONTROLE DO JOGO
    const [passedPipes, setPassedPipes] = useState(0); // CONTADOR DE OBSTÁCULOS PASSADOS
    const [isPaused, setIsPaused] = useState(false); // CONTROLE DE PAUSA
    const [isGameOver, setIsGameOver] = useState(false); // CONTROLE DE GAME OVER

    // VERIFICA SE O DISPOSITIVO É MOBILE (CELULAR)
    const isMobile = window.innerWidth <= 768;
    

    // ESTILIZAÇÕES DO FRANGO (PERSONAGEM)
    const bird = {

        x: 50, // DEFINE A POSIÇÃO INICIAL DO FRANGO (PERSONAGEM) NA HORIZONTAL
        y: 0, // DEFINE A POSIÇÃO INICIAL DO FRANGO (PERSONAGEM) NA VERTICAL

        width: isMobile ? 70 : 110, // DEFINE A LARGURA DO FRANGO NA HORIZONTAL
        height: isMobile ? 60 : 100 // DEFINE A LARGURA DO FRANGO NA VERTICAL
    };

    // ESTILIZAÇÕES DOS OBSTÁCULOS
    const pipeDimensions = {
        width: isMobile ? 100 : 140,    // LARGURA DOS OBSTÁCULOS: 100px PRA CELULAR, 140px PRA TELAS MAIORES
        minHeight: isMobile ? 100 : 140,// ALTURA MÍNIMA OBSTÁCULOS: 100px PRA CELULAR, 140px PRA TELAS MAIORES
        maxHeight: isMobile ? 230 : 330 // ALTURA MÁXIMA OBSTÁCULOS: 230px PRA CELULAR, 330px PRA TELAS MAIORES
    };
    
    const gravity = 0.1; // FORÇA DA GRAVIDADE
    const jumpVelocity = -4; // VELOCIDADE DO SALTO

    let velocity = 0; // VELOCIDADE VERTICAL DO FRANGO (PERSONAGEM)
    const pipes = []; // ARRAY PARA ARMAZENAR OS OBSTÁCULOS
    const pipeGap = 250; // ESPAÇO DE UM OBSTÁCULO PARA O OUTRO
    const pipeInterval = 225; // INTERVALO DE CRIAÇÃO DE NOVOS OBSTÁCULOS
    let frameCount = 0; // CONTADOR DE QUADROS 
    let pipeCounter = 0; // CONTADOR DE OBSTÁCULOS CRIADOS
    let pipeSpeed = isMobile ? 1 : 2; // VELOCIDADE DOS OBSTÁCULOS: 1 PRA CELULAR, 2 PRA TELAS MAIORES

    // FUNÇÃO PARA REINICIAR O JOGO
    const resetGame = () => {
        setPassedPipes(0);
        setIsPaused(false);
        setIsGameOver(false);
        velocity = 0;
        pipes.length = 0; // LIMPA OS OBSTÁCULOS 
        frameCount = 0;
        pipeSpeed = isMobile ? 1 : 2;
        bird.y = canvasRef.current.height * 0.5; // REINICIA A POSIÇÃO DO FRANGO (PERSONAGEM)
    };

    useEffect(() => {
        const canvas = canvasRef.current; // OBTÉM O CANVAS
        const context = canvas.getContext('2d'); // OBTÉM O CONTEXTO 2D DO CANVA

        // CARREGAMENTO DAS IMAGENS
        const birdImg = new Image();
        birdImg.src = birdImage;

        const bgImage = new Image();
        bgImage.src = backgroundImage;

        const pipeImg1 = new Image();
        pipeImg1.src = pipeImage1;

        const pipeImg2 = new Image();
        pipeImg2.src = pipeImage2;

        const pipeImg3 = new Image();
        pipeImg3.src = pipeImage3;

        // FUNÇÃO PARA REDIMENSIONAR O CANVAS
        const resizeCanvas = () => {
            canvas.width = window.innerWidth; // DEFINE A LARGURA DO CANVAS
            canvas.height = window.innerHeight; // DEFINE A ALTURA DO CANVAS
            bird.y = canvas.height * 0.5; // AJUSTA A POSIÇÃO DO PÁSSARO
        };

        // ADICIONA EVENTO PARA REDIMENSIONAR O CANVAS
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas(); // CHAMA A FUNÇÃO UMA VEZ PARA DEFINIR O TAMANHO INICIAL

        let backgroundOffset = 0; // OFFSET PARA O FUNDO
        const backgroundSpeed = 0.7; // VELOCIDADE DE FUNDO

        const backgroundWidth = canvas.width * 1.5; // LARGURA DO PAPEL DE PAREDE

        // FUNÇÃO PARA DESENHAR O FUNDO
        const drawBackground = () => {
            context.drawImage(bgImage, backgroundOffset, 0, backgroundWidth, canvas.height);
            context.drawImage(bgImage, backgroundOffset + backgroundWidth, 0, backgroundWidth, canvas.height);
        };

        // ATUALIZA A POSIÇÃO DE FUNDO
        const updateBackground = () => {
            backgroundOffset -= backgroundSpeed; // MOVE O FUNDO
            if (backgroundOffset <= -backgroundWidth) {
                backgroundOffset = 0; // REINICIA A POSIÇÃO DE FUNDO
            }
        };

        // FUNÇÃO PRA DESENHAR O FRANGO (PERSONAGEM)
        const drawBird = () => {
            context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);
        };

        // ATUALIZA A POSIÇÃO DOS OBSTÁCULOS
        const updatePipes = () => {
            frameCount++;
            // CRIA NOVOS OBSTÁCULOS A CADA INTERVALO DEFINIDO
            if (frameCount % pipeInterval === 0) {
                const height = Math.random() * (pipeDimensions.maxHeight - pipeDimensions.minHeight) + pipeDimensions.minHeight;

                let pipeImageToUseUpper;
                let pipeImageToUseLower;

                const randomNum = Math.random();

                // SELEÇÃO ALEATORIA DE IMAGENS DOS OBSTÁCULOS
                if (randomNum < 0.8) {
                    pipeImageToUseLower = pipeImg2;
                    pipeImageToUseUpper = pipeCounter % 2 === 0 ? pipeImg1 : pipeImg2;
                } else {
                    pipeImageToUseLower = pipeImg3;
                    pipeImageToUseUpper = pipeImg1;
                }

                // ADICIONA UM NOVO OBSTÁCULO AO ARRAY
                pipes.push({ x: canvas.width, height, passed: false, imageUpper: pipeImageToUseUpper, imageLower: pipeImageToUseLower });
                pipeCounter++;
            }

            // ATUALIZA A POSIÇÃO DE CADA OBSTÁCULO
            pipes.forEach(pipe => {
                pipe.x -= pipeSpeed;
            });

            // VERIFICA SE O FRANGO (PERSONAGEM) PASSOU POR UM OBSTÁCULO
            pipes.forEach(pipe => {
                if (!isGameOver && pipe.x + pipeDimensions.width < bird.x && !pipe.passed) {
                    setPassedPipes(prev => {
                        const newScore = prev + 1;
                        pipeSpeed += isMobile ? 0.2 : 0.4; // AUMENTA VELOCIDADE DOS OBSTÁCULOS: 0.2 PRA CELULAR, 0.4 PRA TELAS MAIORES
                        return newScore;
                    });
                    pipe.passed = true; // MARCADOS DE OBSTÁCULO PASSADO
                }
            });

            // REMOVE OS OBSTÁCULOS QUE SAIU DA TELA
            if (pipes.length > 0 && pipes[0].x < -pipeDimensions.width) {
                pipes.shift();
            }
        };

        // FUNÇÃO PARA DESENHAR OS OBSTÁCULOS
        const drawPipes = () => {
            pipes.forEach(pipe => {
                const upperPipeHeight = pipe.height; // ALTURA DO OBSTÁCULO SUPERIOR
                const lowerPipeHeight = canvas.height - upperPipeHeight - pipeGap; // ALTURA DO OBSTÁCULO INFERIOR

                context.save();
                context.translate(pipe.x, 0); // MOVE O CONTEXTO PARA A POSIÇÃO DO OBSTÁCULO
                context.scale(1, -1); // INVERTE O CONTEXTO VERTICALMENTE
                context.drawImage(pipe.imageUpper, 0, -upperPipeHeight, pipeDimensions.width, upperPipeHeight);
                context.restore();

                // DESENHA O OBSTÁCULO INFERIOR
                context.drawImage(pipe.imageLower, pipe.x, canvas.height - lowerPipeHeight, pipeDimensions.width, lowerPipeHeight);
            });
        };

        // VERIFICA COLISÕES ENTRE O FRANGO (PERSONAGEM) E OS OBSTÁCULO
        const checkCollision = () => {
            for (let pipe of pipes) {
                if (
                    bird.x < pipe.x + pipeDimensions.width &&
                    bird.x + bird.width > pipe.x &&
                    (bird.y < pipe.height || bird.y + bird.height > canvas.height - (canvas.height - pipe.height - pipeGap))
                ) {
                    setIsGameOver(true); // DEFINE O ESTADO DE GAME OVER
                }
            }

            // VERIFICA SE O FRANGO (PERSONAGEM) CAIU NO CHÃO
            if (bird.y + bird.height > canvas.height) {
                setIsGameOver(true);
            }
        };

        // FUNÇÃO PRINCIPAL DO DESENHO
        const draw = () => {
            context.clearRect(0, 0, canvas.width, canvas.height); // LIMPA O CANVAS
            drawBackground(); // DESENHA O FUNDO
            drawBird(); // DESENHA O FRANGO
            drawPipes(); // DESENHA OS OBSTÁCULOS

            if (!isPaused && !isGameOver) {
                updatePipes(); // ATUALIZA OS OBSTÁCULOS
                checkCollision(); // VERIFICA COLISÕES
                bird.y += velocity; // ATUALIZA A POSIÇÃO DO FRANGO (PERSONAGEM)
                velocity += gravity; // APLICA A GRAVIDADE
                updateBackground(); // ATUALIZA A POSIÇÃO DO FUNDO
            } else if (isGameOver) {

                // EXIBE A TELA DE GAME OVER
                context.fillStyle = 'rgba(0, 0, 0, 0.8)'; // FUNDO SEMITRANSPARENTE
                context.fillRect(0, 0, canvas.width, canvas.height);
                context.fillStyle = 'white';
                
                // DEFINE LIMITES PARA O TAMANHO DA FONTE
                const maxFontSize = 60; // TAMANHO MÁXIMO DA FONTE PARA "GAME OVER"
                const dynamicFontSize = Math.min(canvas.width * 0.1, maxFontSize); // TAMANHO DINÂMICO BASEADO NA LARGURA
                context.font = `${dynamicFontSize}px "Press Start 2P", cursive`; 
                
                context.textAlign = 'center';
                context.textBaseline = 'middle';
                context.fillText('Game Over!', canvas.width / 2, canvas.height / 2 - 20); // TEXTO DE GAME OVER

                // Exibe a pontuação
                const scoreFontSize = Math.min(canvas.width * 0.05, 30);
                context.font = `${scoreFontSize}px "Press Start 2P", cursive`;
                context.fillText(`Score: ${passedPipes}`, canvas.width / 2, canvas.height / 2 + 60);
            }

            requestAnimationFrame(draw); // CHAMA A FUNÇÃO DO DESENHO NOVAMENTE
        };

        // FUNÇÃO PARA LIDAR COM CLIQUES
        const handleClick = () => {
            if (!isPaused && !isGameOver) {
                velocity = jumpVelocity; // FAZ O FRANGO (PERSONAGEM) SALTAR
            }
        };

        // FUNÇÃO PARA LIDAR COM A TECLA DE ESPAÇO
        const handleSpacebar = (event) => {
            if (event.code === 'Space') {
                event.preventDefault(); // PREVINE O COMPORTAMENTO PADRÃO
                if (!isPaused && !isGameOver) {
                    velocity = jumpVelocity; // FAZ O FRANGO (PERSONAGEM) SALTAR
                } 
            }
        };

        // ADICIONA OUVINTES DE EVENTOS
        canvas.addEventListener('click', handleClick);
        window.addEventListener('keydown', handleSpacebar);

        draw(); // INICIA O LOOP DE DESENHO

        // LIMPA OS OUVINTES DE EVENTOS AO DESMONTAR O COMPONENTE
        return () => {
            canvas.removeEventListener('click', handleClick);
            window.removeEventListener('keydown', handleSpacebar);
        };
    }, [isPaused, isGameOver]); // DEPENDÊNCIAS DO EFEITO

    // FUNÇÃO PARA REECARREGAR PÁGINA
    const reloadPage = () => {
        window.location.reload();
    };

    // FUNÇÃO PARA VOLTAR PARA A TELA INICIAL 
    const goToHome = () => {
        window.location.href = "/entretenimento/flappybird/tela_inicial";
    };

    return (
        <div className="flex flex-col h-screen text-white overflow-hidden" style={{ margin: 0 }}>
            <div className="flex-grow relative">
                <canvas
                    ref={canvasRef} // REFERÊNCIA AO CANVAS
                    className="border border-black w-full h-full"
                    style={{ 
                        backgroundSize: 'cover',
                        backgroundPosition: 'center', 
                        backgroundRepeat: 'no-repeat'
                    }} 
                />
                {!isGameOver && (
                    <div className="absolute top-0 left-0 w-full text-left mt-16 ml-4" style={{ zIndex: 10 }}>
                        <div className="text-2xl font-bold font-pixel">Score: {passedPipes}</div>
                    </div>
                )}
                {isGameOver && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <button
                            onClick={reloadPage}
                            className="text-white text-sm py-1 px-4 rounded mt-[440px] font-pixel transition duration-300 ease-in-out hover:text-yellow-500 relative"
                        >
                            Reiniciar Jogo
                            <span className="absolute left-0 bottom-0 w-full h-0.5 bg-yellow-500 transform scale-x-0 transition-transform duration-300 ease-in-out hover:scale-x-100" />
                        </button>
                        <button
                            onClick={goToHome}
                            className="text-white text-sm py-1 px-4 rounded mt-2 font-pixel transition duration-300 ease-in-out hover:text-yellow-500 relative"
                        >
                            Escolher Outro Cenário
                            <span className="absolute left-0 bottom-0 w-full h-0.5 bg-yellow-500 transform scale-x-0 transition-transform duration-300 ease-in-out hover:scale-x-100" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FlappyBird;
