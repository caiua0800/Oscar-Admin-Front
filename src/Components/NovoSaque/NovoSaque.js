import React, { useContext, useEffect, useState } from "react";
import * as S from "./NovoSaqueStyle";
import { AuthContext } from "../../Context/AuthContext";
import helpers from "../../helpers";
import { useLoad } from "../../Context/LoadContext";

export default function NovoSaque() {
    const { clients, purchases } = useContext(AuthContext);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedClient, setSelectedClient] = useState(null);
    const [filteredClients, setFilteredClients] = useState([]);
    const [amountDesired, setAmountDesired] = useState(0);
    const {startLoading, stopLoading} = useLoad();
    
    useEffect(() => {
        startLoading()
        setTimeout(stopLoading, 500);
    }, [clients])

    const handleSearchChange = (event) => {
        const value = event.target.value.toLowerCase();
        setSearchTerm(value);
        const filtered = clients.filter(client => (
            client.name.toLowerCase().includes(value) || client.id.toString().includes(value)
        ));
        setFilteredClients(filtered);
    };


    const handleClientSelect = (client) => {
        setSelectedClient(client);
        setSearchTerm("");
        setFilteredClients([]);

        const purchasesObjects = client.walletExtract && client.walletExtract.purchases ?
            client.walletExtract.purchases.map(purchaseId => {
                return purchases.find(purchase =>
                    purchase.purchaseId === purchaseId &&
                    purchase.currentIncome - purchase.amountWithdrawn > 0
                );
            }).filter(Boolean) : [];

        setSelectedClient({ ...client, purchasesObjects });
    };

    const handleCreateWithdrawal = async () => {
        if (!selectedClient) {
            alert("Selecione um cliente antes de criar o saque.");
            console.log("Selecione um cliente antes de criar o saque.");
            return;
        }

        if (amountDesired < 0 || amountDesired > (selectedClient.balance - selectedClient.blockedBalance)) {
            alert("Valor Indisponível.");
            console.log("Valor Indisponível.");
            return;
        }

        startLoading();

        const res = await helpers.novoSaque(selectedClient.id, amountDesired);

        if(res){
            setSelectedClient(null);
            alert("Saque criado com sucesso. 👍🏻");
        }else{
            alert("Erro ao realizar saque!");
        }
        setTimeout(stopLoading, 500);

    };


    return (
        <S.CadastroContainer>
            <S.Title>CRIAR NOVO SAQUE</S.Title>

            <S.SearchClient
                placeholder="Pesquise pelo cliente"
                value={searchTerm}
                onChange={handleSearchChange}
            />

            {searchTerm && filteredClients.length > 0 && (
                <S.ClientesPesquisados>
                    {filteredClients.map(client => (
                        <S.clientSearched
                            key={client.id}
                            onClick={() => handleClientSelect(client)}
                        >
                            {client.name} === ID: {client.id}
                        </S.clientSearched>
                    ))}
                </S.ClientesPesquisados>
            )}

            {selectedClient && (
                <S.ConteudoCadastro>
                    <S.Informacao>
                        <span>Nome do Cliente</span>
                        <input placeholder="Cliente" value={selectedClient.name} readOnly />
                    </S.Informacao>

                    <S.Informacao>
                        <span>Saldo Bloqueado</span>
                        <input
                            value={selectedClient.blockedBalance || 0}
                            type="number"
                            placeholder="Valor"
                            readOnly
                            disabled
                        />
                    </S.Informacao>

                    <S.Informacao>
                        <span>Saldo Carteira</span>
                        <input
                            value={(selectedClient.balance).toFixed(2) || 0}
                            type="number"
                            placeholder="Valor"
                        />
                    </S.Informacao>

                    <S.Informacao>
                        <span>Saldo Extra</span>
                        <input
                            value={(selectedClient.extraBalance).toFixed(2) || 0}
                            type="number"
                            placeholder="Valor"
                        />
                    </S.Informacao>

                    <S.Informacao>
                        <span>Saldo Disponível</span>
                        <input
                            value={(selectedClient.balance + selectedClient.extraBalance - (selectedClient.blockedBalance || 0)).toFixed(2) || 0}
                            type="number"
                            placeholder="Valor"
                            readOnly
                            disabled
                        />
                    </S.Informacao>

                    <S.InformacaoSelecione>
                        <span>Selecione o valor que deseja sacar:</span>

                        <input value={amountDesired} onChange={(e) => setAmountDesired(e.target.value)} placeholder="Valor à Sacar" type="number" />
                    </S.InformacaoSelecione>

                    <S.ButtonConfirmar onClick={handleCreateWithdrawal}>
                        CRIAR SAQUE
                    </S.ButtonConfirmar>
                </S.ConteudoCadastro>
            )}
        </S.CadastroContainer>
    );
}
