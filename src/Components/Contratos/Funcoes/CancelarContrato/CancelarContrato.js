import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useContext } from "react";
import { AuthContext } from "../../../../Context/AuthContext";
import helpers from "../../../../helpers";
import axios from "axios";

export default function CancelarContrato({ selectedContract, setCancelarContrato, setSelectedContract }) {
    const [valor, setValor] = useState("");
    const { atualizarClientePorId, atualizarContratoPorId } = useContext(AuthContext);

    const handleConfirm = async () => {
        if (valor && valor.trim() !== "") {
            if (valor.trim() != "SIM") {
                alert("Digite SIM para prosseguir com o cancelamento.");
                return;
            }

            const resposta = await helpers.cancelamentoDoContrato(selectedContract.purchaseId);

            if (resposta) {
                var clienteAtualizado = null;
                var contratoAtualizado = null;
                    
                await axios.get(`http://localhost:5255/api/client/${selectedContract.clientId}`).then(res => {
                    console.log("res client");
                    console.log(res.data);
                    clienteAtualizado = res.data || null;
                }).catch(err => {
                    console.log("err client");
                    console.log(err);
                })

                await axios.get(`http://localhost:5255/api/purchase/${selectedContract.purchaseId}`).then(res => {
                    console.log("res purchase");
                    console.log(res.data);
                    contratoAtualizado = res.data || null;
                }).catch(err => {
                    console.log("err purchase");
                    console.log(err);
                })

                if(clienteAtualizado && contratoAtualizado){
                    atualizarClientePorId(clienteAtualizado);
                    atualizarContratoPorId(contratoAtualizado);
                }

                alert("Contrato cancelado com sucesso! 👏🏻");
                setSelectedContract(null);
                setCancelarContrato(false);
                return;
            } else {
                alert("Erro ao cancelar contrato! ❌");
                return;
            }
        } else {
            alert("Digite SIM para cancelar o contrato.");
            return;
        }
    }

    return (
        <AnteciparLucroContainer>
            <AdicionarSaldoBox>
                <FecharIcone onClick={() => setCancelarContrato(false)}>X</FecharIcone>
                <AdicionarTitulo>CANCELAMENTO DO CONTRATO #{selectedContract.purchaseId}</AdicionarTitulo>

                <ClienteName>{selectedContract.clientName}</ClienteName>
                <TabelaInformacoes>
                    <ItemColumnRow>
                        <Item>VALOR CONTRATO</Item>
                        <Item>LUCRO OBTIDO</Item>
                        <Item>REND. OBTIDO</Item>
                        <Item>LUCRO RESTANTE</Item>
                    </ItemColumnRow>
                    <ItemColumnRow>
                        <Item>R${helpers.formatNumberToCurrency(selectedContract.totalPrice || 0)}</Item>
                        <Item>R${helpers.formatNumberToCurrency(selectedContract.currentIncome)}</Item>
                        <Item>{helpers.formatNumberToCurrency((selectedContract.currentIncome / selectedContract.totalPrice)*100)}%</Item>
                        <Item>R${helpers.formatNumberToCurrency(((selectedContract.totalPrice*1.5) - selectedContract.currentIncome))}</Item>
                    </ItemColumnRow>
                </TabelaInformacoes>

                <AdicionarInputBox>
                    <p>DIGITE CANCELAR PARA CONFIRMAR</p>
                    <input type="text" value={valor} onChange={(e) => setValor(e.target.value)} />
                </AdicionarInputBox>

                <AdicionarButton onClick={handleConfirm}>
                    CONFIRMAR
                </AdicionarButton>
            </AdicionarSaldoBox>
        </AnteciparLucroContainer>
    )
}

const AnteciparLucroContainer = styled.div`
    width: 100vw;
    height: 100vh;
    background: rgba(0,0,0,0.8);
    position: fixed;
    left: 0;
    top: 0;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const AdicionarSaldoBox = styled.div`
    width: max-content;
    height: 400px;
    border-radius: 6px;
    background: linear-gradient(70deg, #003566, #1e96fc);
    padding: 40px 30px 10px 30px;
    box-sizing: border-box;
    display: flex;
    position: relative;
    flex-direction: column;
    
`;

const AdicionarTitulo = styled.h1`
    width: 100%;
    margin: 0;
    text-align: center;
    font-size: 24px;
    color: white;
    margin-top: 10px;
    text-shadow: 2px 2px 1px rgba(0,0,0,0.2);
    letter-spacing: 2px;
`;

const ClienteName = styled.h3`
    width: 100%;
    margin: 0;
    text-align: start;
    font-size: 18px;
    color: white;
    margin-top: 20px;
    text-shadow: 2px 2px 1px rgba(0,0,0,0.4);
    letter-spacing: 1px;

`;

const TabelaInformacoes = styled.h3`
    width: 100%;
    display: grid;
    grid-template-rows: 1fr 1fr;
    marin-top: 5px;
`;

const ItemColumnRow = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
`;

const Item = styled.div`
    width: 100%;
    height: 30px;
    display: flex;
    letter-spacing: 1px;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color: white;
    border: 2px solid white;
    box-sizing: border-box;
    padding: 0 10px;
    text-shadow: 2px 2px 1px rgba(0,0,0,0.2);
`;

const FecharIcone = styled.div`
    position: absolute;
    top: 10px;
    right: 20px;
    font-size: 28px;
    color: rgba(250, 100, 0, 1);
    transition: .3s;
    text-shadow: 2px 2px 1px rgba(0,0,0,0.3);
    cursor: pointer;
    &:hover{
        text-shadow: 3px 3px 2px rgba(0,0,0,0.8);
    }
`;

const AdicionarInputBox = styled.div`
    width: 100%;
    margin-top: 20px;
    display: flex;
    align-items: center;
    gap: 5px;

    p{
        margin: 0;
        font-size: 18px;
        color: white;
        text-shadow: 2px 2px 1px rgba(0,0,0,0.4);
        text-align: start;
    }

    input{
        width: 90%;
        height: 35px;
        text-align: center;
        box-sizing: border-box;
        box-shadow: 6px 6px 1px rgba(0,0,0,0.2);
        font-size: 18px;
        border: 0;
    }
`;

const AdicionarButton = styled.button`
    width: 100%;
    height: 40px;
    margin-top: 20px;
    cursor: pointer;
    box-shadow: 4px 4px 1px rgba(0,0,0,0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(to right, rgba(0, 220, 0, 1), rgba(80, 220, 0, 1));
    transition: .3s;

    &:hover{
        box-shadow: 6px 6px 3px rgba(0,0,0,0.4);
    }
`;