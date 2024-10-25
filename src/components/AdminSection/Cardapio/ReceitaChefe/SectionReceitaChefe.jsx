// Importa o componente CardapioCardReceitaChefe e a imagem talher
import CardapioCardReceitaChefe from './CardapioCardReceitaChefe';
import talher from '../../../../image/CardapioAdmin/Talher.svg';

// Define o componente funcional SectionReceitaChefe
const SectionReceitaChefe = () => {
    return (
        // Cria um contêiner para a seção com fundo verde e preenchimento
        <div className="w-full bg-[#12818F] pt-[50px] pb-[50px] px-[50px] flex items-start space-x-6 justify-between">
            {/* Contêiner para o título da seção */}
            <div className="flex flex-col justify-center items-center mt-[70px] ml-[25px]">
                {/* Imagem do talher */}
                <img src={talher} alt="" className="mb-4 w-[52px]" />
                {/* Texto da seção */}
                <p className="text-white text-lg">Receita do Chefe</p>
            </div>
            {/* Contêiner para o componente CardapioCardReceitaChefe */}
            <div className="w-full sm:w-[90%] md:w-[80%] lg:w-[80%] xl:w-[80%] 2xl:w-[87%] mx-auto">
                <CardapioCardReceitaChefe />
            </div>
        </div>
    );
};

// Exporta o componente SectionReceitaChefe para ser usado em outras partes do aplicativo
export default SectionReceitaChefe;
