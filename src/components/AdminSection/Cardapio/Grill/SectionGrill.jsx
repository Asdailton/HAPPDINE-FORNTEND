import React from "react"; // Importa a biblioteca React para criar componentes.
import CardapioGrillCard from "./CardapioGrillCard"; // Importa o componente CardapioGrillCard.
import fogo from '../../../../image/CardapioAdmin/Fogo.svg'; // Importa a imagem usada na seção.

const SectionGrill = () => { // Define o componente funcional SectionGrill.
    return( // Retorna o JSX a ser renderizado.
        <div className="w-full bg-gradient-to-r from-[#9E2896] to-[#671761] pt-[50px] pb-[50px] px-[50px] flex items-start space-x-6 justify-between"> 
            {/* Contêiner principal com largura total, cor de fundo, e espaçamentos verticais e horizontais. */}
            
            <div className="flex flex-col justify-center items-center mt-[70px] ml-[25px]"> 
                {/* Contêiner para a imagem e o texto, centralizando os itens. */}
                
                <img src={fogo} alt="" className="mb-4 w-[64px]" /> 
                {/* Imagem do ícone, com margem inferior e largura específica. */}
                
                <p className="text-white text-lg">Grill e Bem estar</p> 
                {/* Texto descritivo, estilizado em branco e tamanho grande. */}
            </div>

            <div className="w-full sm:w-[90%] md:w-[80%] lg:w-[80%] xl:w-[80%] 2xl:w-[87%] mx-auto"> 
                {/* Contêiner responsivo para o CardapioGrillCard, ajustando a largura em diferentes tamanhos de tela. */}
                
                <CardapioGrillCard/> 
                {/* Renderiza o componente CardapioGrillCard, que exibe os itens do cardápio. */}
            </div>
        </div>
    )
}

export default SectionGrill; // Exporta o componente para uso em outras partes da aplicação.
