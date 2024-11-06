import Modal from 'react-modal';
import RatingComponent from './StarsModal.jsx'; 
import React, { useState, useEffect } from 'react';
import { z } from 'zod';
import axios from 'axios';
import successIcon from '../../image/FeedBacks/success.gif';
import fecharModoClaro from '../../image/FeedBacks/FecharModoClaro.svg';
import fecharModoEscuro from '../../image/FeedBacks/FecharModoEscuro.svg';

Modal.setAppElement('#root');

// Define o schema de validação para o feedback usando zod
const feedbackschema = z.object({
    nome: z.string().min(3, "O nome é obrigatório"),
    comentario: z.string().min(3, "O mínimo de caracteres é 3.").max(130, "O máximo de caracteres é 50"),
    opcao: z.string().min(1, "A opção é obrigatória"),
    estrela: z.number().min(1, "A avaliação deve ser de 1 a 5").max(5, "A avaliação deve ser de 1 a 5"),
    timestampp: z.string().nonempty("O timestamp é obrigatório")
});

const ModalComponent = ({ isOpen, onRequestClose, contentLabel, fetchData }) => { // Adiciona fetchData para atualizar dados
    const [nome, setNome] = useState('');  
    const [comentario, setComentario] = useState('');  
    const [opcao, setOpcao] = useState('');
    const [estrela, setEstrela] = useState(0);
    const [errors, setErrors] = useState({});  
    const [showModalSuccess, setShowModalSuccess] = useState(false);
    const [colorStar, setColorStar] = useState('');
    const [darkMode, setDarkMode] = useState(false);
     
    // useEffect para inicializar o estado de darkMode do localStorage
    useEffect(() => {
        const checkDarkMode = () => {
            const storedDarkMode = localStorage.getItem('darkMode');
            setDarkMode(storedDarkMode === 'true');
        };
        checkDarkMode();
    }, []); 

    // Condicional para exibir o ícone de fechar dependendo do darkMode
    const fecharModal = darkMode ? fecharModoEscuro : fecharModoClaro;

    // Obtém o timestamp atual no formato YYYY-MM-DD
    const currentTimestamp = new Date().toISOString().split('T')[0];

    // Função de envio do feedback
    async function handleSubmit() {
        const savedStars = localStorage.getItem('stars');
        if (savedStars) {
            setEstrela(parseInt(savedStars, 10));
        }

        // Valida os dados do formulário
        const result = feedbackschema.safeParse({ 
            nome, 
            comentario, 
            opcao, 
            estrela, 
            timestampp: currentTimestamp 
        });
        
        // Pega a cor salva da estrela do localStorage
        const savedColor = localStorage.getItem('color');
        if (savedColor) {
            setColorStar(savedColor);
        }

        // Se a validação falhar, define os erros de campo
        if (!result.success) {
            const formattedErrors = result.error.format();
            setErrors({
                nome: formattedErrors.nome?._errors[0] || '',
                comentario: formattedErrors.comentario?._errors[0] || '',
                opcao: formattedErrors.opcao?._errors[0] || '',
                estrela: formattedErrors.estrela?._errors[0] || ''
            });
            return;
        }

        // Envia os dados para a API e exibe mensagem de sucesso
        try {
            await axios.post('http://localhost:8080/api/comentarios/create-coment', {
                nome,
                comentario,
                opcao,
                estrela,
                timestampp: currentTimestamp,
                cor_estrela: colorStar
            });
            setShowModalSuccess(true);
            limparCampo();
            setTimeout(() => {
                setShowModalSuccess(false);
                onRequestClose(); // Fecha o modal após ocultar a mensagem de sucesso
                fetchData(); // Chama a função para atualizar os dados da API
            }, 3000); // Exibe a mensagem de sucesso por 3 segundos
        } catch (error) {
            console.log("Erro ao cadastrar o sensor", error);
        }
    }

    // Função para limpar os campos do formulário
    const limparCampo = () => {
        setNome('');
        setColorStar('');
        setComentario('');
        setOpcao('');
        setEstrela('');
    }

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel={contentLabel}
            shouldCloseOnOverlayClick={true} // Garante que ao clicar fora o modal seja fechado
            className="fixed inset-0 flex items-center justify-center p-4 z-50 mt-[80px]"
            overlayClassName="fixed inset-0 bg-gray-500 bg-opacity-75 z-40"
        >
            <div className="bg-white p-6 shadow-lg w-full max-w-md dark:bg-[#2E3033]">
                {/* Botão de fechar modal */}
                <div className='w-full flex justify-end'>
                    <img 
                        src={fecharModal} 
                        alt="Fechar" 
                        onClick={() => { 
                            onRequestClose(); // Fecha o modal ao clicar
                            fetchData(); // Atualiza os dados ao fechar
                        }}
                        style={{ cursor: 'pointer' }} // Adiciona cursor pointer para indicar clique
                    />
                </div>
                
                {/* Título do modal */}
                <h1 className='text-[#4E5256] text-[30px] font-boschfont text-center mb-[15px] italic font-black dark:text-white'>
                    #BatePapo!
                </h1>

                {/* Campo de Nome */}
                <p className='font-semibold dark:text-white'>Nome:</p>
                <div className='flex mb-4'>
                    <input 
                        alt='Nome'
                        placeholder='Seu nome'
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        className='border border-gray-300 w-full focus:outline-none pl-2 py-1 dark:border-white bg-transparent dark:text-white' 
                    />
                </div>

                {/* Opções de Feedback */}
                <div className='flex flex-col mb-4'>
                    <p className='font-semibold dark:text-white'>Feedback:</p>
                    <div className='flex gap-2 mb-2'>
                        <input
                            type="radio"
                            id="happdine"
                            checked={opcao === 'WEBSITE'}
                            onChange={() => setOpcao('WEBSITE')}
                            className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out rounded-none dark:border-white"
                        /> 
                        <label htmlFor="happdine" className='text-sm dark:text-white'>HAPPDINE</label>
                        <input
                            type="radio"
                            id="restaurante"
                            checked={opcao === 'RESTAURANTE'}
                            onChange={() => setOpcao('RESTAURANTE')}
                            className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out rounded-none dark:border-white"
                        />
                        <label htmlFor="restaurante" className='text-sm dark:text-white'>Restaurante</label>
                    </div>
                    {errors.opcao && <p className="text-red-500 text-xs mt-1">{errors.opcao}</p>}

                    {/* Componente de Avaliação */}
                    <p className='font-semibold mt-4 dark:text-white'>Avaliação:</p>
                    <div>
                        <RatingComponent value={estrela} onChange={setEstrela} />
                        {errors.estrela && <p className="text-red-500 text-xs mt-1">{errors.estrela}</p>}
                    </div>

                    {/* Campo de Comentário */}
                    <p className='font-semibold mt-4 dark:text-white'>Comentário:</p>
                    <div className='mt-2'>
                        <textarea 
                            placeholder='Insira o seu comentário'
                            className='border border-gray-300 w-full h-[12vh] focus:outline-none pl-2 py-1 resize-none dark:border-white bg-transparent dark:text-white' 
                            value={comentario}
                            onChange={(e) => setComentario(e.target.value)}
                        />
                        {errors.comentario && <p className="text-red-500 text-xs">{errors.comentario}</p>}
                        <p className='text-gray-600 text-xs '>{comentario.length}/50 caracteres</p>
                    </div>
                </div>

                {/* Botão de Enviar */}
                <div className='flex justify-center'>
                    <button 
                        onClick={handleSubmit} 
                        className='bg-[#4E5256] text-white px-4 py-2 hover:bg-[#3c3c3c] transition-colors duration-300'
                    >
                        Enviar
                    </button>
                </div>

                {/* Modal de Sucesso */}
                {showModalSuccess && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <div className="bg-white dark:bg-[#2E3033] p-10 border border-gray-300 flex items-center justify-center">
                            <p className="text-black dark:text-white text-[20px]">Comentário enviado com <strong>sucesso</strong></p>
                            <img className='w-[43px]' src={successIcon} alt="" />
                        </div>
                    </div>
                )}
            </div>
        </Modal>
    );
};

export default ModalComponent;
