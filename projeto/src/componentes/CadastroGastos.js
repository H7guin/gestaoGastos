import React, { useState } from 'react'; // Importa React e o hook useState
import './Cadastro.css'; // Importa o arquivo CSS para estilização

const CadastroGastos = () => {
  // Estado para armazenar os gastos, inicializado com dados do localStorage ou um array vazio
  const [gastos, setGastos] = useState(() => JSON.parse(localStorage.getItem('gastos')) || []);

  // Estado para armazenar os dados de um novo gasto que está sendo adicionado
  const [novoGasto, setNovoGasto] = useState({ valor: '', categoria: '', descricao: '', data: '' });

  // Função chamada ao enviar o formulário para adicionar um novo gasto
  const handleAddGasto = (e) => {
    e.preventDefault(); // Previne o comportamento padrão de envio do formulário
    if (novoGasto.valor && novoGasto.data) { // Verifica se os campos obrigatórios estão preenchidos
      // Cria um novo array de gastos com o gasto atual adicionado
      const novosGastos = [...gastos, { ...novoGasto, valor: parseFloat(novoGasto.valor) }];
      setGastos(novosGastos); // Atualiza o estado com o novo array de gastos
      localStorage.setItem('gastos', JSON.stringify(novosGastos)); // Salva os dados atualizados no localStorage
      setNovoGasto({ valor: '', categoria: '', descricao: '', data: '' }); // Reseta os campos do formulário
    } else {
      alert('Preencha todos os campos obrigatórios'); // Exibe um alerta se os campos obrigatórios não forem preenchidos
    }
  };

  // Função para limpar os dados armazenados no localStorage e resetar os gastos
  const handleClearLocalStorage = () => {
    localStorage.removeItem('gastos'); // Remove os dados do localStorage
    setGastos([]); // Reseta o estado para um array vazio
    alert('Os dados foram limpos!'); // Exibe um alerta confirmando a ação
  };

  return (
    <div className='cadastro'>
      <h1 className='titulo'>Cadastrar Gasto</h1> {/* Título da seção */}
      <form onSubmit={handleAddGasto}>
        <div className='valor'>
          {/* Campo para inserir o valor do gasto */}
          <input
            type="number"
            placeholder="Valor"
            value={novoGasto.valor}
            onChange={(e) => setNovoGasto({ ...novoGasto, valor: e.target.value })}
            required // Torna o campo obrigatório
          />
        </div>
        <div className='data'>
          {/* Campo para inserir a data do gasto */}
          <input
            type="date"
            value={novoGasto.data}
            placeholder='Data'
            onChange={(e) => setNovoGasto({ ...novoGasto, data: e.target.value })}
            required // Torna o campo obrigatório
          />
        </div>
        {/* Campo para selecionar a categoria do gasto */}
        <select
          value={novoGasto.categoria}
          onChange={(e) => setNovoGasto({ ...novoGasto, categoria: e.target.value })}
          required // Torna o campo obrigatório
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
          {/* Campo para inserir uma descrição opcional para o gasto */}
          <textarea
            placeholder="Descrição (opcional)"
            value={novoGasto.descricao}
            onChange={(e) => setNovoGasto({ ...novoGasto, descricao: e.target.value })}
          />
        </div>
        {/* Botão para adicionar o gasto */}
        <button type="submit">Adicionar Gasto</button>
        {/* Botão para limpar os dados cadastrados */}
        <button type="button" onClick={handleClearLocalStorage}>Limpar Gastos Cadastrados</button>
      </form>
    </div>
  );
};

export default CadastroGastos; // Exporta o componente
