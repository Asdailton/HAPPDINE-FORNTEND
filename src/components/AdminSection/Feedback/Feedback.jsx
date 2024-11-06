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

import setaDireta from '../../../image/CardapioAdmin/arrowRight.svg';
import StarsModal from './StarModal';


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
  const [carouselRef, setCarouselRef] = useState(null);

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
  
   // Função para formatar o dia da semana
   const formatarDiaSemana = (data) =>
    new Date(data).toLocaleDateString('pt-BR', { weekday: 'long' }).replace('.', '');

  // Função para formatar a data
  const formatarData = (data) =>
    new Date(data).toLocaleDateString('pt-BR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).replace(',', '');
  

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
        <p className="text-[34px] font-italicBold">#BatePapo</p>
        <hr className="border-t border-gray-300 dark:border-gray-600" style={{ width: '10%' }} />
      </div>

      {/* Seção de feedbacks pendentes */}
      <div className="w-[100%]  flex justify-center items-center mb-10">
        <div className="bg-gradient-to-r from-[#2E3033] to-[#4E5256] p-10 w-[95%]">
          <p className="text-white mb-4 font-bold text-[27px]">Feedbacks:</p>
          <Carousel
            responsive={responsive}
            centerMode
            infinite
            arrows={false} // Desativa as setas padrão
            ref={setCarouselRef}
            showDots={false}
            containerClass="carousel-container"
            itemClass="p-2 flex justify-center items-center"
          >
            {reviews.map((review) => (
              <div
                key={review.id}
                className="bg-[#FFFBFB] shadow-custom-pink 2xl:h-[23vh] lg:h-[29vh] w-[97%] flex flex-col justify-between p-5 relative
          transform transition-transform duration-300 hover:scale-105"
              >
                {/* Informações do feedback */}
                <div className="flex justify-between items-start">
                  <div className="w-[90%]">
                    <h1 className='2xl:text-[18px] lg:text-[18px] font-semibold'>{review.nome}</h1>
                    <p className='2xl:text-[11px] lg:text-[10px] text-[#7D8389]'>{`${formatarDiaSemana(review.timestampp)}, ${formatarData(review.timestampp)}`}</p>
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
      <div className='w-[100%]  flex justify-center items-center mb-10'>
        <div className=' bg-gradient-to-b from-[#00884A] to-[#37A264] p-10 w-[95%] '>
          <p className='text-white mb-4  text-[27px] font-bold'>Feedbacks Aprovados:</p>
          <Carousel
            responsive={responsive}
            centerMode
            infinite
            showDots={false}
            arrows={false} // Desativa as setas padrão
            ref={setCarouselRef}
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
                    <p className='2xl:text-[11px] lg:text-[10px] text-[#7D8389]'>{`${formatarDiaSemana(approvedReview.timestampp)}, ${formatarData(approvedReview.timestampp)}`}</p>
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
      <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          className="fixed inset-0 flex items-center justify-center p-4 z-50"
          overlayClassName="fixed inset-0 bg-gray-500 bg-opacity-75 z-40"
      >
          <div className="bg-white flex flex-col w-[600px] h-[500px] px-[40px] py-[60px] relative">
              {selectedReview && (
                  <>
                      {/* Informações do feedback no modal */}
                      <h2 className="text-[28px] font-bold">{selectedReview.nome}</h2>
                      <p className='text-[19px] text-[#7D8389]'>{`${formatarDiaSemana(selectedReview.timestampp)}, ${formatarData(selectedReview.timestampp)}`}</p>
                      <p className="mt-5 text-[24px] font-regular">{selectedReview.comentario}</p>
                      <div className="mt-6">
                          <StarsModal corRegistrada={selectedReview?.corEstrela} quantidade={selectedReview?.estrela} /> {/* Componente de estrelas */}
                      </div>

                      {/* Botões fixados no rodapé */}
                      <div className="absolute bottom-14 left-0 right-0 flex justify-start gap-3 px-8">
                        <button
                          onClick={handleAccept}
                          className="bg-[#00884A] text-white text-[24px] font-bold px-9 py-3 transition duration-300 ease-in-out transform hover:bg-[#006837]"
                        >
                          Aceitar
                        </button>
                        <button
                          onClick={handleReject}
                          className="bg-[#2E3033] text-white text-[24px] font-bold px-9 py-3 transition duration-300 ease-in-out transform hover:bg-[#1B1C1D]"
                        >
                          Descartar
                        </button>
                      </div>
                  </>
              )}
          </div>
      </Modal>


     {/* Modal de feedback aceito */}
      {modalIsVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-12 lg:w-[40%] 2xl:w-[30%] text-[86%] border border-gray-300 flex items-center justify-center">
            <p className="lg:mr-[30px] text-green-500 font-bold">Feedback aceito com <strong>sucesso!</strong></p>
            <img className="w-[10%]" src={check} alt="Feedback aprovado" />
          </div>
        </div>
      )}

      {/* Modal de feedback rejeitado */}
      {showRejectMessage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-12 lg:w-[40%] 2xl:w-[30%] text-[86%] border border-gray-300 flex items-center justify-center">
            <p className="lg:mr-[30px] text-red-500 font-bold">Feedback <strong>rejeitado!</strong></p>
            <img className="w-[10%]" src={rejected} alt="Feedback rejeitado" />
          </div>
        </div>
      )}
    </>
  );
};

export default Feedbacks; // Exporta o componente Feedbacks
