import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import './Resumo.css';

const ResumoGastos = () => {
  const [gastos, setGastos] = useState([]);
  const [chartSize, setChartSize] = useState({ width: 500, height: 500 });

  useEffect(() => {
    // Carregar os dados dos gastos do localStorage
    setGastos(JSON.parse(localStorage.getItem('gastos')) || []);
  }, []);

  useEffect(() => {
    // Função para ajustar o tamanho do gráfico dinamicamente
    const handleResize = () => {
      const width = Math.min(window.innerWidth * 0.55, 700);
      const height = Math.min(window.innerWidth * 0.8, 500);
      setChartSize({ width, height });
    };

    handleResize(); // Ajustar o tamanho ao carregar o componente
    window.addEventListener('resize', handleResize); // Ajustar o tamanho ao redimensionar a janela

    return () => {
      window.removeEventListener('resize', handleResize); // Limpar o listener ao desmontar
    };
  }, []);

  const resumoCategorias = gastos.reduce((acc, gasto) => {
    acc[gasto.categoria] = (acc[gasto.categoria] || 0) + gasto.valor;
    return acc;
  }, {});

  const dadosGrafico = Object.keys(resumoCategorias).map((key) => ({
    name: key,
    value: resumoCategorias[key],
  }));

  const COLORS = ['#BEB8EB', '#5299D3', '#0B5563', '#5789A2', '#A2BCE0', '#5E5C6C'];

  return (
    <div className='grafico'>
      <h1 className='resumo'>Resumo de Gastos</h1>
      <PieChart width={chartSize.width} height={chartSize.height}>
        <Pie
          data={dadosGrafico}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={chartSize.width / 3.5}
          fill="#BEB8EB"
          label
        >
          {dadosGrafico.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend/>
      </PieChart>
    </div>
  );
};

export default ResumoGastos;
