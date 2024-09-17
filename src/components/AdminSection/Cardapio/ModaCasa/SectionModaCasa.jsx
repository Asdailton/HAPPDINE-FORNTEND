import panela from '../../../../image/CardapioAdmin/Panela.svg'
import CardapioCardModaCasa from './CardapioCardModaCasa'

const SectionModaCasa = () =>{
    return(
        <div className="w-full bg-[#007BC0] pt-[50px] pb-[50px] px-[50px] flex items-start space-x-6 justify-between">
        <div className="flex flex-col justify-center items-center mt-[70px] ml-[27px]">
          <img src={panela} alt="" className="mb-4 w-[100px]" />
          <p className="text-white text-lg">Moda da casa</p>
        </div>
        <div className="w-full sm:w-[90%] md:w-[80%] lg:w-[80%] xl:w-[80%] 2xl:w-[87%] mx-auto">
           <CardapioCardModaCasa/>
        </div>
        </div>
    )

}
export default SectionModaCasa