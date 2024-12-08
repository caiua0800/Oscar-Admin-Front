import React, { useEffect, useState, useContext } from "react";
import * as S from "./SaquesStyle";
import TabelaGeral from "../TabelaGeral/TabelaGeral";
import { AuthContext } from "../../Context/AuthContext";
import helpers from "../../helpers";
import { useLoad } from "../../Context/LoadContext";

export default function Saques({ setActiveTab, handleSelectClient }) {
    const { withdrawals, clients, atualizarSaque } = useContext(AuthContext);
    const { startLoading, stopLoading, stopLoadingDelay } = useLoad();

    useEffect(() => {
        startLoading()
        setTimeout(stopLoading, 1200);
    }, [clients, withdrawals])

    const columns = [
        { name: "ID", value: "withdrawalId" },
        { name: "CLIENTE", value: "clientName" },
        { name: "VALOR TOTAL", value: "totalWithdrawn", insertStart: "R$ " },
        { name: "VALOR RECEBÍVEL", value: "receivableAmount", insertStart: "R$ " },
        { name: "RETIRADO DE", value: "itemsId" },
        { name: "DATA", value: "dateCreated" },
        { name: "AGÊNCIA", value: "agency" },
        { name: "CONTA", value: "account" },
        { name: "TIPO DE CONTA", value: "accountType" },
        { name: "CHAVE PIX", value: "pixKey" },
        { name: "STATUS", value: "status" }
    ];


    const [searchTerm, setSearchTerm] = useState("");
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [statusFilter, setStatusFilter] = useState("Todos");
    const [selectedWithdrawal, setSelectedWithdrawal] = useState(null);
    const [sortOrder, setSortOrder] = useState("Crescente");
    const itemsPerPage = 10;

    const returnStr = (arra) => {
        if (arra && arra.length > 0) {
            return arra.join(", ");
        }
        return ""; 
    }


    useEffect(() => {
        const formattedData = withdrawals.map(withdrawal => {
            const client = clients.find(client => client.id === withdrawal.clientId);
            const clientName = client ? client.name : "Desconhecido";
            const clientId = client ? client.id : null;
            const formattedDate = new Date(withdrawal.dateCreated).toLocaleDateString("pt-BR");

            return {
                withdrawalId: withdrawal.withdrawalId,
                clientName: clientName,
                clientId: clientId,
                totalWithdrawn: (withdrawal.amountWithdrawn || 0).toFixed(2),
                receivableAmount: ((withdrawal.amountWithdrawn - (withdrawal.amountWithdrawn * 0.04)) || 0).toFixed(2),
                dateCreated: formattedDate,
                itemsId: returnStr(withdrawal.withdrawnItems),
                agency: withdrawal.agency || "N/A",
                account: withdrawal.account || "N/A",
                accountType: withdrawal.accountType || "N/A",
                pixKey: withdrawal.pixKey || "N/A",
                status: withdrawal.status === 1 ? "Pendente" :
                    withdrawal.status === 2 ? "Pago" :
                        withdrawal.status === 3 ? "Cancelado" : "Desconhecido"
            };
        });
        setData(formattedData);
    }, [withdrawals, clients]);

    const handleSearchChange = (event) => {
        const value = event.target.value.toLowerCase();
        setSearchTerm(value);
        setCurrentPage(1);
    };

    const filterAndSortData = () => {
        let filteredData = data.filter(row => {
            const statusMatch = statusFilter === "Todos" ||
                row.status === statusFilter;
            const searchMatch = Object.values(row).some(cell => (cell || '').toString().toLowerCase().includes(searchTerm));

            return statusMatch && searchMatch;
        });

        if (sortOrder === "Crescente") {
            filteredData.sort((a, b) => a.withdrawalId - b.withdrawalId);
        } else {
            filteredData.sort((a, b) => b.withdrawalId - a.withdrawalId);
        }

        return filteredData;
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filterAndSortData().slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(data.length / itemsPerPage);

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

    const handleEditSaque = async (id, newstatus) => {
        if (id && newstatus) {
            startLoading();
            const res = await helpers.editarStatusSaque(id, newstatus);

            if (res) {
                stopLoadingDelay();

                alert(`Saque ${newstatus === 2 ? "pago" : "negado"} com sucesso.`);
                atualizarSaque();
            }
        }
    }

    const handleSelectClientFK = (id) => {
        setActiveTab(1);
        const client = clients.find(clientS => clientS.id === id);
        handleSelectClient(client);
    };


    return (
        <>
            {selectedWithdrawal && (
                <S.JanelaCliente>
                    <S.JanelaBox>
                        <S.Title>Painel do Saque</S.Title>
                        <S.BoxInputSelectedClient>
                            <div className="firstItem">
                                <span>ID</span>
                                <S.InputSelectedClient value={selectedWithdrawal.withdrawalId} placeholder="ID" readOnly />
                            </div>

                        </S.BoxInputSelectedClient>
                        <S.BoxInputSelectedClient>
                            <div className="firstItem">
                                <span>Cliente</span>
                                <S.InputSelectedClient value={selectedWithdrawal.clientName} placeholder="Cliente" readOnly />
                            </div>
                            <button onClick={() => handleSelectClientFK(selectedWithdrawal.clientId)}>
                                <img alt="mais informações" src="./clientInfo-blue-icon.png" />
                            </button>
                        </S.BoxInputSelectedClient>
                        <S.BoxInputSelectedClient>
                            <div className="firstItem">
                                <span>Valor Total</span>
                                <S.InputSelectedClient value={`R$ ${selectedWithdrawal.totalWithdrawn}`} placeholder="Valor Total" readOnly />
                            </div>

                        </S.BoxInputSelectedClient>
                        <S.BoxInputSelectedClient>
                            <div className="firstItem">
                                <span>Valor Recebível</span>
                                <S.InputSelectedClient value={`R$ ${selectedWithdrawal.receivableAmount}`} placeholder="Valor Recebível" readOnly />
                            </div>

                        </S.BoxInputSelectedClient>
                        <S.BoxInputSelectedClient>
                            <div className="firstItem">
                                <span>Agência</span>
                                <S.InputSelectedClient value={selectedWithdrawal.agency} placeholder="Agência" readOnly />
                            </div>

                        </S.BoxInputSelectedClient>
                        <S.BoxInputSelectedClient>
                            <div className="firstItem">
                                <span>Conta</span>
                                <S.InputSelectedClient value={selectedWithdrawal.account} placeholder="Conta" readOnly />
                            </div>

                        </S.BoxInputSelectedClient>
                        <S.BoxInputSelectedClient>
                            <div className="firstItem">
                                <span>Tipo de Conta</span>
                                <S.InputSelectedClient value={selectedWithdrawal.accountType} placeholder="Tipo de Conta" readOnly />
                            </div>

                        </S.BoxInputSelectedClient>
                        <S.BoxInputSelectedClient>
                            <div className="firstItem">
                                <span>Chave PIX</span>
                                <S.InputSelectedClient value={selectedWithdrawal.pixKey} placeholder="Chave PIX" readOnly />
                            </div>

                        </S.BoxInputSelectedClient>
                        <S.BoxInputSelectedClient>
                            <div className="firstItem">
                                <span>Status</span>
                                <S.InputSelectedClient value={selectedWithdrawal.status} placeholder="Status" readOnly />
                            </div>

                        </S.BoxInputSelectedClient>
                        <button className="cancelarBtn" onClick={() => setSelectedWithdrawal(null)}>Fechar</button>

                        {selectedWithdrawal.status === "Pendente" && (
                            <>
                                <button className="cancelarBtn" onClick={() => { setSelectedWithdrawal(null); handleEditSaque(selectedWithdrawal.withdrawalId, 3) }}>Negar e Fechar</button>
                                <button className="salvarBtn" onClick={() => { setSelectedWithdrawal(null); handleEditSaque(selectedWithdrawal.withdrawalId, 2) }}>Aceitar e Fechar</button>
                            </>
                        )}

                    </S.JanelaBox>
                </S.JanelaCliente>
            )}

            <S.SaquesContainer>
                <S.Title>PÁGINA DOS SAQUES</S.Title>

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
                            <p>Status do Saque</p>
                            <S.FiltroSelect value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                                <option value="Todos">Todos</option>
                                <option value="Pago">Pagos</option>
                                <option value="Pendente">Pendentes</option>
                                <option value="Cancelado">Cancelado</option>
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

                <S.TabelaDeSaques>
                    <TabelaGeral columns={columns} data={currentItems} type="withdrawals" setSelectedThing={setSelectedWithdrawal} />
                </S.TabelaDeSaques>

                <S.Pagination>
                    <button onClick={handlePrevPage} disabled={currentPage === 1}>Anterior</button>
                    <span>Página {currentPage} de {totalPages}</span>
                    <button onClick={handleNextPage} disabled={currentPage === totalPages}>Próximo</button>
                </S.Pagination>
            </S.SaquesContainer>
        </>
    );
}