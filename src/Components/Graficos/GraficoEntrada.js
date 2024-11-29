import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
} from 'chart.js';

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip
);

const GraficoEntrada = ({ chartData }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.raw}`, // Mostra apenas o valor no tooltip
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ width: "100%", height: "100%", boxSizing: "border-box", padding: '20px', color: '#fff' }}>

      <div style={{ display: 'flex', alignItems: 'center', width: "100%", height: "100%" }}>
        <div style={{ flex: 1 }}>
          <Line data={chartData} options={options} />
        </div>

      </div>
    </div>
  );
};

export default GraficoEntrada;