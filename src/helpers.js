import Cadastro from "./Components/Cadastro/Cadastro";
import Clients from "./Components/Clients/Clients";
import Contratos from "./Components/Contratos/Contratos";
import Dashboard from "./Components/Dashboard/Dashboard";
import NovaCompra from "./Components/NovaCompra/NovaCompra";
import NovoSaque from "./Components/NovoSaque/NovoSaque";
import Saques from "./Components/Saques/Saques";
import axios from "axios";
import Transacoes from "./Components/Transacoes/Transacoes";
import MeuGateway from "./Components/MeuGateway/MeuGateway";
import ChatSuporte from "./Components/ChatSuporte/ChatSuporte";

const helpers = {

    preventNull: (it, clients) => {
        if (!it || it.trim() === "")
            return "N/A";
        return it;
    },

    handleDesconhecido: (ir) => {
        if (ir.trim().toLowerCase() === "desconhecido")
            return "Kr Pay Services";
        return ir;
    },

    formatRelativeDate: (inputDate) => {
        const now = new Date();
        const date = new Date(inputDate);
    
        // Calcula a diferença em milissegundos
        const diffInMilliseconds = now - date;
        const diffInDays = diffInMilliseconds / (1000 * 60 * 60 * 24);
    
        // Formata a hora e minuto
        const hour = date.getHours().toString().padStart(2, '0');
        const minute = date.getMinutes().toString().padStart(2, '0');
    
        if (diffInDays < 1) {
            // Se faz menos de um dia
            return `${hour}:${minute}`;
        } else if (diffInDays < 2) {
            // Se faz mais de um dia, mas menos de dois
            return `ontem ${hour}:${minute}`;
        } else {
            // Se faz mais de dois dias
            const day = date.getDate().toString().padStart(2, '0');
            const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Adiciona 1 ao mês, pois em JavaScript começa em 0
            return `${day}/${month} ${hour}:${minute}`;
        }
    },

    navegacao: (it, setActiveTab, setSelectedClient, selectedClient) => {
        switch (it) {
            case 0:
                return <Dashboard setActiveTab={setActiveTab} />
            case 1:
                return <Clients setActiveTab={setActiveTab} selectedClientFK={selectedClient} handleSelectClientFK={setSelectedClient} />
            case 2:
                return <Cadastro setActiveTab={setActiveTab} />
            case 3:
                return <Contratos setActiveTab={setActiveTab} handleSelectClient={setSelectedClient} />
            case 4:
                return <NovaCompra setActiveTab={setActiveTab} />
            case 5:
                return <Saques setActiveTab={setActiveTab} handleSelectClient={setSelectedClient} />
            case 6:
                return <NovoSaque setActiveTab={setActiveTab} />
            case 7:
                return <Transacoes setActiveTab={setActiveTab} />
            case 8:
                return <MeuGateway setActiveTab={setActiveTab} />
            case 9:
                return <ChatSuporte />
        }
    },

    cadastro: async (cliente) => {
        if (cliente) {
            try {
                const res = await axios.post(`${process.env.REACT_APP_BASE_ROUTE}client`, cliente);
                console.log(`Resposta Servidor (Criação De Cliente): ${res}`);
                return true;
            } catch (err) {
                console.log(`Erro Servidor (Criação De Cliente): ${err}`);
                return false;
            }
        } else {
            alert("Erro ao criar o Cliente.");
            return false;
        }
    },

    editarCliente: async (cliente) => {

        if (cliente.clientProfit)
            cliente.clientProfit = parseFloat(cliente.clientProfit) / 100;

        if (cliente) {
            try {
                const res = await axios.put(`${process.env.REACT_APP_BASE_ROUTE}client/${cliente.id}`, cliente);
                console.log(res);
                if (res.status === 204) { // Verifique se a resposta foi 'No Content'
                    alert("Cliente atualizado com sucesso!"); // Alerta de sucesso
                    return true;
                } else {
                    alert("Erro ao atualizar o cliente. Tente novamente."); // Alerta de erro
                    return false;
                }
            } catch (err) {
                console.error(err); // Use console.error para registrar o erro
                alert("Ocorreu um erro ao tentar atualizar o cliente.");
                return false;
            }
        } else {
            alert("Erro ao editar o Cliente.");
            return false;
        }
    },

    editarContrato: async (contrato) => {
        const cloneContrato = contrato;

        contrato.purchaseDate = new Date(contrato.purchaseDate.split('/').reverse().join('-')).toISOString();
        contrato.endContractDate = new Date(contrato.endContractDate.split('/').reverse().join('-')).toISOString();
        contrato.status = contrato.status === "Pendente" ? 1 : contrato.status === "Valorizando" ? 2 : 3;

        if (contrato) {
            try {
                const res = await axios.put(`${process.env.REACT_APP_BASE_ROUTE}purchase/${contrato.purchaseId}`, contrato);
                console.log(res);
                if (res.status === 204) {
                    return true;
                } else {
                    return false;
                }
            } catch (err) {
                console.log(err);
                return false;
            }
        } else {
            alert("Erro ao criar o Contrato.");
            return false;
        }
    },

    editarStatusContrato: async (contratoId, newStatus) => {
        if (contratoId && newStatus) {
            try {
                const res = await axios.put(`${process.env.REACT_APP_BASE_ROUTE}purchase/${contratoId}/${newStatus}`);
                console.log(res);
                if (res.status === 204) {
                    return true;
                } else {
                    return false;
                }
            } catch (err) {
                console.log(err);
                return false;
            }
        } else {
            alert("Erro ao Mudar Status.");
            return false;
        }
    },

    formatarCPF: (cpf) => {
        const apenasNumeros = cpf.replace(/\D/g, '');

        return apenasNumeros.replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{2})$/, '$1-$2');
    },

    estados: [
        "Todos", "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO",
        "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ",
        "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"
    ],

    formatDate: (dateString) => {
        const date = new Date(dateString);

        const day = String(date.getDate()).padStart(2, '0'); // Dia
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Mês (Janeiro é 0)
        const year = date.getFullYear(); // Ano
        const hours = String(date.getHours()).padStart(2, '0'); // Horas
        const minutes = String(date.getMinutes()).padStart(2, '0'); // Minutos

        return `${day}/${month}/${year} ${hours}:${minutes}`;
    },

    novoContrato: async (contrato) => {
        if (contrato) {
            contrato.type = 0;
            contrato.coin = "BRL";
            contrato.status = 1;
            contrato.productName = "Contrato Personalizado Admin";

            try {
                const res = await axios.post(`${process.env.REACT_APP_BASE_ROUTE}purchase`, contrato);
                if (res.status === 201) {
                    // alert("Contrato criado com sucesso.");
                    return res.data;
                } else {
                    // alert("Erro ao criar contrato.");
                    return null;
                }
            } catch (error) {
                console.log("Error: ");
                console.log(error);
                alert("Erro ao criar contrato.");
            }
        } else {
            alert("Erro ao criar contrato.")
        }
    },

    editarStatusSaque: async (id, newStatus) => {

        if (!id || !newStatus) {
            console.log("Erro ao atualizar status do saque.");
            return;
        }

        try {
            const res = await axios.put(`${process.env.REACT_APP_BASE_ROUTE}withdrawal/${id}/${newStatus}`);
            console.log(res);
            if (res.status === 204)
                return true;
            else return false;
        } catch (error) {
            console.log("Erro ao editar status do saque.")
            return false;
        }
    },

    percentageMultiply: (num) => { return parseFloat(num) * 100; },

    novoSaque: async (clientId, selectedContracts) => {
        if (!clientId || !selectedContracts || selectedContracts.length === 0) {
            alert("Erro ao realizar saque: Informações incompletas.");
            console.log("Erro ao realizar saque: Informações incompletas.");
            return null;
        }

        try {
            for (const contract of selectedContracts) {
                try {
                    const res = await axios.post(`${process.env.REACT_APP_BASE_ROUTE}withdrawal`, {
                        clientId,
                        amountWithdrawn: parseFloat(contract.amount),
                        itemId: contract.purchaseId
                    });

                    if (res.status === 201) {
                        console.log("Saque criado com sucesso.", res.data);
                        return true;
                    } else {
                        console.log("Erro ao criar saque:", res);
                        alert("Erro ao criar saque.");
                        return null;
                    }
                } catch (error) {
                    console.log("Error ao processar o saque para o contrato:", contract.purchaseId, error);
                    const errorMessage = error.response && error.response.data
                        ? error.response.data
                        : 'Erro ao criar saque.';

                    const acharMensagem = "Não foi possível realizar o saque: Saldo bloqueado.";
                    if (errorMessage.toLowerCase().includes(acharMensagem.toLowerCase())) {
                        alert(acharMensagem);
                    } else {
                        alert(errorMessage);
                    }
                }
            }

            alert("Todos os saques foram processados com sucesso.");
            return true; // Retorno final após todos os saques
        } catch (error) {
            console.log("Erro geral ao realizar o saque:", error);
            alert("Um erro inesperado ocorreu ao tentar realizar o saque.");
            return null;
        }
    },

    novoSaqueExtraBalance: async (clientId, amount) => {
        if (!clientId || !amount) {
            alert("Erro ao realizar saque: Informações incompletas.");
            console.log("Erro ao realizar saque: Informações incompletas.");
            return null;
        }

        try {
            const res = await axios.post(`${process.env.REACT_APP_BASE_ROUTE}withdrawal/extraBalance`, {
                clientId,
                amountWithdrawn: parseFloat(amount),
                itemId: ""
            });

            if (res.status === 201) {
                console.log("Saque criado com sucesso.", res.data);
                // alert("Saque criado com sucesso.");
                return true;
            } else {
                console.log("Erro ao criar saque:", res);
                alert("Erro ao criar saque.");
                return null;
            }
        } catch (error) {
            console.log("Error ao processar o saque ", error);
            alert("Erro ao criar o saque.");
            return null;
        }
    },

    formatNumberToCurrency: (number) => {
        const validNumber = parseFloat(number);
        if (isNaN(validNumber)) {
            throw new Error("Invalid number");
        }

        // Arredonda o número para duas casas decimais
        const roundedNumber = validNumber.toFixed(2);
        const numberString = roundedNumber.toString();

        // Divide a parte inteira e a parte decimal
        const integerPart = numberString.split('.')[0];
        const decimalPart = numberString.split('.')[1] ? numberString.split('.')[1] : '00';

        // Formata a parte inteira com ponto como separador de milhar
        const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

        // Retorna o resultado final formatado
        return `${formattedIntegerPart},${decimalPart}`;
    },

    adicionarSaldoAContrato: async (purchaseId, amount) => {
        if (purchaseId && amount) {
            try {
                const response = await axios.put(`${process.env.REACT_APP_BASE_ROUTE}purchase/${purchaseId}/add/${amount}`);
                if (response) {
                    return true;
                }
            } catch (err) {
                console.log("Erro:", err);
            }
            return null;
        } else {
            return false;
        }
    },

    anteciparLucroDoContrato: async (purchaseId, amount) => {
        if (purchaseId && amount) {
            try {
                const response = await axios.put(`${process.env.REACT_APP_BASE_ROUTE}purchase/${purchaseId}/anticipate-profit/${amount}`);
                if (response) {
                    return true;
                }
            } catch (err) {
                console.log("Erro:", err);
            }
            return null;
        } else {
            return false;
        }
    },

    cancelamentoDoContrato: async (purchaseId) => {
        if (purchaseId) {
            try {
                const response = await axios.put(`${process.env.REACT_APP_BASE_ROUTE}purchase/cancel/${purchaseId}`);
                if (response) {
                    return true;
                }
            } catch (err) {
                console.log("Erro:", err);
            }
            return null;
        } else {
            return false;
        }
    },

    cancelamentoDoContrato: async (clientId) => {
        if (clientId) {
            try {
                const response = await axios.put(`${process.env.REACT_APP_BASE_ROUTE}client/${clientId}/exclude`);
                if (response) {
                    return true;
                }
            } catch (err) {
                console.log("Erro:", err);
            }
            return null;
        } else {
            return false;
        }
    },

    handleStatusClient: (st) => {
        switch (st) {
            case 1:
                return "Ativo"
            case 2:
                return "Inativo"
            default:
                return "Não Encontrado"
        }
    },

    handleCreateAdminWithdraw: async (amount) => {
        if (!amount) {
            alert("Erro ao realizar saque de admin: Informações incompletas.");
            console.log("Erro ao realizar saque de admin: Informações incompletas.");
            return null;
        }

        try {
            const res = await axios.post(`${process.env.REACT_APP_BASE_ROUTE}adminwithdrawal`, {
                amountWithdrawn: parseFloat(amount),
            });

            if (res.status === 201) {
                console.log("Saque de admin criado com sucesso.", res.data);
                return true;
            } else {
                console.log("Erro ao criar saque de admin:", res);
                return null;
            }
        } catch (error) {
            console.log(error);
            alert("Erro ao solicitar saque.");
            return null;
        }
    },

    handleStatusAdminWithdrawn: (st) => {

        switch (st) {
            case 1:
                return "Pendente";
            case 2:
                return "Pago";
            case 3:
                return "Cancelado";
            default:
                return "Desconhecido"
        }
    }
}

export default helpers;