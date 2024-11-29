import { useEffect, useState } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import Graphs from './Graphs';
import check from '../../image/Notificacao/success.gif';

const DearOfDay = () => {
    const { t } = useTranslation(); // Hook de tradução para internacionalização
    const [selectedCardapio, setSelectedCardapio] = useState(''); // Estado para o cardápio selecionado
    const [restaurantes, setRestaurantes] = useState([]); // Estado para a lista de restaurantes
    const [loading, setLoading] = useState(true); // Estado para mostrar o carregamento
    const [error, setError] = useState(null); // Estado para capturar erros na requisição
    const [modalOpen, setModalOpen] = useState(false); // Estado para controlar a abertura do modal

    // Função para atualizar o cardápio selecionado
    const Checkbox = (id) => {
        setSelectedCardapio(id);
    };

    useEffect(() => {
        // Função para buscar a lista de restaurantes na API
        const fetchRestaurantes = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8080/api/restaurante"); // Requisição à API
                setRestaurantes(response.data); // Atualiza a lista de restaurantes
                localStorage.setItem('restaurantes', JSON.stringify(response.data)); // Salva os restaurantes no localStorage
                console.log(response.data);
            } catch (error) {
                console.error("Error fetching restaurantes:", error);
                setError("Erro ao carregar os restaurantes."); // Define a mensagem de erro
            } finally {
                setLoading(false); // Finaliza o estado de carregamento
            }
        };

        fetchRestaurantes(); // Chama a função de busca de restaurantes
    }, []);

    // Função para enviar o voto
    const fetchVoto = async () => {
        const today = new Date();
        const formattedDate = today.toISOString().split('T')[0]; // Formata a data atual

        try {
            const data = {
                registro: formattedDate, // Data formatada
                id_restaurante: selectedCardapio, // ID do restaurante selecionado
            };

            await axios.post("http://127.0.0.1:8080/api/votos", data); // Envia o voto para a API

            setModalOpen(true); // Abre o modal de sucesso
            setTimeout(() => {
                setModalOpen(false); // Fecha o modal após 2 segundos
            }, 2000);
          
        } catch (error) {
            console.error("Error sending vote:", error); // Exibe erro caso a requisição falhe
        }
    };

    // Divide os restaurantes em duas colunas
    const firstColumn = restaurantes.slice(0, Math.ceil(restaurantes.length / 2));
    const secondColumn = restaurantes.slice(Math.ceil(restaurantes.length / 2));

    // Função para fechar o modal
    const closeModal = () => {
        setModalOpen(false);
    };

    return (
        <div
            style={{
                background: 'linear-gradient(to left, rgba(78, 82, 86, 1) 5%, rgba(46, 48, 51, 1) 100%)', // Estilo de fundo
            }}
            className="2xl:py-[150px] py-[70px] lg:py-[100px] flex flex-col justify-center"
        >
            <div className="flex flex-col justify-center w-full">
                <div className="flex items-center justify-center w-full gap-4">
                    <div className="border-t w-[6%] flex border-white"></div>
                    <h1 className="md:text-[36px]  text-[19px] font-bold text-white dark:text-white">
                    {t('QUERIDINHO_DO_DIA')}{/* Texto traduzido */}
                    </h1>
                    <div className="border-t w-[6%] border-white"></div>
                </div>
                <p className="text-center mt-[10px] text-sm text-[#B2B9C0]">
                  {t('SELECIONE_SEU_CARDAPIO_FAVORITO')}
                </p>
            </div>

            <div className="flex lg:flex-row flex-col justify-center items-center">
                <div className="flex flex-col px-[60px] lg:w-[45%] w-full 2xl:w-[36%] xl:w-[38%] ml-[4%] border-r">
                    <div className="flex flex-col lg:flex-row justify-between w-full gap-5 mt-[15px]">
                        {/* Coluna 1 */}
                        <div className="flex flex-col gap-5">
                            {firstColumn.map((restaurante) => (
                                <label key={restaurante.id} className="text-white flex gap-4">
                                    <input
                                        checked={selectedCardapio === restaurante.id} // Define o cardápio selecionado
                                        onChange={() => Checkbox(restaurante.id)}
                                        type="checkbox"
                                        className="w-5 h-5 border-none appearance-none"
                                        style={{
                                            backgroundColor: selectedCardapio === restaurante.id ? restaurante.cor : '#E0E2E5',
                                            borderColor: restaurante.cor,
                                            borderWidth: '2px',
                                            borderStyle: 'solid',
                                        }}
                                    />
                                    <span className="md:text-[16px] text-[10px]" style={{  color: selectedCardapio === restaurante.id ? restaurante.cor : '#ffffff' }}>
                                        {restaurante.nome}
                                    </span>
                                </label>
                            ))}
                        </div>

                        {/* Coluna 2 */}
                        <div className="flex flex-col gap-5">
                            {secondColumn.map((restaurante) => (
                                <label key={restaurante.id} className="text-white flex gap-4">
                                    <input
                                        checked={selectedCardapio === restaurante.id}
                                        onChange={() => Checkbox(restaurante.id)}
                                        type="checkbox"
                                        className="w-5 h-5 border-none appearance-none"
                                        style={{
                                            backgroundColor: selectedCardapio === restaurante.id ? restaurante.cor : '#E0E2E5',
                                            borderColor: restaurante.cor,
                                            borderWidth: '2px',
                                            borderStyle: 'solid',
                                        }}
                                    />
                                    <span  className="md:text-[16px] text-[10px]" style={{ color: selectedCardapio === restaurante.id ? restaurante.cor : '#ffffff' }}>
                                        {restaurante.nome}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <button
                        onClick={fetchVoto}
                        className="bg-[#4E5256] w-[27%]  md:text-[17px] text-[10px] lg:text-[18px] xl:text-[19px] 2xl:text-[21px] mt-[30px] h-[5vh] text-white"
                    >
                        {t('ENVIAR')} {/* Botão para enviar o voto */}
                    </button>
                </div>

                <div className="lg:block w-px bg-white h-full mx-4"></div>
                
                <div className="2xl:w-[40%] lg:w-[40%] ">
                    <Graphs /> {/* Componente gráfico */}
                </div>
            </div>

            {/* Modal de Sucesso */}
            {modalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-12 lg:w-[40%] 2xl:w-[30%] text-[86%] border border-gray-300 flex items-center justify-center">
                        <p className="lg:mr-[30px]">Voto enviado com <strong>sucesso!</strong></p>
                        <img className='w-[10%]' src={check} alt="Success" /> {/* GIF de sucesso */}
                    </div>
                </div>
            )}
        </div>
    );
};

export default DearOfDay;
