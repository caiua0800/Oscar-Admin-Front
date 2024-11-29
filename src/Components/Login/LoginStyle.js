import styled from "styled-components";

export const LoginContainer = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    // background: linear-gradient(-45deg, #000000, #0B192C);
`;

export const BoxCentral = styled.div`
    width: 450px;
    border-radius: 6px;
    // background: linear-gradient(to bottom, rgba(255, 255, 255, 1), rgba(100, 100, 0, 0.6));
    background: rgba(0, 100, 100, 1);
    box-shadow: 4px 4px 2px rgba(0,0,0,0.6);
    box-sizing: border-box;
    padding: 40px 30px;

    h1{
        margin: 0;
        margin-top: 10px;
        font-size: 38px;
        color: black;
    }
`;

export const LoginInputs = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 20px;

    input{
        width: 100%;
        height: 40px;
        box-sizing: border-box;
        padding-left: 20px;
        font-size: 18px;
        color: rgba(0,0,0,0.8);
    }
`;

export const Button = styled.div`
    width: 100%;
    height: 40px;
    box-sizing: border-box;
    font-size: 18px;
    color: rgba(0,0,0,0.8);
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 220, 0, 1);
    border: 2px solid rgba(0,0,0,0.8);
    cursor: pointer;
`;

export const Icone = styled.img`
    width: 150px;
`;

export const VerSenhaButton = styled.div`
    width: 100%;
    display: flex;
    justify-content: end;
    text-align: end;
    font-size: rgba(0, 0, 200, 0,8);
    cursor: pointer;
    transition: .3s;

    &:hover{
        color: blue;
    }
`;