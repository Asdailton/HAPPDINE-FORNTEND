import Modal from 'react-modal';
import RatingComponent from '../components/Stars.jsx'; 
import React, { useState } from 'react';
import { z } from 'zod';

Modal.setAppElement('#root');

const feedbackschema = z.object({
    nome: z.string().min(3, "O nome é obrigatório"),
    comentario: z.string().min(3, "O mínimo de carácteres é 3.").max(90, "O máximo de carácteres é 30")
});

const ModalComponent = ({ isOpen, onRequestClose, contentLabel }) => {
    const [nome, setNome] = useState('');  
    const [comentario, setComentario] = useState('');  
    const [errors, setErrors] = useState({});  

    const handleSubmit = () => {
        const result = feedbackschema.safeParse({ nome, comentario });

        if (!result.success) {
            const formattedErrors = result.error.format();
            setErrors({
                nome: formattedErrors.nome?._errors[0] || '',
                comentario: formattedErrors.comentario?._errors[0] || '',
            });
        } else {
            console.log('Dados válidos:', result.data);
            onRequestClose();
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel={contentLabel}
            className="fixed inset-0 flex items-center justify-center p-4 z-50" // Ensure modal has high z-index
            overlayClassName="fixed inset-0 bg-gray-500 bg-opacity-75 z-40" // Ensure overlay has a lower z-index than modal
        >
            <div className="bg-white p-6 border w-[90%] border-gray-300 shadow-lg lg:w-[30%] lg:h-[vh] md:w-[60%] md:h-[60vh]">
                <div className='justify-start pl-[90px] flex'>
                    <h1 className='text-[#4E5256] text-[20px] font-boschfont'>
                        #BatePapo!
                    </h1>
                </div>
                <p className='font-semibold'>Nome:</p>
                <div className='w-[100%] h-[6%] flex '>
                    <input 
                        alt='Nome'
                        placeholder='Seu nome'
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        className='border border-gray-300 w-full md:w-[45vh] focus:outline-none pl-[6px]' 
                    />
                </div>
                <div className='flex-col mt-[30px]'>
                    <p className='font-semibold'>Feedback:</p>
                    <div className='flex mt-[10px] gap-2'>
                        <input
                            type="checkbox"
                            id="my-checkbox"
                            className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
                        />
                        <p className='text-[12px]'>HAPPDINE</p>
                        <input
                            type="checkbox"
                            id="my-checkbox"
                            className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
                        />
                        <p className='text-[13px]'>Restaurante</p>
                    </div>
                    <p className='font-semibold mt-[30px]'>Avaliação:</p>
                    <div className=''>
                        <RatingComponent />
                    </div>
                    <p className='font-semibold'>Comentário:</p>
                    <div className='mt-[10px] flex'>
                        <textarea 
                            placeholder='Insira o seu comentario '
                            className='border border-gray-300 w-[100%] md:w-[45vh] h-[20vh] focus:outline-none pl-[6px]' 
                            alt='Nome' 
                            value={comentario}
                            onChange={(e) => setComentario(e.target.value)}
                        />
                        {errors.comentario && <p className="text-red-500 text-xs">{errors.comentario}</p>}
                    </div>
                </div>
                <div className='text-white bg-[#4E5256] md:ml-[12vh] lg:ml-[16vh] md:mt-[2vh] w-[30%] h-[7%] flex justify-center items-center hover:text-gray-900 font-semibold'>
                    <button onClick={handleSubmit} className='flex w-full text-[13px] justify-center items-center'>
                        Enviar
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default ModalComponent;
