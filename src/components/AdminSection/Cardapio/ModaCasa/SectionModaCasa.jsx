// Importa a imagem da panela e o componente CardapioCardModaCasa
import panela from '../../../../image/CardapioAdmin/Panela.svg';
import CardapioCardModaCasa from './CardapioCardModaCasa';

// Define o componente funcional SectionModaCasa
const SectionModaCasa = () => {
    return (
        // Container principal com classes utilitárias do Tailwind CSS
        <div className="w-full bg-[#007BC0] pt-[50px] pb-[50px] px-[50px] flex items-start space-x-6 justify-between">
            {/* Seção para o ícone e título */}
            <div className="flex flex-col justify-center items-center mt-[70px] ml-[27px]">
                {/* Imagem da panela */}
                <img src={panela} alt="" className="mb-4 w-[100px]" />
                {/* Título da seção */}
                <p className="text-white text-lg">Moda da casa</p>
            </div>
            {/* Container para os itens do cardápio, com largura responsiva */}
            <div className="w-full sm:w-[90%] md:w-[80%] lg:w-[80%] xl:w-[80%] 2xl:w-[87%] mx-auto">
                {/* Componente que renderiza os itens do cardápio */}
                <CardapioCardModaCasa />
            </div>
        </div>
    );
}

// Exporta o componente para que possa ser utilizado em outras partes da aplicação
export default SectionModaCasa;
