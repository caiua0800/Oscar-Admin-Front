import styled from "styled-components";

export const ControladorContainer = styled.div`
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
    color: rgba(255, 255, 255,1);
    font-weight: 600;
`;

export const ModelosDeContratos = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    margin-top: 60px;
`;

export const ContratoModelContainer = styled.div`
    width: 300px;
    // height: 400px;
    border-radius: 6px;
    box-shadow: 4px 4px 6px rgba(0,0,0,0.4);
    border: 1px solid white;
    background: black;
    padding: 20px;
`;

export const ContratoModelContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    .titulo{
        width: 100%;
        margin: 0;
        font-weight: 500;
        color: white;
        font-size: 28px;
        cursor: pointer;

        &:hover{
            color: rgba(0, 200, 255, 1);
        }
    }

    .boxImagem{
        margin-top: 20px;
        width: 100%;
        height: 200px;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        border-radius: 6px;
        cursor: pointer;
        transition: .4s;

        &:hover{
            width: 90%;
            filter: drop-shadow(0 0 15px rgba(0, 200, 255, 0.4));
        }

        img{
            width: 100%;
            transition: .4s;
        }
    }

    .list{
        width: 100%;
        text-align: start;

        li{
            color: white;
            font-size: 18px;
            font-weight: 500;
            cursor: pointer;

            &:hover{
                color: rgba(0, 200, 255, 1);
            }
        }
    }

    .valorContrato{
        width: 100%;
        // margin-top: 20px;
        justify-content: center;
        display: flex;

        .valorTexto{
            font-size: 32px;
            color: rgba(80, 220, 0, 1);
            font-weight: 500;
            cursor: pointer;

            &:hover{
                color: rgba(0, 200, 255, 1);
            }
        }
    }

    .moreOptions{
        width: 100%;
        text-align: end;

        .treePoints{
            color: red;
            font-weight: 600;
            font-size: 12px;
            cursor: pointer;

            &:hover{
                color: rgba(0, 200, 255, 1);
            }
        }
    }
`;

export const ModalEdicao = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0,0,0, 0.8);
`;

export const BoxEdicao = styled.div`
    max-width: 70%;
    width: max-content;
    padding: 20px;
    box-sizing: border-box;
    border: 1px solid white;
    border-radius: 6px;
    background: black;
    position: relative;

    .btnSair{
        font-size: 18px;
        color: red;
        font-weight: 600;
        position: absolute;
        top: 5px;
        right: 15px;
        cursor: pointer;
    }
`;

export const TituloEdicao = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    font-size: 28px;
    color: white;
    font-weight: 500;
`;

export const InputBox = styled.div`
    margin-top: 20px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;

    .pergunta{
        text-align: center;
        color: white;
        font-size: 18px;
        font-weight: 500;
    }

    .boxInput{
        width: 100%;
        display: flex;
        gap: 5px;

        input{
            width: 200px;
            height: 40px;
            border-radius: 3px;
            box-sizing: border-box;
            padding-left: 20px;
            font-size: 18px;
            color: rgba(0,0,0,0.8);
            border: 0;
        }

        .btnConfirm{
            padding: 0 20px;
            border-radius: 3px;
            background: linear-gradient(to right, rgba(0, 200, 0, 1), rgba(80, 220, 0, 1));
            color: white;
            font-weight: 600;
            font-size: 16px;
            text-shadow: 1px 1px 1px rgba(0,0,0,0.4);
            cursor: pointer;
        }
    }
`;

export const ButtonCriar = styled.button`
    height: 40px;
    border-radius: 6px;
    background: linear-gradient(to right, rgba(0, 200, 0, 1), rgba(80, 220, 0, 1));
    border: 0;
    position: absolute;
    top: 40px;
    right: 40px;
    color: white;
    text-shadow:1px 1px 1px rgba(0,0,0,0.4);
    font-size: 18px;
    padding: 0 20px;
    box-sizing: border-box;
    cursor: pointer;
    border: 2px solid transparent;
    transition: .3s;

    &:hover{
        border: 2px solid rgba(0, 150, 0, 1);
    }
`;


export const ModalCriacao = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0,0,0, 0.8);
`;

export const BoxCriacao = styled.div`
    max-width: 70%;
    width: max-content;
    padding: 30px 40px;
    box-sizing: border-box;
    border: 1px solid white;
    border-radius: 6px;
    background: black;
    position: relative;

    .btnSair{
        font-size: 18px;
        color: red;
        font-weight: 600;
        position: absolute;
        top: 5px;
        right: 15px;
        cursor: pointer;
    }
`;

export const NewModelInfo = styled.div`
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;

    .buttonCreate{
        height: 30px;
        border-radius: 6px;
        background: linear-gradient(to right, rgba(0, 200, 0, 1), rgba(80, 220, 0, 1));
        border: 0;
        color: white;
        text-shadow:1px 1px 1px rgba(0,0,0,0.4);
        font-size: 18px;
        padding: 0 20px;
        box-sizing: border-box;
        cursor: pointer;
        border: 2px solid transparent;
        transition: .3s;

    }
`;

export const ModelInfo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;

    .tituloInfo{
        font-size: 18px;
        color: white;
        font-weight: 500;
    }

    input{
        width: 100%;
        height: 30px;
        border-radius: 3px;
        box-sizing: border-box;
        padding-left: 20px;
        font-size: 18px;
        color: rgba(0,0,0,0.8);
        border: 0;
    }
`;

// export const nome = styled.div``;

// export const nome = styled.div``;



