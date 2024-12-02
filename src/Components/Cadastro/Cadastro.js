import React, { useContext, useState } from "react";
import * as S from "./CadastroStyle";
import helpers from "../../helpers";
import { AuthContext } from "../../Context/AuthContext";

export default function Cadastro() {
    const { clients, atualizarDados } = useContext(AuthContext);
    const [showIndicadores, setShowIndicadores] = useState(false);
    const [sponsorSelected, setSponsorSelected] = useState(null);
    const [filteredSponsors, setFilteredSponsors] = useState([]);

    const [cliente, setCliente] = useState({
        name: "",
        id: "",
        email: "",
        phone: "",
        balance: 0.0,
        platformId: "01",
        profession: "",
        monthlyIncome: "",
        password: "",
        confirmPassword: "",
        sponsorId: "",
        address: {
            street: "",
            number: "",
            neighborhood: "",
            city: "",
            state: "",
            zipcode: ""
        }
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name in cliente.address) {
            setCliente(prevState => ({
                ...prevState,
                address: {
                    ...prevState.address,
                    [name]: value // Atualiza o campo específico do endereço
                }
            }));
        } else {
            setCliente(prevState => ({
                ...prevState,
                [name]: value // Atualiza o campo do cliente
            }));
        }
    };

    const handleCreate = async () => {
        // Validação para checar se todos os campos necessários estão preenchidos
        if (!cliente.name || !cliente.id || !cliente.email || !cliente.phone || !cliente.address.street ||
            !cliente.address.number || !cliente.address.city || !cliente.address.zipcode ||
            !cliente.password || !cliente.confirmPassword || cliente.password != cliente.confirmPassword || !cliente.address.state) {

            if (cliente.password != cliente.confirmPassword) {
                alert("As senhas não se coincidem.")
            } else alert("Por favor, preencha todos os campos obrigatórios.");
            return;
        }

        // Valida se a senha e a confirmação estão iguais
        if (cliente.password !== cliente.confirmPassword) {
            alert("A senha e a confirmação da senha não coincidem.");
            return;
        }

        if (cliente.sponsorId.trim() === "") {
            setCliente({
                ...cliente,
                sponsorId: "" // Assegura que sponsorId está vazio se não for preenchido
            });
        }

        const response = await helpers.cadastro(cliente);
        if (response) {
            alert("Cliente criado com sucesso!");
            await atualizarDados();
            setCliente({ // Reseta os campos de cliente após criação
                name: "",
                id: "",
                email: "",
                phone: "",
                balance: 0.0,
                platformId: "01",
                zipcode: "",
                profession: "",
                monthlyIncome: "",
                password: "",
                confirmPassword: "",
                sponsorId: "",
                address: {
                    street: "",
                    number: "",
                    neighborhood: "",
                    city: "",
                    state: "",
                    zipcode: ""
                }
            });
        } else {
            alert("Erro ao criar o Cliente.");
        }
    };

    const handleChangeIndicador = (e) => {
        const val = e.target.value;

        if (val.trim() !== "") {
            setShowIndicadores(true);

            // Filtra os clientes garantindo que name e cpf sejam definidos
            const filtered = clients.filter(cl =>
                (cl.name && cl.name.toUpperCase().includes(val.toUpperCase())) ||
                (cl.cpf && cl.cpf.includes(val))
            );

            setFilteredSponsors(filtered);
        } else {
            setSponsorSelected(null);
            setFilteredSponsors([]);
            setShowIndicadores(false);
        }

        // Atualiza o sponsorId no cliente
        setCliente(prevState => ({
            ...prevState,
            sponsorId: val
        }));
    };

    const handleSelectSponsor = (sponsor) => {
        if (sponsor && sponsor.id) {  // Verifica se sponsor e sponsor.id estão definidos
            setSponsorSelected(sponsor);
            setCliente(prevState => ({
                ...prevState,
                sponsorId: sponsor.id || ""
            }));
            setShowIndicadores(false); // Para esconder o dropdown após seleção
        }
    };

    return (
        <S.CadastroContainer>
            <S.Title>CADASTRO DE CLIENTE</S.Title>

            <S.ConteudoCadastro>
                <S.Informacao>
                    <input name="name" placeholder="Nome" value={cliente.name} onChange={handleChange} />
                </S.Informacao>
                <S.Informacao>
                    <input name="id" placeholder="CPF/CNPJ" value={cliente.id} onChange={handleChange} />
                </S.Informacao>
                <S.Informacao>
                    <input type="email" name="email" placeholder="Email" value={cliente.email} onChange={handleChange} />
                </S.Informacao>
                <S.Informacao>
                    <input name="phone" placeholder="Telefone" value={cliente.phone} onChange={handleChange} />
                </S.Informacao>
                <S.Informacao>
                    <input name="street" placeholder="Rua" value={cliente.address.street} onChange={handleChange} />
                </S.Informacao>
                <S.Informacao>
                    <input name="number" placeholder="N" value={cliente.address.number} onChange={handleChange} />
                </S.Informacao>
                <S.Informacao>
                    <input name="neighborhood" placeholder="Bairro" value={cliente.address.neighborhood} onChange={handleChange} />
                </S.Informacao>
                <S.Informacao>
                    <input name="city" placeholder="Cidade" value={cliente.address.city} onChange={handleChange} />
                </S.Informacao>
                <S.Informacao>
                    <input name="state" placeholder="Estado" value={cliente.address.state} onChange={handleChange} />
                </S.Informacao>
                <S.Informacao>
                    <input name="zipcode" placeholder="CEP" value={cliente.address.zipcode} onChange={handleChange} />
                </S.Informacao>
                <S.Informacao>
                    <input
                        name="sponsorId"
                        placeholder="Indicador"
                        value={cliente.sponsorId}
                        onChange={handleChangeIndicador}
                        type="text"
                    />
                    {showIndicadores && filteredSponsors.length > 0 && (
                        <select onChange={(e) => handleSelectSponsor(filteredSponsors[e.target.selectedIndex])}>
                            <option value="">Selecione um indicador</option>
                            {filteredSponsors.map((sponsor) => (
                                <option key={sponsor.id} value={sponsor.id}>
                                    {sponsor.name} - {sponsor.cpf}
                                </option>
                            ))}
                        </select>
                    )}
                </S.Informacao>


                <S.CadastroSenha>
                    <input type="password" name="password" placeholder="Crie uma senha" value={cliente.password} onChange={handleChange} />
                    <input type="password" placeholder="Confirme a senha" onChange={(e) => setCliente({ ...cliente, confirmPassword: e.target.value })} />
                </S.CadastroSenha>

                <S.ButtonConfirmar onClick={handleCreate}>
                    CRIAR CLIENTE
                </S.ButtonConfirmar>
            </S.ConteudoCadastro>
        </S.CadastroContainer>
    );
}
