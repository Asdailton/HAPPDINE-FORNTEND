import React, { useState, useEffect } from 'react'; // Importa React e hooks useState e useEffect
import { z, ZodError } from 'zod'; // Importa Zod para validação de dados
import Modal from 'react-modal'; // Importa o componente Modal
import axios from 'axios'; // Importa axios para requisições HTTP
import check from '../../../../image/Notificacao/success.gif'; // Imagem de sucesso
import fecharModal from '../../../../image/FeedBacks/FecharModoClaro.svg'; // Imagem para fechar o modal
import panelaColorida from '../../../../image/CardapioAdmin/PanelaColorida.svg'; // Imagem de panela colorida
Modal.setAppElement('#root'); // Define o elemento raiz para acessibilidade

// Define o esquema de validação do cardápio usando Zod
const cardapioSchema = z.object({
  data: z.string().min(1, "A data é obrigatória"), // Valida a data
  guarnicao: z.string().min(3, "A guarnição é obrigatória"), // Valida a guarnição
  pratoPrincipal: z.string().min(3, "O prato principal é obrigatório"), // Valida o prato principal
  salada: z.string().min(3, 'O tipo de salada é obrigatório'), // Valida a salada
  sobremesa: z.string().min(3, 'A sobremesa é obrigatória'), // Valida a sobremesa
});

// Componente ModalModaCasa
const ModalModaCasa = ({ 
  isOpen, 
  onRequestClose, 
  contentLabel, 
  pratoPrincipal, 
  guarnicao, 
  sobremesa, 
  salada, 
  dataCardapio, 
  idCardapio, 
  atualizarCardapio 
}) => {
  
  // Estado inicial dos dados do formulário
  const initialFormData = {
    data: dataCardapio, // Data atual no formato yyyy-mm-dd
    pratoPrincipal: '',
    guarnicao: '',
    sobremesa: '',
    salada: '',
  };

  // Estados para controlar dados do formulário, erros e carregamento
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Atualiza o estado do formulário quando o cardápio é editado
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
    e.preventDefault(); // Previne o comportamento padrão do formulário
    setIsLoading(true); // Ativa o estado de carregamento
    setErrors({}); // Limpa os erros anteriores
    setShowErrorModal(false); 
    setShowSuccessModal(false); 

    try {
      cardapioSchema.parse(formData); // Valida os dados do formulário
      await enviarInformacoes(); // Envia as informações
      atualizarCardapio(); // Atualiza a lista de cardápios
      setShowSuccessModal(true); // Mostra modal de sucesso
      console.log('Informações enviadas com sucesso.'); // Log para sucesso
      setTimeout(() => {
        onRequestClose(); // Fecha o modal após 2 segundos
      }, 2000);
    } catch (err) {
      if (err instanceof ZodError) { // Se ocorrer um erro de validação
        const fieldErrors = {};
        err.errors.forEach((error) => {
          fieldErrors[error.path[0]] = error.message; // Coleta mensagens de erro
        });
        setErrors(fieldErrors); // Atualiza o estado de erros
        setShowErrorModal(true); // Mostra modal de erro
        console.log('Erro na validação:', fieldErrors); // Log de erros de validação
      }
    }
    setIsLoading(false); // Desativa o estado de carregamento
  };

  // Função para fechar o modal e limpar os dados do formulário
  const handleCloseModal = () => {
    setFormData(initialFormData); // Limpa os campos do formulário
    onRequestClose(); // Fecha o modal
  };

  // Função para enviar as informações para a API
  const enviarInformacoes = async () => {
    const urlPost = "http://127.0.0.1:8080/modadacasa/cardapios"; // URL para criar um novo cardápio
    const urlPut = `http://127.0.0.1:8080/modadacasa/cardapios/${idCardapio}`; // URL para atualizar um cardápio existente

    try {
      if (!idCardapio) { // Se não houver idCardapio, realiza um POST
        await axios.post(urlPost, {
          prato_principal: formData.pratoPrincipal,
          guarnicao: formData.guarnicao,
          sobremesa: formData.sobremesa,
          salada: formData.salada,
          data: formData.data,
          fk_restaurante: "31000000-0000-0000-0000-000000000000",
        });
      } else { // Se houver idCardapio, realiza um PUT
        await axios.put(urlPut, {
          data: formData.data,
          prato_principal: formData.pratoPrincipal,
          guarnicao: formData.guarnicao,
          sobremesa: formData.sobremesa,
          salada: formData.salada,
          fk_restaurante: "31000000-0000-0000-0000-000000000000",
        });
      }
      console.log('Requisição realizada com sucesso.'); // Log de sucesso da requisição
      setShowSuccessModal(true); // Mostra modal de sucesso
      setTimeout(() => {
        setShowSuccessModal(false); // Oculta o modal de sucesso após 2 segundos
      }, 2000);
    } catch (error) {
      console.error('Erro ao enviar as informações:', error); // Log de erro ao enviar informações
      setShowErrorModal(true); // Mostra modal de erro
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
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        contentLabel={contentLabel}
        shouldCloseOnOverlayClick={true}
        className="fixed inset-0 flex items-center justify-center p-4 z-50"
        overlayClassName="fixed inset-0 bg-black bg-opacity-10 z-40"
      >
        <div className="bg-white p-6 shadow-lg w-full max-w-[90vw] md:max-w-[600px] 2xl:max-h-[956px] md:max-h-[80vh] overflow-auto mx-auto " 
        style={{ overflowY: "auto" }}>
          <div>
            <img 
              src={fecharModal} 
              alt="Fechar modal" 
              className="cursor-pointer" 
              onClick={handleCloseModal} // Chama a função para fechar o modal
            />
          </div>
          <div className="flex flex-col items-center w-full pt-[70px]">
            <img src={panelaColorida} alt="Folha Colorida" className="w-[60px] md:w-[72px] mb-5" />
            <h2 className="text-[24px] font-semibold">Adicionar Cardápio</h2>
            <form onSubmit={handleSubmit} className="flex flex-col items-center w-full">
              <input
                type="date"
                name="data"
                value={formData.data} // Preenche com a data do estado do formulário
                onChange={handleChange} // Atualiza o estado ao mudar o campo
                className="border border-gray-300 p-2 rounded w-full my-2" // Estilização
              />
              <span className="text-red-600">{errors.data}</span> {/* Mensagem de erro para a data */}

              <input
                type="text"
                name="pratoPrincipal"
                placeholder="Prato Principal"
                value={formData.pratoPrincipal} // Preenche com o prato principal do estado do formulário
                onChange={handleChange} // Atualiza o estado ao mudar o campo
                className="border border-gray-300 p-2 rounded w-full my-2" // Estilização
              />
              <span className="text-red-600">{errors.pratoPrincipal}</span> {/* Mensagem de erro para prato principal */}

              <input
                type="text"
                name="guarnicao"
                placeholder="Guarnição"
                value={formData.guarnicao} // Preenche com a guarnição do estado do formulário
                onChange={handleChange} // Atualiza o estado ao mudar o campo
                className="border border-gray-300 p-2 rounded w-full my-2" // Estilização
              />
              <span className="text-red-600">{errors.guarnicao}</span> {/* Mensagem de erro para guarnição */}

              <input
                type="text"
                name="salada"
                placeholder="Salada"
                value={formData.salada} // Preenche com a salada do estado do formulário
                onChange={handleChange} // Atualiza o estado ao mudar o campo
                className="border border-gray-300 p-2 rounded w-full my-2" // Estilização
              />
              <span className="text-red-600">{errors.salada}</span> {/* Mensagem de erro para salada */}

              <input
                type="text"
                name="sobremesa"
                placeholder="Sobremesa"
                value={formData.sobremesa} // Preenche com a sobremesa do estado do formulário
                onChange={handleChange} // Atualiza o estado ao mudar o campo
                className="border border-gray-300 p-2 rounded w-full my-2" // Estilização
              />
              <span className="text-red-600">{errors.sobremesa}</span> {/* Mensagem de erro para sobremesa */}

              <button 
                type="submit" 
                disabled={isLoading} // Desabilita o botão enquanto carrega
                className="bg-blue-500 text-white p-2 rounded mt-4 w-full" // Estilização
              >
                {isLoading ? 'Carregando...' : 'Adicionar'} {/* Texto do botão */}
              </button>
            </form>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ModalModaCasa; // Exporta o componente para uso em outras partes da aplicação
