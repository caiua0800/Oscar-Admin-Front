import React, { useContext, useEffect } from "react";
import * as S from "./DashboardStyle";
import { AuthContext } from "../../Context/AuthContext";
import helpers from "../../helpers";
import GraficoEntrada from "../Graficos/GraficoEntrada";

export default function Dashboard() {
    const { clients, purchases, withdrawals, atualizarClientePorId } = useContext(AuthContext);
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;


    // Função para contar quantos clientes foram cadastrados em cada mês
    const getClientsCountByMonth = () => {
        const monthlyCounts = Array(12).fill(0); // Criar um array para contar os clientes de cada mês

        clients.forEach(client => {
            if (client.dateCreated) {
                const clientDate = new Date(client.dateCreated);
                const month = clientDate.getMonth(); // Obter o mês de cadastro
                monthlyCounts[month]++; // Incrementar o contador para esse mês
            }
        });

        return monthlyCounts; // Retornar os contadores mensais
    };

    const countPurchasesByMonth = (month) => {
        return purchases.filter(purchase => {
            if (!purchase.purchaseDate) return false;

            const purchaseDate = new Date(purchase.purchaseDate);
            const purchaseLocalDate = new Date(purchaseDate.getTime() - (3 * 60 * 60 * 1000)); // UTC-3

            return purchaseLocalDate.getMonth() === month && purchaseLocalDate.getFullYear() === currentDate.getFullYear();
        }).length;
    };

    const sumTotalPriceByMonth = (month) => {
        return purchases
            .filter(purchase => {
                if (!purchase.purchaseDate) return false; // Verifica se a data de compra existe
                const purchaseDate = new Date(purchase.purchaseDate);
                const purchaseLocalDate = new Date(purchaseDate.getTime() - (3 * 60 * 60 * 1000)); // UTC-3
                return purchaseLocalDate.getMonth() === month && purchaseLocalDate.getFullYear() === currentDate.getFullYear();
            })
            .reduce((total, purchase) => total + (purchase.totalPrice || 0), 0); // Soma o totalPrice
    };

    const sumTotalWithdrawnByMonth = (month) => {
        return withdrawals
            .filter(withdrawal => {
                if (!withdrawal.dateCreated || (withdrawal.status !== 1 && withdrawal.status !== 2)) return false;
                const withdrawalDate = new Date(withdrawal.dateCreated);
                const withdrawalLocalDate = new Date(withdrawalDate.getTime() - (3 * 60 * 60 * 1000)); // UTC-3
                return withdrawalLocalDate.getMonth() === month && withdrawalLocalDate.getFullYear() === currentDate.getFullYear();
            })
            .reduce((total, withdrawal) => total + (withdrawal.amountWithdrawn || 0), 0); // Soma o totalWithdrawn
    };

    const getPurchasesCountByMonth = () => {
        const monthlyCounts = Array(12).fill(0); // Criar um array para contar as compras de cada mês

        purchases.forEach(purchase => {
            if (purchase.purchaseDate) {
                const purchaseDate = new Date(purchase.purchaseDate);
                const month = purchaseDate.getMonth(); // Obter o mês da compra
                monthlyCounts[month]++; // Incrementar o contador para esse mês
            }
        });

        return monthlyCounts; // Retornar os contadores mensais
    };

    const clientsByMonth = getClientsCountByMonth();
    const purchasesByMonth = getPurchasesCountByMonth();

    // Preparar os dados para o gráfico
    const clientsChartData = {
        labels: [
            'Janeiro', 'Fevereiro', 'Março',
            'Abril', 'Maio', 'Junho',
            'Julho', 'Agosto', 'Setembro',
            'Outubro', 'Novembro', 'Dezembro'
        ],
        datasets: [
            {
                label: 'Clientes Cadastrados',
                data: clientsByMonth,
                fill: false,
                backgroundColor: 'rgb(75, 192, 192)',
                borderColor: 'rgba(75, 192, 192, 0.2)',
            },
        ],
    };

    const purchasesChartData = {
        labels: [
            'Janeiro', 'Fevereiro', 'Março',
            'Abril', 'Maio', 'Junho',
            'Julho', 'Agosto', 'Setembro',
            'Outubro', 'Novembro', 'Dezembro'
        ],
        datasets: [
            {
                label: 'Total de Compras',
                data: purchasesByMonth,
                fill: false,
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgba(255, 99, 132, 0.2)',
            },
        ],
    };

    const clientsLastMonth = clientsByMonth[lastMonth];
    const clientsThisMonth = clientsByMonth[currentMonth];
    const purchasesLastMonth = purchasesByMonth[lastMonth];
    const purchasesThisMonth = purchasesByMonth[currentMonth];
    const totalContractsPriceThisMonth = sumTotalPriceByMonth(currentMonth);
    const totalWithdrawnThisMonth = sumTotalWithdrawnByMonth(currentMonth);

    return (
        <S.DashboardContainer>
            <S.Title>PLATAFORMA ADMIN</S.Title>

            <S.GridContainer>
                <S.GridBox>
    
                    <h1>TOTAL DE CLIENTES CADASTRADOS</h1>
                    <span>{clients ? clients.length : 0}</span>

                    <S.ClientesPorMes>
                        <div className="mes">
                            <p className="titulo">Mês Passado</p>
                            <span className="conteudo">{clientsLastMonth}</span>
                        </div>
                        <div className="mes">
                            <p className="titulo">Este Mês</p>
                            <span className="conteudo">{clientsThisMonth}</span>
                        </div>
                    </S.ClientesPorMes>
                </S.GridBox>

                <S.GridBox>
               
                    <h1>TOTAL DE COMPRAS</h1>
                    <span>{purchases ? purchases.length : 0}</span>

                    <S.ClientesPorMes>
                        <div className="mes">
                            <p className="titulo">Mês Passado</p>
                            <span className="conteudo">{purchasesLastMonth}</span>
                        </div>
                        <div className="mes">
                            <p className="titulo">Este Mês</p>
                            <span className="conteudo">{purchasesThisMonth}</span>
                        </div>
                    </S.ClientesPorMes>
                </S.GridBox>

                <S.GridBox>
                    <span>COMPRAS ESSE MÊS</span>
                    <p className="valorMediaGanhoMensal">R${helpers.formatNumberToCurrency(totalContractsPriceThisMonth)}</p>
                </S.GridBox>

                <S.GridBox>
                    <span>SAQUES ESSE MÊS</span>
                    <p className="valorMediaGanhoMensal">R${helpers.formatNumberToCurrency(totalWithdrawnThisMonth)}</p>
                </S.GridBox>
            </S.GridContainer>
        </S.DashboardContainer>
    );
}