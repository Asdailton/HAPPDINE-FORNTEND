import React from "react";

import Card from "./DeBemVida/CardapioCard";
import SectionDeBemVida from "./DeBemVida/SectionBemVida";
import SectionModaCasa from "./ModaCasa/SectionModaCasa";
import SectionReceitaChefe from "./ReceitaChefe/SectionReceitaChefe";
import SectionGrill from "./Grill/SectionGrill";

const CardapioHome = () => {
  return (
    <div className="px-[54px] flex flex-col">
      <div className="flex items-center justify-center p-[90px] gap-6">
        <hr className="border-t border-gray-300 dark:border-gray-600" style={{ width: '10%' }} />
        <p className="text-[34px] font-semibold">Cardápio</p>
        <hr className="border-t border-gray-300 dark:border-gray-600" style={{ width: '10%' }} />
      </div>
      <div className="mb-[40px]">
         <SectionDeBemVida/>
      </div>
      <div className="mb-[40px]">
         <SectionModaCasa/>
      </div>
      <div className="mb-[40px]">
         <SectionReceitaChefe/>
      </div>
      <div className="mb-[70px]">
         <SectionGrill/>
      </div>
      <div className="w-full flex justify-center mb-[100px] mt-[30px]">
        <button className=" bg-[#2E3033] w-[200px] h-[60px] text-[24.40px] text-white">
          Enviar
        </button>
      </div>
      
     
     
      
    </div>
  );
}

export default CardapioHome;
