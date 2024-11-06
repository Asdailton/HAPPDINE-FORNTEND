import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Importa o Axios para realizar requisições HTTP
import iconeEstrela from '../../image/ModalNotification/Estrela.svg';
import iconeAviso from '../../image/ModalNotification/Aviso.svg';
import iconeMensagem from '../../image/ModalNotification/Mensagem.svg';
import fecharModoClaro from '../../image/ModalNotification/FecharModoClaro.svg'; 
import fecharModoEscuro from '../../image/ModalNotification/FecharModoEscuro.svg';

const Notificacao = () => {
    const [darkMode, setDarkMode] = useState(false); // Estado para controlar o modo escuro
    const [isModalVisible, setIsModalVisible] = useState(true); // Estado para controlar a visibilidade do modal
    const [notifications, setNotifications] = useState([]); // Estado para armazenar as notificações
    const [loading, setLoading] = useState(true); // Estado para controlar o carregamento das notificações

    useEffect(() => {
        // Função para verificar o estado do modo escuro armazenado no localStorage
        const checkDarkMode = () => {
            const storedDarkMode = localStorage.getItem('darkMode');
            setDarkMode(storedDarkMode === 'true'); // Define o modo escuro se estiver salvo como 'true' no localStorage
        };

        checkDarkMode(); // Verifica o modo escuro quando o componente é montado
        const timerId = setInterval(checkDarkMode, 100); // Verifica o modo escuro a cada 100ms para atualizações
        return () => clearInterval(timerId); // Limpa o intervalo ao desmontar o componente
    }, []);

    // Função para buscar notificações da API
    const fetchNotifications = async () => {
        try {
            const response = await axios.get('http://localhost:8080/happdine/api/avisos/recent'); // Faz a requisição GET para o endpoint '/api/recent'
            const notificationsData = response.data;
            console.log(notificationsData);

            // Verifica se notificationsData é um array antes de fazer o map
            if (Array.isArray(notificationsData)) {
                const mappedNotifications = notificationsData.map(notification => ({
                    id: notification.id,
                    recado: notification.recado,
                    timestamp: notification.timestamp,
                    categoria: notification.categoria,
                    imagemBase64: notification.imagemBase64 // Este deve estar no formato 'data:image/jpeg;base64,...'
                }));

                setNotifications(mappedNotifications); // Atualiza o estado com as notificações recebidas
            } else {
                console.error('notificationsData não é um array:', notificationsData);
            }
        } catch (error) {
            console.error('Error fetching notifications:', error); // Loga o erro no console em caso de falha na requisição
        } finally {
            setLoading(false); // Define o estado de carregamento como falso após a requisição
        }
    };

    useEffect(() => {
        fetchNotifications(); // Chama a função para buscar notificações quando o componente é montado
    }, []);

    const fecharModal = darkMode ? fecharModoEscuro : fecharModoClaro; // Define o ícone de fechamento com base no modo escuro

    // Função para fechar o modal
    const handleCloseModal = () => {
        setIsModalVisible(false); // Define o estado de visibilidade do modal como falso, ocultando-o
    };

    // Condicional para verificar se o modal deve ser exibido; retorna null se for oculto
    if (!isModalVisible) return null;

    return (
        <div className={`fixed top-0 right-0 mt-2 w-full md:w-[670px] z-50 ${darkMode ? 'bg-[#2E3033] text-white' : 'bg-white text-black'} shadow-lg`}>
            <div className='py-5 px-6 md:py-7 md:px-8  flex justify-between items-center'>
                <h3 className="font-semibold text-[16px] md:text-[19px]">Notificações</h3>
                <img
                    src={fecharModal} // Exibe o ícone de fechar apropriado com base no modo escuro
                    alt="Fechar Modal"
                    className="w-3 h-3 md:w-6 md:h-6 cursor-pointer"
                    onClick={handleCloseModal} // Adiciona o evento de clique para fechar o modal
                />
            </div>

            <ul className="max-h-60 overflow-y-auto">
                {loading ? (
                    <li className="px-5 py-4 text-gray-500 md:px-8 md:py-5">Carregando notificações...</li> // Mensagem exibida enquanto as notificações estão sendo carregadas
                ) : (
                    notifications.length > 0 ? ( // Verifica se há notificações
                        notifications.map((notification) => (
                            <li key={notification.id} className="hover:bg-gray-200">
                               <div className="flex items-center justify-between space-x-2 py-4 px-5 md:py-5 md:px-8 border-t border-gray-300">
                                    <img
                                        src={
                                            notification.categoria === 'ESTRELA' ? iconeEstrela : 
                                            notification.categoria === 'ATENÇAO' ? iconeAviso : 
                                            notification.categoria === 'MENSAGEM' ? iconeMensagem : ''
                                        } // Exibe o ícone baseado na categoria
                                        alt="Categoria"
                                        className="w-5 h-5 md:w-6 md:h-6"
                                    />
                                    <div className='w-[70%] md:w-[80%]'>
                                       <p className='text-[14px] md:text-[16px] text-left'>{notification.recado}</p> {/* Conteúdo da notificação */}
                                       <p className='text-[12px] md:text-[10.5px] text-medium text-[#B2B9C0] text-left'>{new Date(notification.timestamp).toLocaleString()}</p> {/* Exibe o timestamp formatado */}
                                    </div>
                                    {notification.imagemBase64 && ( // Verifica se há imagem para exibir
                                        <img
                                            src={notification.imagemBase64} // Exibe a imagem em Base64 se estiver disponível
                                            alt="Foto"
                                            className="w-5 h-5 md:w-6 md:h-6"
                                        />
                                    )}
                               </div>
                            </li>
                        ))
                    ) : (
                        <li className="px-5 py-4 text-gray-500 md:px-8 md:py-5">Nenhum aviso encontrado.</li> // Mensagem exibida caso não haja notificações
                    )
                )}
            </ul>
        </div>
    );
};

export default Notificacao; // Exporta o componente para uso em outros arquivos
