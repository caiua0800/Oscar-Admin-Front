import React, { useState, useContext, useEffect } from "react";
import * as S from "./MeuGatewayStyle";
import { AuthContext } from "../../Context/AuthContext";
import helpers from "../../helpers";
import { useLoad } from "../../Context/LoadContext";
import axios from "axios";

export default function MeuGateway() {
    const { valorTotalNaPlataforma, valorClientesParaSacarNaPlataforma, valorSaquesNaPlataforma, comprasAReceber, valorAReceber } = useContext(AuthContext);
    const [percent, setPercent] = useState(75);
    const [gatewayData, setGatewayData] = useState(null);
    const [withdrawValue, setWithdrawValue] = useState(0);
    const [withdrawals, setWithdrawals] = useState(0);
    const { startLoading, stopLoading } = useLoad();

    const fetchGateway = async () => {
        try {
            axios.get(`${process.env.REACT_APP_BASE_ROUTE}gateway`).then(res => {
                setGatewayData(res.data);
            }).catch(err => {
                console.log(err);
            })
        } catch (error) {
            console.log(error)
        }
    }

    const fetchAdminWithdrawals = async () => {
        try {
            axios.get(`${process.env.REACT_APP_BASE_ROUTE}adminwithdrawal/pending`).then(res => {
                setWithdrawals(res.data)
            }).catch(err => {
                console.log(err);
            })
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {

        if (!gatewayData || withdrawals.length === 0) {
            fetchGateway();
            fetchAdminWithdrawals()
            startLoading()
            setTimeout(stopLoading, 1200);
        }
    }, [])


    const handleCreateWithdraw = async () => {
        if (parseFloat(withdrawValue) > 0) {
            startLoading()
            const res = await helpers.handleCreateAdminWithdraw(withdrawValue);

            if (res) {
                setTimeout(stopLoading, 1200);
                alert("SAQUE SOLICITADO COM SUCESSO.");
                await fetchAdminWithdrawals();
                setWithdrawValue(0);
            } else {
                setTimeout(stopLoading, 1200);
                alert("ERRO AO SOLICITAR SAQUE.");
                setWithdrawValue(0);
            }

        }
    }

    const saldoNoGateway = (gatewayData && gatewayData.bankAccountValue) ? gatewayData.bankAccountValue : 0
    const totalAmountToWithdraw = (gatewayData && gatewayData.totalAmountToWithdraw) ? gatewayData.totalAmountToWithdraw * 0.985 : 0
    const secureValueToWithdraw = saldoNoGateway - totalAmountToWithdraw;

    return (
        <>
            <S.MeuGatewayContainer>
                <S.Title>KR Payment Gateway</S.Title>
                <S.DescriptionTitle>Seja bem vindo Oscar, aqui você encontra tudo sobre seus serviços financeiros e estatísticas.</S.DescriptionTitle>

                <S.FirstRowBox>
                    <S.Box>
                        <div className="titleName">
                            <span className="name">Saldo na Plataforma</span>
                        </div>

                        <div className="boxInfo">
                            <span className="quantidadeCompras">Valor Atual na Plataforma</span>
                            <span className="quantidadeDinheiro">R${helpers.formatNumberToCurrency(valorTotalNaPlataforma)}</span>
                        </div>

                        {/* <div className="barraHorizontal">
                            <span className="name">Em Relação ao Mês Anterior</span>
                            <div className="barra">
                                <div className="preenchimento" style={{ width: `${percent}%` }} />
                            </div>
                        </div> */}

                    </S.Box>

                    <S.Box>
                        <div className="titleName">
                            <span className="name">Clientes à Pagar</span>
                        </div>
                        <div className="boxInfo">
                            <span className="quantidadeCompras">{valorClientesParaSacarNaPlataforma > 1 ? `${valorClientesParaSacarNaPlataforma} Clientes` : valorClientesParaSacarNaPlataforma === 0 ? "Nenhum Cliente" : `${valorClientesParaSacarNaPlataforma} Cliente`}</span>
                            {/* <span className="quantidadeDinheiro">R${helpers.formatNumberToCurrency(valorSaquesNaPlataforma)}</span> */}
                        </div>

                        {/* <div className="barraHorizontal">
                            <span className="name">Referente ao Máximo Possível</span>
                            <div className="barra">
                                <div className="preenchimento" style={{ width: `${percent}%` }} />
                            </div>
                        </div> */}
                    </S.Box>

                    <S.Box>
                        <div className="titleName">
                            <span className="name">Valor À Receber</span>
                        </div>
                        <div className="boxInfo">
                            <span className="quantidadeCompras">{comprasAReceber > 1 ? `${comprasAReceber} Compras Pendentes` : comprasAReceber === 0 ? "Nenhuma Compra" : `${comprasAReceber} Compra Pendente`}</span>
                            <span className="quantidadeDinheiro">R${helpers.formatNumberToCurrency(valorAReceber * 0.975)}</span>
                        </div>
                    </S.Box>
                </S.FirstRowBox>

                <S.FirstRowBox>

                    <S.Box>
                        <div className="titleName">
                            <span className="name">Saldo Total no Gateway</span>
                        </div>
                        <div className="boxInfo">
                            <span className="quantidadeCompras">Valor Total</span>
                            <span className="quantidadeDinheiro">R${helpers.formatNumberToCurrency(saldoNoGateway)}</span>
                        </div>
                    </S.Box>
                    <S.Box>
                        <div className="titleName">
                            <span className="name">Saldo Bloqueado Para Pagementos</span>
                        </div>
                        <div className="boxInfo">
                            <span className="quantidadeCompras">Valor Total de Pagamentos</span>
                            <span className="quantidadeDinheiro">R${helpers.formatNumberToCurrency(totalAmountToWithdraw)}</span>
                        </div>
                        <div className="barraHorizontal">
                            <span className="name">Referente ao Saldo Total</span>
                            <div className="barra">
                                <div className="preenchimento" style={{ width: `${(totalAmountToWithdraw / saldoNoGateway) * 100}%` }} />
                            </div>
                        </div>
                    </S.Box>

                    <S.Box>
                        <div className="titleName">
                            <span className="name">Valor Seguro a Sacar</span>
                        </div>
                        <div className="boxInfo">
                            <span className="quantidadeCompras">Valor Retirando os Pagamentos</span>
                            <span className="quantidadeDinheiro">R${helpers.formatNumberToCurrency(secureValueToWithdraw)}</span>
                        </div>
                        <div className="barraHorizontal">
                            <span className="name">Referente ao Saldo Total</span>
                            <div className="barra">
                                <div className="preenchimento" style={{ width: `${(secureValueToWithdraw / saldoNoGateway) * 100}%` }} />
                            </div>
                        </div>
                    </S.Box>
                </S.FirstRowBox>

                <S.SolicitarSaqueTitle>
                    Solicitar Saque (Máx: 2 Dias Úteis)
                </S.SolicitarSaqueTitle>

                <S.SolicitarSaque>
                    <input value={withdrawValue} onChange={(e) => setWithdrawValue(e.target.value)} type="number" />
                    <button onClick={handleCreateWithdraw}>Solicitar</button>
                </S.SolicitarSaque>

                <S.HistoricoSaquesTitle>
                    HISTÓRICO DE SAQUES
                </S.HistoricoSaquesTitle>
                <S.HistoricoColums>
                    <S.Columns>
                        <div className="item">Data</div>
                        <div className="item">Valor Solicitado</div>
                        <div className="item">Valor Recebível</div>
                        <div className="item">Status</div>
                    </S.Columns>
                </S.HistoricoColums>

                <S.HistoricoSaques>
                    {withdrawals && withdrawals.map((it, index) => (
                        <S.Columns>
                            <div className="item">{helpers.formatDate(it.dateCreated)}</div>
                            <div className="item">R${helpers.formatNumberToCurrency(it.amountWithdrawn)}</div>
                            <div className="item">R${helpers.formatNumberToCurrency(it.amountWithdrawn * 0.975)}</div>
                            <div className="item">{helpers.handleStatusAdminWithdrawn(it.status)}</div>
                        </S.Columns>
                    ))}
                </S.HistoricoSaques>
            </S.MeuGatewayContainer>
        </>
    );
}