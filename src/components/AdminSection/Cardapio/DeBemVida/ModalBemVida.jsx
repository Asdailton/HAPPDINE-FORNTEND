import React, { useState, useEffect } from 'react'; // Importa os hooks useState e useEffect do React
import { z, ZodError } from 'zod'; // Importa a biblioteca Zod para validação de esquemas
import Modal from 'react-modal'; // Importa o componente Modal
import folhaColorida from '../../../../image/CardapioAdmin/FolhaColorida.svg'; // Importa imagem de folha colorida
import fecharModal from '../../../../image/FeedBacks/FecharModoClaro.svg'; // Importa imagem de fechar modal
import check from '../../../../image/Notificacao/success.gif'; // Importa imagem de sucesso
import axios from 'axios'; // Importa a biblioteca axios para requisições HTTP

Modal.setAppElement('#root'); // Define o elemento de app para acessibilidade do modal

// Define o esquema de validação para os dados do cardápio
const cardapioSchema = z.object({
  data: z.string().min(1, "A data é obrigatória"),
  guarnicao: z.string().min(3, "A guarnição é obrigatória"),
  pratoPrincipal: z.string().min(3, "O prato principal é obrigatório"),
  salada: z.string().min(3, 'O tipo de salada é obrigatório'),
  sobremesa: z.string().min(3, 'A sobremesa é obrigatória'),
});

// Componente ModalBemVida
const ModalBemVida = ({
  isOpen, // Prop que indica se o modal está aberto
  onRequestClose, // Função chamada para fechar o modal
  contentLabel, // Rótulo do conteúdo do modal
  pratoPrincipal, // Prato principal atual (para edição)
  guarnicao, // Guarnição atual (para edição)
  sobremesa, // Sobremesa atual (para edição)
  salada, // Salada atual (para edição)
  dataCardapio, // Data do cardápio atual (para edição)
  idCardapio, // ID do cardápio (para edição)
}) => {
  // Estado inicial dos dados do formulário
  const initialFormData = {
    data: dataCardapio, // Data atual no formato yyyy-mm-dd
    pratoPrincipal: '',
    guarnicao: '',
    sobremesa: '',
    salada: '',
  };

  // Estados do componente
  const [formData, setFormData] = useState(initialFormData); // Dados do formulário
  const [errors, setErrors] = useState({}); // Erros de validação
  const [isLoading, setIsLoading] = useState(false); // Estado de carregamento
  const [showErrorModal, setShowErrorModal] = useState(false); // Estado do modal de erro
  const [showSuccessModal, setShowSuccessModal] = useState(false); // Estado do modal de sucesso

  // Efeito para atualizar os dados do formulário quando as props mudam
  useEffect(() => {
    if (idCardapio) {
      setFormData({
        data: dataCardapio,
        pratoPrincipal: pratoPrincipal || '',
        guarnicao: guarnicao || '',
        sobremesa: sobremesa || '',
        salada: salada || '',
      });
    } else {
      setFormData(initialFormData); // Reseta os dados se não houver ID
    }
  }, [pratoPrincipal, guarnicao, sobremesa, salada, dataCardapio, idCardapio]);

  // Função para lidar com as mudanças nos campos do formulário
  const handleChange = (e) => {
    const { name, value } = e.target; // Desestrutura o nome e o valor do campo
    setFormData((prevData) => ({
      ...prevData,
      [name]: value, // Atualiza o estado do formulário
    }));
  };

  // Função para fechar o modal e limpar os dados do formulário
  const handleCloseModal = () => {
    setFormData(initialFormData); // Limpa os campos do formulário
    onRequestClose(); // Fecha o modal
  };

  // Função para lidar com o envio do formulário
  const handleSubmit = async (e) => {
    e.preventDefault(); // Previne o comportamento padrão do formulário
    setIsLoading(true); // Ativa o estado de carregamento
    setErrors({}); // Reseta os erros
    setShowErrorModal(false); // Esconde o modal de erro
    setShowSuccessModal(false); // Esconde o modal de sucesso

    try {
      cardapioSchema.parse(formData); // Valida os dados do formulário
      await enviarInformacoes(); // Envia as informações para o servidor
      atualizarCardapio(); // Atualiza o cardápio (não definido neste trecho)
      setShowSuccessModal(true); // Mostra o modal de sucesso
      console.log('Informações enviadas com sucesso.');
      setTimeout(() => {
        onRequestClose(); // Fecha o modal após 2 segundos
      }, 2000);
    } catch (err) {
      if (err instanceof ZodError) {
        const fieldErrors = {}; // Objeto para armazenar erros de campo
        err.errors.forEach((error) => {
          fieldErrors[error.path[0]] = error.message; // Mapeia erros de validação para o campo correspondente
        });
        setErrors(fieldErrors); // Atualiza o estado de erros
        setShowErrorModal(true); // Mostra o modal de erro
        setTimeout(() => {
          setShowErrorModal(false); // Esconde o modal de erro após 1,5 segundos
        }, 1500);
        console.log('Erro na validação:', fieldErrors);
      }
    }
    setIsLoading(false); // Desativa o estado de carregamento
  };

  // Função para enviar as informações para o servidor
  const enviarInformacoes = async () => {
    const urlPost = "http://127.0.0.1:8080/debemcomavida/cardapios"; // URL para criação
    const urlPut = `http://127.0.0.1:8080/debemcomavida/cardapios/${idCardapio}`; // URL para atualização

    try {
      if (!idCardapio) {
        // Se não houver ID, realiza um POST
        await axios.post(urlPost, {
          prato_principal: formData.pratoPrincipal,
          guarnicao: formData.guarnicao,
          sobremesa: formData.sobremesa,
          salada: formData.salada,
          data: formData.data,
          fk_restaurante: "34000000-0000-0000-0000-000000000000", // ID do restaurante (hardcoded)
        });
      } else {
        // Se houver ID, realiza um PUT
        await axios.put(urlPut, {
          data: formData.data,
          prato_principal: formData.pratoPrincipal,
          guarnicao: formData.guarnicao,
          sobremesa: formData.sobremesa,
          salada: formData.salada,
          fk_restaurante: "34000000-0000-0000-0000-000000000000", // ID do restaurante (hardcoded)
        });
      }
      console.log('Requisição realizada com sucesso.');
      setShowSuccessModal(true); // Mostra o modal de sucesso
      setTimeout(() => {
        setShowSuccessModal(false); // Esconde o modal de sucesso após 2 segundos
      }, 2000);
    } catch (error) {
      console.error('Erro ao enviar as informações:', error); // Loga o erro
      setShowErrorModal(true); // Mostra o modal de erro
    }
  };

  return (
    <>
      {/* Modal de Erro */}
      {showErrorModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-12 lg:w-[40%] 2xl:w-[30%] text-[86%] border border-gray-300 flex items-center justify-center">
            <p className="lg:mr-[30px]">Não foi possível enviar o cardápio, tente novamente.</p>
          </div>
        </div>
      )}

      {/* Modal de Sucesso */}
      {showSuccessModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-12 lg:w-[40%] 2xl:w-[30%] text-[86%] border border-gray-300 flex items-center justify-center">
            <p className="lg:mr-[30px]">Cardápio enviado com <strong>sucesso!</strong></p>
            <img className='w-[10%]' src={check} alt="Success" />
          </div>
        </div>
      )}

      {/* Componente Modal */}
      <Modal
        isOpen={isOpen} // Verifica se o modal deve ser aberto
        onRequestClose={onRequestClose} // Função para fechar o modal
        contentLabel={contentLabel} // Rótulo do conteúdo do modal
        shouldCloseOnOverlayClick={true} // Permite fechar o modal clicando fora
        className="fixed inset-0 flex items-center justify-center p-4 z-50" // Classes CSS para o modal
        overlayClassName="fixed inset-0 bg-black bg-opacity-50" // Classes CSS para o overlay do modal
      >
        <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
          <div className="flex justify-between">
            <h2 className="text-lg font-semibold">Adicionar/Editar Cardápio</h2>
            <button onClick={handleCloseModal}>
              <img src={fecharModal} alt="Fechar" />
            </button>
          </div>

          {/* Formulário */}
          <form onSubmit={handleSubmit}>
            <div className="my-4">
              <label htmlFor="data" className="block mb-1">
                Data:
              </label>
              <input
                type="date"
                name="data"
                value={formData.data}
                onChange={handleChange}
                className="border border-gray-300 p-2 rounded w-full"
              />
              {errors.data && <span className="text-red-500">{errors.data}</span>} {/* Erro de validação */}
            </div>
            <div className="my-4">
              <label htmlFor="pratoPrincipal" className="block mb-1">
                Prato Principal:
              </label>
              <input
                type="text"
                name="pratoPrincipal"
                value={formData.pratoPrincipal}
                onChange={handleChange}
                className="border border-gray-300 p-2 rounded w-full"
              />
              {errors.pratoPrincipal && <span className="text-red-500">{errors.pratoPrincipal}</span>} {/* Erro de validação */}
            </div>
            <div className="my-4">
              <label htmlFor="guarnicao" className="block mb-1">
                Guarnição:
              </label>
              <input
                type="text"
                name="guarnicao"
                value={formData.guarnicao}
                onChange={handleChange}
                className="border border-gray-300 p-2 rounded w-full"
              />
              {errors.guarnicao && <span className="text-red-500">{errors.guarnicao}</span>} {/* Erro de validação */}
            </div>
            <div className="my-4">
              <label htmlFor="sobremesa" className="block mb-1">
                Sobremesa:
              </label>
              <input
                type="text"
                name="sobremesa"
                value={formData.sobremesa}
                onChange={handleChange}
                className="border border-gray-300 p-2 rounded w-full"
              />
              {errors.sobremesa && <span className="text-red-500">{errors.sobremesa}</span>} {/* Erro de validação */}
            </div>
            <div className="my-4">
              <label htmlFor="salada" className="block mb-1">
                Salada:
              </label>
              <input
                type="text"
                name="salada"
                value={formData.salada}
                onChange={handleChange}
                className="border border-gray-300 p-2 rounded w-full"
              />
              {errors.salada && <span className="text-red-500">{errors.salada}</span>} {/* Erro de validação */}
            </div>

            <button
              type="submit"
              disabled={isLoading} // Desabilita o botão se está carregando
              className={`bg-blue-500 text-white p-2 rounded ${
                isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? 'Enviando...' : 'Enviar'} {/* Texto do botão */}
            </button>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default ModalBemVida; // Exporta o componente
