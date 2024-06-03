// src/pages/Login.js

import React, { useState } from 'react';
import './Login.css'; // Arquivo de estilo para esta página
import { Link  } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'; // Importe useNavigate
const UserType = {
  PROFESSOR: 'P',
  ALUNO: 'A',
};
//import 'react-toastify/dist/ReactToastify.css';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Use useNavigate

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Aqui você pode adicionar a lógica para verificar o email e senha
    // e redirecionar o usuário para a próxima página
    //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    // Monta o objeto JSON com os dados do login
    const data = {
      email: email,
      senha: password
    };

    try {
      // Faz a requisição POST para a API de login
      const response = await fetch('http://localhost:3333/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
       const msgOK="Credenciais";
       
      // Verifica se a requisição foi bem sucedida
      if (response.ok) {
        //kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk
        const userData = await response.json();
        const userType = userData.TipoUsuario;
        if (userType === UserType.PROFESSOR) {
          // Se o usuário for professor, redireciona para a página de professor
         navigate('/usuarioProfessor');
        } else if (userType === UserType.ALUNO) {
          // Se o usuário for aluno, redireciona para a página de aluno
          navigate('/usuarioAluno');
        }
        //kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk
        // Redireciona o usuário para a próxima página, por exemplo:
        //window.location.href = '/proxima-pagina';
        toast.success(msgOK,
          {
            autoClose: 3000
           
          });// 3 segundos;
      } else {
        // Se a resposta não for bem sucedida, exibe uma mensagem de erro
        const errorData = await response.json();
        console.error('Erro:', errorData.message);
        //alert("Não encontrouxxx")
        //yyyyyyyyyyyyyyyyyyyyyyyyyyyy
        // Se a resposta não for bem sucedida, exibe uma mensagem de erro
        toast.error('Email não encontrado. Por favor, verifique suas credenciais.',
          {
            autoClose: 5000
          });// 5 segundos;

        // Ou faça algo para lidar com o erro, como exibir uma mensagem para o usuário
        //yyyyyyyyyyyyyyyyyyyyyyyyyyy
        // Ou faça algo para lidar com o erro, como exibir uma mensagem para o usuário
      }
    } catch (error) {
      // Se ocorrer um erro durante a requisição, exibe uma mensagem de erro
      alert("erro")
      console.error('Erro durante a requisição:', error);
      // Ou faça algo para lidar com o erro, como exibir uma mensagem para o usuário
    }
    //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
  };

  return (
    <div className="login-container">
      <h2>Prof Class Manager</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Senha:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button type="submit">Entrar</button>
      </form>
      <div className="signup-link">
        <p>Você ainda não tem cadastro?  <Link to="/cadastro">Cadastre-se</Link></p>
      </div>


    </div>
  );
};

export default Login;
