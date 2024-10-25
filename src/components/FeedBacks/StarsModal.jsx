// Importa React e useState do React, e o componente Rating da biblioteca react-rating
import React, { useState } from 'react';
import Rating from 'react-rating';

// Define o componente funcional RatingComponent
const RatingComponent = () => {
    // Inicializa o estado 'rating' com o valor 3 e 'color' com a cor padrão das estrelas
    const [rating, setRating] = useState(3);
    const [color, setColor] = useState('#10AAFD'); // Cor padrão para as estrelas

    // Função para lidar com mudanças na classificação
    const handleRatingChange = (value) => {
        setRating(value); // Atualiza o estado da classificação
        localStorage.setItem('stars', value); // Salva a classificação no localStorage
    };

    // Função para lidar com mudanças na cor
    const handleColorChange = (color) => {
        setColor(color); // Atualiza o estado da cor
        localStorage.setItem('color', color); // Salva a cor no localStorage
    };

    // Retorna a estrutura do componente
    return (
        <div className='flex w-[100%] h-[80%] items-center'> {/* Container flexível para alinhar os elementos */}
            <div className='flex w-[35%] h-[2vh] items-center '> {/* Container para o componente de avaliação */}
                <Rating
                    initialRating={rating} // Define a avaliação inicial com o valor armazenado no estado
                    onChange={handleRatingChange} // Define a função a ser chamada quando a avaliação mudar
                    emptySymbol={<span style={{ fontSize: '23px', color: '#ccc' }}>★</span>} // Símbolo para estrelas vazias
                    fullSymbol={<span style={{ fontSize: '23px', color }}>★</span>} // Símbolo para estrelas preenchidas com a cor armazenada
                    fractions={1} // Permite frações na avaliação (ex: 4.5 estrelas)
                    start={0} // Valor inicial da avaliação
                    stop={5} // Valor máximo da avaliação
                />
            </div>
            <div className='relative'> {/* Contêiner para o seletor de cores */}
                <CustomSelect value={color} onChange={handleColorChange} /> {/* Componente para selecionar a cor das estrelas */}
            </div>
        </div>
    );
};

// Define o componente CustomSelect para escolher a cor
const CustomSelect = ({ value, onChange }) => {
    const [isOpen, setIsOpen] = useState(false); // Estado para controlar se o seletor de cores está aberto ou fechado
    const colors = [ // Lista de cores disponíveis
        { color: '#10AAFD', label: 'Blue' },
        { color: '#C535BC', label: 'Purple' },
        { color: '#219557', label: 'Green' },
        { color: '#2E3033', label: 'Black' },
    ];

    // Função para lidar com a seleção de cor
    const handleColorClick = (color) => {
        onChange(color); // Chama a função onChange passada como prop com a nova cor
        setIsOpen(false); // Fecha o seletor de cores
    };

    // Retorna a estrutura do componente
    return (
        <div className='relative w-10 p-0.5 border'> {/* Contêiner para o seletor */}
            <div
                className='w-3 h-3 rounded-full border flex items-center justify-center cursor-pointer' // Estilo do círculo que representa a cor selecionada
                style={{ backgroundColor: value }} // Cor de fundo igual à cor selecionada
                onClick={() => setIsOpen(!isOpen)} // Alterna a abertura do seletor ao clicar
            >
                {/* Exibe a cor atualmente selecionada */}
                <span className='ml-9 text-[12px] text-gray-400'>▼</span> {/* Indicador de dropdown */}
            </div>

            {/* Exibe a lista de cores se o seletor estiver aberto */}
            {isOpen && (
                <div className='absolute top-full left-0 bg-white border border-gray-300 shadow-lg z-10'> {/* Estilo do menu dropdown */}
                    {colors.map(({ color, label }) => ( // Mapeia as cores disponíveis
                        <div
                            key={color} // Usa a cor como chave única
                            className='flex items-center p-2 cursor-pointer hover:bg-gray-100' // Estilo do item de cor
                            onClick={() => handleColorClick(color)} // Chama a função ao clicar na cor
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                                <circle cx="12" cy="12" r="10" fill={color} /> {/* Exibe um círculo colorido */}
                            </svg>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

// Exporta o componente RatingComponent para uso em outras partes da aplicação
export default RatingComponent;
