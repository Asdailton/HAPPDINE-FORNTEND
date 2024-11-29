import React, { useState, useEffect } from 'react';
import { z, ZodError } from 'zod';
import Modal from 'react-modal';
import folhaColorida from '../../../../image/CardapioAdmin/FolhaColorida.svg';
import fecharModal from '../../../../image/FeedBacks/FecharModoClaro.svg';
import check from '../../../../image/Notificacao/success.gif'; // Imagem de sucesso
import axios from 'axios';

Modal.setAppElement('#root');

const cardapioSchema = z.object({
  data: z.string().min(1, "A data é obrigatória"),
  guarnicao: z.string().min(3, "A guarnição é obrigatória"),
  pratoPrincipal: z.string().min(3, "O prato principal é obrigatório"),
  salada: z.string().min(3, 'O tipo de salada é obrigatório'),
  sobremesa: z.string().min(3, 'A sobremesa é obrigatória'),
});

const ModalBemVida = ({
  isOpen,
  onRequestClose,
  contentLabel,
  pratoPrincipal,
  guarnicao,
  sobremesa,
  salada,
  dataCardapio,
  idCardapio,
  
}) => {
  const initialFormData = {
    data: dataCardapio, // Data atual no formato yyyy-mm-dd
    pratoPrincipal: '',
    guarnicao: '',
    sobremesa: '',
    salada: '',
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

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
      setFormData(initialFormData);
    }
  }, [pratoPrincipal, guarnicao, sobremesa, salada, dataCardapio, idCardapio]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value, //função de atualizar quando algum campo do form for alterado
    }));
  };

  const handleCloseModal = () => {
    setFormData(initialFormData); // Limpa os campos do formulário
    onRequestClose(); // Fecha o modal
    
  };
  
  //função de enviar as informações para a api
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});
    setShowErrorModal(false);
    setShowSuccessModal(false);

    try {
      cardapioSchema.parse(formData);
      await enviarInformacoes();
      atualizarCardapio();
      setShowSuccessModal(true);
      console.log('Informações enviadas com sucesso.');
      setTimeout(() => {
        onRequestClose();
      }, 2000);
    } catch (err) {
      if (err instanceof ZodError) {
        const fieldErrors = {};
        err.errors.forEach((error) => {
          fieldErrors[error.path[0]] = error.message;
        });
        setErrors(fieldErrors);
        setShowErrorModal(true);
        setTimeout(() => {
          setShowErrorModal(false);
        }, 1500);
        console.log('Erro na validação:', fieldErrors);
      }
    }
    setIsLoading(false);
  };

  const enviarInformacoes = async () => {
    const urlPost = "http://127.0.0.1:8080/debemcomavida/cardapios";
    const urlPut = `http://127.0.0.1:8080/debemcomavida/cardapios/${idCardapio}`;

    try {
      if (!idCardapio) {
        await axios.post(urlPost, {
          prato_principal: formData.pratoPrincipal,
          guarnicao: formData.guarnicao,
          sobremesa: formData.sobremesa,
          salada: formData.salada,
          data: formData.data,
          fk_restaurante: "34000000-0000-0000-0000-000000000000",
        });
      } else {
        await axios.put(urlPut, {
          data: formData.data,
          prato_principal: formData.pratoPrincipal,
          guarnicao: formData.guarnicao,
          sobremesa: formData.sobremesa,
          salada: formData.salada,
          fk_restaurante: "34000000-0000-0000-0000-000000000000",
        });
      }
      console.log('Requisição realizada com sucesso.');
      setShowSuccessModal(true);
      setTimeout(() => {
        setShowSuccessModal(false);
      }, 2000);
    } catch (error) {
      console.error('Erro ao enviar as informações:', error);
      setShowErrorModal(true);
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

      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        contentLabel={contentLabel}
        shouldCloseOnOverlayClick={true}
        className="fixed inset-0 flex items-center justify-center p-4 z-50"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-40"
      >
        <div className="bg-white p-6 shadow-lg w-full max-w-[90vw] md:max-w-[600px] 2xl:max-h-[956px] md:max-h-[80vh] overflow-auto mx-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div>
            <img 
              src={fecharModal} 
              alt="Fechar modal" 
              className="cursor-pointer" 
              onClick={handleCloseModal} 
            />
          </div>
          <div className="flex flex-col items-center w-full pt-[70px]">
            <img src={folhaColorida} alt="Folha Colorida" className="w-[60px] md:w-[72px]" />
            <h1 className="text-[16px] md:text-[18px] mb-4 mt-2">De Bem Com a Vida</h1>

            <form className="w-full flex flex-col px-[10px] md:px-[20px]" onSubmit={handleSubmit}>
              {/* Campos do Formulário */}
              <div className="mb-4">
                <label htmlFor="data" className="block text-sm font-medium text-black">Data</label>
                <input
                  type="date"
                  id="data"
                  name="data"
                  value={formData.data}
                  onChange={handleChange}
                  className="mt-1 block border w-full h-[38px] focus:outline-none px-2 pt-1"
                />
                {errors.data && <p className="text-red-500 text-sm">{errors.data}</p>}
              </div>
              <div className="mb-4">
                <label htmlFor="guarnicao" className="block text-sm font-medium text-black">Guarnição</label>
                <textarea
                  id="guarnicao"
                  name="guarnicao"
                  value={formData.guarnicao}
                  onChange={handleChange}
                  className="mt-1 block border w-full h-[60px] resize-none focus:outline-none px-2 pt-1"
                />
                {errors.guarnicao && <p className="text-red-500 text-sm">{errors.guarnicao}</p>}
              </div>
              <div className="mb-4">
                <label htmlFor="pratoPrincipal" className="block text-sm font-medium text-black">Prato Principal</label>
                <textarea
                  id="pratoPrincipal"
                  name="pratoPrincipal"
                  value={formData.pratoPrincipal}
                  onChange={handleChange}
                  className="mt-1 block border w-full h-[60px] resize-none focus:outline-none px-2 pt-1"
                />
                {errors.pratoPrincipal && <p className="text-red-500 text-sm">{errors.pratoPrincipal}</p>}
              </div>
              <div className="mb-4">
                <label htmlFor="salada" className="block text-sm font-medium text-black">Salada</label>
                <textarea
                  id="salada"
                  name="salada"
                  value={formData.salada}
                  onChange={handleChange}
                  className="mt-1 block border w-full h-[60px] resize-none focus:outline-none px-2 pt-1"
                />
                {errors.salada && <p className="text-red-500 text-sm">{errors.salada}</p>}
              </div>
              <div className="mb-4">
                <label htmlFor="sobremesa" className="block text-sm font-medium text-black">Sobremesa</label>
                <textarea
                  id="sobremesa"
                  name="sobremesa"
                  value={formData.sobremesa}
                  onChange={handleChange}
                  className="mt-1 block border w-full h-[60px] resize-none focus:outline-none px-2 pt-1"
                />
                {errors.sobremesa && <p className="text-red-500 text-sm">{errors.sobremesa}</p>}
              </div>
              <button
                type="submit"
                className="px-6 py-2 bg-[#00884A] text-white text-[15px] md:text-[17px] shadow-sm"
                disabled={isLoading}
              >
                {isLoading ? 'Enviando...' : 'Enviar'}
              </button>
            </form>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ModalBemVida;