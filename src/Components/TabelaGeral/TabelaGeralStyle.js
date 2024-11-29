import styled from "styled-components";

export const TabelaContainer = styled.div`
    width: 100%;
    height: 100%;
`;

export const Tabela = styled.table`
    width: 100%;
    border-collapse: collapse;
    background: transparent;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

export const TabelaHead = styled.thead`
    background: transparent; 
`;

export const TabelaBody = styled.tbody`
    background: transparent; 
`;

export const TabelaRow = styled.tr`
    cursor: pointer;
    transition: .3s;
    
    &:nth-child(even) {
        background-color: rgba(255, 255, 255, 0.1);
    }

    &:hover{
        background-color: rgba(255, 255, 255, 0.2);
    }
`;

export const TabelaHeader = styled.th`
    padding: 10px;
    border: 1px solid white;
    color: white; 
    text-align: left; 
`;

export const TabelaCell = styled.td`
    padding: 10px;
    border: 1px solid white; 
    color: white;
    text-align: left; 
`;
