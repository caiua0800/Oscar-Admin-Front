import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({ token: null, isAuthenticated: false });
  const [clients, setClients] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [withdrawals, setWithdrawals] = useState([]);
  const [extracts, setExtracts] = useState([]);
  const [webSocket, setWebSocket] = useState(null);

  const connectWebSocket = () => {
    const socket = new WebSocket('ws://localhost:5255/ws');

    socket.onopen = () => {
      console.log('Conectado ao WebSocket');
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.event === 'new_client') {
        console.log('Novo cliente recebido:', data.client);
        setClients(prevClients => {
          if (!prevClients.some(client => client.id === data.client.id)) {
            return [...prevClients, data.client];
          }
          return prevClients;
        });
      }
    };

    socket.onclose = () => {
      console.log('Desconectado do WebSocket');
    };

    setWebSocket(socket);
  };

  const fetchData = async (token) => {
    const headers = { Authorization: `Bearer ${token}` };

    try {
      const [clientsResponse, purchasesResponse, withdrawalsResponse, extractsResponse] = await Promise.all([
        fetch('http://localhost:5255/api/client/', { headers }),
        fetch('http://localhost:5255/api/purchase', { headers }),
        fetch('http://localhost:5255/api/withdrawal', { headers }),
        fetch('http://localhost:5255/api/extract', { headers }),
      ]);

      if (clientsResponse.ok) {
        const clientsData = await clientsResponse.json();
        setClients(clientsData);
      }

      if (purchasesResponse.ok) {
        const purchasesData = await purchasesResponse.json();
        setPurchases(purchasesData);
      }

      if (withdrawalsResponse.ok) {
        const withdrawalsData = await withdrawalsResponse.json();
        setWithdrawals(withdrawalsData);
        console.log(withdrawalsData);
      }

      if (extractsResponse.ok) {
        const extractsData = await extractsResponse.json();
        setExtracts(extractsData);
        console.log(extractsData);
      }
    } catch (error) {
      console.error('Erro ao buscar dados do cliente, compras ou saques:', error);
    }
  };

  // Função de login
  const login = async (cpf, password) => {
    try {
      const response = await fetch('http://localhost:5255/api/auth/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Id: cpf, Password: password }),
      });

      if (response.ok) {
        const data = await response.json();
        setAuthState({ token: data.token, isAuthenticated: true });
        localStorage.setItem('token', data.token);
        connectWebSocket(); // Conecta ao WebSocket após o login
        await fetchData(data.token); // Busca informações após o login
        return true;
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
    }
    return false;
  };

  // Função de logout
  const logout = () => {
    setAuthState({ token: null, isAuthenticated: false });
    localStorage.removeItem('token');
    if (webSocket) {
      webSocket.close(); // Fecha a conexão do WebSocket
      setWebSocket(null); // Limpa a referência do WebSocket
    }
  };

  // Verifica o token no localStorage ao montar o componente
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuthState({ token, isAuthenticated: true });
      fetchData(token); // Busca dados do usuário autenticado
      connectWebSocket(); // Conecta ao WebSocket se tiver um token
    }
  }, []);

  const editarCliente = (updatedClient) => {
    setClients(prevClients => {
      return prevClients.map(client =>
        client.id === updatedClient.id ? updatedClient : client
      );
    });
  };

  const editarContract = (updatedContract) => {
    setPurchases(prevContract => {
      return prevContract.map(contract =>
        contract.purchaseId === updatedContract.purchaseId ? updatedContract : contract
      );
    });
  };

  const buscarContratoPorId = (purchaseId) => {
    return purchases.find(contract => contract.purchaseId === purchaseId);
  };

  const atualizarContratoPorId = (updatedContract) => {
    setPurchases(prevPurchases => {
      return prevPurchases.map(contract =>
        contract.purchaseId === updatedContract.purchaseId ? updatedContract : contract
      );
    });
  };

  const buscarClientePorId = (clientId) => {
    return clients.find(client => client.id === clientId);
  };

  const atualizarClientePorId = (updatedClient) => {
    setClients(prevClients => {
      return prevClients.map(client =>
        client.id === updatedClient.id ? updatedClient : client
      );
    });
  };

  const adicionarContract = async () => {
    const token = authState.token;
    const headers = { Authorization: `Bearer ${token}` };

    try {
      const response = await fetch('http://localhost:5255/api/purchase', { headers });

      if (response.ok) {
        const purchasesData = await response.json(); // Obtém os dados das compras
        setPurchases(purchasesData); // Atualiza o estado com os dados recebidos
      } else {
        console.log("Erro ao buscar compras:", response.statusText);
      }
    } catch (error) {
      console.error("Erro ao buscar compras:", error);
    }
  };

  const atualizarSaque = (id, newStatus) => {
    setWithdrawals(prevWithdrawals => {
      return prevWithdrawals.map(withdrawal =>
        withdrawal.withdrawalId === id ? { ...withdrawal, status: newStatus } : withdrawal
      );
    });

    const token = authState.token; // Obtém o token do estado de autenticação
    const headers = { Authorization: `Bearer ${token}` }; // Define os cabeçalhos

    fetch(`http://localhost:5255/api/withdrawal/${id}/${newStatus}`, {
      method: 'PUT',
      headers: headers,
    })
      .then(response => {
        if (!response.ok) {
          console.error("Erro ao atualizar o saque:", response.statusText);
        } else {
          console.log("Status do saque atualizado com sucesso.");
        }
      })
      .catch(error => {
        console.error("Erro ao atualizar o saque:", error);
      });
  };

  const atualizarDados = async () => {
    await fetchData(authState.token);
  }

  return (
    <AuthContext.Provider value={{ authState, login, clients, purchases, withdrawals, extracts, logout, editarCliente, editarContract, adicionarContract, atualizarSaque, atualizarDados, atualizarContratoPorId, atualizarClientePorId }}>
      {children}
    </AuthContext.Provider>
  );
};