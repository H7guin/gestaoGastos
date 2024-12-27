import React, { useEffect, useState } from 'react'; // Importa React, hooks useEffect e useState
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts'; // Importa componentes do Recharts para criar gráficos
import './Resumo.css'; // Importa o arquivo CSS para estilização

const ResumoGastos = () => {
  const [gastos, setGastos] = useState([]); // Estado para armazenar os gastos
  const [chartSize, setChartSize] = useState({ width: 500, height: 500 }); // Estado para definir o tamanho do gráfico

  useEffect(() => {
    // Carrega os dados de gastos armazenados no localStorage
    setGastos(JSON.parse(localStorage.getItem('gastos')) || []); // Caso não haja dados, usa um array vazio
  }, []); // Executa apenas na montagem do componente

  useEffect(() => {
    // Ajusta dinamicamente o tamanho do gráfico com base no tamanho da janela
    const handleResize = () => {
      const width = Math.min(window.innerWidth * 0.55, 700);
      const height = Math.min(window.innerWidth * 0.8, 500);
      setChartSize({ width, height });
    };

    handleResize(); // Chama a função para ajustar o tamanho ao carregar o componente
    window.addEventListener('resize', handleResize); // Adiciona um listener para mudanças de tamanho na janela

    return () => {
      window.removeEventListener('resize', handleResize); // Remove o listener ao desmontar o componente
    };
  }, []); // Executa apenas na montagem e desmontagem do componente

  // Resumo dos gastos por categoria
  const resumoCategorias = gastos.reduce((acc, gasto) => {
    acc[gasto.categoria] = (acc[gasto.categoria] || 0) + gasto.valor; // Soma os valores de cada categoria
    return acc;
  }, {}); // Objeto vazio inicial

  // Transforma o resumo em um array adequado para o gráfico
  const dadosGrafico = Object.keys(resumoCategorias).map((key) => ({
    name: key, // Nome da categoria
    value: resumoCategorias[key], // Valor total da categoria
  }));

  // Define as cores para as fatias do gráfico
  const COLORS = ['#BEB8EB', '#5299D3', '#0B5563', '#5789A2', '#A2BCE0', '#5E5C6C'];

  return (
    <div className='grafico'>
      <h1 className='resumo'>Resumo de Gastos</h1> {/* Título da seção */}
      {/* Verifica se há dados no gráfico */}
      {dadosGrafico.length === 0 ? (
        <p className="mensagem">Nenhum gasto cadastrado. Adicione novos gastos para visualizar o gráfico.</p>
      ) : (
        <PieChart width={chartSize.width} height={chartSize.height}> {/* Configura o gráfico de pizza */}
          <Pie
            data={dadosGrafico} // Dados do gráfico
            dataKey="value" // Chave para o valor
            nameKey="name" // Chave para o nome
            cx="50%" // Posição horizontal do centro
            cy="50%" // Posição vertical do centro
            outerRadius={chartSize.width / 3.5} // Define o raio externo
            fill="#b51212" // Cor padrão de preenchimento
            label // Ativa os rótulos
          >
            {dadosGrafico.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} /> // Define a cor de cada fatia
            ))}
          </Pie>
          <Tooltip /> {/* Exibe informações ao passar o mouse */}
          <Legend /> {/* Exibe a legenda do gráfico */}
        </PieChart>
      )}
    </div>
  );
};

export default ResumoGastos; // Exporta o componente
