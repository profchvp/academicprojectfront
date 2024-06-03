// src/App.js

import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login/Login';
import Cadastro from './pages/Cadastro/Cadastro';
import Home from './pages/Home/Home';
import Aluno from './pages/Aluno/Aluno';
import Professor from './pages/Professor/Professor';
import LiberacaoPendente from './pages/LiberacaoPendente/LiberacaoPendente';


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './custom-toast-styles.css'; // Importe seus estilos personalizados

const App = () => {
  return (
    
    <BrowserRouter>
      <Routes>
      
        <Route path="/" element={<Login/>} />
        <Route path="/cadastro" element={<Cadastro/>} />
        <Route path="/usuarioAluno" element={<Aluno/>} />
        <Route path="/usuarioProfessor" element={<Professor/>} />
        <Route path="/liberacaoPendente" element={<LiberacaoPendente/>} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  )
};

export default App;
