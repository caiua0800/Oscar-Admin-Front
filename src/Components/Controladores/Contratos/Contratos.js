import React, { useContext, useState } from "react";
import * as S from "./ContratosStyle";
import { AuthContext } from "../../../Context/AuthContext";
import helpers from "../../../helpers";
import { useLoad } from "../../../Context/LoadContext";

export default function ControladorContratos() {
    const [option, setOption] = useState(null);
    const [creationModal, setCreationModal] = useState(false);
    const [newValue, setNewValue] = useState(null);
    const { contractModels, puxarModelosAtualizados } = useContext(AuthContext);
    const { startLoading, stopLoading } = useLoad();
    const [newContractTitle, setNewContractTitle] = useState("");
    const [newContractValue, setNewContractValue] = useState("");
    const [newContractGain, setNewContractGain] = useState("");
    const [newContractFirstWithdraw, setNewContractFirstWithdraw] = useState("");
    const [newContractDuration, setNewContractDuration] = useState("");

    const handleCloseModal = () => { setOption(null); setNewValue("") }
    const handleSelectOption = (dados) => { setOption(dados); }

    const handleCloseModalCriacao = () => { setCreationModal(false) }

    const handleSaveEdit = async () => {
        if (newValue && newValue.trim() != "") {
            startLoading();
            if (option && !option.excluir && option.model) {
                let res = false;
                var contractNew = null;

                if (option.name === "gain") {
                    contractNew = {
                        ...option.model,
                        gain: parseFloat(newValue) / 100
                    }
                } else if (option.name === "value") {
                    contractNew = {
                        ...option.model,
                        value: parseFloat(newValue)
                    }
                } else if (option.name === "duration") {
                    contractNew = {
                        ...option.model,
                        duration: parseFloat(newValue)
                    }
                } else if (option.name === "firstWithdraw") {
                    contractNew = {
                        ...option.model,
                        firstWithdraw: parseFloat(newValue)
                    }
                } else if (option.name === "title") {
                    contractNew = {
                        ...option.model,
                        title: newValue
                    }
                }
                res = await helpers.handleEditContractModel(option.model.id, contractNew);

                if (res) {
                    alert("Modelo Atualizado Com Sucesso! 👍🏻");
                    setOption(null);
                    await puxarModelosAtualizados();
                } else {
                    alert("Erro ao Atualizar Modelo! 👎🏻");
                }
            } else if (option.excluir && option.model.id) {
                if (newValue.trim() === "SIM") {
                    var res = await helpers.handleDeleteContractModel(option.model.id);
                    if (res) {
                        alert("Modelo Excluido Com Sucesso! 👍🏻");
                        setOption(null);
                        await puxarModelosAtualizados();
                    } else {
                        alert("Erro ao Excluir Modelo! 👎🏻");
                    }
                } else {
                    alert("Digite SIM para excluir o modelo de contrato.");
                }
            }
        }
        stopLoading();
    }

    const handleCreate = async () => {
        if (newContractTitle.trim() != "" && newContractDuration.trim() != "" && parseFloat(newContractDuration) > 0 &&
            newContractGain.trim() != "" && parseFloat(newContractGain) > 0 && newContractFirstWithdraw.trim() != "" &&
            parseFloat(newContractFirstWithdraw) > 0 && newContractValue.trim() != "" && parseFloat(newContractValue) > 0) {
            startLoading();
            const res = helpers.handleCreateModeloContrato({
                title: newContractTitle,
                value: parseFloat(newContractValue),
                yearlyPlus: "0%",
                duration: parseFloat(newContractDuration),
                gain: parseFloat(newContractGain) / 100,
                firstWithdraw: parseFloat(newContractFirstWithdraw),
                description: `${newContractTitle} com valorização de ${newContractGain} em ${newContractDuration} meses.`
            }
            )
            if(res){
                alert("Novo Modelo Criado Com Sucesso 👍🏻");
                await puxarModelosAtualizados();
                setNewContractTitle("");
                setNewContractValue("");
                setNewContractGain("");
                setNewContractDuration("");
                setNewContractFirstWithdraw("");
                setCreationModal(false);
            }else{
                alert("Erro Na Criação de Novo Modelo! 👎🏻");
            }
            stopLoading();
        } else {
            alert("Erro! Confira as informações.");
        }
    }

    return (
        <>
            <S.ControladorContainer>

                <S.ButtonCriar onClick={() => setCreationModal(true)}>Criar Novo Modelo</S.ButtonCriar>

                <S.Title>Controlador dos Modelos de Contratos</S.Title>

                <S.ModelosDeContratos>

                    {contractModels && contractModels.map((model, index) => (
                        <>
                            <S.ContratoModelContainer>
                                <S.ContratoModelContent>
                                    <span onClick={() => handleSelectOption({ model: model, valor: model.title, titulo: "Nome do Contrato", excluir: false, name: "title" })} className="titulo">{model.title}</span>
                                    <div className="boxImagem">
                                        <img alt="imagem do contrato" src="./search-icon.png" />
                                    </div>
                                    <ul className="list">
                                        <li onClick={() => handleSelectOption({ model: model, valor: model.duration, titulo: "Duração do Contrato", excluir: false, name: "duration" })}>Duração de {model.duration} meses</li>
                                        <li onClick={() => handleSelectOption({ model: model, valor: model.gain * 100, titulo: "Valorização do Contrato", excluir: false, name: "gain" })}>Valorização de {model.gain * 100}%</li>
                                        <li onClick={() => handleSelectOption({ model: model, valor: (model.firstWithdraw || 60), titulo: "Primeiro Saque", excluir: false, name: "firstWithdraw" })}>Primeiro saque após {(model.firstWithdraw || 60)} dias</li>
                                    </ul>

                                    <div className="valorContrato">
                                        <span onClick={() => handleSelectOption({ model: model, valor: model.value, titulo: "Valor do Contrato", excluir: false, name: "value" })} className="valorTexto">R${helpers.formatNumberToCurrency(model.value || 0)}</span>
                                    </div>

                                    <div className="moreOptions">
                                        <span onClick={() => handleSelectOption({ model: model, valor: 0, titulo: "Excluir Modelo", excluir: true })} className="treePoints">Excluir</span>
                                    </div>
                                </S.ContratoModelContent>
                            </S.ContratoModelContainer>
                        </>
                    ))}

                </S.ModelosDeContratos>

                {option && (
                    <>
                        <S.ModalEdicao>
                            <S.BoxEdicao>
                                <span onClick={handleCloseModal} className="btnSair">x</span>
                                <S.TituloEdicao>
                                    {option && option.titulo}
                                </S.TituloEdicao>
                                <S.InputBox>
                                    {option && !option.excluir && (
                                        <span className="pergunta">Você quer alterar de {option && option.valor} para:</span>
                                    )}
                                    {option && option.excluir && (
                                        <span className="pergunta">Digite SIM para excluir o modelo</span>
                                    )}
                                    <div className="boxInput">
                                        <input value={newValue} onChange={(e) => setNewValue(e.target.value)} placeholder="Digite aqui..." />
                                        <button onClick={handleSaveEdit} className="btnConfirm">Confirmar</button>
                                    </div>
                                </S.InputBox>
                            </S.BoxEdicao>
                        </S.ModalEdicao>
                    </>
                )}

                {creationModal && (
                    <>
                        <S.ModalCriacao>
                            <S.BoxCriacao>
                                <span onClick={handleCloseModalCriacao} className="btnSair">x</span>
                                <S.TituloEdicao>Criação de Novo Modelo</S.TituloEdicao>

                                <S.NewModelInfo>
                                    <S.ModelInfo>
                                        <span className="tituloInfo">Nome do Contrato</span>
                                        <input
                                            value={newContractTitle}
                                            onChange={(e) => setNewContractTitle(e.target.value)}
                                            placeholder="Digite aqui..."
                                        />
                                    </S.ModelInfo>
                                    <S.ModelInfo>
                                        <span className="tituloInfo">Duração do Contrato</span>
                                        <input
                                            value={newContractDuration}
                                            onChange={(e) => setNewContractDuration(e.target.value)}
                                            placeholder="Em Meses"
                                        />
                                    </S.ModelInfo>
                                    <S.ModelInfo>
                                        <span className="tituloInfo">Valorização do Contrato</span>
                                        <input
                                            value={newContractGain}
                                            onChange={(e) => setNewContractGain(e.target.value)}
                                            placeholder="Em Porcentagem"
                                        />
                                    </S.ModelInfo>
                                    <S.ModelInfo>
                                        <span className="tituloInfo">Primeiro Saque</span>
                                        <input
                                            value={newContractFirstWithdraw}
                                            onChange={(e) => setNewContractFirstWithdraw(e.target.value)}
                                            placeholder="Em Dias"
                                        />
                                    </S.ModelInfo>
                                    <S.ModelInfo>
                                        <span className="tituloInfo">Valor do Contrato</span>
                                        <input
                                            value={newContractValue}
                                            onChange={(e) => setNewContractValue(e.target.value)}
                                            placeholder="Em Reais"
                                        />
                                    </S.ModelInfo>

                                    <button onClick={handleCreate} className="buttonCreate">Criar Modelo</button>
                                </S.NewModelInfo>
                            </S.BoxCriacao>
                        </S.ModalCriacao>
                    </>
                )}
            </S.ControladorContainer>
        </>
    )
}