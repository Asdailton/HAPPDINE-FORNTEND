import React, { useEffect, useRef, useState } from 'react';
import layoutGraficos from '../../image/Monitoramento/layoutGraficos1.jpg';
import icon_Moda_da_casa from '../../image/Monitoramento/icon_moda_da_casa.png';
import icon_de_bem_com_a_vida from '../../image/Monitoramento/icon_de_bem_com_a_vida.png';
import icon_grill from '../../image/Monitoramento/icon_grill.png';
import icon_receita_do_chefe from '../../image/Monitoramento/image/icon_receita_do_chefe.png';
import { Client } from '@stomp/stompjs';


const SOCKET_URL = "ws://localhost:8080/ws"

function LayoutGraphic() {
  const [apiData, setApiData] = useState({});

  let onConnected = () => {
    console.log("Connected!!")
    client.subscribe('/topic/monitoramento', async function (msg) {
      try{
        const messageBody = msg.body;
        const parsedMessage = JSON.parse(messageBody);
        await fetchData(parsedMessage.filaModel.localizacao)
      }catch(error){
        console.log(error)
      }
      
    });
  }

  let onDisconnected = () => {
    console.log("Disconnected!!")
  }

  const client = new Client({
    brokerURL: SOCKET_URL,
    reconnectDelay: 5000,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000,
    onConnect: onConnected,
    onDisconnect: onDisconnected
  });

  client.activate();	
  

  // Função para buscar dados da API com base no local
  const fetchData = async (location) => {
    try {
      const response = await fetch(`http://localhost:8080/api/monitoramento/ultimo/${location}`);
      const data = await response.json();
      console.log(data)
      setApiData((prevData) => ({ ...prevData, [location]: data }));
    } catch (error) {
      console.error('Erro ao buscar dados da API:', error);
    }
  };

  useEffect(() => {
    const locations = [
      'OesteSuperiorDireita',
      'OesteSuperiorEsquerda',
      'OesteInferiorDireita',
      'OesteInferiorEsquerda',
      'Central1Esquerda',
      'Central1Direita',
      'Central2Esquerda',
      'Central2Direita',
      'LesteSuperiorEsquerda',
      'LesteSuperiorDireita',
      'LesteInferiorEsquerda',
      'LesteInferiorDireita',
      'NorteSuperiorDireita',
      'NorteSuperiorEsquerda',
    ];
    const fetchData = async (location) => {
      try {
        const response = await fetch(`http://localhost:8080/api/monitoramento/ultimo/${location}`);
        const data = await response.json();
        setApiData((prevData) => ({ ...prevData, [location]: data }));
      } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
      }
    };

    locations.forEach((location) => {
      fetchData(location);
    });

    
  }, []);

  const getColorForLocation = (location) => {
    const data = apiData[location];
    if (data && data.situacao) {
      switch (data.situacao) {
        case 'VERDE':
          return 'rgba(0, 255, 0, 0.5)';
        case 'AMARELO':
          return 'rgba(255, 255, 0, 0.5)';
        case 'VERMELHO':
          return 'rgba(255, 0, 0, 0.5)';
        default:
          return 'rgba(0, 0, 0, 0.5)'; // Cor padrão
      }
    }
    return 'rgba(0, 0, 0, 0.5)'; // Cor padrão se não houver dados
  };

  

  const rectStyle = {
    position: 'absolute',
  };

  return (
    <div style={{ position: 'relative', width: '60%', marginLeft: '-50%', marginRight:'0%' }}>
      <img
        src={layoutGraficos}
        alt="Layout do Restaurante"
        style={{ width: '100%', height: 'auto' }}
      />
      <div className='Oeste_Superior'>
      <img
        src={icon_Moda_da_casa}
        alt="icon_Moda_da_casa"
        style={{
          ...rectStyle, 
          top: '32%',  
          left: '23%', 
          width: '4%', 
          height: 'auto', 
        }}
      />
      </div>

      {/* Oeste Superior Direita */}
      <div
        className='Oeste_Superior_Direita'
        style={{
          ...rectStyle,
          backgroundColor: getColorForLocation('OesteSuperiorDireita'),
          top: '30.2%',
          left: '5.3%',
          width: '16.8%',
          height: '4.4%',
        }}
      />

      {/* Oeste Superior Esquerda */}
      <div
        className='Oeste_Superior_Esquerda'
        style={{
          ...rectStyle,
          backgroundColor: getColorForLocation('OesteSuperiorEsquerda'),
          top: '36.4%',
          left: '5.3%',
          width: '16.8%',
          height: '4.4%',
        }}
      />
       <div className='Oeste_Inferior'>
      <img
        src={icon_Moda_da_casa}
        alt="icon_Moda_da_casa"
        style={{
          ...rectStyle, 
          top: '57%',  
          left: '23%', 
          width: '4%', 
          height: 'auto', 
        }}
      />
      </div>
      {/* Oeste Inferior Direita */}
      <div
        className='Oeste_Inferior_Direita'
        style={{
          ...rectStyle,
          backgroundColor: getColorForLocation('OesteInferiorDireita'),
          top: '55.5%',
          left: '5.4%',
          width: '16.9%',
          height: '4.4%',
        }}
      />

      {/* Oeste Inferior Esquerda */}
      <div
        className='Oeste_Inferior_Esquerda'
        style={{
          ...rectStyle,
          backgroundColor: getColorForLocation('OesteInferiorEsquerda'),
          top: '61.6%',
          left: '5.3%',
          width: '16.9%',
          height: '4.4%',
        }}
      />

       <div className='Centro1'>
      <img
        src={icon_Moda_da_casa}
        alt="icon_Moda_da_casa"
        style={{
          ...rectStyle, 
          top: '72%',  
          left: '37%', 
          width: '4%', 
          height: 'auto', 
        }}
      />
      </div>

      {/* Central 1 Esquerda */}
      <div
        className='Central1_Esquerda'
        style={{
          ...rectStyle,
          backgroundColor: getColorForLocation('Central1Esquerda'),
          top: '39%',
          left: '35.7%',
          width: '2.7%',
          height: '31.1%',
        }}
      />

      {/* Central 1 Direita */}
      <div
        className='Central1_Direita'
        style={{
          ...rectStyle,
          backgroundColor: getColorForLocation('Central1Direita'),
          top: '39.1%',
          left: '39.6%',
          width: '2.7%',
          height: '31.1%',
        }}
      />
       <div className='Centro2'>
      <img
        src={icon_de_bem_com_a_vida}
        alt="icon_de_bem_com_a_vida"
        style={{
          ...rectStyle, 
          top: '72%',  
          left: '59.5%', 
          width: '4%', 
          height: 'auto', 
        }}
      />
      </div>
      

      {/* Central 2 Esquerda */}
      <div
        className='Central2_Esquerda'
        style={{
          ...rectStyle,
          backgroundColor: getColorForLocation('Central2Esquerda'),
          top: '39.6%',
          left: '58.05%',
          width: '2.6%',
          height: '31%',
        }}
      />

      {/* Central 2 Direita */}
      <div
        className='Central2_Direita'
        style={{
          ...rectStyle,
          backgroundColor: getColorForLocation('Central2Direita'),
          top: '39.5%',
          left: '61.8%',
          width: '2.6%',
          height: '31%',
        }}
      />
      <div className='Leste_Superior'>
      <img
        src={icon_grill}
        alt="icon_icon_grill"
        style={{
          ...rectStyle, 
          top: '32.5%',  
          left: '94%', 
          width: '4%', 
          height: 'auto', 
        }}
      />
      </div>

      {/* Leste Superior Esquerda */}
      <div
        className='Leste_Superior_Esquerda'
        style={{
          ...rectStyle,
          backgroundColor: getColorForLocation('LesteSuperiorEsquerda'),
          top: '36.8%',
          left: '76.3%',
          width: '16.8%',
          height: '4.3%',
        }}
      />

      {/* Leste Superior Direita */}
      <div
        className='Leste_Superior_Direita'
        style={{
          ...rectStyle,
          backgroundColor: getColorForLocation('LesteSuperiorDireita'),
          top: '30.8%',
          left: '76.3%',
          width: '16.8%',
          height: '4.3%',
        }}
      />
      <div className='Leste_Inferior'>
      <img
        src={icon_receita_do_chefe}
        alt="icon_receita_do_chefe"
        style={{
          ...rectStyle, 
          top: '57.3%',  
          left: '73.4%', 
          width: '4%', 
          height: 'auto', 
        }}
      />
      </div>

      {/* Leste Inferior Esquerda */}
      <div
        className='Leste_Inferior_Esquerda'
        style={{
          ...rectStyle,
          backgroundColor: getColorForLocation('LesteInferiorEsquerda'),
          top: '56%',
          left: '78.2%',
          width: '17%',
          height: '4.4%',
        }}
      />

      {/* Leste Inferior Direita */}
      <div
        className='Leste_Inferior_Direita'
        style={{
          ...rectStyle,
          backgroundColor: getColorForLocation('LesteInferiorDireita'),
          top: '62%',
          left: '78.2%',
          width: '17%',
          height: '4.4%',
        }}
      />
      <div className='Norte_Superior'>
      <img
        src={icon_grill}
        alt="icon_grill"
        style={{
          ...rectStyle, 
          top: '7.4%',  
          left: '60%', 
          width: '4%', 
          height: 'auto', 
        }}
      />
      </div>

      {/* Norte Superior Direita */}
      <div
        className='Norte_Superior_Direita'
        style={{
          ...rectStyle,
          backgroundColor: getColorForLocation('NorteSuperiorDireita'),
          top: '6%',
          left: '40.9%',
          width: '18.2%',
          height: '4.4%',
        }}
      />

      {/* Norte Superior Esquerda */}
      <div
        className='Norte_Superior_Esquerda'
        style={{
          ...rectStyle,
          backgroundColor: getColorForLocation('NorteSuperiorDireita'),
          top: '12%',
          left: '40.9%',
          width: '18.2%',
          height: '4.4%',
        }}
      />
      
      
    </div>
    
  );
}

export default LayoutGraphic;