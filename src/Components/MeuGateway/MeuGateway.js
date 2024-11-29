import React, { useState } from "react";
import * as S from "./MeuGatewayStyle";

export default function MeuGateway() {
    // Estado para controlar a porcentagem
    const [percent, setPercent] = useState(75); // Por exemplo, 75%

    return (
        <>
            <S.MeuGatewayContainer>
                <S.Title>KR Payment Gateway</S.Title>
                <S.DescriptionTitle>Seja bem vindo Oscar, aqui você encontra tudo sobre seus serviços financeiros e estatísticas.</S.DescriptionTitle>

                <S.FirstRowBox>
                    <S.Box>
                        <div className="titleName">
                            <span className="name">Saldo Total</span>
                        </div>

                        <div className="boxInfo">
                            <span className="quantidadeCompras">Valor Atual no Gateway</span>
                            <span className="quantidadeDinheiro">R$102.109,00</span>
                        </div>

                        <div className="barraHorizontal">
                            <span className="name">Valor Referente a compras do mês atual</span>
                            <div className="barra">
                                <div className="preenchimento" style={{ width: `${percent}%` }} />
                            </div>
                        </div>

                    </S.Box>

                    <S.Box>
                        <div className="titleName">
                            <span className="name">Clientes à Pagar</span>
                        </div>
                        <div className="boxInfo">
                            <span className="quantidadeCompras">80 Clientes</span>
                            <span className="quantidadeDinheiro">R$20.109,00</span>
                        </div>

                        <div className="barraHorizontal">
                            <span className="name">Referente ao Máximo Possível</span>
                            <div className="barra">
                                <div className="preenchimento" style={{ width: `${percent}%` }} />
                            </div>
                        </div>

                    </S.Box>

                    <S.Box>
                        <div className="titleName">
                            <span className="name">Recompras à Pagar</span>
                        </div>
                        <div className="boxInfo">
                            <span className="quantidadeCompras">3 Recompras</span>
                            <span className="quantidadeDinheiro">R$12.109,00</span>
                        </div>

                        <div className="barraHorizontal">
                            <span className="name">Referente ao Saldo Total</span>
                            <div className="barra">
                                <div className="preenchimento" style={{ width: `${20}%` }} />
                            </div>
                        </div>
                    </S.Box>
                </S.FirstRowBox>

                <S.SecondRowBox>
                    <S.Box>
                        <div className="titleName">
                            <span className="name">Saldo Bloqueado Para Pagementos</span>
                        </div>
                        <div className="boxInfo">
                            <span className="quantidadeCompras">Valor Total de Pagamentos</span>
                            <span className="quantidadeDinheiro">R$32.218,00</span>
                        </div>
                        <div className="barraHorizontal">
                            <span className="name">Referente ao Saldo Total</span>
                            <div className="barra">
                                <div className="preenchimento" style={{ width: `${10}%` }} />
                            </div>
                        </div>
                    </S.Box>
                </S.SecondRowBox>

                <S.SecondRowBox>
                    <S.Box>
                        <div className="titleName">
                            <span className="name">Valor Seguro a Sacar</span>
                        </div>
                        <div className="boxInfo">
                            <span className="quantidadeCompras">Valor Retirando os Pagamentos</span>
                            <span className="quantidadeDinheiro">R$12.109,00</span>
                        </div>
                        <div className="barraHorizontal">
                            <span className="name">Referente ao Saldo Total</span>
                            <div className="barra">
                                <div className="preenchimento" style={{ width: `${50}%` }} />
                            </div>
                        </div>
                    </S.Box>
                </S.SecondRowBox>

                <S.SolicitarSaqueTitle>
                    Solicitar Saque (Máx: 2 Dias Úteis)
                </S.SolicitarSaqueTitle>

                <S.SolicitarSaque>
                    <input type="number" />
                    <button>Solicitar</button>
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
                    <S.Columns>
                        <div className="item">28/10/2024</div>
                        <div className="item">R$18.000,00</div>
                        <div className="item">R$17.900,00</div>
                        <div className="item">Pago</div>
                    </S.Columns>
                    <S.Columns>
                        <div className="item">28/10/2024</div>
                        <div className="item">R$18.000,00</div>
                        <div className="item">R$17.900,00</div>
                        <div className="item">Pago</div>
                    </S.Columns>
                    <S.Columns>
                        <div className="item">28/10/2024</div>
                        <div className="item">R$18.000,00</div>
                        <div className="item">R$17.900,00</div>
                        <div className="item">Pago</div>
                    </S.Columns>
                    <S.Columns>
                        <div className="item">28/10/2024</div>
                        <div className="item">R$18.000,00</div>
                        <div className="item">R$17.900,00</div>
                        <div className="item">Pago</div>
                    </S.Columns>

                </S.HistoricoSaques>
            </S.MeuGatewayContainer>
        </>
    );
}