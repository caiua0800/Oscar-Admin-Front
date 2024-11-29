import React from "react";
import * as S from "./TabelaGeralStyle";

export default function TabelaGeral({ columns, data, type, setSelectedThing }) {
    if (!columns || !data || Object.keys(data).length === 0) {
        return null;
    }

    const handleSelect = (dataObjs) => {
        setSelectedThing(dataObjs);
    };

    return (
        <S.TabelaContainer>
            <S.Tabela>
                <S.TabelaHead>
                    <S.TabelaRow>
                        {columns.map((column, index) => (
                            <S.TabelaHeader key={index}>{column.name}</S.TabelaHeader>
                        ))}
                    </S.TabelaRow>
                </S.TabelaHead>
                <S.TabelaBody>
                    {Object.values(data).map((dataObjs, rowIndex) => (
                        <S.TabelaRow key={rowIndex} onClick={() => handleSelect(dataObjs)}>
                            {columns.map((column, cellIndex) => (
                                <S.TabelaCell key={cellIndex}>
                                    <>
                                        {column.insertStart || ""}
                                        {
                                            column.formatFunction
                                                ? column.formatFunction(dataObjs[column.value])
                                                : column.value.split('.').reduce((obj, key) => (obj && obj[key] !== undefined ? obj[key] : ''), dataObjs)
                                        }
                                        {column.insertEnd || ""}
                                    </>
                                </S.TabelaCell>
                            ))}
                        </S.TabelaRow>
                    ))}
                </S.TabelaBody>
            </S.Tabela>
        </S.TabelaContainer>
    );
}