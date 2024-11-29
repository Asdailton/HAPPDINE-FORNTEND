import React, { useEffect, useRef, useState } from 'react';
import backgroundImage from '../../../image/Jogos/FlappyChicken/Grill/GrilCenario.png';
import birdImage from '../../../image/Jogos/FlappyChicken/Grill/ChickenGrill.png';
import pipeImage from '../../../image/Jogos/FlappyChicken/Grill/Faca.png';
import forkImage from '../../../image/Jogos/FlappyChicken/Grill/Garfo.png';
import smallPipeImage from '../../../image/Jogos/FlappyChicken/Clube/TuboClubePequeno.png';

import backgroundMusic from '../../../components/MusicasJogo/Cozinha.mp3'; // Caminho para o arquivo de áudio

const Grill = () => {
    const canvasRef = useRef(null);
    const [passedPipes, setPassedPipes] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [isGameOver, setIsGameOver] = useState(false);

    const isMobile = window.innerWidth <= 768;
    const bird = {
        x: 50,
        y: 0,
        width: isMobile ? 100 : 110,
        height: isMobile ? 100 : 110
    };

    const pipeDimensions = {
        width: isMobile ? 100 : 140,
        minHeight: isMobile ? 100 : 140,
        maxHeight: isMobile ? 230 : 330
    };

    const gravity = 0.1;
    const jumpVelocity = -4;

    let velocity = 0;
    const pipes = [];
    const pipeGap = 250;
    const pipeInterval = 225;
    let frameCount = 0;

    let pipeSpeed = isMobile ? 1 : 2;

    const speedMultiplier = 0.5;
    const gameOverFontSize = Math.min(window.innerWidth * 0.06, 50);
    const scoreFontSize = Math.min(window.innerWidth * 0.025, 30);

    // Recarrega o jogo
    const resetGame = () => {
        setPassedPipes(0);
        setIsPaused(false);
        setIsGameOver(false);
        velocity = 0;
        pipes.length = 0;
        frameCount = 0;
        pipeSpeed = isMobile ? 1 : 2;
        bird.y = canvasRef.current.height * 0.5;
        backgroundAudio.play(); // Reinicia a música quando o jogo for reiniciado
    };

    // Música de fundo
    const backgroundAudio = new Audio(backgroundMusic);
    backgroundAudio.loop = true; // Faz a música tocar em loop

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        // Carregamento das imagens
        const birdImg = new Image();
        birdImg.src = birdImage;

        const bgImage = new Image();
        bgImage.src = backgroundImage;

        const pipeImg = new Image();
        pipeImg.src = pipeImage;

        const smallPipeImg = new Image();
        smallPipeImg.src = smallPipeImage;

        const forkImg = new Image();
        forkImg.src = forkImage;

        // Função para redimensionar o canvas
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            bird.y = canvas.height * 0.5;
        };

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        let backgroundOffset = 0;
        const backgroundSpeed = 0.1;

        // Função para desenhar o fundo
        const drawBackground = () => {
            context.drawImage(bgImage, backgroundOffset, 0, canvas.width * 2, canvas.height);
            context.drawImage(bgImage, backgroundOffset + canvas.width * 2, 0, canvas.width * 2, canvas.height);
        };

        const updateBackground = () => {
            backgroundOffset -= backgroundSpeed;
            if (backgroundOffset <= -canvas.width * 2) {
                backgroundOffset = 0;
            }
        };

        // Função para desenhar o frango
        const drawBird = () => {
            context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);
        };

        // Função para desenhar os obstáculos
        const drawPipes = () => {
            pipes.forEach(pipe => {
                const upperPipeHeight = pipe.height;
                const lowerPipeHeight = canvas.height - upperPipeHeight - pipeGap;

                context.save();
                context.translate(pipe.x, 0);
                context.scale(1, -1);
                const pipeToDraw = pipe.type === 'fork' ? forkImg : pipeImg;
                context.drawImage(pipeToDraw, 0, -upperPipeHeight, pipeDimensions.width, upperPipeHeight);
                context.restore();

                const lowerPipeToDraw = pipe.type === 'fork' ? pipeImg : forkImg;
                context.drawImage(lowerPipeToDraw, pipe.x, canvas.height - lowerPipeHeight, pipeDimensions.width, lowerPipeHeight);
            });
        };

        const updatePipes = () => {
            frameCount++;
            if (frameCount % pipeInterval === 0) {
                const height = Math.random() * (pipeDimensions.maxHeight - pipeDimensions.minHeight) + pipeDimensions.minHeight;
                const isFork = Math.random() < 0.5;
                pipes.push({ x: canvas.width, height, passed: false, type: isFork ? 'fork' : 'knife' });
            }

            pipes.forEach(pipe => {
                pipe.x -= pipeSpeed;
            });

            pipes.forEach(pipe => {
                if (!isGameOver && pipe.x + pipeDimensions.width < bird.x && !pipe.passed) {
                    setPassedPipes(prev => {
                        const newScore = prev + 1;

                        if (isMobile) {
                            pipeSpeed += 0.2;
                        } else {
                            pipeSpeed += 0.4;
                        }

                        return newScore;
                    });
                    pipe.passed = true;
                }
            });

            if (pipes.length > 0 && pipes[0].x < -pipeDimensions.width) {
                pipes.shift();
            }
        };

        const checkCollision = () => {
            for (let pipe of pipes) {
                if (
                    bird.x < pipe.x + pipeDimensions.width &&
                    bird.x + bird.width > pipe.x &&
                    (bird.y < pipe.height || bird.y + bird.height > canvas.height - (canvas.height - pipe.height - pipeGap))
                ) {
                    setIsGameOver(true);
                    backgroundAudio.pause(); // Pausa a música quando o jogo acaba
                }
            }

            if (bird.y + bird.height > canvas.height) {
                setIsGameOver(true);
                backgroundAudio.pause(); // Pausa a música quando o jogo acaba
            }
        };

        const draw = () => {
            context.clearRect(0, 0, canvas.width, canvas.height);
            drawBackground();
            drawBird();
            drawPipes();

            if (!isPaused && !isGameOver) {
                updatePipes();
                checkCollision();
                bird.y += velocity;
                velocity += gravity;
                updateBackground();
            } else if (isGameOver) {
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

            requestAnimationFrame(draw);
        };

        const handleClick = () => {
            if (!isPaused && !isGameOver) {
                velocity = jumpVelocity;
            }
        };

        const handleSpacebar = (event) => {
            if (event.code === 'Space') {
                event.preventDefault();
                if (!isPaused && !isGameOver) {
                    velocity = jumpVelocity;
                }
            }
        };

        canvas.addEventListener('click', handleClick);
        window.addEventListener('keydown', handleSpacebar);

        // Começa a música de fundo assim que o jogo inicia
        backgroundAudio.play(); 

        draw();

        return () => {
            canvas.removeEventListener('click', handleClick);
            window.removeEventListener('keydown', handleSpacebar);
            backgroundAudio.pause(); // Pausa a música quando o componente é desmontado
        };
    }, [isPaused, isGameOver]);

    const reloadPage = () => {
        window.location.reload();
    };

    const goToHome = () => {
        window.location.href = "/entretenimento/flappybird/tela_inicial/tutorial/selecaofase";
    };

    return (
        <div className="flex flex-col h-screen text-white overflow-hidden" style={{ margin: 0 }}>
            <div className="flex-grow relative">
                <canvas
                    ref={canvasRef}
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
                        <div className="text-2xl font-bold font-pixel" style={{ fontSize: scoreFontSize }}>Score: {passedPipes}</div>
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

export default Grill;
