import styled from "styled-components";

export const CadastroContainer = styled.div`
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 40px 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const Title = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    text-align: center;
    font-size: 48px;
    color: white;
`;

export const ConteudoCadastro = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
    margin-top: 20px;
`;

export const Informacao = styled.div`
    width: 450px;
    display: flex;
    flex-direction: column;
    align-items: center;

    span{
        color: white;
        font-size: 22px;
    }

    input{
        width: 100%;
        height: 50px;
        border-radius: 6px;
        background: #1E3E62;
        color: white;
        font-weight: 600;
        box-sizing: border-box;
        font-size: 18px;
        border: 0;
        padding-left: 20px;
    }
`;

export const CadastroSenha = styled.div`
    width: 100%;
    display: flex;
    gap: 20px;
    justify-content: center;

    input{
        width: 450px;
        height: 50px;
        border-radius: 6px;
        background: #FFFFFFF;
        box-sizing: border-box;
        font-size: 18px;
        border: 0;
        color: black;
        padding-left: 20px;
    }
`;

export const ButtonConfirmar = styled.div`
    width: 100%;
    border-radius: 6px;
    background: rgba(0, 220, 0, 1);
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 22px;
    color: white;
    height: 50px;
    text-shadow: 2px 2px 1px rgba(0,0,0,0.4);
    cursor: pointer;
`;

export const SearchClient = styled.input`
    width: 100%;
    height: 50px;
    border-radius: 6px;
    border: 0;
    box-shadow: 4px 4px 1px rgba(0,0,0,0.4);
    background:#1E3E62;
    box-sizing: border-box;
    padding-left: 30px;
    color: white;
    font-size: 22px;
    color: white;
`;

export const ClientesPesquisados = styled.div`
    width: 80%;
    display: flex;
    flex-direction: column;
    gap: 5px;
    margin-top: 20px;
    max-height: 300px;
    overflow-y: auto;
`;

export const clientSearched = styled.div`
    width: 100%;
    color: white;
    font-size: 32px;
    transition: .3s;

    &:hover{
        color: rgba(0, 220, 0, 1);
    }
`;

// export const clientSearched = styled.div``;

// export const clientSearched = styled.div``;

// export const clientSearched = styled.div``;
