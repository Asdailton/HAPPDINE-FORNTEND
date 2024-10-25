// Importa as dependências necessárias
import Modal from 'react-modal'; // Componente de modal
import RatingComponent from './StarsModal.jsx'; // Componente de avaliação em estrelas
import React, { useState, useEffect } from 'react'; // React e hooks
import { z } from 'zod'; // Biblioteca para validação de dados
import axios from 'axios'; // Biblioteca para requisições HTTP
import successIcon from '../../image/FeedBacks/success.gif'; // Ícone de sucesso
import fecharModoClaro from '../../image/FeedBacks/FecharModoClaro.svg'; // Ícone para fechar em modo claro
import fecharModoEscuro from '../../image/FeedBacks/FecharModoEscuro.svg'; // Ícone para fechar em modo escuro

// Define o elemento que será ocultado pelo modal
Modal.setAppElement('#root');

// Define o esquema de validação usando Zod
const feedbackschema = z.object({
    nome: z.string().min(3, "O nome é obrigatório"), // Valida o nome com mínimo de 3 caracteres
    comentario: z.string().min(3, "O mínimo de caracteres é 3.").max(80, "O máximo de caracteres é 50"), // Valida o comentário
    opcao: z.string().min(1, "A opção é obrigatória"), // Valida a opção selecionada
    estrela: z.number().min(1, "A avaliação deve ser de 1 a 5").max(5, "A avaliação deve ser de 1 a 5"), // Valida a avaliação em estrelas
    timestampp: z.string().nonempty("O timestamp é obrigatório"), // Valida o timestamp
});

// Componente funcional ModalComponent que recebe props para controle do modal
const ModalComponent = ({ isOpen, onRequestClose, contentLabel }) => {
    // Estados locais para armazenar os dados do formulário e outros estados
    const [nome, setNome] = useState('');
    const [comentario, setComentario] = useState('');
    const [opcao, setOpcao] = useState('');
    const [estrela, setEstrela] = useState(0);
    const [errors, setErrors] = useState({}); // Para armazenar erros de validação
    const [showModalSuccess, setShowModalSuccess] = useState(false); // Controla a exibição do modal de sucesso
    const [colorStar, setColorStar] = useState(''); // Cor das estrelas
    const [darkMode, setDarkMode] = useState(false); // Controla o modo escuro

    // Efeito para verificar se o modo escuro está ativo
    useEffect(() => {
        const checkDarkMode = () => {
            const storedDarkMode = localStorage.getItem('darkMode'); // Recupera o valor do modo escuro do localStorage
            setDarkMode(storedDarkMode === 'true'); // Atualiza o estado com base no valor armazenado
        };
        checkDarkMode();
    }, []);

    // Define o ícone de fechar com base no modo escuro
    const fecharModal = darkMode ? fecharModoEscuro : fecharModoClaro;

    // Obtém o timestamp atual no formato ISO
    const currentTimestamp = new Date().toISOString().split('T')[0];

    // Função para fechar o modal ao clicar fora dele
    const handleOverlayClick = (event) => {
        if (event.target.classList.contains('ReactModal__Overlay')) {
            onRequestClose(); // Fecha o modal se a overlay for clicada
        }
    };

    // Função para tratar o envio do formulário
    async function handleSubmit() {
        const savedStars = localStorage.getItem('stars'); // Recupera estrelas salvas do localStorage
        if (savedStars) {
            setEstrela(parseInt(savedStars, 10)); // Define a classificação inicial com as estrelas salvas
        }

        // Valida os dados do formulário usando o esquema definido
        const result = feedbackschema.safeParse({
            nome,
            comentario,
            opcao,
            estrela,
            timestampp: currentTimestamp,
        });

        const savedColor = localStorage.getItem('color'); // Recupera a cor das estrelas salvas
        if (savedColor) {
            setColorStar(savedColor); // Atualiza a cor das estrelas
        }

        // Se a validação falhar, armazena os erros
        if (!result.success) {
            const formattedErrors = result.error.format(); // Formata os erros
            setErrors({
                nome: formattedErrors.nome?._errors[0] || '',
                comentario: formattedErrors.comentario?._errors[0] || '',
                opcao: formattedErrors.opcao?._errors[0] || '',
                estrela: formattedErrors.estrela?._errors[0] || '',
            });
            return; // Interrompe a execução se houver erros
        }

        try {
            // Envia os dados para a API usando axios
            await axios.post('http://localhost:8080/api/comentarios/create-coment', {
                nome,
                comentario,
                opcao,
                estrela,
                timestampp: currentTimestamp,
                cor_estrela: colorStar,
            });

            setShowModalSuccess(true); // Exibe o modal de sucesso
            limparCampo(); // Limpa os campos do formulário
            setTimeout(() => {
                setShowModalSuccess(false); // Oculta o modal de sucesso após 3 segundos
                onRequestClose(); // Fecha o modal principal
            }, 3000);
        } catch (error) {
            console.log("Erro ao cadastrar o sensor", error); // Loga o erro em caso de falha na requisição
        }
    }

    // Função para limpar os campos do formulário
    const limparCampo = () => {
        setNome(''); // Limpa o campo nome
        setColorStar(''); // Limpa a cor das estrelas
        setComentario(''); // Limpa o campo comentário
        setOpcao(''); // Limpa a opção selecionada
        setEstrela(''); // Limpa a classificação em estrelas
    };

    // Renderiza o componente modal
    return (
        <Modal
            isOpen={isOpen} // Controla a visibilidade do modal
            onRequestClose={onRequestClose} // Função chamada ao solicitar o fechamento do modal
            contentLabel={contentLabel} // Rótulo do conteúdo do modal (acessibilidade)
            className="fixed inset-0 flex items-center justify-center p-4 z-50 mt-[80px]" // Estilos do modal
            overlayClassName="ReactModal__Overlay fixed inset-0 bg-gray-500 bg-opacity-75 z-40" // Estilos da overlay do modal
            shouldCloseOnOverlayClick={true} // Permite fechamento ao clicar na overlay
            onAfterOpen={() => document.addEventListener('click', handleOverlayClick)} // Adiciona listener para clique na overlay
            onAfterClose={() => document.removeEventListener('click', handleOverlayClick)} // Remove listener após o fechamento
        >
            <div className="bg-white p-6 shadow-lg w-full max-w-md dark:bg-[#2E3033]"> {/* Container do conteúdo do modal */}
                <div className="w-full flex justify-end"> {/* Botão de fechar */}
                    <img src={fecharModal} alt="Fechar" onClick={onRequestClose} />
                </div>
                <h1 className="text-[#4E5256] text-[30px] font-boschfont text-center mb-[15px] italic font-black dark:text-white">
                    #BatePapo! {/* Título do modal */}
                </h1>
                <p className="font-semibold dark:text-white">Nome:</p> {/* Rótulo para o campo nome */}
                <div className="flex mb-4"> {/* Campo de entrada para nome */}
                    <input
                        alt="Nome"
                        placeholder="Seu nome" // Placeholder do campo
                        value={nome} // Valor do campo controlado pelo estado
                        onChange={(e) => setNome(e.target.value)} // Atualiza o estado ao digitar
                        className="border border-gray-300 w-full focus:outline-none pl-2 py-1 dark:border-white bg-transparent dark:text-white" // Estilos do campo
                    />
                </div>
                <div className="flex flex-col mb-4"> {/* Seção para feedback */}
                    <p className="font-semibold dark:text-white">Feedback:</p>
                    <div className="flex gap-2 mb-2"> {/* Opções de feedback */}
                        <input
                            type="radio"
                            id="happdine"
                            checked={opcao === 'WEBSITE'} // Verifica se a opção está selecionada
                            onChange={() => setOpcao('WEBSITE')} // Atualiza a opção ao selecionar
                            className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out rounded-none dark:border-white"
                        />
                        <label htmlFor="happdine" className="text-sm dark:text-white">
                            HAPPDINE {/* Rótulo para a opção */}
                        </label>
                        <input
                            type="radio"
                            id="restaurante"
                            checked={opcao === 'RESTAURANTE'} // Verifica se a opção está selecionada
                            onChange={() => setOpcao('RESTAURANTE')} // Atualiza a opção ao selecionar
                            className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out rounded-none dark:border-white"
                        />
                        <label htmlFor="restaurante" className="text-sm dark:text-white">
                            RESTAURANTE {/* Rótulo para a opção */}
                        </label>
                    </div>
                    <span className="text-red-500">{errors.opcao}</span> {/* Mensagem de erro para opção */}
                </div>
                <p className="font-semibold dark:text-white">Comentário:</p> {/* Rótulo para o campo comentário */}
                <div className="flex mb-4"> {/* Campo de entrada para comentário */}
                    <input
                        alt="Comentário"
                        placeholder="O que você achou?" // Placeholder do campo
                        value={comentario} // Valor do campo controlado pelo estado
                        onChange={(e) => setComentario(e.target.value)} // Atualiza o estado ao digitar
                        className="border border-gray-300 w-full focus:outline-none pl-2 py-1 dark:border-white bg-transparent dark:text-white" // Estilos do campo
                    />
                </div>
                <span className="text-red-500">{errors.comentario}</span> {/* Mensagem de erro para comentário */}
                <div className="flex flex-col mb-4"> {/* Seção para avaliação em estrelas */}
                    <RatingComponent setEstrela={setEstrela} /> {/* Componente de avaliação */}
                    <span className="text-red-500">{errors.estrela}</span> {/* Mensagem de erro para estrelas */}
                </div>
                <div className="flex justify-center"> {/* Botão de envio */}
                    <button
                        className="bg-[#E64A19] text-white rounded-lg py-2 px-4 hover:bg-[#D34A19] transition-all"
                        onClick={handleSubmit} // Chama a função de envio ao clicar
                    >
                        Enviar
                    </button>
                </div>
                {showModalSuccess && ( // Exibe o modal de sucesso se necessário
                    <div className="flex flex-col items-center mt-4">
                        <img src={successIcon} alt="Sucesso" className="h-12" />
                        <h2 className="text-green-600 font-bold">Feedback enviado com sucesso!</h2>
                    </div>
                )}
            </div>
        </Modal>
    );
};

// Exporta o componente para uso em outras partes do aplicativo
export default ModalComponent;
