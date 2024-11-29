import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import './PieChart.css'; // Arquivo de estilos para personalizar a posição dos elementos

ChartJS.register(ArcElement, Tooltip, Legend);

// Mapeia os IDs dos restaurantes para os seus nomes
const restaurantNames = {
  "01b80fce-bdf4-4bf2-9fa9-4d585e621be5": "Moda da Casa",
  "401efd9e-420e-4701-b6a9-103627e201cf": "Receita do Chefe",
  "05a45dbc-90ae-11ef-9011-641c67e37f95": "De Bem com a Vida",
  "71eebfe0-94a3-496b-99a9-b80d3fefd79c": "Grill e Bem-Esta",
};

// Função auxiliar para pegar o nome do dia da semana
const getDayOfWeek = (dateString) => {
  const date = new Date(dateString);
  const daysOfWeek = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
  return daysOfWeek[date.getDay()];
};

const PieChart = () => {
  const [chartData, setChartData] = useState(null);
  const [selectedDay, setSelectedDay] = useState('Segunda'); // Estado para o dia selecionado

  useEffect(() => {
    const fetchData = async () => {
      const today = new Date();
      // Ajusta a data para pegar a data correta com base no dia selecionado
      const date = new Date(today.setDate(today.getDate() - (today.getDay() - ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'].indexOf(selectedDay))));
      const formattedDate = date.toISOString().split('T')[0]; // Formato YYYY-MM-DD
      console.log("Data sendo requisitada:", formattedDate); // Mostra a data no console

      const response = await fetch(`http://localhost:8080/api/votos/${formattedDate}`);
      const data = await response.json();

      const votosPorRestaurante = {};

      // Conta os votos por restaurante
      data.forEach(([restauranteId, votos]) => {
        const restauranteNome = restaurantNames[restauranteId]; // Obtem o nome do restaurante
        if (restauranteNome) {
          votosPorRestaurante[restauranteNome] = votos;
        }
      });

      const restaurantes = Object.keys(votosPorRestaurante);
      const votos = Object.values(votosPorRestaurante);

      // Verifica se não há dados
      if (restaurantes.length === 0) {
        setChartData({
          labels: ['Nenhum Voto'],
          datasets: [
            {
              label: '# de Votos',
              data: [1], // Um valor para mostrar no gráfico
              backgroundColor: ['rgba(128, 128, 128, 1)'], // Cor cinza
              borderColor: ['rgba(128, 128, 128, 1)'],
              borderWidth: 1,
            },
          ],
        });
      } else {
        setChartData({
          labels: restaurantes,
          datasets: [
            {
              label: '# de Votos',
              data: votos,
              backgroundColor: [
                'rgba(0, 123, 192, 1)',
                'rgba(18, 129, 143, 1)',
                'rgba(197, 53, 188, 1)',
                'rgba(0, 136, 74, 1)',
              ],
              borderColor: [
                'rgba(0, 123, 192, 1)',
                'rgba(18, 129, 143, 1)',
                'rgba(197, 53, 188, 1)',
                'rgba(0, 136, 74, 1)',
              ],
              borderWidth: 1,
            },
          ],
        });
      }
    };

    fetchData();
  }, [selectedDay]); // O gráfico será atualizado sempre que o dia da semana for alterado

  const handleDayChange = (day) => {
    setSelectedDay(day); // Atualiza o estado com o dia selecionado
    console.log(day)
  };

  if (!chartData) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="chart-container">
      <div className="days-filter">
        {/* Botões para selecionar o dia da semana */}
        <button className={selectedDay === 'Segunda' ? 'active' : ''} onClick={() => handleDayChange('Segunda')}>
          SEGUNDA
        </button>
        <button className={selectedDay === 'Terça' ? 'active' : ''} onClick={() => handleDayChange('Terça')}>
          TERÇA
        </button>
        <button className={selectedDay === 'Quarta' ? 'active' : ''} onClick={() => handleDayChange('Quarta')}>
          QUARTA
        </button>
        <button className={selectedDay === 'Quinta' ? 'active' : ''} onClick={() => handleDayChange('Quinta')}>
          QUINTA
        </button>
        <button className={selectedDay === 'Sexta' ? 'active' : ''} onClick={() => handleDayChange('Sexta')}>
          SEXTA
        </button>
        <button className={selectedDay === 'Sábado' ? 'active' : ''} onClick={() => handleDayChange('Sábado')}>
          SÁBADO
        </button>
        <button className={selectedDay === 'Domingo' ? 'active' : ''} onClick={() => handleDayChange('Domingo')}>
          DOMINGO
        </button>
      </div>

      <div className="chart">
        <Pie 
          data={chartData} 
          width={600}  // Aumentando a largura do gráfico
          height={600}  // Aumentando a altura do gráfico
          options={{
            plugins: {
              legend: {
                position: 'right',  // Define a posição da legenda para a direita
                labels: {
                  usePointStyle: true, // Usa um estilo customizado ao invés do padrão (círculo)
                  pointStyle: 'rect', // Define o formato da cor como quadrado
                  boxWidth: 20,       // Largura do quadrado
                  boxHeight: 20,      // Altura do quadrado
                  padding: 35,        // Ajusta o espaçamento entre os itens da legenda
                },
              },
            },
            maintainAspectRatio: false, // Permite ajustar o tamanho do gráfico
          }}
        />
      </div>
      {chartData.labels[0] === 'Nenhum Voto' && <div>Nenhum voto ainda</div>} {/* Mensagem quando não há votos */}
    </div>
  );
};

export default PieChart;