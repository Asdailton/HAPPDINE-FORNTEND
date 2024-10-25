// Importa as bibliotecas e componentes necessários
import React from "react";

// Importa seções específicas do cardápio
import Card from "./DeBemVida/CardapioCard"; // Este componente não está sendo utilizado no código, mas pode ser relevante
import SectionDeBemVida from "./DeBemVida/SectionBemVida"; // Seção do cardápio de "De Bem Vida"
import SectionModaCasa from "./ModaCasa/SectionModaCasa"; // Seção do cardápio de "Moda Casa"
import SectionReceitaChefe from "./ReceitaChefe/SectionReceitaChefe"; // Seção do cardápio de "Receita do Chefe"
import SectionGrill from "./Grill/SectionGrill"; // Seção do cardápio de "Grill"

// Define o componente funcional CardapioHome
const CardapioHome = () => {
  return (
    // Contêiner principal com preenchimento horizontal
    <div className="px-[54px] flex flex-col">
      {/* Seção do título do cardápio */}
      <div className="flex items-center justify-center p-[90px] gap-6">
        {/* Linha horizontal à esquerda do título */}
        <hr className="border-t border-gray-300 dark:border-gray-600" style={{ width: '10%' }} />
        {/* Título do cardápio */}
        <p className="text-[34px] font-bold ">Cardápio</p>
        {/* Linha horizontal à direita do título */}
        <hr className="border-t border-gray-300 dark:border-gray-600" style={{ width: '10%' }} />
      </div>
      
      {/* Seção "De Bem Vida" */}
      <div className="mb-[40px]">
         <SectionDeBemVida/>
      </div>
      
      {/* Seção "Moda Casa" */}
      <div className="mb-[40px]">
         <SectionModaCasa/>
      </div>
      
      {/* Seção "Receita do Chefe" */}
      <div className="mb-[40px]">
         <SectionReceitaChefe/>
      </div>
      
      {/* Seção "Grill" */}
      <div className="mb-[70px]">
         <SectionGrill/>
      </div>
      
      {/* Botão "Enviar" centralizado na parte inferior */}
      <div className="w-full flex justify-center mb-[100px] mt-[30px]">
        <button className="bg-[#2E3033] w-[200px] h-[60px] text-[24.40px] text-white">
          Enviar
        </button>
      </div>
    </div>
  );
}

// Exporta o componente CardapioHome para ser utilizado em outras partes do aplicativo
export default CardapioHome;
