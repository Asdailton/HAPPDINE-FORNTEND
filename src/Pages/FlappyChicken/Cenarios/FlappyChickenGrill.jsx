import React, { useEffect, useRef, useState } from 'react';
import backgroundImage from '../../../image/Jogos/FlappyChicken/Grill/GrilCenario.png'; // IMAGEM DO FUNDO DO JOGO
import birdImage from '../../../image/Jogos/FlappyChicken/Grill/ChickenGrill.png'; // IMAGEM DO FRANGO (PERSONAGEM)
import pipeImage from '../../../image/Jogos/FlappyChicken/Grill/Faca.png'; // OBSTÁCULO 01 / FACA
import forkImage from '../../../image/Jogos/FlappyChicken/Grill/Garfo.png'; // OBSTÁCULO 02 / GARFO
import smallPipeImage from '../../../image/Jogos/FlappyChicken/Clube/TuboClubePequeno.png';

const FlappyBird = () => {
    const canvasRef = useRef(null); // REFERÊNCIA PARA O ELEMENTO CANVAS
    const [passedPipes, setPassedPipes] = useState(0); // ESTADO PARA CONTAR OS OBSTÁCULOS PASSADOS
    const [isPaused, setIsPaused] = useState(false); // ESTADO PARA CONTROLAR A PAUSA DO JOGO
    const [isGameOver, setIsGameOver] = useState(false); // ESTADO PARA CONTROLAR SE O JOGO TERMINOU

    // DETECTA SE O DISPOSITIVO É MÓVEL
    const isMobile = window.innerWidth <= 768; 
    const bird = {
        x: 50, // POSIÇÃO X DO FRANGO (PERSONAGEM)
        y: 0, // POSIÇÃO Y INICIAL DO FRANGO (PERSONAGEM)
        width: isMobile ? 100 : 110,  // LARGURA DO FRANGO (PERSONAGEM)
        height: isMobile ? 100 : 110  // ALTURA DO FRANGO (PERSONAGEM)
    };

    const pipeDimensions = {
        width: isMobile ? 100 : 140,     // LARGURA DOS OBSTÁCULOS: 100px PRA CELULAR, 140px PRA TELAS MAIORES
        minHeight: isMobile ? 100 : 140, // ALTURA MÍNIMA OBSTÁCULOS: 100px PRA CELULAR, 140px PRA TELAS MAIORES
        maxHeight: isMobile ? 230 : 330  // ALTURA MÁXIMA OBSTÁCULOS: 230px PRA CELULAR, 330px PRA TELAS MAIORES
    };

    const gravity = 0.1; // GRAVIDADE APLICADA AO FRANGO (PERSONAGEM)
    const jumpVelocity = -4; // VELOCIDADE DO SALTO DO FRANGO (PERSONAGEM)

    let velocity = 0; // VELOCIDADE VERTICAL DO FRANGO (PERSONAGEM)
    const pipes = []; // ARRAY PARA ARMAZENAR OS OBSTÁCULOS
    const pipeGap = 250; // ESPAÇO ENTRE OS OBSTÁCULOS
    const pipeInterval = 225; // INTERVALO DE CRIAÇÃO DE NOVOS OBSTÁCULOS
    let frameCount = 0; // CONTADOR DE FRAMES PARA CONTROLE DE TEMPO

    // VELOCIDADE DOS OBSTÁCULOS, AJUSTADA PARA DISPOSITIVOS MÓVEIS
    let pipeSpeed = isMobile ? 1 : 2; 

    const speedMultiplier = 0.5; // MULTIPLICADOR DE VELOCIDADE
    const gameOverFontSize = Math.min(window.innerWidth * 0.06, 50); // TAMANHO DA FONTE PARA "GAME OVER"
    const scoreFontSize = Math.min(window.innerWidth * 0.025, 30); // TAMANHO DA FONTE PARA O SCORE

    // FUNÇÃO PARA REINICIAR O JOGO
    const resetGame = () => {
        setPassedPipes(0); // RESETA O SCORE
        setIsPaused(false); // RESETA O ESTADO DE PAUSA
        setIsGameOver(false); // RESETA O ESTADO DE GAME OVER
        velocity = 0; // RESETA A VELOCIDADE DO FRANGO (PERSONAGEM)
        pipes.length = 0; // LIMPA OS OBSTÁCULOS
        frameCount = 0; // RESETA O CONTADOR DE FRAMES
        pipeSpeed = isMobile ? 1 : 2; // RESETA A VELOCIDADE DOS OBSTÁCULOS
        bird.y = canvasRef.current.height * 0.5; // REPOSICIONA O FRANGO (PERSONAGEM) VERTICALMENTE
    };

    useEffect(() => {
        const canvas = canvasRef.current; // OBTÉM A REFERÊNCIA DO CANVAS
        const context = canvas.getContext('2d'); // CONTEXTO 2D PARA DESENHAR NO CANVAS

        // CARREGAMENTO DAS IMAGENS
        const birdImg = new Image();
        birdImg.src = birdImage;

        const bgImage = new Image();
        bgImage.src = backgroundImage;

        const pipeImg = new Image();
        pipeImg.src = pipeImage;

        const smallPipeImg = new Image();
        smallPipeImg.src = smallPipeImage;

        const forkImg = new Image(); // IMAGEM DO GARFO
        forkImg.src = forkImage;

        // FUNÇÃO PARA REDIMENSIONAR O CANVAS
        const resizeCanvas = () => {
            canvas.width = window.innerWidth; // AJUSTA A LARGURA DO CANVAS
            canvas.height = window.innerHeight; // AJUSTA A ALTURA DO CANVAS
            bird.y = canvas.height * 0.5; // REPOSICIONA O FRANGO (PERSONAGEM) NO MEIO VERTICALMENTE
        };

        window.addEventListener('resize', resizeCanvas); // ADICIONA UM LISTENER PARA REDIMENSIONAMENTO
        resizeCanvas(); // REDIMENSIONA O CANVAS INICIALMENTE

        let backgroundOffset = 0; // DESLOCAMENTO DO FUNDO
        const backgroundSpeed = 0.1; // VELOCIDADE DO FUNDO

        // FUNÇÃO PARA DESENHAR O FUNDO
        const drawBackground = () => {
            context.drawImage(bgImage, backgroundOffset, 0, canvas.width * 2, canvas.height);
            context.drawImage(bgImage, backgroundOffset + canvas.width * 2, 0, canvas.width * 2, canvas.height);
        };

        // ATUALIZA O DESLOCAMENTO DO FUNDO
        const updateBackground = () => {
            backgroundOffset -= backgroundSpeed;
            if (backgroundOffset <= -canvas.width * 2) {
                backgroundOffset = 0; // RESETA O DESLOCAMENTO DO FUNDO
            }
        };

        // FUNÇÃO PARA DESENHAR OS OBSTÁCULOS
        const drawBird = () => {
            context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);
        };

        // FUNÇÃO PARA DESENHAR OS OBSTÁCULOS
        const drawPipes = () => {
            pipes.forEach(pipe => {
                const upperPipeHeight = pipe.height; // ALTURA DO OBSTÁCULOS SUPERIOR
                const lowerPipeHeight = canvas.height - upperPipeHeight - pipeGap; // ALTURA DO OBSTÁCULOS INFERIOR

                context.save(); // SALVA O ESTADO DO CONTEXTO
                context.translate(pipe.x, 0); // MOVE O CONTEXTO PARA A POSIÇÃO DO OBSTÁCULO
                context.scale(1, -1); // INVERTE O EIXO Y PARA DESENHAR O OBSTÁCULO SUPERIOR
                const pipeToDraw = pipe.type === 'fork' ? forkImg : pipeImg; // ESCOLHE A IMAGEM COM BASE NO TIPO
                context.drawImage(pipeToDraw, 0, -upperPipeHeight, pipeDimensions.width, upperPipeHeight); 
                context.restore();

                // DESENHA O OBSTÁCULO INFERIOR
                const lowerPipeToDraw = pipe.type === 'fork' ? pipeImg : forkImg; // INVERTE O TIPO PARA O TUBO DE BAIXO
                context.drawImage(lowerPipeToDraw, pipe.x, canvas.height - lowerPipeHeight, pipeDimensions.width, lowerPipeHeight);
            });
        };

        // ATUALIZA A POSIÇÃO DOS OBSTÁCULOS
        const updatePipes = () => {
            frameCount++; // INCREMENTA O CONTADOR DE FRAMES
            if (frameCount % pipeInterval === 0) { // GERA UM NOVO TUBO BASEADO NO INTERVALO
                const height = Math.random() * (pipeDimensions.maxHeight - pipeDimensions.minHeight) + pipeDimensions.minHeight;
                const isFork = Math.random() < 0.5; // 50% DE CHANCE PARA O TUBO DE CIMA SER UM GARFO
                pipes.push({ x: canvas.width, height, passed: false, type: isFork ? 'fork' : 'knife' });
            }

            // MOVE OS OBSTÁCULOS PARA A ESQUERDA
            pipes.forEach(pipe => {
                pipe.x -= pipeSpeed;
            });

            // VERIFICA SE O FRANGO (PERSONAGEM) PASSOU PELOS OBSTÁCULOS
            pipes.forEach(pipe => {
                if (!isGameOver && pipe.x + pipeDimensions.width < bird.x && !pipe.passed) {
                    setPassedPipes(prev => {
                        const newScore = prev + 1;

                        if (isMobile) {
                            pipeSpeed += 0.2; // AUMENTA A VELOCIDADE NO MOBILE
                        } else {
                            pipeSpeed += 0.4; // AUMENTA A VELOCIDADE NO DESKTOP
                        }

                        return newScore; // ATUALIZA O SCORE
                    });
                    pipe.passed = true; // MARCA O TUBO COMO PASSADO
                }
            });

            // REMOVE OBSTÁCULOS QUE SAEM DA TELA
            if (pipes.length > 0 && pipes[0].x < -pipeDimensions.width) {
                pipes.shift();
            }
        };

        // VERIFICA COLISÕES
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

            // VERIFICA SE O FRANGO (PERSONAGEM) CAIU
            if (bird.y + bird.height > canvas.height) {
                setIsGameOver(true);
            }
        };

        // FUNÇÃO PRINCIPAL PARA DESENHAR TUDO NO CANVAS
        const draw = () => {
            context.clearRect(0, 0, canvas.width, canvas.height); // LIMPA O CANVAS
            drawBackground(); // DESENHA O FUNDO
            drawBird(); // DESENHA O FRANGO (PERSONAGEM)
            drawPipes(); // DESENHA OS OBSTÁCULOS

            // ATUALIZA A LÓGICA DO JOGO SE NÃO ESTIVER PAUSADO OU EM GAME OVER
            if (!isPaused && !isGameOver) {
                updatePipes(); // ATUALIZA OS OBSTÁCULOS
                checkCollision(); // VERIFICA COLISÕES
                bird.y += velocity; // ATUALIZA A POSIÇÃO DO FRANGO (PERSONAGEM)
                velocity += gravity; // APLICA A GRAVIDADE
                updateBackground(); // ATUALIZA O FUNDO
            } else if (isGameOver) {
                // SE O JOGO ACABOU, DESENHA A TELA DE GAME OVER
                context.fillStyle = 'rgba(0, 0, 0, 0.8)';
                context.fillRect(0, 0, canvas.width, canvas.height);
                context.fillStyle = 'white';
                context.font = `${gameOverFontSize}px "Press Start 2P", cursive`;
                context.textAlign = 'center';
                context.textBaseline = 'middle';
                context.fillText('Game Over!', canvas.width / 2, canvas.height / 2 - 20);
                context.font = `${scoreFontSize}px "Press Start 2P", cursive`;
                context.fillText(`Score: ${passedPipes}`, canvas.width / 2, canvas.height / 2 + 60);
            }

            requestAnimationFrame(draw); // CHAMA A FUNÇÃO DE DESENHO NOVAMENTE
        };

        // FUNÇÃO PARA LIDAR COM O CLIQUE
        const handleClick = () => {
            if (!isPaused && !isGameOver) {
                velocity = jumpVelocity; // FAZ O FRANGO (PERSONAGEM) SALTAR
            }
        };

        // FUNÇÃO PARA LIDAR COM A TECLA ESPAÇO
        const handleSpacebar = (event) => {
            if (event.code === 'Space') {
                event.preventDefault();
                if (!isPaused && !isGameOver) {
                    velocity = jumpVelocity; // FAZ O FRANGO (PERSONAGEM) SALTAR
                }
            }
        };

        // ADICIONA EVENTOS DE CLIQUE E TECLA
        canvas.addEventListener('click', handleClick);
        window.addEventListener('keydown', handleSpacebar);

        draw(); // INICIA A ANIMAÇÃO

        // LIMPEZA DOS EVENTOS AO DESMONTAR O COMPONENTE
        return () => {
            canvas.removeEventListener('click', handleClick);
            window.removeEventListener('keydown', handleSpacebar);
        };
    }, [isPaused, isGameOver]);

    // FUNÇÃO PARA RECARREGAR A PÁGINA
    const reloadPage = () => {
        window.location.reload();
    };

    // FUNÇÃO PARA IR PARA A TELA INICIAL
    const goToHome = () => {
        window.location.href = "/entretenimento/flappybird/tela_inicial";
    };

    return (
        <div className="flex flex-col h-screen text-white overflow-hidden" style={{ margin: 0 }}>
            <div className="flex-grow relative">
                <canvas
                    ref={canvasRef} // REFERÊNCIA DO CANVAS
                    className="border border-black w-full h-full"
                    style={{ 
                        backgroundImage: `url(${backgroundImage})`, 
                        backgroundSize: '10px', // TAMANHO DO FUNDO
                        backgroundPosition: 'center', 
                        backgroundRepeat: 'no-repeat' // PARA EVITAR REPETIÇÃO DA IMAGEM
                    }} 
                />
                {!isGameOver && (
                    <div className="absolute top-0 left-0 w-full text-left mt-16 ml-4" style={{ zIndex: 10 }}>
                        <div className="text-2xl font-bold font-pixel" style={{ fontSize: scoreFontSize }}>Score: {passedPipes}</div>
                    </div>
                )}
                {isGameOver && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <button
                            onClick={reloadPage} // REINICIA O JOGO
                            className="text-white text-sm py-1 px-4 rounded mt-[440px] font-pixel transition duration-300 ease-in-out hover:text-yellow-500 relative"
                        >
                            Reiniciar Jogo
                            <span className="absolute left-0 bottom-0 w-full h-0.5 bg-yellow-500 transform scale-x-0 transition-transform duration-300 ease-in-out hover:scale-x-100" />
                        </button>
                        <button
                            onClick={goToHome} // VAI PARA A TELA INICIAL
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
