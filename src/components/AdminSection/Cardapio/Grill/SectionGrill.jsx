import React from "react";
import CardapioGrillCard from "./CardapioGrillCard";
import fogo from '../../../../image/CardapioAdmin/Fogo.svg'

const SectionGrill = () => {
    return(
        <div className="w-full bg-[#9E2896] pt-[50px] pb-[50px] px-[50px] flex items-start space-x-6 justify-between">
        <div className="flex flex-col justify-center items-center mt-[70px] ml-[25px]">
          <img src={fogo} alt="" className="mb-4 w-[64px]" />
          <p className="text-white text-lg">Grill e Bem estar</p>
        </div>
        <div className="w-full sm:w-[90%] md:w-[80%] lg:w-[80%] xl:w-[80%] 2xl:w-[87%] mx-auto">
           <CardapioGrillCard/>
        </div>
        </div>
    )
}

export default SectionGrill