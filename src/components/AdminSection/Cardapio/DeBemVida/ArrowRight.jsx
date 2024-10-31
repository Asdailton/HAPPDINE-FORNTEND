import setaDireta from '../../../../image/CardapioAdmin/arrowRight.svg';


// Componente de seta personalizada
const CustomRightArrow = ({ onClick }) => {
    return (
      <button
        onClick={onClick} // Chama a função onClick passada como prop
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-[#00884A] p-2 rounded-full shadow-lg"
        aria-label="Next Slide"
      >
        <img src={setaDireta} alt="Seta para a direita" className="w-6 h-6" />
      </button>
    );
  };

  export default CustomRightArrow