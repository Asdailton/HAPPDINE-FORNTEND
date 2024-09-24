import Modal from 'react-modal'
import DBem from '../../image/Cardapio/Folha.png'

const DeBem = ({isOpen, onResquestClose, conteudo}) =>{
    return(
        <Modal
            isOpen={isOpen}
            onRequestClose={onResquestClose}
            contentLabel='De Bem com a Vida'
            className="bg-white w-[90%] max-w-[500px] h-auto focus:outline-none shadow-lg md:w-[50%] lg:max-w-[600px]"
            overlayClassName="fixed inset-0 bg-black bg-opacity-20 flex justify-center items-center"
        >
            <div className='w-full p-6 md:p-10 bg-[#219557] h-full'>
                {conteudo}
                <div className='w-full md:w-[80%] text-white gap-5 font-semibold  items-center flex '>
                    <img src={DBem} className='w-[10%] md:w-[8%] h-auto' alt="De Bem com a Vida" />
                    <h1 className='text-1xl md:text-3xl'>De Bem com a Vida</h1>
                </div>  
                <div className=' items-center mt-3 mb-3 gap-4 focus:outline-none font-bold text-white flex'>
                    <p>
                        Terça-Feira, dia 21 de Agosto de 2024
                    </p>
                    <select  className='w-[10%] bg-[#219557] text-white h-[40px]'>
                        <option value="">sex</option>
                        <option value="">sáb</option>
                        <option value="">qui</option>
                        <option value="">qua</option>
                        <option value="">ter</option>
                        <option value="">seg</option>
                        <option value="">dom</option>
                    </select>
                    
                </div>
                <div className='text-white font-semibold text-sm md:text-base '>
                    <p>Carne assada ao vinho</p>
                    <p>Carne Assada ao vinho</p>
                    <p>Carne Assada ao vinho</p>
                    <p>Carne Assada ao vinho</p>
                    <p>Carne Assada ao vinho</p>
                    <p>Carne Assada ao vinho</p>
                    <p>Carne Assada ao vinho</p>
                    <p>Carne Assada ao vinho</p>
                </div>
            </div>
        </Modal>
    );
}

export default DeBem;
