import React, { useState, useRef, useEffect } from "react";
import upload from '../../../image/Notificacao/Upload.svg'; // Imagem de upload
import iconeAviso from '../../../image/Notificacao/IconeAviso.svg';
import iconeEstrela from '../../../image/Notificacao/IconeEstrela.svg';
import iconeMensagem from '../../../image/Notificacao/IconeMensagem.svg';
import iconeAvisoAfter from '../../../image/Notificacao/alertAfter.svg';
import iconeEstrelaAfter from '../../../image/Notificacao/starAfter.svg';
import iconeMensagemAfter from '../../../image/Notificacao/messageAfter.svg';
import check from '../../../image/Notificacao/success.gif'; // Imagem do check

const HomeAvisos = () => {
    const [file, setFile] = useState(null);
    const [recado, setRecado] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
    };

    const handleRecadoChange = (e) => {
        setRecado(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!file || !recado || !selectedCategory) {
            setShowErrorModal(true);
            return;
        }

        const formData = new FormData();
        formData.append('recado', recado);
        formData.append('timestamp', new Date().toISOString());
        formData.append('file', file);
        formData.append('categoria', selectedCategory); // Enviar categoria

        try {
            const response = await fetch('http://localhost:8080/happdine/api/avisos/upload', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                setShowSuccessModal(true);
                setTimeout(() => {
                    setShowSuccessModal(false);
                }, 3000); // Fechar modal de sucesso após 3 segundos
                setFile(null);
                setRecado('');
                setSelectedCategory(null);
                fileInputRef.current.value = '';
            } else {
                alert("Erro ao enviar o arquivo.");
            }
        } catch (error) {
            console.error("Erro:", error);
            alert("Erro ao enviar o arquivo.");
        }
    };

    const handleUploadClick = () => {
        fileInputRef.current.click();
    };

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
    };

    useEffect(() => {
        if (showErrorModal) {
            const timer = setTimeout(() => {
                setShowErrorModal(false);
            }, 3000); // Fechar modal de erro após 3 segundos
            return () => clearTimeout(timer);
        }
    }, [showErrorModal]);

    return (
        <div className="flex flex-col px-[15%] pb-[10%]">
            <div className="flex items-center justify-center p-[90px] gap-6">
                <hr className="border-t border-gray-300 dark:border-gray-600" style={{ width: '10%' }} />
                <p className="text-[34px] font-semibold">Notificações</p>
                <hr className="border-t border-gray-300 dark:border-gray-600" style={{ width: '10%' }} />
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col">
                <div className="flex flex-col">
                    <label htmlFor="recado" className="block text-[16px] font-medium text-black">Recado:</label>
                    <textarea
                        id="recado"
                        name="recado"
                        value={recado}
                        onChange={handleRecadoChange}
                        className="mt-1 block border w-full h-[100px] resize-none focus:outline-none px-2 pt-1"
                    />
                </div>
                <div className="flex justify-between mt-[40px] gap-8">
                    <div className="flex flex-col">
                        <p className="mb-2 font-medium">Upload de arquivos</p>
                        <input
                            type="file"
                            id="file"
                            name="file"
                            onChange={handleFileChange}
                            ref={fileInputRef}
                            style={{ display: 'none' }} // Ocultar o input de arquivos
                        />
                        <div className="cursor-pointer" onClick={handleUploadClick}>
                            {file ? (
                                <img
                                    src={URL.createObjectURL(file)}
                                    alt="Imagem selecionada"
                                    className="w-[510px] 2xl:h-[315px] xl:h-[230px] object-cover"
                                />
                            ) : (
                                <img
                                    src={upload}
                                    alt="Imagem de upload"
                                    className="w-[510px] 2xl:h-[315px] xl:h-[230px]"
                                />
                            )}
                        </div>
                    </div>
                    <div className="flex flex-col 2xl:pr-[5%]">
                        <p className="mb-2 font-medium">Selecione a categoria:</p>
                        <div className="flex flex-col gap-6">
                            <div className="flex items-center gap-4" onClick={() => handleCategoryClick('ATENCAO')}>
                                <img className="cursor-pointer" src={selectedCategory === 'ATENCAO' ? iconeAvisoAfter : iconeAviso} alt="" />
                                <p className="text-[16px]"><strong>Atenção: </strong>Para mensagens que requerem uma atenção maior do usuário. Importante</p>
                            </div>
                            <div className="flex items-center gap-4" onClick={() => handleCategoryClick('ESTRELA')}>
                                <img className="cursor-pointer" src={selectedCategory === 'ESTRELA' ? iconeEstrelaAfter : iconeEstrela} alt="" />
                                <p className="text-[16px]"><strong>Estrela: </strong> Datas comemorativas, eventos ou conquistas.</p>
                            </div>
                            <div className="flex items-center gap-4" onClick={() => handleCategoryClick('MENSAGEM')}>
                                <img className="cursor-pointer" src={selectedCategory === 'MENSAGEM' ? iconeMensagemAfter : iconeMensagem} alt="" />
                                <p className="text-[16px]"><strong>Mensagem: </strong>Mensagens que não necessitam de uma atenção especial</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-[30px]">
                    <button
                        type="submit"
                        className="w-[148px] bg-[#2E3033] py-[10px] text-white text-[17px]"
                    >
                        Enviar
                    </button>
                </div>
            </form>

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
                        <p className="lg:mr-[30px]">Arquivo enviado com <strong>sucesso!</strong></p>
                        <img className='w-[10%]' src={check} alt="Success" />
                    </div>
                </div>
            )}
        </div>
    );
}

export default HomeAvisos;
