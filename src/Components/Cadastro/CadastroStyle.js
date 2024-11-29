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
    position: relative;
    input{
        width: 100%;
        height: 50px;
        border-radius: 6px;
        background: #1E3E62;
        box-sizing: border-box;
        font-size: 18px;
        border: 0;
        padding-left: 20px;
        color: white;
    }

    select{
        position: absolute;
        bottom: -30px;
        width: 100%;
        left: 0;
        max-height: 300px;
        color: white;
        background: rgba(0,20,100, 1);
        border: 2bx solid rgba(255, 255, 255, 1);
        border-radius: 6px;
        height: 40px;
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
        background: #1E3E62;
        box-sizing: border-box;
        font-size: 18px;
        border: 0;
        padding-left: 20px;
        color: white;
    }
`;

export const ButtonConfirmar = styled.div`
    width: 920px;
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

// export const nome = styled.div``;

// export const nome = styled.div``;

// export const nome = styled.div``;
