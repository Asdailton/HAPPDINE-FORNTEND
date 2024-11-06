// Importa o componente Rating da biblioteca react-rating e o React e useState da biblioteca React
import Rating from "react-rating";
import React, { useState } from "react";

// Define o componente funcional Stars que recebe props 'corRegistrada' e 'quantidade'
const Stars = ({ corRegistrada, quantidade }) => {
    // Retorna a estrutura do componente
    return (
        <div className='flex w-[100%] h-[80%] items-center'> {/* Container flexível para alinhar os elementos */}
            <div className='flex w-[35%] h-[2vh] items-center'> {/* Container para o componente de estrelas */}
            <Rating
                    initialRating={quantidade} // Define a avaliação inicial com a quantidade recebida como prop
                    emptySymbol={<span className="text-[#ccc] sm:text-[16px] md:text-[20px] lg:text-[23px]">★</span>} // Estrela vazia com tamanho responsivo
                    fullSymbol={<span style={{ color: corRegistrada }} className="sm:text-[16px] md:text-[20px] lg:text-[23px]">★</span>} // Estrela cheia com cor e tamanho responsivo
                    fractions={1} // Permite frações na avaliação (ex: 4.5 estrelas)
                    start={0} // Define o valor inicial da avaliação
                    stop={5} // Define o valor máximo da avaliação
                    readonly // Torna o componente somente leitura (sem interação do usuário)
                />
            </div>
        </div>
    );
};

// Exporta o componente Stars para que possa ser utilizado em outras partes da aplicação
export default Stars;
