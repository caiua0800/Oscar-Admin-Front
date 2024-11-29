import React, { useContext, useState } from "react";
import * as S from "./NovaCompraStyle";
import { AuthContext } from "../../Context/AuthContext";
import helpers from "../../helpers";

export default function NovaCompra() {
    const { clients, adicionarContract } = useContext(AuthContext);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedClient, setSelectedClient] = useState(null);
    const [filteredClients, setFilteredClients] = useState([]);
    const [valorUniContrato, setValorUniContrato] = useState(100);
    const [desconto, setDesconto] = useState(0);
    const [porcentagemDeLucro, setPorcentagemDeLucro] = useState(150);
    const [quantidaDeMeses, setQuantidaDeMeses] = useState(36);
    const [quantidadeContratos, setQuantidadeContratos] = useState(0);

    const handleSearchChange = (event) => {
        const value = event.target.value.toLowerCase();
        setSearchTerm(value);

        const filtered = clients.filter(client => {
            return (
                client.name.toLowerCase().includes(value) ||
                client.id.toString().includes(value)
            );
        });
        setFilteredClients(filtered);
    };

    const handleClientSelect = (client) => {
        if (client.status === 2)
            return alert(`A conta do cliente ${client.name} foi encerrada`);
        setSelectedClient(client);
        setPorcentagemDeLucro(client.clientProfit * 100 || 0);
        setSearchTerm("");
        setFilteredClients([]);
    };

    const handleCreate = async () => {

        const currentDate = new Date();
        const quantidadeMeses = parseInt(quantidaDeMeses);
        currentDate.setMonth(currentDate.getMonth() + quantidadeMeses);
        const brasiliaOffset = -3;
        const brasiliaDate = new Date(currentDate.getTime() + brasiliaOffset * 60 * 60 * 1000);
        const endContractDate = brasiliaDate.toISOString();

        const res = await helpers.novoContrato({
            clientId: selectedClient.id,
            quantity: quantidadeContratos,
            discount: parseFloat(desconto) / 100,
            percentageProfit: parseFloat(porcentagemDeLucro) / 100,
            unityPrice: parseFloat(valorUniContrato),
            endContractDate: endContractDate,
        });

        if (res) {
            console.log("Criado com sucesso");
            adicionarContract();
        } else {
            console.log("Erro ao criar");
        }
    }

    return (
        <S.CadastroContainer>
            <S.Title>CRIAR NOVO CONTRATO</S.Title>

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
                            style={{ color: client.status === 2 ? "red" : "white", cursor: client.status === 2 ? "default" : "pointer" }}
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
                        <input placeholder="Cliente" value={selectedClient.name} />
                    </S.Informacao>
                    <S.Informacao>
                        <span>Valor Unitário do Contrato</span>
                        <input value={valorUniContrato} onChange={(e) => setValorUniContrato(e.target.value)} type="number" placeholder="Valor" />
                    </S.Informacao>
                    <S.Informacao>
                        <span>Desconto</span>
                        <input value={desconto} onChange={(e) => setDesconto(e.target.value)} type="number" placeholder="Desconto" />
                    </S.Informacao>

                    <S.Informacao>
                        <span>Quantidade de Contratos</span>
                        <input value={quantidadeContratos} onChange={(e) => setQuantidadeContratos(e.target.value)} type="number" placeholder="Quantidade de Contratos" />
                    </S.Informacao>
                    <S.Informacao>
                        <span>Porcentagem de Lucro</span>
                        <input value={porcentagemDeLucro} onChange={(e) => setPorcentagemDeLucro(e.target.value)} type="number" placeholder="Porcentagem de Lucro" />
                    </S.Informacao>
                    <S.Informacao>
                        <span>Meses do Contrato</span>
                        <input value={quantidaDeMeses} onChange={(e) => setQuantidaDeMeses(e.target.value)} type="number" placeholder="Ex: 6" />
                    </S.Informacao>

                    <S.ButtonConfirmar onClick={handleCreate}>
                        CRIAR COMPRA
                    </S.ButtonConfirmar>
                </S.ConteudoCadastro>
            )}
        </S.CadastroContainer>
    )
}