import Modal from 'react-modal'
import fashionOfHome from '../../image/Cardapio/Panela.png'

const ModaDaCasa = ({isOpen, onRequestClose, content}) =>{


    return(
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel='Moda da Casa'
            className="bg-white w-[90%] max-w-[500px] h-auto focus:outline-none shadow-lg md:w-[50%] lg:max-w-[600px]"
            overlayClassName="fixed inset-0 bg-black bg-opacity-20 flex justify-center items-center"
            shouldCloseOnOverlayClick={true}
        >
            <div className='w-full p-6 md:p-10 bg-[#007BC0] h-full'>
                {content}
                <div className='w-full md:w-[60%] text-white gap-5 font-semibold justify-center items-center flex '>
                    <img src={fashionOfHome} className='w-[15%] md:w-[15%] h-auto' alt="Moda da Casa" />
                    <h1 className='text-2xl md:text-3xl'>Moda da Casa</h1>
                </div>  
                <div className=' items-center mt-3 mb-3 gap-4 focus:outline-none font-bold text-white flex'>
                    <p>
                        Terça-Feira, dia 21 de Agosto de 2024
                    </p>
                    <select className='min-w-[10%] flex bg-[#007BC0] text-white h-[40px]'>
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

export default ModaDaCasa;
