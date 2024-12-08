import React, { useEffect, useState, useContext } from "react";
import * as S from "./ClientsStyle";
import TabelaGeral from "../TabelaGeral/TabelaGeral";
import { AuthContext } from "../../Context/AuthContext";
import helpers from "../../helpers";
import ExcluirCliente from "./Funcoes/ExcluirCliente/ExcluirCliente";
import { useLoad } from "../../Context/LoadContext";

export default function Clients({ selectedClientFK, handleSelectClientFK }) {
    const { clients, atualizarClientePorId } = useContext(AuthContext);
    const [searchedClients, setSearchedClients] = useState({});
    const [showOptionsMenu, setShowOptionsMenu] = useState(false)
    const [excluirCliente, setExcluirCliente] = useState(false)
    const {startLoading, stopLoading} = useLoad();

    useEffect(() => {
        startLoading()
        setTimeout(stopLoading, 1200);
    }, [clients])

    useEffect(() => {
        if(selectedClientFK){
            setSelectedClient(selectedClientFK);
            handleSelectClientFK(null)
        }
    }, [selectedClientFK])

    const columns = [
        { name: "Nome", value: "name" },
        { name: "CPF/CNPJ", value: "id", formatFunction: helpers.formatarCPF },
        { name: "Email", value: "email" },
        { name: "Telefone", value: "phone" },
        { name: "Indicador ID", value: "sponsorId", formatFunction: helpers.preventNull },
        { name: "Data Cadastro", value: "dateCreated", formatFunction: helpers.formatDate },
        { name: "Cidade", value: "address.city" },
        { name: "Estado", value: "address.state" },
        { name: "Bairro", value: "address.neighborhood" },
        { name: "Rua", value: "address.street" },
        { name: "N", value: "address.number" },
        { name: "CEP", value: "address.zipcode" },
        { name: "Lucro Padrão", value: "clientProfit", insertEnd: "%", formatFunction: helpers.percentageMultiply },
        { name: "Saldo Bloqueado", value: "blockedBalance", insertStart: "R$", formatFunction: helpers.formatNumberToCurrency },
        { name: "Saldo", value: "balance", insertStart: "R$ ", formatFunction: helpers.formatNumberToCurrency },
        { name: "Saldo Extra", value: "extraBalance", insertStart: "R$ ", formatFunction: helpers.formatNumberToCurrency },
        { name: "Status", value: "status", formatFunction: helpers.handleStatusClient },
    ];

    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [stateFilter, setStateFilter] = useState("Todos");
    const [selectedClient, setSelectedClient] = useState(null);
    const [balanceFilter, setBalanceFilter] = useState("Todos");
    const [sortOrder, setSortOrder] = useState("Crescente");
    const [currentClient, setCurrentClient] = useState(null);
    const itemsPerPage = 10;

    useEffect(() => {
        if (clients.length > 0) {
            filterAndSortData();
        }
    }, [clients, searchTerm, stateFilter, sortOrder, balanceFilter]);

    const filterAndSortData = () => {
        let filteredClients = clients.map(client => {
            return {
                ...client
            };
        });

        // Filtro de estado
        if (stateFilter !== "Todos") {
            filteredClients = filteredClients.filter(client => client.address.state === stateFilter);
        }

        // Filtro de saldo
        if (balanceFilter === "Com Dinheiro na plataforma") {
            filteredClients = filteredClients.filter(client => client.balance > 0);
        } else if (balanceFilter === "Sem Dinheiro na plataforma") {
            filteredClients = filteredClients.filter(client => client.balance <= 0);
        } else if (balanceFilter === "+ de R$10.000,00") {
            filteredClients = filteredClients.filter(client => client.balance >= 10000);
        } else if (balanceFilter === "+ de R$20.000,00") {
            filteredClients = filteredClients.filter(client => client.balance >= 20000);
        } else if (balanceFilter === "+ de R$30.000,00") {
            filteredClients = filteredClients.filter(client => client.balance >= 30000);
        } else if (balanceFilter === "+ de R$40.000,00") {
            filteredClients = filteredClients.filter(client => client.balance >= 40000);
        } else if (balanceFilter === "+ de R$50.000,00") {
            filteredClients = filteredClients.filter(client => client.balance >= 50000);
        } else if (balanceFilter === "+ de R$60.000,00") {
            filteredClients = filteredClients.filter(client => client.balance >= 60000);
        } else if (balanceFilter === "+ de R$70.000,00") {
            filteredClients = filteredClients.filter(client => client.balance >= 70000);
        } else if (balanceFilter === "+ de R$80.000,00") {
            filteredClients = filteredClients.filter(client => client.balance >= 80000);
        } else if (balanceFilter === "+ de R$90.000,00") {
            filteredClients = filteredClients.filter(client => client.balance >= 90000);
        } else if (balanceFilter === "+ de R$100.000,00") {
            filteredClients = filteredClients.filter(client => client.balance >= 100000);
        }

        // Filtro por terminação de pesquisa
        if (searchTerm) {
            filteredClients = filteredClients.filter(client =>
                Object.values(client).some(value =>
                    typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase())
                )
            );
        }

        // Ordenar clientes pelo nome
        const sortedClients = filteredClients.sort((a, b) => {
            if (sortOrder === "Crescente") {
                return sortById(a.id, b.id); // Função de comparação para o ID
            } else {
                return sortById(b.id, a.id); // Reverso para Descrescente
            }
        });
        setSearchedClients(sortedClients);
    };

    const sortById = (idA, idB) => {
        const matchA = idA.match(/([A-Za-z]+)(\d+)/);
        const matchB = idB.match(/([A-Za-z]+)(\d+)/);

        const prefixA = matchA ? matchA[1] : idA; // Parte alfabética
        const numberA = matchA ? parseInt(matchA[2], 10) : 0; // Parte numérica
        const prefixB = matchB ? matchB[1] : idB; // Parte alfabética
        const numberB = matchB ? parseInt(matchB[2], 10) : 0; // Parte numérica

        // Primeiro compara as partes alfabéticas
        if (prefixA < prefixB) return -1;
        if (prefixA > prefixB) return 1;

        // Caso as partes alfabéticas sejam iguais, compara as partes numéricas
        return numberA - numberB;
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = Object.values(searchedClients).slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(searchedClients.length / itemsPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prevPage => prevPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prevPage => prevPage - 1);
        }
    };
    const handleSearchChange = (event) => {
        const value = event.target.value.toLowerCase();
        setSearchTerm(value);
        setCurrentPage(1);
    };

    useEffect(() => {
        if (selectedClient) {
            setCurrentClient({
                name: selectedClient.name,
                id: selectedClient.id,
                email: selectedClient.email,
                phone: selectedClient.phone,
                sponsorId: selectedClient.sponsorId,
                profession: selectedClient.profession,
                clientProfit: selectedClient.clientProfit * 100,
                balance: selectedClient.balance,
                blockedBalance: selectedClient.blockedBalance || 0,
                avaliableBalance: selectedClient.balance - selectedClient.blockedBalance,
                address: {
                    city: selectedClient.address.city,
                    neighborhood: selectedClient.address.neighborhood,
                    country: selectedClient.address.country,
                    street: selectedClient.address.street,
                    number: selectedClient.address.number,
                    zipcode: selectedClient.address.zipcode,
                    state: selectedClient.address.state,
                },
            });
        }
    }, [selectedClient]);

    const handleInputChange = (field) => (event) => {
        const value = event.target.value;
        setCurrentClient((prevClient) => ({
            ...prevClient,
            ...(field.startsWith('address.')
                ? { address: { ...prevClient.address, [field.split('.')[1]]: value } }
                : { [field]: value })
        }));
    };

    const isDifferent = () => {
        if (!currentClient || !selectedClient) return false;

        const selectedClientData = {
            name: selectedClient.name,
            id: selectedClient.id,
            email: selectedClient.email,
            phone: selectedClient.phone,
            sponsorId: selectedClient.sponsorId,
            balance: selectedClient.balance,
            profession: selectedClient.profession,
            clientProfit: selectedClient.clientProfit * 100,
            blockedBalance: selectedClient.blockedBalance || 0,
            address: {
                city: selectedClient.address.city,
                neighborhood: selectedClient.address.neighborhood,
                street: selectedClient.address.street,
                number: selectedClient.address.number,
                zipcode: selectedClient.address.zipcode,
                state: selectedClient.address.state,
            },
        };

        return JSON.stringify(currentClient) !== JSON.stringify(selectedClientData);
    };

    const handleEdit = async () => {
        const success = await helpers.editarCliente(currentClient);
        if (success) {
            const updatedClient = { ...currentClient };
            atualizarClientePorId(updatedClient); 
            setSelectedClient(null);
            setCurrentClient(null);
        } else {
            alert("Erro ao atualizar cliente!"); // Para tratamento de erro
        }
    };


    return (
        <>
            {selectedClient && currentClient && (
                <S.JanelaCliente>
                    <S.JanelaBox>
                        <S.ClientServices onMouseEnter={() => setShowOptionsMenu(true)} onMouseLeave={() => setShowOptionsMenu(false)}>
                            <img src="tools-icon.png" />
                            <div
                                className="options">
                                <p>Opções</p>
                                {showOptionsMenu && (
                                    <S.MenuOptions show={showOptionsMenu}>
                                        <S.Op onClick={() => setExcluirCliente(true)}>
                                            <img src="option-icon.png" />
                                            <span>EXCLUIR CONTA</span>
                                        </S.Op>

                                    </S.MenuOptions>
                                )}
                            </div>
                        </S.ClientServices>

                        {excluirCliente && (
                            <ExcluirCliente selectedClient={selectedClient} setExcluirCliente={setExcluirCliente} />
                        )}

                        <S.Title>Painel do Cliente</S.Title>
                        <S.BoxInputSelectedClient>
                            <span>Nome</span>
                            <S.InputSelectedClient
                                readOnly
                                value={currentClient.name || ""}
                                onChange={handleInputChange('name')}
                            />
                        </S.BoxInputSelectedClient>
                        <S.BoxInputSelectedClient>
                            <span>Email</span>
                            <S.InputSelectedClient
                                value={currentClient.email || ""}
                                onChange={handleInputChange('email')}
                            />
                        </S.BoxInputSelectedClient>
                        <S.BoxInputSelectedClient>
                            <span>Telefone</span>
                            <S.InputSelectedClient
                                value={currentClient.phone || ""}
                                onChange={handleInputChange('phone')}
                            />
                        </S.BoxInputSelectedClient>
                        <S.BoxInputSelectedClient>
                            <span>Rua, Av...</span>
                            <S.InputSelectedClient
                                value={`${currentClient.address.street || ''}`}
                                onChange={handleInputChange('address.street')}
                            />
                        </S.BoxInputSelectedClient>

                        <S.BoxInputSelectedClient>
                            <span>Número</span>
                            <S.InputSelectedClient
                                value={`${currentClient.address.number || ''}`}
                                onChange={handleInputChange('address.number')}
                            />
                        </S.BoxInputSelectedClient>
                        <S.BoxInputSelectedClient>
                            <span>Bairro</span>
                            <S.InputSelectedClient
                                value={currentClient.address.neighborhood || ''}
                                onChange={handleInputChange('address.neighborhood')}
                            />
                        </S.BoxInputSelectedClient>
                        <S.BoxInputSelectedClient>
                            <span>CEP</span>
                            <S.InputSelectedClient
                                value={currentClient.address.zipcode || ''}
                                onChange={handleInputChange('address.zipcode')}
                            />
                        </S.BoxInputSelectedClient>
                        <S.BoxInputSelectedClient>
                            <span>Cidade</span>
                            <S.InputSelectedClient
                                value={currentClient.address.city || ""}
                                onChange={handleInputChange('address.city')}
                            />
                        </S.BoxInputSelectedClient>
                        <S.BoxInputSelectedClient>
                            <span>Estado</span>
                            <S.InputSelectedClient
                                value={currentClient.address.state || ""}
                                onChange={handleInputChange('address.state')}
                            />
                        </S.BoxInputSelectedClient>

                        <S.BoxInputSelectedClient>
                            <span>Profissão</span>
                            <S.InputSelectedClient
                                readOnly
                                value={currentClient.profession || ""}
                                onChange={handleInputChange('profession')}
                            />
                        </S.BoxInputSelectedClient>

                        <S.BoxInputSelectedClient>
                            <span>Lucro Padrão do Cliente</span>
                            <S.InputSelectedClient
                                value={currentClient.clientProfit}
                                type="number"
                                onChange={handleInputChange('clientProfit')}
                            />
                        </S.BoxInputSelectedClient>
                        <button className="cancelarBtn" onClick={() => setSelectedClient(null)}>Cancelar e Fechar</button>
                        {isDifferent() && (
                            <button className="salvarBtn" onClick={handleEdit}>
                                Salvar Alterações
                            </button>
                        )}
                    </S.JanelaBox>
                </S.JanelaCliente>
            )}

            <S.ClientsContainer>
                <S.Title>PÁGINA DOS CLIENTES</S.Title>

                <S.Pesquisa>
                    <div className="inputBox">
                        <input
                            placeholder="Pesquise"
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                        <img src="search-icon.png" alt="Search Icon" />
                    </div>
                    <S.FiltrosSecondarios>
                        <S.Filtro>
                            <p>Filtro de Saldo</p>
                            <S.FiltroSelect value={balanceFilter} onChange={(e) => setBalanceFilter(e.target.value)}>
                                <option value="Todos">Todos</option>
                                <option value="Com Dinheiro na plataforma">Com Dinheiro</option>
                                <option value="Sem Dinheiro na plataforma">Sem Dinheiro</option>
                                <option value="+ de R$10.000,00">+ de R$10.000,00</option>
                                <option value="+ de R$20.000,00">+ de R$20.000,00</option>
                                <option value="+ de R$20.000,00">+ de R$20.000,00</option>
                                <option value="+ de R$40.000,00">+ de R$40.000,00</option>
                                <option value="+ de R$50.000,00">+ de R$50.000,00</option>
                                <option value="+ de R$60.000,00">+ de R$60.000,00</option>
                                <option value="+ de R$70.000,00">+ de R$70.000,00</option>
                                <option value="+ de R$80.000,00">+ de R$80.000,00</option>
                                <option value="+ de R$90.000,00">+ de R$90.000,00</option>
                                <option value="+ de R$100.000,00">+ de R$100.000,00</option>
                            </S.FiltroSelect>
                        </S.Filtro>

                        <S.Filtro>
                            <p>Filtro de Estado</p>
                            <S.FiltroSelect value={stateFilter} onChange={(e) => setStateFilter(e.target.value)}>
                                {helpers.estados.map((estado, index) => (
                                    <option key={index} value={estado}>{estado}</option>
                                ))}
                            </S.FiltroSelect>
                        </S.Filtro>

                        <S.Filtro>
                            <p>Ordenar</p>
                            <S.FiltroSelect value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                                <option value="Crescente">Crescente</option>
                                <option value="Descrescente">Descrescente</option>
                            </S.FiltroSelect>
                        </S.Filtro>
                    </S.FiltrosSecondarios>
                </S.Pesquisa>

                <S.TabelaDeClientes>
                    <TabelaGeral columns={columns} data={currentItems} type="clients" setSelectedThing={setSelectedClient} />
                </S.TabelaDeClientes>

                <S.Pagination>
                    <button onClick={handlePrevPage} disabled={currentPage === 1}>Anterior</button>
                    <span>Página {currentPage} de {totalPages}</span>
                    <button onClick={handleNextPage} disabled={currentPage === totalPages}>Próximo</button>
                </S.Pagination>
            </S.ClientsContainer>
        </>
    );
}