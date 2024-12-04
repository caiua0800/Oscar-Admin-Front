import React, { useEffect, useState, useContext } from "react";
import * as S from "./TransacoesStyle";
import TabelaGeral from "../TabelaGeral/TabelaGeral";
import { AuthContext } from "../../Context/AuthContext";
import helpers from "../../helpers";
import { useLoad } from "../../Context/LoadContext";

export default function Transacoes() {
    const { extracts, clients } = useContext(AuthContext);
    const {startLoading, stopLoading} = useLoad();

    useEffect(() => {
        startLoading()
        setTimeout(stopLoading, 1200);
    }, [clients, extracts])

    const columns = [
        { name: "ID", value: "extractId" },
        { name: "TIPO", value: "name" },
        { name: "CLIENTE", value: "clientName", formatFunction: helpers.handleDesconhecido },
        { name: "ID CLIENTE", value: "clientId" },
        { name: "VALOR", value: "totalAmount", insertStart: "R$ ", formatFunction: helpers.formatNumberToCurrency }
    ];

    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [nullThing, setNullThing] = useState(1);
    const itemsPerPage = 10;
    const [sortOrder, setSortOrder] = useState("Descrescente"); 


    useEffect(() => {
        const formattedData = extracts.map(extract => {
            const client = clients.find(client => client.id === extract.clientId);
            const clientName = client ? client.name : "Desconhecido"; 

            return {
                ...extract,
                clientName: clientName,
            };
        });

        formattedData.sort((a, b) => {
            const idA = a.extractId.replace(/[^\d]/g, ''); 
            const idB = b.extractId.replace(/[^\d]/g, '');

            // Compara como números
            return sortOrder === "Crescente" 
                ? parseInt(idA) - parseInt(idB)
                : parseInt(idB) - parseInt(idA); 
        });

        setData(formattedData);
    }, [extracts, clients, sortOrder]);

    // Filtra os dados com base no termo de pesquisa
    const filteredData = data.filter(transacao => {
        return Object.values(transacao).some(value =>
            value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

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
        setSearchTerm(event.target.value);
        setCurrentPage(1); // Reseta para a primeira página ao pesquisar
    };

    return (
        <>
            <S.TransacoesContainer>
                <S.Title>PÁGINA DAS TRANSAÇÕES</S.Title>

                <S.Pesquisa>
                    <div className="inputBox">
                        <input
                            placeholder="Pesquise"
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                        <img src="search-icon.png" alt="Search Icon" />
                    </div>
                </S.Pesquisa>

                <S.FiltrosSecondarios>
                    <S.Filtro>
                        <p>Ordenar</p>
                        <S.FiltroSelect value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                            <option value="Crescente">Crescente</option>
                            <option value="Descrescente">Descrescente</option>
                        </S.FiltroSelect>
                    </S.Filtro>
                </S.FiltrosSecondarios>

                <S.TabelaDeTransacoes>
                    <TabelaGeral columns={columns} data={currentItems} type="extracts" setSelectedThing={setNullThing} />
                </S.TabelaDeTransacoes>

                <S.Pagination>
                    <button onClick={handlePrevPage} disabled={currentPage === 1}>Anterior</button>
                    <span>Página {currentPage} de {totalPages}</span>
                    <button onClick={handleNextPage} disabled={currentPage === totalPages}>Próximo</button>
                </S.Pagination>
            </S.TransacoesContainer>
        </>
    );
}