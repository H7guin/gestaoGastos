import React, { useState } from 'react';
import './Cadastro.css'
const CadastroGastos = () => {
  const [gastos, setGastos] = useState(() => JSON.parse(localStorage.getItem('gastos')) || []);
  const [novoGasto, setNovoGasto] = useState({ valor: '', categoria: '', descricao: '', data: '' });

  const handleAddGasto = (e) => {
    e.preventDefault();
    if (novoGasto.valor && novoGasto.data) {
      const novosGastos = [...gastos, { ...novoGasto, valor: parseFloat(novoGasto.valor) }];
      setGastos(novosGastos);
      localStorage.setItem('gastos', JSON.stringify(novosGastos));
      setNovoGasto({ valor: '', categoria: '', descricao: '', data: '' });
    }
    else {
      alert('Preencha todos os campos obrigatórios')
    }
  };

  const handleClearLocalStorage = () => {
    localStorage.removeItem('gastos');
    setGastos([]);
    alert('Os dados foram limpos!');
  };

  return (
    <div className='cadastro'>
      <h1 className='titulo'>Cadastrar Gasto</h1>
      <form onSubmit={handleAddGasto}>
        <div className='valor'>
          <input
            type="number"
            placeholder="Valor"
            value={novoGasto.valor}
            onChange={(e) => setNovoGasto({ ...novoGasto, valor: e.target.value })}
            required
          />
        </div>
        <div className='data'>
          <input
            type="date"
            value={novoGasto.data}
            placeholder='Data'
            onChange={(e) => setNovoGasto({ ...novoGasto, data: e.target.value })}
            required
          />
        </div>
        <select
          value={novoGasto.categoria}
          onChange={(e) => setNovoGasto({ ...novoGasto, categoria: e.target.value })}
          required
        >
          <option value="" hidden>Escolha uma categoria</option>
          <option value="Alimentação">Alimentação</option>
          <option value="Internet">Internet</option>
          <option value="Transporte">Transporte</option>
          <option value="Vestuário">Vestuário</option>
          <option value="Lazer">Lazer</option>
          <option value="Outros">Outros</option>
        </select>
        <div className='descricao'>
          <textarea
            placeholder="Descrição (opcional)"
            value={novoGasto.descricao}
            onChange={(e) => setNovoGasto({ ...novoGasto, descricao: e.target.value })}
          />
        </div>
        <button type="submit">Adicionar Gasto</button>
        <button type="button" onClick={handleClearLocalStorage}>Limpar Gastos Cadastrados</button>
      </form>
    </div>
  );
};

export default CadastroGastos;
