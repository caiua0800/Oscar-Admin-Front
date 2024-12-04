import styled from "styled-components"

export const ClientsContainer = styled.div`
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 40px 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
`;

export const Title = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    text-align: center;
    font-size: 48px;
    color: white;
`;

export const Pesquisa = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 40px;

    .inputBox{
        width: 80%;
        border-radius: 30px;
        position: relative;
        background: red;
        height: max-content;

        img{
            width: 40px;
            position: absolute;
            right: 40px;
            top: 50%;
            transform: translateY(-50%);
        }
    }

    input{
        width: 100%;
        height: 50px;
        border-radius: 30px;
        border: 0;
        background: #0B192C;
        box-shadow: 3px 3px 1px rgba(0,0,0,0.4);
        color: white;
        font-size: 22px;
        padding-left: 20px;
        box-sizing: border-box;
    }
`;

export const TabelaDeContratos = styled.div`
    width: 90%;
    margin-top: 40px;
    max-height: 400px;
    overflow: auto;
`;

export const Pagination = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;

    button {
        margin: 0 10px;
        padding: 10px 20px;
        border: none;
        border-radius: 5px;
        background-color: #0B192C;
        color: white;
        cursor: pointer;

        &:disabled {
            background-color: grey;
            cursor: not-allowed;
        }
    }

    span {
        color: white;
        font-size: 16px;
    }
`;

export const FiltrosSecondarios = styled.div`
    width: 100%;
    margin-top: 20px;
    display: flex;
    justify-content: center;
    gap: 20px;
`;

export const Filtro = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;

    p{
        margin: 0;
        font-size: 22px;
        color: white;
    }
`;

export const FiltroSelect = styled.select`
    width: 250px;
    height: 40px;
    background: #1E3E62;
    color: white;
    font-size: 14px;
`;

export const JanelaCliente = styled.div`
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0,0,0,0.6);
    display: flex;
    align-items: center;
    z-index: 9;
    justify-content: center;
    flex-direction: column;
`;

export const JanelaBox = styled.div`
    width: 70%;
    padding: 30px;
    display: flex;
    box-sizing: border-box;
    position: relative;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    position: relative;
    gap: 20px;
    background: linear-gradient(to right, #0B192C, #1E3E62);
    border-radius: 6px;

    button{
        width: 80%;
        height: 50px;
        border: 0;
        box-shadow: 4px 4px 1px rgba(0,0,0,0.4);
        cursor: pointer;
        transition: .3s;
        border-radius: 6px;
        font-size: 22px;
        font-weight: 500;
    }

    .cancelarBtn{
        background: rgba(250, 0, 0, 1);
        color: white;
        &:hover{
            background: rgba(200, 0, 0, 1);
        }
    }

    .salvarBtn{
        background: rgba(0, 220, 0, 1);
        color: black;
        &:hover{
            background: rgba(0, 160, 0, 1);
        }
    }
`;

export const BoxInputSelectedClient = styled.div`
 display: flex;
    justify-content: center;
    align-items: end;
    gap: 5px;

    .firstItem{
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0px;
    }

    span{
        text-align: center;
        font-size: 24px;
        color: white;
    }

    button{
        width: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: radial-gradient(rgba(0,0,0,1), rgba(50, 50, 50, 1));
        border: 2px solid white;
        box-sizing: border-box;
        padding: 0;
        cursor: pointer;
        transition: .3s;

        &:hover{
            transform: scale(0.98);
        }
        img{
            width: 80%;
        }
    }
`;

export const InputSelectedClient = styled.input`
    width: 400px;
    height: 50px;
    border-radius: 6px;
    box-sizing: border-box;
    font-size: 18px;
    box-sizing: border-box;
    padding-left: 30px;
    background: rgba(100, 220, 220, 1);

    &.editable{
        background: rgba(255, 255, 255, 1);
    }
`;

export const TitleModal = styled.div``;

export const AceitarNegar = styled.div`
    width: 400px;
    display: flex;
    gap: 10px;

    button{
        width: 100%;
        height: 45px;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 0;
        border-radius: 0;

        &:hover{
            transform: scale(0.97);
        }

        &.negar{
            background: red;
            color: white;
        }

        &.aceitar{
            background: rgba(0, 220, 0, 1);
            color: black;
        }
    }
`;

export const ContractServices = styled.div`
    width: 70px;
    height: 70px;
    border-radius: 50%;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 30px;
    right: 30px;
    cursor: pointer;    
    transition: .3s;
    z-index: 9;

    img{
        width: 100%;
    }

    .options{
        width: 100%;
        height: 100%;
        position: relative;

        p{
            color: transparent;
        }
    }
`;

export const MenuOptions = styled.div`
    width: 300px;
    border-radius: 6px;
    background: white;
    position: absolute;
    display: flex;
    flex-direction: column;
    top: 70px;
    right: 0;
    z-index: 9;
    border: 3px solid black;
    box-sizing: border-box;
    max-height: ${(props) => (props.show ? 'max-content' : '0')};
    opacity: ${(props) => (props.show ? '1' : '0')};
    overflow: hidden; 
    transition: max-height 0.5s ease, opacity 0.5s ease; 
`;

export const Op = styled.div`
    width: 100%;
    display: flex;
    justify-content: start;
    align-items: center;
    transition: .3s;
    padding: 20px;
    box-sizing: border-box;
    font-size: 22px;
    gap: 5px;
    cursor: pointer;
    color: white;
    background: linear-gradient(to bottom, #003566, #00509d);
    
    img{
        width: 30px;
        height: 30px
    }

    &:hover{
        color: black;
        background: linear-gradient(to bottom, #003566, #1e96fc);
    }
`;

// export const nome = styled.div``;

// export const nome = styled.div``;

// export const nome = styled.div``;
