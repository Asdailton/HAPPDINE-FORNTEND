import { useEffect, useState, useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { UserData } from '../../Data.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function BarChart({ selectedDay, setSelectedDay }) {
  const chartRef = useRef(null);

  const filterByDayOfWeek = (data, dayOfWeek) => {
    return data.filter((entry) => {
      const date = new Date(entry.datetime);
      return date.getDay() === dayOfWeek;
    });
  };

  const calculateRealQuantidade = (data) => {
    const groupedData = {};

    data.forEach((entry) => {
      const [datePart, timePart] = entry.datetime.split(' ');
      const [hour, minute] = timePart.split(':');
      const roundedMinute = Math.floor(minute / 10) * 10;
      const timeKey = `${hour}:${roundedMinute.toString().padStart(2, '0')}`;

      if (!groupedData[timeKey]) {
        groupedData[timeKey] = { totalQuantidade: 0, count: 0 };
      }

      groupedData[timeKey].totalQuantidade += entry.quantidade;
      groupedData[timeKey].count += 1;
    });

    const resultData = Object.keys(groupedData).map((timeKey) => {
      const avgQuantidade = groupedData[timeKey].totalQuantidade / groupedData[timeKey].count;
      return {
        datetime: timeKey,
        quantidade: avgQuantidade,
      };
    });

    return resultData;
  };

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [{
      label: "Quantidade de Pessoas nas Filas",
      data: [],
      backgroundColor: [],
      borderColor: 'transparent',
      borderRadius: 50,
    }]
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const filteredData = filterByDayOfWeek(UserData, selectedDay);
      const realData = calculateRealQuantidade(filteredData);

      const chart = chartRef.current;
      const ctx = chart?.ctx;

      if (ctx) {
        const gradientColors = realData.map(() => {
          const gradient = ctx.createLinearGradient(0, 0, 0, 400);
          gradient.addColorStop(0, 'rgba(125,131,137,1)');
          gradient.addColorStop(1, 'rgba(46,48,51,1)');
          return gradient;
        });

        setChartData({
          labels: realData.map((data) => data.datetime),
          datasets: [{
            label: "Quantidade de Pessoas nas Filas",
            data: realData.map((data) => data.quantidade),
            backgroundColor: gradientColors,
            borderColor: 'transparent',
            borderRadius: 5,
          }]
        });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [selectedDay]);

  const chartOptions = {
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
        text: 'Quantidade de Pessoas nas Filas x Horário',
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          maxRotation: 0,
          minRotation: 0,
          autoSkip: false,
        },
      },
      y: {
        grid: {
          display: true,
        },
        beginAtZero: true,
      }
    },
    layout: {
      backgroundColor: '#2e2e2e',
    },
  };

  const daysOfWeek = [
    { value: 0, label: 'DOM' },  
    { value: 1, label: 'SEG' },
    { value: 2, label: 'TER' },
    { value: 3, label: 'QUA' },
    { value: 4, label: 'QUI' },
    { value: 5, label: 'SEX' },
    { value: 6, label: 'SAB' },
  ];

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '20px',
      }}>
        {daysOfWeek.map((day) => (
          <div
            key={day.value}
            style={{
              margin: '0 10px',
              padding: '10px 15px 3px 15px',
              cursor: 'pointer',
              backgroundColor: 'transparent',
              color: '#333',
              fontWeight: 'normal',
              position: 'relative',
            }}
            onClick={() => setSelectedDay(day.value)}
          >
            <span
              style={{
                display: 'inline-block',
                borderBottom: selectedDay === day.value ? '2px solid #333' : '2px solid transparent',
                width: '100%', // Ajuste o tamanho da linha para ser menor que o texto
                transition: 'border-bottom 0.3s ease',
              }}
            >
              {day.label}
            </span>
          </div>
        ))}
      </div>
      <div style={{ width: '130%', margin: '0 auto' }}>
        <Bar ref={chartRef} data={chartData} options={chartOptions} />
      </div>
    </div>
  );
  
  
}

export default BarChart;