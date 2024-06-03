import React, { useState } from 'react';
import './Cadastro.css'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'; // Importe useNavigate
// Defina um objeto para mapear os valores de aluno e professor para A e P
const TipoUsuarioEnum = {
  ALUNO: 'A',
  PROFESSOR: 'P',
};

const Cadastro = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const navigate = useNavigate(); // Use useNavigate

  const [tipoUsuario, setTipoUsuario] = useState(TipoUsuarioEnum.ALUNO); // Defina o tipo de usuário padrão aqui

  const handleNomeChange = (event) => {
    setNome(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSenhaChange = (event) => {
    setSenha(event.target.value);
  };
  const handleConfirmarSenhaChange = (event) => {
    setConfirmarSenha(event.target.value);
  };

  const handleTipoUsuarioChange = (event) => {
    setTipoUsuario(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Aqui você pode adicionar a lógica para cadastrar o novo usuário
    // por exemplo, enviar os dados para o servidor
    // Verificar se as senhas coincidem
    if (senha !== confirmarSenha) {
      toast.error("Senhas Não Conferem",
        {
          autoClose: 3000

        });// 3 segundos;
      return;
    }
    //zzzzzzzzzzzzzzzzzzzzzzzzzzzz
    //alert(tipoUsuario)
    //return
    try {
      const response = await fetch('http://localhost:3333/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          nomeUsuario: nome,
          tipoUsuario: tipoUsuario,
          senha: senha,
        }),
      });

      if (response.ok) {
        const responseData = await response.json();
        if (responseData.userAlreadyExists) {
          toast.error("Este email ja existe no cadastro",
            {
              autoClose: 3000

            });// 3 segundos;
        } else {

          // Limpar os campos após o cadastro bem-sucedido
          setNome('');
          setEmail('');
          setSenha('');
          setConfirmarSenha('');
          setTipoUsuario(TipoUsuarioEnum.ALUNO); // Resetar para o tipo de usuário padrão
          toast.success("Usuario cadastrado Com Sucesso",
            {
              autoClose: 3000

            });// 3 segundos;
            navigate('/liberacaoPendente');
        }
      } else {
        const errorData = await response.json();
        alert(`Erro ao cadastrar usuário: ${errorData.message}`);
      }
    } catch (error) {
      alert(`Erro ao cadastrar usuário: ${error.message}`);
    }
    //zzzzzzzzzzzzzzzzzzzzzzzzzzzz
  };

  return (
    <div className="cadastro-container">
      <h2>Cadastrar-se</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nome">Nome:</label>
          <input
            type="text"
            id="nome"
            value={nome}
            onChange={handleNomeChange}
            required
          />
        </div>
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
          <label htmlFor="senha">Senha:</label>
          <input
            type="password"
            id="senha"
            value={senha}
            onChange={handleSenhaChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmar-senha">Confirmação da Senha:</label>
          <input
            type="password"
            id="confirmar-senha"
            value={confirmarSenha}
            onChange={handleConfirmarSenhaChange}
            required
          />
        </div>
        <div className="form-group">
          <label>
            <input
              type="radio"
              value={TipoUsuarioEnum.ALUNO}
              checked={tipoUsuario === TipoUsuarioEnum.ALUNO}
              onChange={handleTipoUsuarioChange}
            />
            Aluno
          </label>

        </div>
        <div className="form-group">
          <label>
            <input
              type="radio"
              value={TipoUsuarioEnum.PROFESSOR}
              checked={tipoUsuario === TipoUsuarioEnum.PROFESSOR}
              onChange={handleTipoUsuarioChange}
            />
            Professor
          </label>
        </div>
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default Cadastro;
