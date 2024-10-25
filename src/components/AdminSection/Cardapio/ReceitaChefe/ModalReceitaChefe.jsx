import React, { useState, useEffect } from 'react';
import { z, ZodError } from 'zod';
import Modal from 'react-modal';
import axios from 'axios';
import talherColorido from '../../../../image/CardapioAdmin/TalherColorido.svg'; // Importa imagem de talher
import fecharModal from '../../../../image/FeedBacks/FecharModoClaro.svg'; // Importa imagem para fechar o modal
import check from '../../../../image/Notificacao/success.gif'; // Importa imagem de sucesso
Modal.setAppElement('#root'); // Define o elemento raiz para acessibilidade

// Define um schema de validação com Zod para os campos do formulário
const cardapioSchema = z.object({
  data: z.string().min(1, "A data é obrigatória"),
  guarnicao: z.string().min(3, "A guarnição é obrigatória"),
  pratoPrincipal: z.string().min(3, "O prato principal é obrigatório"),
  salada: z.string().min(3, 'O tipo de salada é obrigatório'),
  sobremesa: z.string().min(3, 'A sobremesa é obrigatória'),
});

// Componente ModalReceitaChefe
const ModalReceitaChefe = ({ isOpen, onRequestClose, contentLabel, pratoPrincipal, guarnicao, sobremesa, salada, dataCardapio, idCardapio, atualizarCardapio }) => {
    
  // Dados iniciais do formulário
  const initialFormData = {
    data: dataCardapio, // Data atual no formato yyyy-mm-dd
    pratoPrincipal: '',
    guarnicao: '',
    sobremesa: '',
    salada: '',
  };

  // State para gerenciar o formulário e outras informações
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({}); // Para armazenar erros de validação
  const [isLoading, setIsLoading] = useState(false); // Estado para controle de carregamento
  const [showErrorModal, setShowErrorModal] = useState(false); // Para controle do modal de erro
  const [showSuccessModal, setShowSuccessModal] = useState(false); // Para controle do modal de sucesso

  // Efeito para definir dados do formulário quando o id do cardápio muda
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

  // Função para lidar com mudanças nos campos do formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Função para lidar com o envio do formulário
  const handleSubmit = async (e) => {
    e.preventDefault(); // Impede o comportamento padrão do formulário
    setIsLoading(true); // Ativa o estado de carregamento
    setErrors({}); // Reseta erros
    setShowErrorModal(false); 
    setShowSuccessModal(false); 

    try {
      cardapioSchema.parse(formData); // Valida os dados do formulário
      await enviarInformacoes(); // Envia as informações
      atualizarCardapio(); // Atualiza o cardápio
      setShowSuccessModal(true); // Exibe o modal de sucesso
      console.log('Informações enviadas com sucesso.'); // Log para sucesso
      setTimeout(() => {
        onRequestClose(); // Fecha o modal após 2 segundos
      }, 2000);
    } catch (err) {
      if (err instanceof ZodError) {
        const fieldErrors = {};
        err.errors.forEach((error) => {
          fieldErrors[error.path[0]] = error.message; // Armazena mensagens de erro
        });
        setErrors(fieldErrors); // Atualiza os erros
        setShowErrorModal(true); // Exibe o modal de erro
        console.log('Erro na validação:', fieldErrors); // Log de erros de validação
      }
    }
    setIsLoading(false); // Desativa o estado de carregamento
  };

  // Função para fechar o modal e limpar o formulário
  const handleCloseModal = () => {
    setFormData(initialFormData); // Limpa os campos do formulário
    onRequestClose(); // Fecha o modal
  };

  // Função para enviar informações para a API
  const enviarInformacoes = async () => {
    const urlPost = "http://127.0.0.1:8080/receitadochefe/cardapios"; // URL para criar novo cardápio
    const urlPut = `http://127.0.0.1:8080/receitadochefe/cardapios/${idCardapio}`; // URL para atualizar cardápio existente

    try {
      if (!idCardapio) {
        // Se não houver id, realiza um POST
        await axios.post(urlPost, {
          prato_principal: formData.pratoPrincipal,
          guarnicao: formData.guarnicao,
          sobremesa: formData.sobremesa,
          salada: formData.salada,
          data: formData.data,
          fk_restaurante: "32000000-0000-0000-0000-000000000000", // ID do restaurante (exemplo)
        });
      } else {
        // Se houver id, realiza um PUT
        await axios.put(urlPut, {
          data: formData.data,
          prato_principal: formData.pratoPrincipal,
          guarnicao: formData.guarnicao,
          sobremesa: formData.sobremesa,
          salada: formData.salada,
          fk_restaurante: "32000000-0000-0000-0000-000000000000", // ID do restaurante (exemplo)
        });
      }
      console.log('Requisição realizada com sucesso.'); // Log de sucesso da requisição
      setShowSuccessModal(true); // Mostra modal de sucesso
      setTimeout(() => {
        setShowSuccessModal(false);
      }, 2000); 
    } catch (error) {
      console.error('Erro ao enviar as informações:', error); // Log de erro
      setShowErrorModal(true); // Exibe modal de erro
      console.log('Erro de requisição:', error); // Log de erro de requisição
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

      <Modal
        isOpen={isOpen} // Estado de abertura do modal
        onRequestClose={onRequestClose} // Função para fechar o modal
        contentLabel={contentLabel} // Rótulo do modal para acessibilidade
        shouldCloseOnOverlayClick={true} // Permite fechar ao clicar fora
        className="fixed inset-0 flex items-center justify-center p-4 z-50" // Classes do modal
        overlayClassName="fixed inset-0 bg-black bg-opacity-10 z-40" // Classes para o fundo do modal
      >
        <div className="bg-white p-6 shadow-lg w-full max-w-[90vw] md:max-w-[600px] 2xl:max-h-[956px] md:max-h-[80vh] overflow-auto mx-auto " 
             style={{ overflowY: "auto" }}>
          <div>
            <img 
              src={fecharModal} // Imagem de fechar modal
              alt="Fechar modal" 
              className="cursor-pointer" 
              onClick={handleCloseModal} // Função para fechar
            />
          </div>
          <div className="flex flex-col items-center w-full pt-[70px]">
            <img src={talherColorido} alt="Folha Colorida" className="w-[60px] md:w-[72px]" />
            <h1 className="text-[16px] md:text-[22px]">Registrar Cardápio</h1>
          </div>

          {/* Formulário */}
          <form onSubmit={handleSubmit} className="flex flex-col items-center mt-8">
            <div className="flex flex-col w-full">
              <label htmlFor="data" className="font-bold">Data do Cardápio:</label>
              <input 
                type="date" 
                name="data" 
                id="data" 
                value={formData.data} 
                onChange={handleChange} 
                className={`border p-2 rounded mt-1 ${errors.data ? 'border-red-500' : 'border-gray-300'}`} 
              />
              {errors.data && <span className="text-red-500">{errors.data}</span>}
            </div>

            <div className="flex flex-col w-full mt-4">
              <label htmlFor="pratoPrincipal" className="font-bold">Prato Principal:</label>
              <input 
                type="text" 
                name="pratoPrincipal" 
                id="pratoPrincipal" 
                value={formData.pratoPrincipal} 
                onChange={handleChange} 
                className={`border p-2 rounded mt-1 ${errors.pratoPrincipal ? 'border-red-500' : 'border-gray-300'}`} 
              />
              {errors.pratoPrincipal && <span className="text-red-500">{errors.pratoPrincipal}</span>}
            </div>

            <div className="flex flex-col w-full mt-4">
              <label htmlFor="guarnicao" className="font-bold">Guarnição:</label>
              <input 
                type="text" 
                name="guarnicao" 
                id="guarnicao" 
                value={formData.guarnicao} 
                onChange={handleChange} 
                className={`border p-2 rounded mt-1 ${errors.guarnicao ? 'border-red-500' : 'border-gray-300'}`} 
              />
              {errors.guarnicao && <span className="text-red-500">{errors.guarnicao}</span>}
            </div>

            <div className="flex flex-col w-full mt-4">
              <label htmlFor="salada" className="font-bold">Salada:</label>
              <input 
                type="text" 
                name="salada" 
                id="salada" 
                value={formData.salada} 
                onChange={handleChange} 
                className={`border p-2 rounded mt-1 ${errors.salada ? 'border-red-500' : 'border-gray-300'}`} 
              />
              {errors.salada && <span className="text-red-500">{errors.salada}</span>}
            </div>

            <div className="flex flex-col w-full mt-4">
              <label htmlFor="sobremesa" className="font-bold">Sobremesa:</label>
              <input 
                type="text" 
                name="sobremesa" 
                id="sobremesa" 
                value={formData.sobremesa} 
                onChange={handleChange} 
                className={`border p-2 rounded mt-1 ${errors.sobremesa ? 'border-red-500' : 'border-gray-300'}`} 
              />
              {errors.sobremesa && <span className="text-red-500">{errors.sobremesa}</span>}
            </div>

            <button 
              type="submit" 
              className={`mt-6 bg-green-600 text-white font-bold py-2 px-4 rounded ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`} 
              disabled={isLoading} // Desativa o botão durante o carregamento
            >
              {isLoading ? 'Enviando...' : 'Enviar'}
            </button>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default ModalReceitaChefe;
