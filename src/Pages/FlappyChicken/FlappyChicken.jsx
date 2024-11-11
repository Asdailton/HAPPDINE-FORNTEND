import React from 'react';
import { Link } from 'react-router-dom'; // Importe o Link


const Entretenimento = () => {
  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold mt-6">Entretenimento</h1>
      <div className="flex justify-center gap-4 mt-4 flex-wrap">

        <Link to="/entretenimento/flappybird/tela_inicial/chapeu">
          <button className="w-24 h-24 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition">
            Chapeu
          </button>
        </Link>

        <Link to="/entretenimento/flappybird/tela_inicial/grill">
          <button className="w-24 h-24 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition">
            Grill
          </button>
        </Link>

        <Link to="/entretenimento/flappybird/tela_inicial/clube">
          <button className="w-24 h-24 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition">
            Clube
          </button>
        </Link>
        
      </div>
    </div>
  );
};

export default Entretenimento;
