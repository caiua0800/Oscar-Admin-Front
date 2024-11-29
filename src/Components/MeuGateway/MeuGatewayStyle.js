import styled from "styled-components";

export const MeuGatewayContainer = styled.div`
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 40px 30px;
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: start;
    overflow: auto;
`;

export const Title = styled.div`
    width: 100%;
    display: flex;
    justify-content: start;
    text-align: center;
    font-size: 48px;
    color: white;
`;

export const DescriptionTitle = styled.p`
    margin: 0;
    width: 100%;
    display: flex;
    justify-content: start;
    color: rgba(255, 255, 255, 0.8);
`;

export const FirstRowBox = styled.div`
    width: 100%;
    display: grid;
    gap: 20px;
    grid-template-columns: 1fr 1fr 1fr;
    margin-top: 20px;
`;

export const SecondRowBox = styled.div`
    width: 100%;
    display: grid;
    gap: 20px;
    grid-template-columns: 1fr;
    margin-top: 20px;
`;

export const Box = styled.div`
    width: 100%;
    height: 250px;
    box-sizing: border-box;
    padding: 20px 20px;
    background: linear-gradient(to bottom, #00193b, #002657);
    border-radius: 6px;
    display: grid;
    grid-template-rows: 1fr 3fr 1fr;
    border: 2px solid rgba(220, 220, 220, 1);

    .titleName {
        width: 100%;
        margin: 0;
        display: grid;
        grid-template-columns: 3fr 2fr;
        gap: 10px;

        .name{
            color: rgba(220, 220, 220, 1);
            font-size: 28px;
            font-weight: 600;
            width: 100%;
            text-align: start;
        }

        select {
            width: 100%;
            box-sizing: border-box;
            height: 35px;
            color: white;
            border: 0px solid white;
            align-items: center;
            font-size: 22px;
            border-radius: 6px;
            background-color: transparent;
        }
    }

    .boxInfo {
        display: flex;  
        flex-direction: column;
        justify-content: center;

        .quantidadeCompras {
            width: 100%;
            font-size: 28px;
            color: white;
            font-weight: 900;
        }

        .quantidadeDinheiro {
            width: 100%;
            font-size: 28px;
            color: white;
            font-weight: 600;
        }
    }

    .barraHorizontal {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 10px;

        .name {
            width: 100%;
            color: white;
            font-size: 22px;
        }

        .barra {
            width: 100%;
            height: 20px; /* Altura da barra */
            background-color: white; /* Fundo da barra */
            border-radius: 10px; /* Bordas arredondadas */

            .preenchimento {
                height: 100%; /* Leva toda a altura da barra pai */
                background-color: green; /* Cor de preenchimento */
                border-radius: 10px; /* Bordas arredondadas para preenchimento */
                transition: width 0.3s ease; /* Transição suave */
            }
        }
    }
`;

export const SolicitarSaqueTitle = styled.div`
    margin-top: 40px;
    font-size: 32px;
    color: white;
    width: 100%;
    display: flex;
    color: rgba(220, 220, 220, 1);
    justify-content: center;
`;

export const SolicitarSaque = styled.div`
    width: 100%;
    margin-top: 10px;
    display: grid;
    grid-template-columns: 8fr 2fr;
    gap: 5px;

    input, button{
        width: 100%;
        height: 50px;
        box-sizing: border-box;
    }

    input{
        background: white;
        border: 0;
        padding-left: 20px;
        font-size: 18px;
        color: rgba(0,0,0,0.8);
        font-weight: 600;
    }

    button{
        transition: .3s;
        font-size: 18px;
        cursor: pointer;
        &:hover{
            transform: scale(0.97);
        }
    }
`;

export const HistoricoSaques = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: start;
    box-sizing: border-box;
    padding: 0 20px;
    flex-direction: column;
    gap: 5px;
    max-height: 500px;
    min-height: 300px;
    overflow: auto;
`;

export const Columns = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 2fr 2fr 2fr 2fr;
    gap: 5px;

    .item{
        width: 100%;
        height: 40px;
        background: linear-gradient(to bottom, rgba(180, 180, 180, 1), rgba(240, 240, 240, 1));
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 22px;
        font-weight: 500;
    }
`;

export const HistoricoColums = styled.div`
    width: 100%;
    box-sizing: border-box;
    padding: 0 20px 5px 20px;
    margin-top: 10px;
`;

export const HistoricoSaquesTitle = styled.div`
    margin-top: 40px;
    font-size: 32px;
    color: white;
    width: 100%;
    display: flex;
    color: rgba(220, 220, 220, 1);
    justify-content: center;
`;

// export const nome = styled.div``;

// export const nome = styled.div``;

