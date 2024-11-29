import React, { useEffect, useState } from 'react';
import layoutGraficos from '../../image/Monitoramento/layoutGraficos1.jpg';
import edit_grill from '../../image/Monitoramento/edit_grill.png';
import edit_de_bem_com_vida from '../../image/Monitoramento/edit_de_bem_com_vida.png';
import edit_moda from '../../image/Monitoramento/edit_moda.png';
import edit_receita_chefe from '../../image/Monitoramento/edit_receita_chefe.png';
import chefe from '../../image/Cardapio/chefe.png';
import Folha from '../../image/Cardapio/Folha.png';
import Grill from '../../image/Cardapio/Grill.png';
import Panela from '../../image/Cardapio/Panela.png';
import check from '../../image/Monitoramento/animated_ic_checkmark_green.gif';

// Define posições para cada localização
const getPosition = (location) => {
  switch (location) {
    case 'OesteSuperior':
      return { top: '30.8%', left: '11.5%', width: '2.8%' };
    case 'OesteInferiorEsquerda':
      return { top: '56%', left: '11.5%', width: '2.8%' };
    case 'Central1':
      return { top: '71.6%', left: '18.2%', width: '2.8%' };
    case 'Central2':
      return { top: '72.7%', left: '29%', width: '3.2%' };
    case 'LesteSuperior':
      return { top: '31.9%', left: '47%', width: '2.4%' };
    case 'LesteInferior':
      return { top: '57%', left: '35.6%', width: '2.9%' };
    case 'Norte':
      return { top: '6.7%', left: '30%', width: '2.5%' };
    default:
      return { top: '0%', left: '0%', width: '2.5%' };
  }
};

function LayoutGraphicEdit() {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [isSavePopupOpen, setIsSavePopupOpen] = useState(false);
  const [restaurantData, setRestaurantData] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  // Carregar dados das filas do restaurante
  useEffect(() => {
    fetch('http://localhost:8080/api/fila')
      .then((response) => response.json())
      .then((data) => setRestaurantData(data))
      .catch((error) => console.error('Erro ao buscar dados:', error));
  }, []);

  // Definição das opções de restaurantes
  const restaurantOptions = [
    {
      id_restaurante: '01b80fce-bdf4-4bf2-9fa9-4d585e621be5',
      nome: 'Moda da Casa',
      descricao: 'Descrição moda da casa',
      infoRestauranteModel: {
        idInformacoesRestaurante: '01b80fce-bdf4-4bf2-9fa9-4d585e621be5',
        horarioFuncionamento: '10:30 - 13:30',
        refeicoesOferecidas: 'Moda da casa',
        localizacao: 'Oeste Inferior Esquerda',
      },
    },
    {
      id_restaurante: '05a45dbc-90ae-11ef-9011-641c67e37f95',
      nome: 'De Bem com a Vida',
      descricao: 'Comida saudável',
      infoRestauranteModel: {
        idInformacoesRestaurante: '05a45dbc-90ae-11ef-9011-641c67e37f95',
        horarioFuncionamento: '10:30 - 13:30',
        refeicoesOferecidas: 'Comida saudável',
        localizacao: 'Oeste Inferior Esquerda',
      },
    },
    {
      id_restaurante: '401efd9e-420e-4701-b6a9-103627e201cf',
      nome: 'Receita do Chefe',
      descricao: 'Descrição receita do chefe',
      infoRestauranteModel: {
        idInformacoesRestaurante: '401efd9e-420e-4701-b6a9-103627e201cf',
        horarioFuncionamento: '10:30 - 13:30',
        refeicoesOferecidas: 'Receitas especiais',
        localizacao: 'Oeste Inferior Esquerda',
      },
    },
    {
      id_restaurante: '71eebfe0-94a3-496b-99a9-b80d3fefd79c',
      nome: 'Grill e Bem-Estar',
      descricao: 'Descrição grill e bem estar',
      infoRestauranteModel: {
        idInformacoesRestaurante: '71eebfe0-94a3-496b-99a9-b80d3fefd79c',
        horarioFuncionamento: '10:30 - 13:30',
        refeicoesOferecidas: 'Grill saudável',
        localizacao: 'Oeste Inferior Esquerda',
      },
    },
  ];

  // Função para obter a imagem correspondente ao restaurante
  const getRestaurantImage = (name) => {
    switch (name) {
      case 'Moda da Casa':
        return edit_moda;
      case 'Grill e Bem-Estar':
        return edit_grill;
      case 'Receita do Chefe':
        return edit_receita_chefe;
      case 'De Bem com a Vida':
        return edit_de_bem_com_vida;
      default:
        return null;
    }
  };

  // Manipulador de clique na imagem do restaurante no layout
  const handleImageClick = (restaurant) => {
    setSelectedLocation(restaurant);
    setSelectedRestaurant(null); // Resetar a seleção anterior
    setPopupOpen(true);
  };

  // Manipulador de seleção do restaurante no popup
  const handleRestaurantSelect = (restaurant) => {
    setSelectedRestaurant(restaurant);
  };

  // Manipulador de clique no botão "Salvar"
  const handleSaveClick = () => {
    if (selectedLocation && selectedRestaurant) {
      const locationId = selectedLocation.id;
      const payload = {
        localizacao: selectedLocation.localizacao,
        restauranteIdModel: {
          id_restaurante: selectedRestaurant.id_restaurante,
          nome: selectedRestaurant.nome,
          descricao: selectedRestaurant.descricao,
          infoRestauranteModel: {
            idInformacoesRestaurante: selectedRestaurant.infoRestauranteModel.idInformacoesRestaurante,
            horarioFuncionamento: selectedRestaurant.infoRestauranteModel.horarioFuncionamento,
            refeicoesOferecidas: selectedRestaurant.infoRestauranteModel.refeicoesOferecidas,
            localizacao: selectedRestaurant.infoRestauranteModel.localizacao,
          },
        },
        id: locationId,
        ativado: true,
      };

      console.log('Payload a ser enviado:', payload);

      fetch(`http://localhost:8080/api/fila/${locationId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })
        .then((response) => {
          if (response.ok) {
            setIsSavePopupOpen(true);
            setTimeout(() => {
              setIsSavePopupOpen(false);
              setPopupOpen(false);
            }, 3000);
          } else {
            console.error('Falha ao salvar os dados.');
          }
        })
        .catch((error) => console.error('Erro ao salvar os dados:', error));
    } else {
      alert('Por favor, selecione um restaurante antes de salvar.');
    }
  };

  // Função para determinar o estilo do botão no popup
  const getButtonStyle = (restaurant) => ({
    width: '245px',
    height: '85px',
    backgroundColor:
      selectedRestaurant?.id_restaurante === restaurant.id_restaurante
        ? '#555555' // Cor para o botão selecionado
        : getDefaultButtonColor(restaurant.nome),
    textAlign: 'center',
    padding: '10px',
    marginRight: '10px',
    color: '#FFFFFF',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    border: 'none',
    
  });

  // Função para obter a cor padrão do botão com base no nome do restaurante
  const getDefaultButtonColor = (name) => {
    switch (name) {
      case 'Moda da Casa':
        return '#007BC0';
      case 'De Bem com a Vida':
        return '#219557';
      case 'Receita do Chefe':
        return '#12818F';
      case 'Grill e Bem-Estar':
        return '#9E2896';
      default:
        return '#333333';
    }
  };

  return (
    <div style={{ position: 'relative', display: 'inline-block', width: '4x10%' }}>
      <img src={layoutGraficos} alt="Layout do Restaurante" style={{ width: '50%', height: 'auto' }} />

      {/* Renderizar as imagens dos restaurantes no layout */}
      {restaurantData.map((restaurant) => {
        const position = getPosition(restaurant.localizacao);
        const restaurantImage = getRestaurantImage(restaurant.restauranteIdModel.nome);

        if (!restaurantImage || (position.top === '0%' && position.left === '0%')) {
          return null;
        }

        return (
          <div key={restaurant.id}>
            <img
              src={restaurantImage}
              alt={restaurant.restauranteIdModel.nome}
              style={{
                position: 'absolute',
                top: position.top,
                left: position.left,
                width: position.width,
                height: 'auto',
                cursor: 'pointer',
              }}
              onClick={() => handleImageClick(restaurant)}
            />
          </div>
        );
      })}

      {/* Popup de seleção de restaurante */}
      {isPopupOpen && (
        <div style={popupStyle}>
          <h1 style={popupHeadingStyle}>Selecione um Restaurante:</h1>
          <div style={popupButtonsContainer}>
            {restaurantOptions.map((restaurant) => (
              <div
                key={restaurant.id_restaurante}
                style={getButtonStyle(restaurant)}
                onClick={() => handleRestaurantSelect(restaurant)}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <img
                    src={
                      restaurant.nome === 'Moda da Casa'
                        ? Panela
                        : restaurant.nome === 'De Bem com a Vida'
                        ? Folha
                        : restaurant.nome === 'Receita do Chefe'
                        ? chefe
                        : Grill
                    }
                    alt={restaurant.nome}
                    style={{ width: '20%', height: 'auto' }}
                  />
                  <span>{restaurant.nome}</span>
                </div>
              </div>
            ))}
          </div>
          <div style={closeButtonContainer}>
            <button style={closeButtonStyle} onClick={handleSaveClick}>
              Salvar
            </button>
          </div>
        </div>
      )}

      {/* Popup de confirmação de salvamento */}
      {isSavePopupOpen && (
        <div style={savePopupStyle}>
          <p>Salvo com sucesso!</p>
          <img src={check} alt="check" style={{ width: '43px' }} />
        </div>
      )}
    </div>
  );
}

// Estilos dos popups e botões
const popupStyle = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: 'white',
  height: '40vh',
  width: '120vh',
  padding: '5vh',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
};
const popupHeadingStyle = {
  fontSize: '19.65px',
  color: '#333',
  marginTop: '1%',
  textAlign: 'center',
  marginBottom: '20px',
  fontWeight: 'bold',
  fontFamily: 'Arial, sans-serif',
};

const popupButtonsContainer = {
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  marginBottom: '20px',
};
const closeButtonContainer = {
  display: 'flex',
  justifyContent: 'center',
  marginTop: '20px',
};
const closeButtonStyle = {
  backgroundColor: '#000',
  color: '#FFF',
  border: 'none',
  padding: '10px 20px',
  cursor: 'pointer',
  fontSize: '16px',
  
};

const savePopupStyle = {
  position: 'fixed',
  top: '45%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: 'white',
  color: 'black',
  padding: '10px',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
  fontSize: '20px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '10px',
  width: '552px',
  height: '141px',
};     

export default LayoutGraphicEdit;