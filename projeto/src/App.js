import './index.css' // Importa o arquivo CSS para estilização
import React from 'react'; // Importa o React
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'; // Importa componentes para o roteamento
import CadastroGastos from './componentes/CadastroGastos'; // Componente de cadastro de gastos
import ResumoGastos from './componentes/ResumoGastos'; // Componente para exibir o resumo de gastos
import ListaGastos from './componentes/ListaGastos'; // Componente para listar os gastos
import logo from './componentes/logo.png'; // Importa o logo da aplicação

function App() {
  return (
    <Router> {/* Configura o roteamento para a aplicação */}
      <div>
        {/* Menu de navegação */}
        <nav>
          <div className='logo'>
            <img src={logo} alt='CPCON' /> {/* Exibe o logo */}
            <h2>Gerenciador de Gastos</h2> {/* Título da aplicação */}
          </div>
          <ul>
            {/* Links para as diferentes páginas */}
            <li><Link to="/">Cadastro de Gastos</Link></li>
            <li><Link to="/resumo">Resumo de Gastos</Link></li>
            <li><Link to="/lista">Lista de Gastos</Link></li>
          </ul>
        </nav>
        <Routes> {/* Define as rotas da aplicação */}
          <Route path="/" element={<CadastroGastos />} /> 
          <Route path="/resumo" element={<ResumoGastos />} /> 
          <Route path="/lista" element={<ListaGastos />} /> 
        </Routes>
      </div>
    </Router>
  );
};

export default App; // Exporta o componente App como padrão
