import React, { useState, useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import * as S from './LoginStyle'; // Mantenha o caminho correto para seus estilos

export default function Login() {
  const { login } = useContext(AuthContext);
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    const success = await login(cpf, password);
    if (!success) {
      setError('CPF ou Senha incorretos.');
    }
  };

  return (
    <S.LoginContainer>
      <S.BoxCentral>
        <h1>SEJA BEM VINDO</h1>
        {/* <S.Icone src="diamante-icon.png" /> */}
        <S.LoginInputs>
          <input type="text" value={cpf} onChange={(e) => setCpf(e.target.value)} placeholder="CPF..." />
          <input type={showPass ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Senha..." />
        </S.LoginInputs>
        <S.VerSenhaButton onClick={() => setShowPass(!showPass)}>{!showPass ? "ver senha" : "esconder senha"}</S.VerSenhaButton>
        <S.Button onClick={handleLogin}>ENTRAR</S.Button>
        {error && <div className='err'>{error}</div>}
      </S.BoxCentral>
    </S.LoginContainer>
  );
}