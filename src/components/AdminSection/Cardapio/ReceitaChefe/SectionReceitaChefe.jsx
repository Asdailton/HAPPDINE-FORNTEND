

import CardapioCardReceitaChefe from './CardapioCardReceitaChefe';
import talher from '../../../../image/CardapioAdmin/Talher.svg'

const SectionReceitaChefe = () =>{
    return(
        <div className="w-full bg-[#12818F] pt-[50px] pb-[50px] px-[50px] flex items-start space-x-6 justify-between">
        <div className="flex flex-col justify-center items-center mt-[70px] ml-[25px]">
          <img src={talher} alt="" className="mb-4 w-[52px]" />
          <p className="text-white text-lg">Receita do Chefe</p>
        </div>
        <div className="w-full sm:w-[90%] md:w-[80%] lg:w-[80%] xl:w-[80%] 2xl:w-[87%] mx-auto">
           <CardapioCardReceitaChefe/>
        </div>
        </div>
    )

}
export default SectionReceitaChefe;