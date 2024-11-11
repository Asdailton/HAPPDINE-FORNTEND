import {ConteudoInicio} from "../../components/DineMatch/ConteudoInicio";
import { Outlet } from 'react-router-dom';
import { Jogo } from '../../components/DineMatch/Jogo';

export function Inicial() {

  return (
    <div>
      {/* Componente do Banner responsivo */}
      <ConteudoInicio></ConteudoInicio>
      {/* Componente com todo o jogo */}
      <Jogo></Jogo>
      <Outlet/>
    </div>
  )
}


