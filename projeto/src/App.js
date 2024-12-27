import './index.css'
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CadastroGastos from './componentes/CadastroGastos';
import ResumoGastos from './componentes/ResumoGastos';
import ListaGastos from './componentes/ListaGastos';
import logo from './componentes/logo.png';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <div className='logo'>
            <img src={logo} alt='CPCON' />
            <h2>Gerenciador de Gastos</h2>
          </div>
          <ul>
            <li><Link to="/">Cadastro de Gastos</Link></li>
            <li><Link to="/resumo">Resumo de Gastos</Link></li>
            <li><Link to="/lista">Lista de Gastos</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<CadastroGastos />} />
          <Route path="/resumo" element={<ResumoGastos />} />
          <Route path="/lista" element={<ListaGastos />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
