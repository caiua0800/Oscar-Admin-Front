import React, { useEffect, useState, useContext } from "react";
import * as S from "./ContratosStyle";
import TabelaGeral from "../TabelaGeral/TabelaGeral";
import helpers from "../../helpers";
import { AuthContext } from "../../Context/AuthContext";
import AdicionarSaldo from "./Funcoes/AdicionarSaldo/AdicionarSaldo";
import AnteciparLucro from "./Funcoes/AnteciparLucro/AnteciparLucro";
import CancelarContrato from "./Funcoes/CancelarContrato/CancelarContrato";
import { useLoad } from "../../Context/LoadContext";


export default function Contratos({ setActiveTab, handleSelectClient }) {
    const { purchases, clients, editarContract } = useContext(AuthContext);
    const [data, setData] = useState([]);
    const [selectedContract, setSelectedContract] = useState(null);
    const [editableContract, setEditableContract] = useState(null);
    const [adicionarSaldoSelecionado, setAdicionarSaldoSelecionado] = useState(false);
    const [anteciparLucroSelecionado, setAnteciparLucroSelecionado] = useState(false);
    const [cancelarContratoSelecionado, setCancelarContratoSelecionado] = useState(false);
    const [showOptionsMenu, setShowOptionsMenu] = useState(false);
    const { startLoading, stopLoading } = useLoad();

    const columns = [
        { name: "ID", value: "purchaseId" },
        { name: "CLIENTE", value: "clientName" },
        { name: "PRODUTO", value: "productName" },
        { name: "VALOR TOTAL", value: "totalPrice", insertStart: "R$ ", formatFunction: helpers.formatNumberToCurrency },
        { name: "VALOR PAGO", value: "amountPaid", insertStart: "R$ ", formatFunction: helpers.formatNumberToCurrency },
        { name: "LUCRO ATUAL", value: "currentIncome", insertStart: "R$", formatFunction: helpers.formatNumberToCurrency },
        { name: "LUCRO DISP.", value: "amountAvaliable", insertStart: "R$ ", formatFunction: helpers.formatNumberToCurrency },
        { name: "DATA COMPRA", value: "purchaseDate" },
        { name: "DATA FINALIZAÇÃO", value: "endContractDate" },
        { name: "GANHO FINAL", value: "finalIncome", insertStart: "R$ ", formatFunction: helpers.formatNumberToCurrency },
        { name: "STATUS", value: "status" }
    ];

    useEffect(() => {
        startLoading()
        setTimeout(stopLoading, 1200);
    }, [purchases])


    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [statusFilter, setStatusFilter] = useState("Todos");
    const [productNameFilter, setProductNameFilter] = useState("Todos");
    const [sortOrder, setSortOrder] = useState("Crescente");
    const [campoParaOrdenar, setCampoParaOrdenar] = useState("purchaseDate");
    const itemsPerPage = 10;


    useEffect(() => {
        const formattedData = purchases.map(purchase => {
            const client = clients.find(client => client.id === purchase.clientId);
            const clientName = client ? client.name : "Desconhecido";
            const clientBlockedBalance = client ? client.blockedBalance : 0;
            const clientBalance = client ? client.balance : 0;

            return {
                purchaseId: purchase.purchaseId,
                clientBlockedBalance: clientBlockedBalance,
                clientBalance: clientBalance,
                clientName: clientName,
                clientId: purchase.clientId,
                coin: purchase.coin,
                type: purchase.type,
                unityPrice: purchase.unityPrice,
                quantity: purchase.quantity,
                discount: purchase.quantity,
                productName: purchase.productName,
                withdrawInterval: purchase.withdrawInterval,
                description: purchase.description,
                totalPrice: purchase.totalPrice.toFixed(2),
                productName: purchase.productName,
                amountPaid: purchase.amountPaid,
                percentageProfit: purchase.percentageProfit,
                currentIncome: purchase.currentIncome.toFixed(2),
                amountWithdrawn: purchase.amountWithdrawn.toFixed(2),
                amountAvaliable: (parseFloat(purchase.currentIncome) - parseFloat(purchase.amountWithdrawn)).toFixed(2),
                purchaseDate: new Date(purchase.purchaseDate).toLocaleDateString("pt-BR"),
                endContractDate: new Date(purchase.endContractDate).toLocaleDateString("pt-BR"),
                finalIncome: purchase.finalIncome.toFixed(2),
                ticketId: purchase.ticketId,
                ticketPayment: purchase.ticketPayment,
                qrCode: purchase.qrCode,
                qrCodeBase64: purchase.qrCodeBase64,
                status: purchase.status === 1 ? "Pendente" :
                    purchase.status === 2 ? "Valorizando" :
                        purchase.status === 3 ? "Finalizado" :
                            purchase.status === 4 ? "Cancelado" : "Desconhecido"
            };
        });

        setData(formattedData);
    }, [purchases, clients]);


    const handleSearchChange = (event) => {
        const value = event.target.value.toLowerCase();
        setSearchTerm(value);
        setCurrentPage(1);
    };

    const filterAndSortData = () => {
        let filteredData = data.filter(row => {
            const statusMatch = statusFilter === "Todos" ||
                (statusFilter === "Pendente" && row.status === "Pendente") ||
                (statusFilter === "Valorizando" && row.status === "Valorizando") ||
                (statusFilter === "Finalizado" && row.status === "Finalizado") ||
                (statusFilter === "Cancelado" && row.status === "Cancelado");

            const searchMatch = Object.values(row).some(cell => typeof cell === 'string' && cell.toLowerCase().includes(searchTerm));

            const productMatch = productNameFilter === "Todos" || row.productName.toLowerCase().trim().includes(productNameFilter.toLowerCase().trim());

            return statusMatch && searchMatch && productMatch;
        });

        filteredData.sort((a, b) => {
            let comparison = 0;
            if (campoParaOrdenar === "purchaseId") {
                comparison = a.purchaseId.localeCompare(b.purchaseId);
            } else if (campoParaOrdenar === "purchaseDate") {
                const dateA = new Date(a.purchaseDate).getTime(); // Convertendo para timestamp
                const dateB = new Date(b.purchaseDate).getTime(); // Convertendo para timestamp
                comparison = dateA - dateB; // Compara as datas
            }

            return sortOrder === "Crescente" ? comparison : -comparison;
        });

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

    const handleContractSelect = (contract) => {
        setSelectedContract(contract);
        setEditableContract({ ...contract }); // Inicializa o estado editável com os dados do contrato selecionado
    };

    const handleChange = (field, value) => {
        setEditableContract(prev => ({
            ...prev,
            [field]: value,
        }));
    };

    const isDataChanged = () => {
        return JSON.stringify(selectedContract) !== JSON.stringify(editableContract);
    };

    const handleEdit = async () => {

        const success = await helpers.editarContrato(editableContract);

        if (success) {
            setData(prevData => {
                return prevData.map(item =>
                    item.purchaseId === editableContract.purchaseId ? {
                        ...editableContract,
                        purchaseDate: new Date(editableContract.purchaseDate).toLocaleDateString("pt-BR"),
                        endContractDate: new Date(editableContract.endContractDate).toLocaleDateString("pt-BR"),
                        status: editableContract.status === 1 ? "Pendente" :
                            editableContract.status === 2 ? "Valorizando" :
                                editableContract.status === 3 ? "Finalizado" : "Desconhecido"
                    } : item
                );
            });
            setSelectedContract(null);
            alert("Contrato atualizado com sucesso!");
        } else {
            alert("Erro ao atualizar contrato!");
        }
    };


    const handleEditStatus = async (newStatus) => {
        const success = await helpers.editarStatusContrato(selectedContract.purchaseId, newStatus);

        if (success) {
            setData(prevData => {
                return prevData.map(item =>
                    item.purchaseId === editableContract.purchaseId ? {
                        ...editableContract,
                        status: editableContract.status === 1 ? "Pendente" :
                            editableContract.status === 2 ? "Valorizando" :
                                editableContract.status === 3 ? "Finalizado" :
                                    editableContract.status === 4 ? "Cancelado" : "Atualizando..."
                    } : item
                );
            });
            setSelectedContract(null);
            alert(`Contrato ${newStatus === 2 ? "aceito" : "negado"} com sucesso!`);
        } else {
            alert("Erro ao atualizar status!");
        }
    }

    const handleSelectClientFK = (id) => {
        setActiveTab(1);
        const client = clients.find(clientS => clientS.id === id);
        handleSelectClient(client);
    };


    return (
        <>
            {selectedContract && (
                <S.JanelaCliente>
                    <S.JanelaBox>
                        <S.ContractServices onMouseEnter={() => setShowOptionsMenu(true)} onMouseLeave={() => setShowOptionsMenu(false)}>
                            <img src="tools-icon.png" />
                            <div
                                className="options">
                                <p>Opções</p>
                                {showOptionsMenu && (
                                    <S.MenuOptions show={showOptionsMenu}>
                                        <S.Op onClick={() => setAdicionarSaldoSelecionado(true)}>
                                            <img src="option-icon.png" />
                                            <span>ADICIONAR SALDO AO CONTRATO</span>
                                        </S.Op>
                                        <S.Op onClick={() => setAnteciparLucroSelecionado(true)}>
                                            <img src="option-icon.png" />
                                            <span>ANTECIPAR LUCRO</span>
                                        </S.Op>
                                        <S.Op onClick={() => setCancelarContratoSelecionado(true)}>
                                            <img src="option-icon.png" />
                                            <span>CANCELAR CONTRATO</span>
                                        </S.Op>
                                        <S.Op>
                                            <img src="option-icon.png" />
                                            <span>REALIZAR RECOMPRA</span>
                                        </S.Op>
                                    </S.MenuOptions>
                                )}
                            </div>
                        </S.ContractServices>

                        <S.Title onClick={() => { setActiveTab(0) }}>Painel do Contrato</S.Title>

                        <S.BoxInputSelectedClient>

                            <div className="firstItem">
                                <span>ID</span>
                                <S.InputSelectedClient
                                    value={editableContract.purchaseId}
                                    placeholder="ID"
                                    readOnly
                                />
                            </div>
                        </S.BoxInputSelectedClient>

                        <S.BoxInputSelectedClient onClick={() => { handleSelectClientFK(editableContract.clientId) }}>
                            <div className="firstItem">
                                <span>Cliente</span>
                                <S.InputSelectedClient
                                    value={editableContract.clientName}
                                    placeholder="Cliente"
                                    readOnly
                                />
                            </div>
                            <button onClick={() => handleSelectClientFK(editableContract.clientId)}>
                                <img alt="mais informações" src="./clientInfo-blue-icon.png" />
                            </button>
                        </S.BoxInputSelectedClient>

                        <S.BoxInputSelectedClient>
                            <div className="firstItem">
                                <span>Valor Total</span>
                                <S.InputSelectedClient
                                    value={helpers.formatNumberToCurrency(editableContract.totalPrice)}
                                    placeholder="Valor Total"
                                    readOnly
                                    onChange={(e) => handleChange('totalPrice', e.target.value)}
                                />
                            </div>

                        </S.BoxInputSelectedClient>

                        <S.BoxInputSelectedClient>
                            <div className="firstItem">
                                <span>Valor Pago</span>
                                <S.InputSelectedClient
                                    value={helpers.formatNumberToCurrency(editableContract.amountPaid)}
                                    placeholder="Valor Pago"
                                    readOnly
                                    onChange={(e) => handleChange('amountPaid', e.target.value)}
                                />
                            </div>

                        </S.BoxInputSelectedClient>

                        <S.BoxInputSelectedClient>

                            <div className="firstItem">
                                <span>Lucro Atual</span>
                                <S.InputSelectedClient
                                    value={helpers.formatNumberToCurrency(editableContract.currentIncome)}
                                    placeholder="Lucro Atual"
                                    readOnly
                                    onChange={(e) => handleChange('currentIncome', e.target.value)}
                                />
                            </div>

                        </S.BoxInputSelectedClient>

                        <S.BoxInputSelectedClient>
                            <div className="firstItem">
                                <span>Rend. Atual</span>
                                <S.InputSelectedClient
                                    value={helpers.formatNumberToCurrency(helpers.formatNumberToCurrency((editableContract.currentIncome / (editableContract.totalPrice * 1.5) * 100))) + "%"}
                                    placeholder="Rendimento Atual"
                                    readOnly
                                />
                            </div>

                        </S.BoxInputSelectedClient>

                        <S.BoxInputSelectedClient>

                            <div className="firstItem">
                                <span>Data Compra</span>
                                <S.InputSelectedClient
                                    value={editableContract.purchaseDate}
                                    placeholder="Data Compra"
                                    readOnly
                                />
                            </div>

                        </S.BoxInputSelectedClient>

                        <S.BoxInputSelectedClient>

                            <div className="firstItem">
                                <span>Data Finalização</span>
                                <S.InputSelectedClient
                                    value={editableContract.endContractDate}
                                    placeholder="Data Finalização"
                                    readOnly
                                />
                            </div>

                        </S.BoxInputSelectedClient>

                        <S.BoxInputSelectedClient>

                            <div className="firstItem">
                                <span>Lucro Final</span>
                                <S.InputSelectedClient
                                    className="editable"
                                    value={(editableContract.finalIncome)}
                                    placeholder="Rendimento Final"
                                    onChange={(e) => handleChange('finalIncome', e.target.value)}
                                />
                            </div>

                        </S.BoxInputSelectedClient>

                        <S.BoxInputSelectedClient>

                            <div className="firstItem">
                                <span>Status</span>
                                {editableContract.status === "Pendente" ? (
                                    <S.AceitarNegar>
                                        <button onClick={() => handleEditStatus(4)} className="negar">Negar</button>
                                        <button onClick={() => handleEditStatus(2)} className="aceitar">Aceitar</button>
                                    </S.AceitarNegar>
                                ) : (
                                    <>
                                        <S.InputSelectedClient
                                            value={editableContract.status}
                                            placeholder="Status"
                                            readOnly
                                        />
                                    </>
                                )}
                            </div>

                        </S.BoxInputSelectedClient>

                        <button className="cancelarBtn" onClick={() => setSelectedContract(null)}>Fechar</button>
                        {isDataChanged() && (
                            <button className="salvarBtn" onClick={() => handleEdit()}>Salvar Alterações</button>
                        )}
                    </S.JanelaBox>
                </S.JanelaCliente>
            )}

            {adicionarSaldoSelecionado && selectedContract && (
                <AdicionarSaldo selectedContract={selectedContract} setAdicionarSaldoSelecionado={setAdicionarSaldoSelecionado} setSelectedContract={setSelectedContract} />
            )}

            {anteciparLucroSelecionado && selectedContract && (
                <AnteciparLucro selectedContract={selectedContract} setAnteciparLucroSelecionado={setAnteciparLucroSelecionado} setSelectedContract={setSelectedContract} />
            )}

            {cancelarContratoSelecionado && selectedContract && (
                <CancelarContrato selectedContract={selectedContract} setCancelarContrato={setCancelarContratoSelecionado} setSelectedContract={setSelectedContract} />
            )}

            <S.ClientsContainer>

                <S.Title>PÁGINA DOS CONTRATOS</S.Title>

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
                            <p>Status do Contrato</p>
                            <S.FiltroSelect value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                                <option value="Todos">Todos</option>
                                <option value="Pendente">Pendente</option>
                                <option value="Valorizando">Valorizando</option>
                                <option value="Finalizado">Finalizado</option>
                                <option value="Cancelado">Cancelado</option>
                            </S.FiltroSelect>
                        </S.Filtro>

                        <S.Filtro>
                            <p>Nome do Produto</p>
                            <S.FiltroSelect value={productNameFilter} onChange={(e) => setProductNameFilter(e.target.value)}>
                                <option value="Todos">Todos</option>
                                <option value="Advanced">Contrato Advanced</option>
                                <option value="Colaborative">Contrato Colaborative</option>
                                <option value="Introducer">Contrato Introducer</option>
                                <option value="Personalizado">Contrato Personalizado</option>
                            </S.FiltroSelect>
                        </S.Filtro>

                        <S.Filtro>
                            <p>Campo para Ordenar</p>
                            <S.FiltroSelect value={campoParaOrdenar} onChange={(e) => setCampoParaOrdenar(e.target.value)}>
                                <option value="purchaseDate">Data da Compra</option>
                                <option value="purchaseId">ID</option>
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

                <S.QuantidadeTotal>{currentItems.length > 1 ? currentItems.length + " CONTRATOS" : currentItems.length === 0 ? "0 CONTRATOS" : currentItems.length + " CONTRATO"}</S.QuantidadeTotal>

                <S.TabelaDeContratos>
                    <TabelaGeral columns={columns} data={currentItems} type="contracts" setSelectedThing={handleContractSelect} />
                </S.TabelaDeContratos>

                <S.Pagination>
                    <button onClick={handlePrevPage} disabled={currentPage === 1}>Anterior</button>
                    <span>Página {currentPage} de {totalPages}</span>
                    <button onClick={handleNextPage} disabled={currentPage === totalPages}>Próximo</button>
                </S.Pagination>
            </S.ClientsContainer>
        </>
    );
}





