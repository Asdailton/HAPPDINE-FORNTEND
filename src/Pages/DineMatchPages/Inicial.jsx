import {ConteudoInicio} from "../../components/DineMatch/ConteudoInicio";
import { Outlet } from 'react-router-dom';
import { Jogo } from '../../components/DineMatch/Jogo';
import Footer from "../../components/Footer/footer";
import Navbar from "../../components/Navbar/Navbar";

export function Inicial() {

  return (
    <div>
      <Navbar/>
      {/* Componente do Banner responsivo */}
      <ConteudoInicio></ConteudoInicio>
      {/* Componente com todo o jogo */}
      <Jogo></Jogo>
      <Footer/>
      <Outlet/>
    </div>
  )
}


