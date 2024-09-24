import React, { useState, useEffect, useRef } from "react";
import stylesLight from './AnimationLight.module.css';
import stylesDark from './AnimationDark.module.css';

const Animation = () => {
    const containerRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    const [darkMode, setDarkMode] = useState(false); // Estado para o modo escuro

    useEffect(() => {
        // Função para ler e definir o valor de darkMode
        const checkDarkMode = () => {
            const storedDarkMode = localStorage.getItem('darkMode');
            setDarkMode(storedDarkMode === 'true');
        };

        // Verifica o modo escuro quando o componente é montado
        checkDarkMode();

        // Adiciona um temporizador para verificar mudanças no localStorage a cada 100 ms
        const timerId = setInterval(checkDarkMode, 100);

        // Remove o temporizador ao desmontar o componente
        return () => clearInterval(timerId);
    }, []); // Executa uma vez ao montar

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            {
                threshold: 0.1,
            }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => {
            if (containerRef.current) {
                observer.unobserve(containerRef.current);
            }
        };
    }, []);

    return (
        <div ref={containerRef} className={darkMode ? stylesDark.conteiner : stylesLight.conteiner}>
            <ul className={darkMode ? stylesDark.dinamico : stylesLight.dinamico}>
                <li className={darkMode ? stylesDark.first : stylesLight.first}>
                    <span>EFICIENTE</span>
                </li>
                <li className={darkMode ? stylesDark.third : stylesLight.third}>
                    <span>TECNOLÓGICO</span>
                </li>
                <li className={darkMode ? stylesDark.second : stylesLight.second}>
                    <span>RÁPIDO</span>
                </li>
            </ul>
        </div>
    );
};

export default Animation;
