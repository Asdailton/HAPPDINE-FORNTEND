import Modal from 'react-modal'
import reccept from '../../image/Cardapio/chefe.png'
import Calendar from './Calendar'

const Chef = ({isOpen, onResquestClose, conteudo}) =>{
    return(
        <Modal
            isOpen={isOpen}
            onRequestClose={onResquestClose}
            contentLabel='Receita do Chefe'
            className="bg-white w-[90%] max-w-[500px] flex flex-col justify-center items-center h-auto focus:outline-none shadow-lg md:w-[50%] lg:max-w-[600px]"
            overlayClassName="fixed inset-0 bg-black bg-opacity-20 flex justify-center items-center"
        >
            <div className="w-full h-auto p-4 md:p-6 bg-[#12818F]">
                {conteudo}
                <div className="w-full flex items-center gap-4 py-3">
                    <img src={reccept} className="w-[7%] md:w-[5%] h-auto" alt="Receita" />
                    <h1 className="text-white text-lg md:text-xl font-semibold">Receita do Chefe</h1>
                </div>  
                <div className=' ml-[9px] items-center gap-4 font-bold text-white flex'>
                    <p>
                        Terça-Feira, dia 21 de Agosto de 2024
                    </p>
                    <select  className='w-[10%] bg-[#12818F] text-white h-[40px]'>
                        <option value="">sex</option>
                        <option value="">sáb</option>
                        <option value="">qui</option>
                        <option value="">qua</option>
                        <option value="">ter</option>
                        <option value="">seg</option>
                        <option value="">dom</option>
                    </select>
                </div>
                <div className="w-full text-white p-4 font-semibold text-sm md:text-base">
                    <p>Carne assada ao vinho</p>
                    <p>Carne assada ao vinho</p>
                    <p>Carne assada ao vinho</p>
                    <p>Carne assada ao vinho</p>
                    <p>Carne assada ao vinho</p>
                    <p>Carne assada ao vinho</p>
                    <p>Carne assada ao vinho</p>
                    <p>Carne assada ao vinho</p>
                </div>
            </div>
        </Modal>
    );
}

export default Chef;
 