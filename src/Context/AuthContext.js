import axios from 'axios';
import React, { createContext, useState, useEffect } from 'react';
import { useLoad } from './LoadContext';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({ token: null, isAuthenticated: false });
  const [clients, setClients] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [withdrawals, setWithdrawals] = useState([]);
  const [extracts, setExtracts] = useState([]);
  const [valorTotalNaPlataforma, setValorTotalNaPlataforma] = useState(0);
  const [valorSaquesNaPlataforma, setValorSaquesNaPlataforma] = useState(0);
  const [valorClientesParaSacarNaPlataforma, setValorClientesParaSacarNaPlataforma] = useState(0);
  const [valorAReceber, setValorAReceber] = useState(0);
  const [comprasAReceber, setComprasAReceber] = useState(0);
  const [chats, setChats] = useState([]);
  const [contractModels, setContractModels] = useState([]);
  const [gatewayData, setGatewayData] = useState(null);
  const { startLoading, stopLoading } = useLoad();

  useEffect(() => {
    if (clients.length === 0) {
      startLoading();
    } else {
      stopLoading();
    }
  }, [clients]);


  const fetchData = async (token) => {
    const headers = { Authorization: `Bearer ${token}` };

    try {
      const [clientsResponse, purchasesResponse, withdrawalsResponse, extractsResponse, gatewayResponse, chatResponse, contractResponse] = await Promise.all([
        fetch(`${process.env.REACT_APP_BASE_ROUTE}client/`, { headers }),
        fetch(`${process.env.REACT_APP_BASE_ROUTE}purchase`, { headers }),
        fetch(`${process.env.REACT_APP_BASE_ROUTE}withdrawal`, { headers }),
        fetch(`${process.env.REACT_APP_BASE_ROUTE}extract`, { headers }),
        fetch(`${process.env.REACT_APP_BASE_ROUTE}gateway`, { headers }),
        fetch(`${process.env.REACT_APP_BASE_ROUTE}chat/all`, { headers }),
        fetch(`${process.env.REACT_APP_BASE_ROUTE}contract/`, { headers }),
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
      }

      if (extractsResponse.ok) {
        const extractsData = await extractsResponse.json();
        setExtracts(extractsData);
      }

      if (gatewayResponse.ok) {
        const gatewayDataS = await gatewayResponse.json();
        setGatewayData(gatewayDataS);
      }

      if (chatResponse.ok) {
        const chatsData = await chatResponse.json();
        setChats(chatsData);
      }

      if (contractResponse.ok) {
        const contractsData = await contractResponse.json();
        setContractModels(contractsData);
      }
    } catch (error) {
      console.error('Erro ao buscar dados do cliente, compras ou saques:', error);
    }
  };

  const login = async (cpf, password) => {
    startLoading();

    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_ROUTE}auth/token`, {
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
        fetchData(data.token); // Busca informações após o login
        stopLoading();
        return true;
      }
    } catch (error) {
      stopLoading();
      console.error('Erro ao fazer login:', error);
    }
    stopLoading();

    return false;
  };

  const logout = () => {
    setAuthState({ token: null, isAuthenticated: false });
    localStorage.removeItem('token');
  };

  const listenToWebhook = () => {
    const eventSource = new EventSource('webhook'); // Altere para a URL apropriada do seu webhook

    eventSource.onmessage = (event) => {
      console.log('Mensagem recebida do webhook:', event.data);
    };

    eventSource.onerror = (error) => {
      console.error('Erro ao escutar o webhook:', error);
      eventSource.close(); // Fecha a conexão em caso de erro
    };

    return () => {
      eventSource.close(); // Limpeza da conexão ao desmontar o componente
    };
  };

  const adicionarContract = async (contract) => {
    setPurchases(prevPurchases => [...prevPurchases, contract]);
  }

  const puxarModelosAtualizados = async () => {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };

    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_ROUTE}contract/`, { headers });

      if (response.ok) { // Verifica se a resposta foi bem-sucedida
        const contractsData = await response.json(); // Faz o parse da resposta para JSON
        setContractModels(contractsData); // Atualiza o estado com os dados dos contratos
      } else {
        console.error("Erro ao obter modelos de contratos atualizados:", response.statusText);
      }
    } catch (error) {
      console.error("Erro ao obter modelos de contratos atualizados:", error);
    }
  }

  const atualizarSaque = async () => {
    await fetchData(authState.token);
  }

  const atualizarClientePorId = async (newClient) => {
    if (newClient) {
      setClients(prevClients => {
        return prevClients.map(client =>
          client.id === newClient.id ? newClient : client
        );
      });
    }
  }

  const inserirNovoCliente = async (newClient) => {
    if (newClient) {
      setClients([...clients, newClient]);
    }
  }

  const atualizarContratoPorId = async (newContract) => {
    if (newContract) {
      setPurchases(prevContracts => {
        return prevContracts.map(contract =>
          contract.purchaseId === newContract.purchaseId ? newContract : contract
        );
      });
    }
  }

  const atualizarChat = (newChat) => {
    if (newChat) {
      setChats(prevChats => {
        return prevChats.map(chat =>
          chat.clientId === newChat.clientId ? newChat : chat
        );
      });
    }
  }

  const atualizarTodosOsChats = async () => {
    axios.get(`${process.env.REACT_APP_BASE_ROUTE}chat/all`).then(res => {
      setChats(res.data);
    }).catch(err => {
      console.log(err);
    })
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuthState({ token, isAuthenticated: true });
      fetchData(token); // Busca dados do usuário autenticado
    }
  }, []);

  useEffect(() => {
    if (purchases && clients && purchases.length > 0) {
      var somatorio = 0;
      var somatorioValorAReceber = 0;
      var somatorioComprasAReceber = 0;
      purchases.forEach(purchase => {
        if (purchase.status === 2) {
          somatorio += purchase.amountPaid + (purchase.currentIncome - purchase.amountWithdrawn);
        } else if (purchase.status === 3) {
          somatorio += (purchase.currentIncome - purchase.amountWithdrawn);
        } else if (purchase.status === 1) {
          somatorioValorAReceber += purchase.amountPaid;
          somatorioComprasAReceber++;
        }
      });
      setValorTotalNaPlataforma(somatorio);
      setValorAReceber(somatorioValorAReceber);
      setComprasAReceber(somatorioComprasAReceber);
    }

    if (withdrawals && withdrawals.length > 0) {
      var somatorioDinheiro = 0;
      var arrayClientes = new Set();

      withdrawals.forEach(withdrawal => {
        if (withdrawal.status === 1) {
          somatorioDinheiro += parseFloat(withdrawal.amountWithdrawn * 0.96);
          arrayClientes.add(withdrawal.clientId);
        }
      })
      setValorClientesParaSacarNaPlataforma(arrayClientes.size);
      setValorSaquesNaPlataforma(somatorioDinheiro);
    }
  }, [purchases, clients, withdrawals]);


  return (
    <AuthContext.Provider value={{
      authState, login, logout, clients, purchases, withdrawals,
      extracts, valorTotalNaPlataforma, valorSaquesNaPlataforma, valorClientesParaSacarNaPlataforma,
      valorAReceber, comprasAReceber, gatewayData, adicionarContract, atualizarSaque,
      atualizarClientePorId, atualizarContratoPorId, chats, atualizarChat, atualizarTodosOsChats,
      inserirNovoCliente, contractModels, puxarModelosAtualizados
    }}>
      {children}
    </AuthContext.Provider>
  );
};