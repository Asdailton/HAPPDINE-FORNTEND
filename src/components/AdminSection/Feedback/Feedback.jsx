import React, { useState, useRef } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import eye from '../../../image/FeedbacksAdmin/eye.png';
import green from '../../../image/FeedbacksAdmin/green.png';
import blue from '../../../image/FeedbacksAdmin/blue.png';
import purple from '../../../image/FeedbacksAdmin/purple.png';
import preto from '../../../image/FeedbacksAdmin/preto.png';
import Modal from 'react-modal';
import rejected from '../../../image/FeedbacksAdmin/deletanimated.gif'
import check from '../../../image/FeedbacksAdmin/checkanimated.gif'



Modal.setAppElement('#root');

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1024 },
    items: 3.5,
    slidesToSlide: 1,
  },
  desktop: {
    breakpoint: { max: 1500, min: 768 },
    items: 2.2,
    slidesToSlide: 1,
  },
  tablet: {
    breakpoint: { max: 868, min: 464 },
    items: 1,
    slidesToSlide: 1,
  },
  mobile: {
    breakpoint: { max: 640, min: 0 },
    items: 0.2,
    slidesToSlide: 1,
  },
};

const reviews = [
  { id: 1, name: 'Caio Eduardo', identity: 'Colaborador', content: "O HAPPDINE mudou tudo, acredito que agora o restaurante está bem mais organizado, não há mais tantas filas como antes.." },
  { id: 2, name: 'jonatas', identity: 'Visitante', content: "esse aaaaaaaaauygyu ytfytfytfytfytfytfy   u uyguyguyguyguy uyguyguy uyg yguyguyguy ." },
  { id: 3, name: 'gilberto', identity: 'Visitante', content: "qro me mata." },
  { id: 4, name: 'agronegocio', identity: 'Colaborador', content: "mae tem cafe." },
  { id: 5, name: 'alguem me salva', identity: 'Visitante', content: "jair bolsonaro." },
];

const selos = [blue, purple, green, preto];

const getRandomSelo = () => {
  const randomIndex = Math.floor(Math.random() * selos.length);
  return selos[randomIndex];
};





const Feedbacks = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const [approvedReviews, setApprovedReviews] = useState([]);
  const [rejectedReviews, setRejectedReviews] = useState([]);

  const [modalIsVisible, setModalIsVisible] = useState(false); // so pro aceito 
  const [showRejectMessage, setShowRejectMessage] = useState(false); // so pro rejeitado

  const openModal = (review) => {
    setSelectedReview(review);
    setModalIsOpen(true);
  };

  

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedReview(null);
  };

  const handleAccept = () => {
    if (selectedReview) {
      setApprovedReviews((prev) => [...prev, selectedReview]);
      
      setModalIsVisible(true);
      
      setTimeout(() => {
        setModalIsVisible(false);
        setModalIsOpen(false);
      }, 1000);
    }
  };

  const handleReject = () => {
    if (selectedReview) {
    setRejectedReviews((prev) => [...prev, selectedReview]);
    
    setShowRejectMessage(true);
  
  
    setTimeout(() => {
      setShowRejectMessage(false)
      setModalIsOpen(false);
    }, 1500);
  }

  };
  


 
 const pendingReviews = reviews.filter(review => !approvedReviews.includes(review) && !rejectedReviews.includes(review));

  return (
    <>
      <div className="mb-8">


      <div className='w-[100%]  2xl:h-[45vh] lg:h-[53vh] flex justify-center items-center'>
  <div className='bg-[#2E3033] p-10 items-center w-[95%] 2xl:h-[40vh]'>
    <p className='text-white mb-4 font-bold'>Feedbacks:</p> 
    <Carousel
      responsive={responsive}
      centerMode={true}
      infinite={true}
      showDots={false}
      containerClass="carousel-container"
      itemClass="p-2 flex justify-center items-center mx-0"
      ariaHideApp={false}
    >
      {pendingReviews.map(review => (
        <div
          key={review.id}
          className="bg-[#FFFBFB] shadow-custom-pink 2xl:h-[23vh] lg:h-[29vh] w-[97%] flex flex-col justify-between p-5 relative
          transform transition-transform duration-300 hover:scale-105"
        >
          
          <div className="flex justify-between items-start">
            <div className="w-[90%]">
              <h1 className='2xl:text-[14px] lg:text-[11px] font-semibold'>{review.name}</h1>
              <h2 className='2xl:text-[11px] lg:text-[9px] text-[#7D8389]'>{review.identity}</h2>
            </div>
            <div className="flex justify-end w-[6%]">
              <img className="w-full" src={getRandomSelo()} alt="Selo" />
            </div>
          </div>

       
          <div className="flex-1 mt-2">
            <p className="2xl:text-[13px] lg:text-[10.5px] text-start w-[80%]">{review.content}</p>
          </div>

         
          <div className="absolute bottom-3 right-3 cursor-pointer" onClick={() => openModal(review)}>
            <img className='w-5 h-3' src={eye} alt="Eye icon" />
          </div>
        </div>
      ))}
    </Carousel>
  </div>
</div>

        
      </div>

    
      <div>
       
      <div className=' w-[100%]  2xl:h-[35vh] flex justify-center items-center'>
        <div className='bg-[#00884A] lg:p-10 lg:h-[52vh] items-center w-[95%] 2xl:h-[40vh]'>
          <p className='text-white  mb-4 font-bold'>Feedbacks aprovados:</p>
          <Carousel
          responsive={responsive}
          centerMode={true}
          arrows={false}
          infinite={true}
          showDots={false}
          containerClass="carousel-container"
          itemClass="p-2 flex justify-center items-center mx-0"
          
        >
          {approvedReviews.map(review => (
            <div
              key={review.id}
              className="bg-[#FFFBFB] shadow-custom-pink 2xl:h-[23vh] p-5 lg:h-[29vh] w-[97%] flex flex-col justify-between
              transform transition-transform duration-300 hover:scale-105"
            >
              <div className="flex  justify-between items-start">
                <div className="  w-[90%]">
                  <h1 className=' 2xl:text-[14px] lg:text-[11px] font-semibold'>{review.name}</h1>
                  <h2 className='2xl:text-[11px]  lg:text-[9px] text-[#7D8389]'>{review.identity}</h2>
                  <p className="2xl:text-[13px] lg:text-[11px] text-start w-[80%]">{review.content}</p>
                  
                </div>
                <div className="flex justify-end w-[6%]">
                  <img className="w-full" src={getRandomSelo()} alt="Selo" />
                </div>
              </div>
              
            </div>
          ))}
        </Carousel> 
      
        </div>
      </div>


        
      </div>

      {selectedReview && (
        <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="2xl:w-[30%] lg:w-[40%] w-[50%] bg-white flex flex-col p-5  mx-auto my-auto 2xl:h-[50%] lg:h-[55%] 
          focus:outline-none "
        overlayClassName="fixed inset-0 bg-black bg-opacity-30 flex"
      > 
      <div className='w-[7%] ml-[90%]  flex justify-center items-center '>
        <img className="w-[full]" src={getRandomSelo()} alt="Selo" />
    
      </div>
      <div className=' justify-center  flex flex-col w-[100%]'>
        
      
      <div className='w-[100%]  flex '>
        <p className='font-bold flex text-[25px] '>{selectedReview.name}</p>
     
            
      </div>
        
        <p className=' text-[#7D8389] '>{selectedReview.identity}</p>
        <div className='w-[100%]  mt-2  h-[60%]'>
          <div className=' lg:h-[15vh]'>
          <p className='2xl:text-[120%] lg:text-[100%]'>{selectedReview.content}</p>
          </div>
        
        </div>
       
      
      </div>
      
        
      <div className="flex font-bold  lg:mt-8 2xl:mt-20 gap-4 flex-wrap ">
          <button 
            onClick={handleAccept} 
            className="bg-[#00884A] text-white px-4 py-2 min-w-[120px]">
            Aprovar
            
          </button>

        {modalIsVisible && (
        <div className="fixed font-normal inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-12 lg:w-[40%] 2xl:w-[30%]  text-[86%] border border-gray-300 flex items-center justify-center">
            
            <p className="lg:mr-[30px]">Comentário aprovado com <strong>sucesso!</strong>

            </p>
            <img className='w-[10%]' src={check}>
            </img>
          
          </div>
        </div>
      )}

       

          <button 
            onClick={handleReject} 
            className="bg-[#2E3033] text-white px-10 py-2 min-w-[120px]">
            Descartar
          </button>
        </div>



       {showRejectMessage && (
      <div className="fixed font-normal inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-12 lg:w-[40%] 2xl:w-[30%] text-[86%] border border-gray-300 flex items-center justify-center">
          <p className="lg:mr-[30px]">Comentário rejeitado com <strong>sucesso!</strong></p>
          <img src={rejected} alt="Reject Icon" className='w-[10%]' />
        </div>
      </div>
    )}
            
      </Modal>
      
      )}

      <div className='border-b border-[#B2B9C0]  w-[100%] h-[30vh]'>
        
      </div>
    </>
  );
};

export default Feedbacks;
