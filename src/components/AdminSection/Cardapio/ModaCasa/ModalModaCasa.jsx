import React, { useState } from 'react';
import { z, ZodError } from 'zod';
import Modal from 'react-modal';

import panelaColorida from '../../../../image/CardapioAdmin/PanelaColorida.svg'
Modal.setAppElement('#root');

const cardapioSchema = z.object({
  data: z.string().min(1, "A data é obrigatória"),
  guarnicao: z.string().min(3, "A guarnição é obrigatória"),
  pratoPrincipal: z.string().min(3, "O prato principal é obrigatório"),
  tipoSalada: z.string().min(3, 'O tipo de salada é obrigatório'),
  sobremesa: z.string().min(3, 'A sobremesa é obrigatória'),
});

const ModalModaCasa = ({ isOpen, onRequestClose, contentLabel }) => {
    
    const [formData, setFormData] = useState({
        data: '',
        guarnicao: '',
        pratoPrincipal: '',
        tipoSalada: '',
        sobremesa: '',
      });
    
      const [errors, setErrors] = useState({});
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
          ...prevData,
          [name]: value,
        }));
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        try {
          cardapioSchema.parse(formData);
          // Se a validação passar, você pode processar o formulário ou chamar enviarInformacoes
          enviarInformacoes();
          onRequestClose(); // Fechar o modal após envio
        } catch (err) {
          if (err instanceof ZodError) {
            const fieldErrors = {};
            err.errors.forEach(error => {
              fieldErrors[error.path[0]] = error.message;
            });
            setErrors(fieldErrors);
          }
        }
      };
    
      const enviarInformacoes = () => {
        // Implementação para enviar informações
        console.log("Informações enviadas", formData);
      };
          return (
            <Modal
              isOpen={isOpen}
              onRequestClose={onRequestClose}
              contentLabel={contentLabel}
              shouldCloseOnOverlayClick={true} // Ensures that clicking outside the modal closes it
              className="fixed inset-0 flex items-center justify-center p-4 z-50"
              overlayClassName="fixed inset-0 bg-black bg-opacity-10 z-40"
            >
              <div className="bg-white p-6 shadow-lg w-full max-w-[90vw] md:max-w-[600px] 2xl:max-h-[956px] md:max-h-[80vh] overflow-auto mx-auto pt-[70px]">
                <div className="flex flex-col items-center w-full">
                  <img src={panelaColorida} alt="Folha Colorida" className="w-[60px] md:w-[72px]" />
                  <h1 className="text-[16px] md:text-[18px] font-semibold mb-4 mt-2">Moda Da Casa</h1>
                  
                  <form className='w-full flex flex-col px-[10px] md:px-[20px]' onSubmit={handleSubmit}>
                    <div className="mb-4">
                      <label htmlFor="data" className="block text-sm font-medium text-black">Data</label>
                      <input
                        type="text"
                        id="data"
                        name="data"
                        value={formData.data}
                        onChange={handleChange}
                        className="mt-1 mb-4 block border w-full h-[38px] px-2 focus:outline-none"
                      />
                      {errors.data && <p className="text-red-500 text-sm ">{errors.data}</p>}
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
                      <label htmlFor="tipoSalada" className="block text-sm font-medium text-black">Tipo de Salada</label>
                      <textarea
                        id="tipoSalada"
                        name="tipoSalada"
                        value={formData.tipoSalada}
                        onChange={handleChange}
                        className="mt-1 block border w-full h-[60px] resize-none focus:outline-none px-2 pt-1"
                      />
                      {errors.tipoSalada && <p className="text-red-500 text-sm">{errors.tipoSalada}</p>}
                    </div>
                    <div className="mb-4">
                      <label htmlFor="sobremesa" className="block text-sm font-medium text-black">Sobremesa</label>
                      <input
                        type="text"
                        id="sobremesa"
                        name="sobremesa"
                        value={formData.sobremesa}
                        onChange={handleChange}
                        className="mt-1 block border w-full h-[38px] resize-none focus:outline-none px-2 pt-1"
                      />
                      {errors.sobremesa && <p className="text-red-500 text-sm">{errors.sobremesa}</p>}
                    </div>
                    <div className="flex justify-center my-[20px]">
                      <button
                        type="submit"
                        className="px-6 py-2 bg-[#007BC0] text-white text-[15px] md:text-[17px] shadow-sm hover:bg-[#194d6c]"
                      >
                        Salvar
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </Modal>
    )
}

export default ModalModaCasa;