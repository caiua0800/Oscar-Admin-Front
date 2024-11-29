import styled from "styled-components";

export const DashboardContainer = styled.div`
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 40px 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    // background: linear-gradient(to right, rgba(20, 20, 20, 1), rgba(0, 0, 0, 1));
    justify-content: center;
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

export const GridContainer = styled.div`
    width: 100%;
    max-height: 600px;
    display: grid;
    grid-template-columns: 2fr 2fr;
    grid-template-rows: 2fr 1fr;
    margin-top: 20px;
    gap: 20px;
`;

export const GridBox = styled.div`
    width: 100%;
    height: 100%;
    background: linear-gradient(-45deg, #000000, #1E3E62);
    box-sizing: border-box;
    padding: 30px 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    // filter: drop-shadow(0 0 12px rgba(30, 62, 98, 0.4));
    border-radius: 8px;
    transition: .3s;
    position: relative;



    h1{
        margin: 0;
        width: 100%;
        text-align: center;
        font-size: 42px;
        color: rgba(255, 255, 255, 1);
        font-weight: 600;
        text-shadow: 2px 2px 1px rgba(0,0,0,0.4);
    }

    span{
        font-size: 38px;
        color: white;
        text-decoration: underline;
        text-shadow: 2px 2px 1px rgba(0,0,0,1);
    }

    .valorMediaGanhoMensal{
        width: 100%;
        text-align: center;
        font-size: 42px;
        color: rgba(255, 255, 255, 1);
        font-weight: 600;
        text-shadow: 2px 2px 1px rgba(0,0,0,0.4);
    }
`;

export const ChartContainer = styled.div`
    width: 100%;
    height: 300px;
`;

export const ClientesPorMes = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 2fr 2fr;
    gap: 10px;
    margin-top: 40px;
    transition: .3s;

    .mes{
        width: 100%;
        height: max-content;
        cursor: pointer;
        box-shadow: 4px 4px 2px rgba(0,0,0,0.6);
        padding: 20px 10px;
        box-sizing: border-box;

        .titulo{
            width: 100%;
            margin: 0;
            font-size: 24px;
            color: rgba(255, 255, 255, 1);
            font-weight: 600;
        }

        .conteudo{
            width: 100%;
            margin: 0;
            color: white;
            font-size: 22px;
        }

        &:hover{
            box-shadow: 6px 6px 1px rgba(0,0,0,0.3);
            background: rgba(0,0,0,0.05);
        }
    }
`;

export const GraficoContainer = styled.div`
    width: 100%;
    height: 100%;
    border-radius: 6px;
    box-sizing: border-box;
    position: absolute;
    top: 0;
    opacity: 0.3;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: -1;
    left: 0;
`;

// export const nome = styled.div``;

// export const nome = styled.div``;

// export const nome = styled.div``;

// export const nome = styled.div``;
