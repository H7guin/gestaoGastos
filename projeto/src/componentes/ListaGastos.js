import React, { useEffect, useState } from 'react'; // Importa React e os hooks useEffect e useState
import { isSameWeek, parseISO } from 'date-fns'; // Importa funções de manipulação de datas do date-fns
import './Lista.css'; // Importa o CSS para estilização

const ListaGastos = () => {
  const [gastos, setGastos] = useState([]); // Estado para armazenar os gastos

  useEffect(() => {
    // Carrega os dados de gastos armazenados no localStorage
    setGastos(JSON.parse(localStorage.getItem('gastos')) || []); // Usa um array vazio como valor padrão
  }, []); // Executa apenas na montagem do componente

  // Filtra os gastos que ocorreram na semana atual
  const gastosSemana = gastos.filter((gasto) =>
    isSameWeek(parseISO(gasto.data), new Date()) // Verifica se a data do gasto pertence à semana atual
  );

  // Formata a data no formato DD / MM / AAAA
  const formatarData = (data) => {
    const [ano, mes, dia] = data.split('-'); // Divide a string de data no formato AAAA-MM-DD
    return `${dia} / ${mes} / ${ano}`; // Retorna a data formatada
  };

  return (
    <div className='lista'>
      <h1 className='listatitulo'>Lista de Gastos da Semana</h1> {/* Título da lista */}
      <ul>
        {gastosSemana.length > 0 ? ( // Verifica se há gastos na semana atual
          gastosSemana.map((gasto, index) => (
            <li key={index}> {/* Cada gasto é exibido como um item da lista */}
              {formatarData(gasto.data)} - {gasto.categoria}: R$ {gasto.valor.toFixed(2)}{' '}
              {gasto.descricao && `(${gasto.descricao})`} {/* Adiciona descrição se existir */}
            </li>
          ))
        ) : (
          <p>Nenhum gasto registrado nesta semana. Adicione gastos dessa semana para visualizar a lista</p> // Mensagem para o caso de não haver gastos
        )}
      </ul>
    </div>
  );
};

export default ListaGastos; // Exporta o componente
