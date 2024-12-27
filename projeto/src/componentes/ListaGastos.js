import React, { useEffect, useState } from 'react';
import { isSameWeek, parseISO } from 'date-fns';
import './Lista.css';

const ListaGastos = () => {
  const [gastos, setGastos] = useState([]);

  useEffect(() => {
    setGastos(JSON.parse(localStorage.getItem('gastos')) || []);
  }, []);

  const gastosSemana = gastos.filter((gasto) =>
    isSameWeek(parseISO(gasto.data), new Date())
  );

  const formatarData = (data) => {
    const [ano, mes, dia] = data.split('-');
    return `${dia} / ${mes} / ${ano}`;
  };

  return (
    <div className='lista'>
      <h1 className='listatitulo'>Lista de Gastos da Semana</h1>
      <ul>
        {gastosSemana.length > 0 ? (
          gastosSemana.map((gasto, index) => (
            <li key={index}>
              {formatarData(gasto.data)} - {gasto.categoria}: R$ {gasto.valor.toFixed(2)}{' '}
              {gasto.descricao && `(${gasto.descricao})`}
            </li>
          ))
        ) : (
          <p>Nenhum gasto registrado nesta semana.</p>
        )}
      </ul>
    </div>
  );
};

export default ListaGastos;
