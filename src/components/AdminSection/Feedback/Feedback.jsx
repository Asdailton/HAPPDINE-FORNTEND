import React, { useState, useEffect } from 'react'; // Importa React e hooks
import Carousel from 'react-multi-carousel'; // Importa componente de carousel
import 'react-multi-carousel/lib/styles.css'; // Importa estilos do carousel
import axios from 'axios'; // Importa biblioteca Axios para fazer requisições HTTP
import Modal from 'react-modal'; // Importa componente de modal
import eye from '../../../image/FeedbacksAdmin/eye.png'; // Imagem do ícone de visualização
import seloVerde from '../../../image/FeedbacksAdmin/green.png'; // Imagem do selo verde
import seloAzul from '../../../image/FeedbacksAdmin/blue.png'; // Imagem do selo azul
import seloRoxo from '../../../image/FeedbacksAdmin/purple.png'; // Imagem do selo roxo
import seloPreto from '../../../image/FeedbacksAdmin/preto.png'; // Imagem do selo preto
import rejected from '../../../image/FeedbacksAdmin/deletanimated.gif'; // Imagem do ícone de rejeição
import check from '../../../image/FeedbacksAdmin/checkanimated.gif'; // Imagem do ícone de aprovação
import Stars from './Stars'; // Componente de estrelas

Modal.setAppElement('#root'); // Define o elemento raiz para o modal

// Configura as resoluções do carousel
const responsive = {
  superLargeDesktop: { breakpoint: { max: 4000, min: 1024 }, items: 3.5, slidesToSlide: 1 },
  desktop: { breakpoint: { max: 1500, min: 768 }, items: 2.2, slidesToSlide: 1 },
  tablet: { breakpoint: { max: 868, min: 464 }, items: 1, slidesToSlide: 1 },
  mobile: { breakpoint: { max: 640, min: 0 }, items: 0.2, slidesToSlide: 1 },
};

const Feedbacks = () => {
  // Estados para gerenciar os feedbacks, modais e mensagens
  const [reviews, setReviews] = useState([]); // Feedbacks pendentes
  const [modalIsOpen, setModalIsOpen] = useState(false); // Controle do modal
  const [selectedReview, setSelectedReview] = useState(null); // Feedback selecionado
  const [approvedReviews, setApprovedReviews] = useState([]); // Feedbacks aprovados
  const [rejectedReviews, setRejectedReviews] = useState([]); // Feedbacks rejeitados
  const [modalIsVisible, setModalIsVisible] = useState(false); // Controle de mensagem de aprovação
  const [showRejectMessage, setShowRejectMessage] = useState(false); // Controle de mensagem de rejeição

  // Função para buscar os feedbacks da API
  const getFeedbacks = async () => {
    try {
      // Faz requisições simultâneas para buscar feedbacks do site e do restaurante
      const [websiteResponse, restauranteResponse] = await Promise.all([
        axios.get('http://localhost:8080/api/comentarios/admin/website'),
        axios.get('http://localhost:8080/api/comentarios/admin/restaurante'),
      ]);

      // Filtra feedbacks pendentes (não aprovados)
      const pendingWebsiteReviews = websiteResponse.data.filter(review => review.aprovado === false);
      const pendingRestauranteReviews = restauranteResponse.data.filter(review => review.aprovado === false);

      // Junta feedbacks pendentes
      setReviews([...pendingWebsiteReviews, ...pendingRestauranteReviews]);

      // Filtra feedbacks aprovados
      const approvedWebsiteReviews = websiteResponse.data.filter(review => review.aprovado === true);
      const approvedRestauranteReviews = restauranteResponse.data.filter(review => review.aprovado === true);

      // Junta feedbacks aprovados
      setApprovedReviews([...approvedWebsiteReviews, ...approvedRestauranteReviews]);
    } catch (error) {
      console.error('Erro ao buscar feedbacks:', error); // Log de erro
    }
  };

  // useEffect para buscar feedbacks ao carregar o componente
  useEffect(() => {
    getFeedbacks();
  }, []);

  // Função para abrir o modal com o feedback selecionado
  const openModal = (review) => {
    setSelectedReview(review);
    setModalIsOpen(true);
  };

  // Função para fechar o modal
  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedReview(null);
  };

  // Mapeamento das cores para os selos
  const seloMap = {
    '#10AAFD': seloAzul,   // Azul
    '#C535BC': seloRoxo,   // Roxo
    '#219557': seloVerde,  // Verde
    '#2E3033': seloPreto,  // Preto
  };

  // Função para aceitar um feedback
  const handleAccept = async () => {
    if (selectedReview) {
      try {
        // Atualiza o feedback para aprovado
        const updatedReview = {
          ...selectedReview,
          isAprovado: true,  // Usar "aprovado" para alinhar com a API
        };

        await axios.put(`http://localhost:8080/api/comentarios/admin/${selectedReview.id}`, updatedReview);

        // Atualiza a lista de feedbacks aprovados no frontend
        setApprovedReviews((prev) => [...prev, updatedReview]);
        setModalIsVisible(true); // Mostra mensagem de sucesso

        // Recarrega os feedbacks para refletir a mudança
        getFeedbacks();

        // Fecha o modal após um tempo
        setTimeout(() => {
          setModalIsVisible(false);
          closeModal();
        }, 1000);
      } catch (error) {
        console.error('Erro ao aprovar o feedback:', error); // Log de erro
      }
    }
  };

  // Função para rejeitar um feedback
  const handleReject = () => {
    if (selectedReview) {
      setRejectedReviews(prev => [...prev, selectedReview]); // Adiciona feedback à lista de rejeitados
      setShowRejectMessage(true); // Mostra mensagem de rejeição

      // Fecha o modal após um tempo
      setTimeout(() => {
        setShowRejectMessage(false);
        closeModal();
      }, 1500);
    }
  };

  return (
    <> 
      {/* Título da seção de feedbacks */}
      <div className="flex items-center justify-center p-[90px] gap-6">
        <hr className="border-t border-gray-300 dark:border-gray-600" style={{ width: '10%' }} />
        <p className="text-[34px] font-semibold">#BatePapo</p>
        <hr className="border-t border-gray-300 dark:border-gray-600" style={{ width: '10%' }} />
      </div>

      {/* Seção de feedbacks pendentes */}
      <div className="w-full 2xl:h-[45vh] lg:h-[53vh] flex justify-center items-center mb-6">
        <div className="bg-gradient-to-r from-[#2E3033] to-[#4E5256] px-10 pt-13 w-[95%] 2xl:h-[40vh]">
          <p className="text-white mb-4 font-bold text-[27px]">Feedbacks:</p>
          <Carousel
            responsive={responsive}
            centerMode
            infinite
            showDots={false}
            containerClass="carousel-container"
            itemClass="p-2 flex justify-center items-center"
          >
            {reviews.map((review) => (
              <div
                key={review.id}
                className="bg-[#FFFBFB] shadow-custom-pink   w-[97%] p-5 flex flex-col justify-between transform transition-transform duration-300 hover:scale-105"
              >
                {/* Informações do feedback */}
                <div className="flex justify-between items-start">
                  <div className="w-[90%]">
                    <h1 className='2xl:text-[18px] lg:text-[18px] font-semibold'>{review.nome}</h1>
                    <h2 className='2xl:text-[11px] lg:text-[10px] text-[#7D8389]'>{review.timestampp}</h2>
                  </div>
                  <div className="flex justify-end w-[6%]">
                    <img className="w-9" src={seloMap[review.corEstrela]} alt="Selo correspondente" />
                  </div>
                </div>

                {/* Comentário do feedback */}
                <div className="flex-1 mt-2">
                  <p className="2xl:text-[16px] lg:text-[13px] text-start w-[80%]">{review.comentario}</p>
                </div>
                <div>
                 <Stars corRegistrada={review?.corEstrela} quantidade={review?.estrela}/> {/* Componente de estrelas */}
                </div>

                {/* Ícone para abrir o modal */}
                <div className="absolute bottom-3 right-3 cursor-pointer" onClick={() => openModal(review)}>
                  <img className='w-5 h-3' src={eye} alt="Eye icon" />
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </div>

      {/* Seção de feedbacks aprovados */}
      <div className='w-[100%] 2xl:h-[35vh] flex justify-center items-center mb-10'>
        <div className='h-screen bg-gradient-to-b from-[#00884A] to-[#37A264] p-10 w-[95%] 2xl:h-[40vh]'>
          <p className='text-white mb-4  text-[27px] font-bold'>Feedbacks Aprovados:</p>
          <Carousel
            responsive={responsive}
            centerMode
            infinite
            showDots={false}
            containerClass="carousel-container"
            itemClass="p-2 flex justify-center items-center"
          >
            {approvedReviews.map((approvedReview) => (
              <div
                key={approvedReview.id}
                className='bg-[#FFFBFB] shadow-custom-pink 2xl:h-[23vh] lg:h-[29vh] w-[97%] flex flex-col justify-between p-5 relative
          transform transition-transform duration-300 hover:scale-105'
              >
                <div className='flex justify-between items-start'>
                  <div className='w-[90%]'>
                    <h1 className='2xl:text-[18px] lg:text-[18px] font-semibold'>{approvedReview.nome}</h1>
                    <h2 className='2xl:text-[11px] lg:text-[10px] text-[#7D8389]'>{approvedReview.timestampp}</h2>
                  </div>
                  <div className='flex justify-end w-[6%]'>
                    <img className='w-9' src={seloMap[approvedReview.corEstrela]} alt="Selo correspondente" />
                  </div>
                </div>
                <div className='flex-1 mt-2'>
                  <p className='2xl:text-[16px] lg:text-[13px] text-start w-[80%]'>{approvedReview.comentario}</p>
                </div>
                <div>
                 <Stars corRegistrada={approvedReview?.corEstrela} quantidade={approvedReview?.estrela}/> {/* Componente de estrelas */}
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </div>

      {/* Modal de feedback */}
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={{ overlay: { backgroundColor: 'rgba(0, 0, 0, 0.75)' }, content: { top: '20%', left: '20%', right: '20%', bottom: '20%', backgroundColor: '#2E3033', color: 'white' } }}>
        {selectedReview && (
          <>
            {/* Informações do feedback no modal */}
            <h2 className="text-xl font-semibold mb-4">{selectedReview.nome}</h2>
            <p>{selectedReview.timestampp}</p>
            <p className="my-4">{selectedReview.comentario}</p>
            <div className="flex justify-between mt-4">
              <button onClick={handleAccept} className="bg-green-500 text-white px-4 py-2 rounded">Aceitar</button>
              <button onClick={handleReject} className="bg-red-500 text-white px-4 py-2 rounded">Rejeitar</button>
            </div>
          </>
        )}
      </Modal>

      {/* Mensagens de feedback */}
      {modalIsVisible && (
        <div className="fixed top-0 left-1/2 transform -translate-x-1/2 mt-10">
          <img src={check} alt="Feedback aprovado" className="w-16 h-16 animate-bounce" />
          <p className="text-green-500 font-bold">Feedback Aceito!</p>
        </div>
      )}
      {showRejectMessage && (
        <div className="fixed top-0 left-1/2 transform -translate-x-1/2 mt-10">
          <img src={rejected} alt="Feedback rejeitado" className="w-16 h-16 animate-bounce" />
          <p className="text-red-500 font-bold">Feedback Rejeitado!</p>
        </div>
      )}
    </>
  );
};

export default Feedbacks; // Exporta o componente Feedbacks
