import React, { useEffect, useRef, useState } from 'react';
import backgroundImage from '../../../image/Jogos/FlappyChicken/Clube/Clube04.png'; // IMAGEM DO FUNDO DO JOGO
import birdImage from '../../../image/Jogos/FlappyChicken/Clube/ChickenClube.png'; // IMAGEM DO FRANGO (PERSONAGEM)
import pipeImage from '../../../image/Jogos/FlappyChicken/Clube/TuboClubeGrande.png'; // OBSTÁCULO 01 / GRANDE
import smallPipeImage from '../../../image/Jogos/FlappyChicken/Clube/TuboClubePequeno.png'; // OBSTÁCULO 02 / PEQUENO
import musica from '../../../components/MusicasJogo/SomClube01.mp3'; // Música de fundo

// COMPONENTE PRINCIPAL DO JOGO FLAPPY BIRD
const Clube = () => {
    const canvasRef = useRef(null); // REFERÊNCIA AO ELEMENTO CANVAS
    const [passedPipes, setPassedPipes] = useState(0); // CONTADOR DE OBSTÁCULOS PASSADOS
    const [isPaused, setIsPaused] = useState(false); // ESTADO DE PAUSA DO JOGO
    const [isGameOver, setIsGameOver] = useState(false); // ESTADO DE FIM DE JOGO

    const isMobile = window.innerWidth <= 768; // VERIFICA SE É UM DISPOSITIVO MÓVEL
    const bird = {
        x: 50, // POSIÇÃO X DO FRANGO (PERSONAGEM)
        y: 0, // POSIÇÃO Y INICIAL DO FRANGO (PERSONAGEM)
        width: isMobile ? 70 : 110, // LARGURA DO FRANGO (PERSONAGEM)
        height: isMobile ? 60 : 100 // ALTURA DO FRANGO (PERSONAGEM)
    };

    // DIMENSÕES DOS OBSTÁCULOS
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

    // FUNÇÃO PARA REINICIAR O JOGO
    const resetGame = () => {
        setPassedPipes(0);
        setIsPaused(false);
        setIsGameOver(false);
        velocity = 0;
        pipes.length = 0; // LIMPA O ARRAY DE OBSTÁCULOS
        frameCount = 0; // REINICIA O CONTADOR DE FRAMES
        pipeSpeed = isMobile ? 1 : 2; // RESETA A VELOCIDADE
        bird.y = canvasRef.current.height * 0.5; // REPOSICIONA O FRANGO (PERSONAGEM)
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d'); // CONTEXTO 2D PARA O CANVAS

        // CARREGAMENTO DAS IMAGENS
        const birdImg = new Image();
        birdImg.src = birdImage;

        const bgImage = new Image();
        bgImage.src = backgroundImage;

        const pipeImg = new Image();
        pipeImg.src = pipeImage;

        const smallPipeImg = new Image();
        smallPipeImg.src = smallPipeImage;

        // FUNÇÃO PARA REDIMENSIONAR O CANVAS
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight; 
            bird.y = canvas.height * 0.5; // REPOSICIONA O FRANGO (PERSONAGEM) NO MEIO VERTICALMENTE
        };

        // ADICIONA LISTENER PARA REDIMENSIONAMENTO DA JANELA
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas(); // INICIALIZA O CANVAS

        let backgroundOffset = 0; // DESLOCAMENTO DO FUNDO
        const backgroundSpeed = 0.1; // VELOCIDADE DO FUNDO

        // FUNÇÃO PARA DESENHAR O FUNDO
        const drawBackground = () => {
            context.drawImage(bgImage, backgroundOffset, 0, canvas.width * 2, canvas.height);
            context.drawImage(bgImage, backgroundOffset + canvas.width * 2, 0, canvas.width * 2, canvas.height);
        };

        // ATUALIZA A POSIÇÃO DO FUNDO
        const updateBackground = () => {
            backgroundOffset -= backgroundSpeed;
            if (backgroundOffset <= -canvas.width * 2) {
                backgroundOffset = 0; // RESETA O DESLOCAMENTO DO FUNDO
            }
        };

        // FUNÇÃO PARA DESENHAR O FRANGO (PERSONAGEM)
        const drawBird = () => {
            context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);
        };

        // FUNÇÃO PARA DESENHAR OS OBSTÁCULOS
        const drawPipes = () => {
            pipes.forEach(pipe => {
                const upperPipeHeight = pipe.height; // ALTURA DO OBSTÁCULO SUPERIOR
                const lowerPipeHeight = canvas.height - upperPipeHeight - pipeGap; // ALTURA DO OBSTÁCULO INFERIOR

                context.save(); // SALVA O ESTADO DO CONTEXTO
                context.translate(pipe.x, 0); // MOVE O CONTEXTO PARA A POSIÇÃO DO OBSTÁCULO
                context.scale(1, -1); // INVERTE O CONTEXTO VERTICALMENTE
                const pipeToDraw = upperPipeHeight < 100 ? smallPipeImg : pipeImg; // ESCOLHE A IMAGEM DO OBSTÁCULO
                context.drawImage(pipeToDraw, 0, -upperPipeHeight, pipeDimensions.width, upperPipeHeight); // DESENHA O OBSTÁCULO SUPERIOR
                context.restore(); // RESTAURA O ESTADO DO CONTEXTO

                context.drawImage(pipeImg, pipe.x, canvas.height - lowerPipeHeight, pipeDimensions.width, lowerPipeHeight); // DESENHA O OBSTÁCULO INFERIOR
            });
        };

        // FUNÇÃO PARA ATUALIZAR A POSIÇÃO DOS OBSTÁCULOS
        const updatePipes = () => {
            frameCount++;
            // CRIA UM NOVO OBSTÁCULO A CADA INTERVALO
            if (frameCount % pipeInterval === 0) {
                const height = Math.random() * (pipeDimensions.maxHeight - pipeDimensions.minHeight) + pipeDimensions.minHeight;
                pipes.push({ x: canvas.width, height, passed: false });
            }

            // ATUALIZA A POSIÇÃO DE TODOS OS OBSTÁCULOS
            pipes.forEach(pipe => {
                pipe.x -= pipeSpeed; // MOVE OS OBSTÁCULOS PARA A ESQUERDA
            });

            // VERIFICA SE O FRANGO (PERSONAGEM) PASSOU PELO OBSTÁCULO
            pipes.forEach(pipe => {
                if (!isGameOver && pipe.x + pipeDimensions.width < bird.x && !pipe.passed) {
                    setPassedPipes(prev => {
                        const newScore = prev + 1;

                        // AUMENTA A VELOCIDADE CONFORME O SCORE
                        if (isMobile) {
                            pipeSpeed += 0.2; // AUMENTA A VELOCIDADE NO MOBILE
                        } else {
                            pipeSpeed += 0.4; // AUMENTA A VELOCIDADE NO DESKTOP
                        }

                        return newScore;
                    });
                    pipe.passed = true; // MARCA O OBSTÁCULO COMO PASSADO
                }
            });

            // REMOVE OBSTÁCULOS QUE SAEM DA TELA
            if (pipes.length > 0 && pipes[0].x < -pipeDimensions.width) {
                pipes.shift();
            }
        };

        // FUNÇÃO PARA VERIFICAR COLISÕES
        const checkCollision = () => {
            for (let pipe of pipes) {
                if (
                    bird.x < pipe.x + pipeDimensions.width &&
                    bird.x + bird.width > pipe.x &&
                    (bird.y < pipe.height || bird.y + bird.height > canvas.height - (canvas.height - pipe.height - pipeGap))
                ) {
                    setIsGameOver(true); // COLISÃO COM OBSTÁCULOS
                }
            }

            if (bird.y + bird.height > canvas.height) {
                setIsGameOver(true); // COLISÃO COM O CHÃO
            }
        };

        // FUNÇÃO PRINCIPAL DE DESENHO
        const draw = () => {
            context.clearRect(0, 0, canvas.width, canvas.height); // LIMPA O CANVAS
            drawBackground(); // DESENHA O FUNDO
            drawBird(); // DESENHA O FRANGO (PERSONAGEM)
            drawPipes(); // DESENHA OS OBSTÁCULOS

            // ATUALIZA O ESTADO DO JOGO SE NÃO ESTIVER PAUSADO E NÃO TIVER ACABADO
            if (!isPaused && !isGameOver) {
                updatePipes();
                checkCollision();
                bird.y += velocity; // ATUALIZA A POSIÇÃO DO FRANGO (PERSONAGEM)
                velocity += gravity; // APLICA A GRAVIDADE
                updateBackground(); // ATUALIZA O FUNDO
            } else if (isGameOver) {
                // MOSTRA A TELA DE GAME OVER
                context.fillStyle = 'rgba(0, 0, 0, 0.8)';
                context.fillRect(0, 0, canvas.width, canvas.height); // FUNDO ESCURO
                context.fillStyle = 'white';
                
                // TAMANHO DA FONTE PARA "GAME OVER"
                const maxGameOverFontSize = 60; // TAMANHO MÁXIMO DA FONTE PARA "GAME OVER"
                const gameOverFontSize = Math.min(canvas.width * 0.1, maxGameOverFontSize);
                context.font = `${gameOverFontSize}px "Press Start 2P", cursive`;
                context.textAlign = 'center';
                context.textBaseline = 'middle';
                context.fillText('Game Over!', canvas.width / 2, canvas.height / 2 - 20); // MENSAGEM DE GAME OVER
                
                // TAMANHO DA FONTE PARA O SCORE
                const maxScoreFontSize = 30; // TAMANHO MÁXIMO DA FONTE PARA O SCORE
                const scoreFontSize = Math.min(canvas.width * 0.05, maxScoreFontSize);
                context.font = `${scoreFontSize}px "Press Start 2P", cursive`;
                context.fillText(`Score: ${passedPipes}`, canvas.width / 2, canvas.height / 2 + 60); // MOSTRA O SCORE
            }

            requestAnimationFrame(draw); // CHAMA A FUNÇÃO DE DESENHO NOVAMENTE
        };

        // FUNÇÃO PARA TRATAR CLIQUES DO MOUSE
        const handleClick = () => {
            if (!isPaused && !isGameOver) {
                velocity = jumpVelocity; // FAZ O FRANGO (PERSONAGEM) PULAR
            }
        };

        // FUNÇÃO PARA TRATAR PRESSIONAMENTO DA BARRA DE ESPAÇO
        const handleSpacebar = (event) => {
            if (event.code === 'Space') {
                event.preventDefault();
                if (!isPaused && !isGameOver) {
                    velocity = jumpVelocity; // FAZ O FRANGO (PERSONAGEM) PULAR
                }
            }
        };

        // ADICIONA LISTENERS PARA EVENTOS DE CLIQUE E TECLA
        canvas.addEventListener('click', handleClick);
        window.addEventListener('keydown', handleSpacebar);

        // Reproduz a música de fundo em loop
        const audio = new Audio(musica);
        audio.loop = true;
        audio.play();

        draw(); // INICIA O DESENHO

        // LIMPEZA DOS LISTENERS QUANDO O COMPONENTE É DESMONTADO
        return () => {
            canvas.removeEventListener('click', handleClick);
            window.removeEventListener('keydown', handleSpacebar);
            audio.pause(); // PAUSA A MÚSICA AO SAIR DO COMPONENTE
        };
    }, [isPaused, isGameOver]); // DEPENDÊNCIAS DO USEEFFECT

    // FUNÇÃO PARA RECARREGAR A PÁGINA
    const reloadPage = () => {
        window.location.reload();
    };

    // FUNÇÃO PARA VOLTAR À TELA INICIAL
    const goToHome = () => {
        window.location.href = "/entretenimento/flappybird/tela_inicial/tutorial/selecaofase";
    };

    return (
        <div className="flex flex-col h-screen text-white overflow-hidden" style={{ margin: 0 }}>
            <div className="flex-grow relative">
                <canvas
                    ref={canvasRef} // REF PARA O CANVAS
                    className="border border-black w-full h-full"
                    style={{ 
                        backgroundImage: `url(${backgroundImage})`, 
                        backgroundSize: '10px', 
                        backgroundPosition: 'center', 
                        backgroundRepeat: 'no-repeat' 
                    }} 
                />
                {!isGameOver && (
                    <div className="absolute top-0 left-0 w-full text-left mt-16 ml-4" style={{ zIndex: 10 }}>
                        <div className="text-2xl font-bold font-pixel" style={{ fontSize: `${Math.min(window.innerWidth * 0.05, 30)}px` }}>
                            Score: {passedPipes}
                        </div> {/* MOSTRA O SCORE */}
                    </div>
                )}
                {isGameOver && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <button
                            onClick={reloadPage} // RECARREGA A PÁGINA PARA REINICIAR
                            className="text-white text-sm py-1 px-4 rounded mt-[440px] font-pixel transition duration-300 ease-in-out hover:text-yellow-500 relative"
                        >
                            Reiniciar Jogo
                            <span className="absolute left-0 bottom-0 w-full h-0.5 bg-yellow-500 transform scale-x-0 transition-transform duration-300 ease-in-out hover:scale-x-100" />
                        </button>
                        <button
                            onClick={goToHome} // REDIRECIONA PARA A TELA INICIAL
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

export default Clube;
