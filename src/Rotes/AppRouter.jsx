import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import  Home  from '../Pages/Home/home.jsx'; 
import AboutPage from "../Pages/SobreNos/AboutPage.jsx";
import Entretenimento from '../Pages/Entretenimento/entretenimento'; 
import Graficos from '../Pages/Graficos/grafico'; 
import Cardapio from '../Pages/Cardapio/cardapio';
import CardapioPage from "../Pages/AdminSection/CardapioPage.jsx";
import  AvisosPage  from "../Pages/AdminSection/AvisosPage.jsx";
import FeedBackPage from "../Pages/AdminSection/FeedBackPage.jsx";
import LoginPage from "../Pages/AdminSection/LoginPage/LoginPage.jsx";
import Profile from "../Pages/AdminSection/LoginPage/Profile.jsx";
import Tutorial from "../Pages/FlappyChicken/Tutorial/Tutorial.jsx";
import HomeAdminPage from "../Pages/AdminSection/HomeAdminPage.jsx";
import { Inicial } from "../Pages/DineMatchPages/Inicial.jsx";
import FlappyChicken from "../Pages/FlappyChicken/FlappyChicken.jsx";
import CenarioFase from "../Pages/FlappyChicken/Cenarios/Cenariofase.jsx";
import Clube from "../Pages/FlappyChicken/Cenarios/FlappyChickenClube.jsx";
import Chapeu from "../Pages/FlappyChicken/Cenarios/FlappyChickenChapeu.jsx";
import Grill from "../Pages/FlappyChicken/Cenarios/FlappyChickenGrill.jsx";

const AppRouter = () => (
  <Router>
    <Routes>
      {/*Seção user*/}
      <Route path="/" element={<Home />} />
      <Route path="/sobre-nos" element={<AboutPage />} />
      <Route path="/entretenimento" element={<Entretenimento />} />
      <Route path="/entretenimento/dine-match" element={<Inicial/>} />

      {/*Rotas do Jogo FlappyChicken */}
      <Route path="/entretenimento/flappybird/tela_inicial" element={<FlappyChicken/>}/>
      <Route path="/entretenimento/flappybird/tela_inicial/tutorial" element={<Tutorial/>} />
      <Route path="/entretenimento/flappybird/tela_inicial/tutorial/selecaofase" element={<CenarioFase/>} />
      <Route path="/entretenimento/flappybird/tela_inicial/tutorial/selecaofase/clube" element={<Clube/>} />
      <Route path="/entretenimento/flappybird/tela_inicial/tutorial/selecaofase/chapeu" element={<Chapeu/>} />
      <Route path="/entretenimento/flappybird/tela_inicial/tutorial/selecaofase/grill" element={<Grill/>} />

      <Route path="/graficos" element={<Graficos />} />
      <Route path="/cardapio" element={<Cardapio/>} />
      
     
      
      {/*Seção admin*/}
      <Route path="/admin/login" element={<LoginPage/>} />
      <Route path="/admin/home" element={<HomeAdminPage/>}/>
      <Route path="/admin/cardapio" element={<CardapioPage/>} />
      <Route path="/admin/avisos" element={<AvisosPage/>} />
      <Route path="/admin/feedbacks" element={<FeedBackPage/>}/>
      

    </Routes>
  </Router>
);

export default AppRouter;
