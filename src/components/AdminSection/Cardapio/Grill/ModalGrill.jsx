import React, { useState, useEffect } from 'react'; // Importa React e hooks necessários
import { z, ZodError } from 'zod'; // Importa Zod para validação de dados
import Modal from 'react-modal'; // Importa o componente Modal
import axios from 'axios'; // Importa axios para fazer requisições HTTP
import fogoColorido from '../../../../image/CardapioAdmin/FogoColorido.svg'; // Importa imagem de cabeçalho
import fecharModal from '../../../../image/FeedBacks/FecharModoClaro.svg'; // Importa imagem para fechar o modal
import check from '../../../../image/Notificacao/success.gif'; // Importa imagem de sucesso

Modal.setAppElement('#root'); // Define o elemento que representa a aplicação para acessibilidade

// Define o esquema de validação do cardápio usando Zod
const cardapioSchema = z.object({
  data: z.string().min(1, "A data é obrigatória"), // Validação para data
  guarnicao: z.string().min(3, "A guarnição é obrigatória"), // Validação para guarnição
  pratoPrincipal: z.string().min(3, "O prato principal é obrigatório"), // Validação para prato principal
  salada: z.string().min(3, 'O tipo de salada é obrigatório'), // Validação para salada
  sobremesa: z.string().min(3, 'A sobremesa é obrigatória'), // Validação para sobremesa
});

// Componente ModalGrill
const ModalGrill = ({ isOpen, onRequestClose, contentLabel, pratoPrincipal, guarnicao, sobremesa, salada, dataCardapio, idCardapio }) => {
    
  // Estado inicial dos dados do formulário
  const initialFormData = {
    data: dataCardapio, // Data atual no formato yyyy-mm-dd
    pratoPrincipal: '',
    guarnicao: '',
    sobremesa: '',
    salada: '',
  };

  // Define estados para o formulário e mensagens
  const [formData, setFormData] = useState(initialFormData); // Dados do formulário
  const [errors, setErrors] = useState({}); // Erros de validação
  const [isLoading, setIsLoading] = useState(false); // Estado de carregamento
  const [showErrorModal, setShowErrorModal] = useState(false); // Controle de modal de erro
  const [showSuccessModal, setShowSuccessModal] = useState(false); // Controle de modal de sucesso

  // Atualiza os dados do formulário quando o modal é aberto ou quando as propriedades mudam
  useEffect(() => {
    if (idCardapio) {
      setFormData({
        data: dataCardapio,
        pratoPrincipal: pratoPrincipal || '',
        guarnicao: guarnicao || '',
        sobremesa: sobremesa || '',
        salada: salada || ''
      });
    }
  }, [pratoPrincipal, guarnicao, sobremesa, salada, dataCardapio, idCardapio]);

  // Função para lidar com a mudança dos campos do formulário
  const handleChange = (e) => {
    const { name, value } = e.target; // Desestrutura o evento
    setFormData((prevData) => ({
      ...prevData,
      [name]: value, // Atualiza o estado do campo correspondente
    }));
  };

  // Função para lidar com o envio do formulário
  const handleSubmit = async (e) => {
    e.preventDefault(); // Previne o comportamento padrão de envio
    setIsLoading(true); // Inicia o estado de carregamento
    setErrors({}); // Reseta os erros
    setShowErrorModal(false); 
    setShowSuccessModal(false); 

    try {
      cardapioSchema.parse(formData); // Valida os dados do formulário
      await enviarInformacoes(); // Envia as informações
      atualizarCardapio(); // Atualiza o cardápio (não definido no código)
      setShowSuccessModal(true); // Mostra modal de sucesso
      console.log('Informações enviadas com sucesso.');
      setTimeout(() => {
        onRequestClose(); // Fecha o modal após 2 segundos
      }, 2000);
    } catch (err) {
      if (err instanceof ZodError) {
        const fieldErrors = {};
        err.errors.forEach((error) => {
          fieldErrors[error.path[0]] = error.message; // Mapeia erros de validação
        });
        setErrors(fieldErrors); // Atualiza os erros no estado
        setShowErrorModal(true); // Mostra modal de erro
        console.log('Erro na validação:', fieldErrors);
      }
    }
    setIsLoading(false); // Finaliza o estado de carregamento
  };
  
  // Função para fechar o modal
  const handleCloseModal = () => {
    setFormData(initialFormData); // Limpa os campos do formulário
    onRequestClose(); // Fecha o modal
  };
  
  // Função para enviar as informações ao servidor
  const enviarInformacoes = async () => {
    const urlPost = "http://127.0.0.1:8080/grillebemestar/cardapios"; // URL para criar um novo cardápio
    const urlPut = `http://127.0.0.1:8080/grillebemestar/cardapios/${idCardapio}`; // URL para atualizar um cardápio existente

    try {
      if (!idCardapio) {
        await axios.post(urlPost, { // Envia um POST se idCardapio não existir
          prato_principal: formData.pratoPrincipal,
          guarnicao: formData.guarnicao,
          sobremesa: formData.sobremesa,
          salada: formData.salada,
          data: formData.data,
          fk_restaurante: "33000000-0000-0000-0000-000000000000",
        });
      } else {
        await axios.put(urlPut, { // Envia um PUT se idCardapio existir
          data: formData.data,
          prato_principal: formData.pratoPrincipal,
          guarnicao: formData.guarnicao,
          sobremesa: formData.sobremesa,
          salada: formData.salada,
          fk_restaurante: "33000000-0000-0000-0000-000000000000",
        });
      }
      console.log('Requisição realizada com sucesso.');
      setShowSuccessModal(true); // Mostra modal de sucesso
      setTimeout(() => {
        setShowSuccessModal(false); // Esconde modal de sucesso após 2 segundos
      }, 2000);
    } catch (error) {
      console.error('Erro ao enviar as informações:', error);
      setShowErrorModal(true); // Mostra modal de erro
      console.log('Erro de requisição:', error);
    }
  };

  return (
    <>
      {/* Modal de Erro */}
      {showErrorModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-12 lg:w-[40%] 2xl:w-[30%] text-[86%] border border-gray-300 flex items-center justify-center">
            <p className="lg:mr-[30px]">Por favor, preencha todos os campos obrigatórios.</p>
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
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        contentLabel={contentLabel}
        shouldCloseOnOverlayClick={true} // Fecha o modal ao clicar fora dele
        className="fixed inset-0 flex items-center justify-center p-4 z-50"
        overlayClassName="fixed inset-0 bg-black bg-opacity-10 z-40"
      >
        <div className="bg-white p-6 shadow-lg w-full max-w-[90vw] md:max-w-[600px] 2xl:max-h-[956px] md:max-h-[80vh] overflow-auto mx-auto ">
          <div>
            <img 
              src={fecharModal} 
              alt="Fechar modal" 
              className="cursor-pointer" 
              onClick={handleCloseModal} // Chama função para fechar o modal
            />
          </div>
          <div className="flex flex-col items-center w-full pt-[70px]">
            <img src={fogoColorido} alt="Fogo Colorido" className="w-[60px] md:w-[72px]" />
            <h1 className="text-[16px] md:text-[18px] font-semibold mb-4 mt-2">Cadastrar Cardápio</h1>
            <form className="w-full flex flex-col" onSubmit={handleSubmit}>
              <div className="flex flex-col mb-4">
                <label htmlFor="data" className="text-sm font-semibold">Data:</label>
                <input 
                  type="date" 
                  id="data" 
                  name="data" 
                  value={formData.data} 
                  onChange={handleChange} 
                  className={`border ${errors.data ? 'border-red-500' : 'border-gray-300'} p-2 rounded`} 
                />
                {errors.data && <p className="text-red-500 text-sm">{errors.data}</p>} {/* Mensagem de erro */}
              </div>
              <div className="flex flex-col mb-4">
                <label htmlFor="pratoPrincipal" className="text-sm font-semibold">Prato Principal:</label>
                <input 
                  type="text" 
                  id="pratoPrincipal" 
                  name="pratoPrincipal" 
                  value={formData.pratoPrincipal} 
                  onChange={handleChange} 
                  className={`border ${errors.pratoPrincipal ? 'border-red-500' : 'border-gray-300'} p-2 rounded`} 
                />
                {errors.pratoPrincipal && <p className="text-red-500 text-sm">{errors.pratoPrincipal}</p>} {/* Mensagem de erro */}
              </div>
              <div className="flex flex-col mb-4">
                <label htmlFor="guarnicao" className="text-sm font-semibold">Guarnição:</label>
                <input 
                  type="text" 
                  id="guarnicao" 
                  name="guarnicao" 
                  value={formData.guarnicao} 
                  onChange={handleChange} 
                  className={`border ${errors.guarnicao ? 'border-red-500' : 'border-gray-300'} p-2 rounded`} 
                />
                {errors.guarnicao && <p className="text-red-500 text-sm">{errors.guarnicao}</p>} {/* Mensagem de erro */}
              </div>
              <div className="flex flex-col mb-4">
                <label htmlFor="salada" className="text-sm font-semibold">Salada:</label>
                <input 
                  type="text" 
                  id="salada" 
                  name="salada" 
                  value={formData.salada} 
                  onChange={handleChange} 
                  className={`border ${errors.salada ? 'border-red-500' : 'border-gray-300'} p-2 rounded`} 
                />
                {errors.salada && <p className="text-red-500 text-sm">{errors.salada}</p>} {/* Mensagem de erro */}
              </div>
              <div className="flex flex-col mb-4">
                <label htmlFor="sobremesa" className="text-sm font-semibold">Sobremesa:</label>
                <input 
                  type="text" 
                  id="sobremesa" 
                  name="sobremesa" 
                  value={formData.sobremesa} 
                  onChange={handleChange} 
                  className={`border ${errors.sobremesa ? 'border-red-500' : 'border-gray-300'} p-2 rounded`} 
                />
                {errors.sobremesa && <p className="text-red-500 text-sm">{errors.sobremesa}</p>} {/* Mensagem de erro */}
              </div>
              <button type="submit" className={`bg-blue-500 text-white py-2 rounded ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={isLoading}>
                {isLoading ? 'Enviando...' : 'Enviar'}
              </button>
            </form>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ModalGrill; // Exporta o componente ModalGrill
