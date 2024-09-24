import Modal from 'react-modal'
import grill from '../../image/Cardapio/Grill.png'

const Grill = ({isOpen, onResquestClose, conteudo}) =>{
    return(
        <Modal
            isOpen={isOpen}
            onRequestClose={onResquestClose}
            contentLabel='Grill'
            className="bg-white w-[90%] max-w-[500px] h-auto focus:outline-none shadow-lg md:w-[50%] lg:max-w-[600px]"
            overlayClassName="fixed inset-0 bg-black bg-opacity-20 flex justify-center items-center"
        >
            <div className='w-full p-6 md:p-10 bg-[#9E2896] h-full'>
                {conteudo}
                <div className='w-full md:w-[60%] text-white gap-5 font-semibold text-center items-center flex '>
                    <img src={grill} className='w-[5%] md:w-[10%] h-auto' alt="Grill" />
                    <h1 className='text-2xl md:text-3xl'>Grill e Bem Estar</h1>
                </div>  
                <div className=' items-center mt-3 mb-3 gap-4 focus:outline-none font-bold text-white flex'>
                    <p>
                        Terça-Feira, dia 21 de Agosto de 2024
                    </p>
                    <select  className='w-[10%] bg-[#9E2896] text-white h-[40px]'>
                        <option value="">sex</option>
                        <option value="">sáb</option>
                        <option value="">qui</option>
                        <option value="">qua</option>
                        <option value="">ter</option>
                        <option value="">seg</option>
                        <option value="">dom</option>
                    </select>
                    
                </div>
                
                <div className='text-white font-semibold text-sm md:text-base pl-2 md:pl-6'>
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

export default Grill;
