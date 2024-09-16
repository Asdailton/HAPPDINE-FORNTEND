import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from '../Pages/Home/home.jsx'; 
import SobreNos from '../Pages/SobreNos/sobrenos'; 
import Entretenimento from '../Pages/Entretenimento/entretenimento'; 
import Graficos from '../Pages/Graficos/grafico'; 
import Cardapio from '../Pages/Cardapio/cardapio';

const AppRouter = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sobre-nos" element={<SobreNos />} />
      <Route path="/entretenimento" element={<Entretenimento />} />
      <Route path="/graficos" element={<Graficos />} />
      <Route path="/cardapio" element={<Cardapio/>} />


    </Routes>
  </Router>
);

export default AppRouter;
