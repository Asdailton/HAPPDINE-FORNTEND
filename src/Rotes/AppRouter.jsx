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

import HomeAdminPage from "../Pages/AdminSection/HomeAdminPage.jsx";
import { Inicial } from "../Pages/DineMatchPages/Inicial.jsx";
const AppRouter = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sobre-nos" element={<AboutPage />} />
      <Route path="/entretenimento" element={<Entretenimento />} />
      <Route path="/entretenimento/dine-match" element={<Inicial/>} />
      <Route path="/graficos" element={<Graficos />} />
      <Route path="/cardapio" element={<Cardapio/>} />

     
      <Route path="/admin/login" element={<LoginPage/>} />
      <Route path="/profile" element={<Profile/>} />
      <Route path="/admin/home" element={<HomeAdminPage/>}/>
      <Route path="/admin/cardapio" element={<CardapioPage/>} />
      <Route path="/admin/avisos" element={<AvisosPage/>} />
      <Route path="/admin/feedbacks" element={<FeedBackPage/>}/>
      

    </Routes>
  </Router>
);

export default AppRouter;
