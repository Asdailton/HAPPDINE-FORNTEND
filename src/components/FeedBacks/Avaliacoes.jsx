import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import RatingComponent from './Stars.jsx'

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1024 },
    items: 2, 
    slidesToSlide: 1,
  },
  desktop: {
    breakpoint: { max: 1024, min: 768 },
    items: 2.6,
    slidesToSlide: 1,
  },
  tablet: {
    breakpoint: { max: 768, min: 464 },
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
  { id: 1, name:'Livia Almeida', identity:'Colaborador', content: "aii gostei horrores desse doce nossa q doce bom top 10 doces lindos icnriveis", img:'https://via.placeholder.com/150' },
  { id: 2, name:'Gui Sampaio', identity:'Visitante', content: "Review 2", img:'https://via.placeholder.com/150' },
  { id: 3, name:'Isa Rocha', identity:'Visitante', content: "Review 3", img:'https://via.placeholder.com/150'},
  { id: 4, name:'Isa Pereira', identity:'Colaborador', content: "Review 4", img:'https://via.placeholder.com/150'},
  { id: 5, name:'Adailton', identity:'Visitante', content: "Review 5", img:'https://via.placeholder.com/150' },
];

const Avaliacoes = () => {
    return (
      <Carousel
        responsive={responsive}
        centerMode={true}
        arrows={false}
        infinite={true}
        showDots={false}
        containerClass="carousel-container"
        itemClass="carousel-item p-2" 
       

      >
    
        {reviews.map(review => (
        
          <div
            key={review.id}
            className="bg-white p-8 mx-2 shadow-custom-pink min-h-[35vh] w-[90%] mt-[90px] flex flex-col "
          >
            
            <h1 className='text-lg font-semibold'>{review.name}</h1>
            <h2 className='text-md text-[14px] text-[#7D8389]'>{review.identity}</h2>
            <p className="text-sm text-center mt-2">{review.content}</p>
          
          </div>
        ))}

      </Carousel>
  
  );
};

export default Avaliacoes;
