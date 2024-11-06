// Importa o componente Rating da biblioteca react-rating e os hooks React
import Rating from "react-rating";


//OBSERVAÇÃO, esse é componente é do modal do comentário selecionado, tem como objetivo atender os
// padrões da estrela definidos no figma, a lógica segue a mesma do outro componente STAR


// Componente funcional Stars que recebe 'corRegistrada' e 'quantidade' como props
const StarsModal = ({ corRegistrada, quantidade }) => {


    return (
        <div className='flex w-[100%] h-[10%] items-center'>
            <div className='flex w-[35%] h-[2vh] items-center'>
                <Rating
                    initialRating={quantidade} // Define a classificação inicial com o valor da prop 'quantidade'
                    emptySymbol={<span style={{ fontSize: '33px', color: '#ccc' }}>★</span>} // Estrela vazia (não preenchida)
                    fullSymbol={<span style={{ fontSize: '33px', color: corRegistrada }}>★</span>} // Estrela cheia (preenchida) com a cor definida em 'corRegistrada'
                    fractions={1} // Permite frações na classificação (ex: 4.5 estrelas)
                    start={0} // Valor inicial da classificação
                    stop={5} // Valor máximo da classificação
                    readonly // Torna o componente somente leitura (não permite interação do usuário)
                />
            </div>
        </div>
    );
};

// Exporta o componente StarsModal
export default StarsModal;