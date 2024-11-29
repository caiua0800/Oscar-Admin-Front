import React, { useState, useContext } from "react";
import * as S from "./NavStyle";
import helpers from "../../helpers";
import { AuthContext } from '../../Context/AuthContext';

export default function Nav() {
    const [login, setLogin] = useState(true);
    const [item1ShowDrop, setItem1ShowDrop] = useState(false);
    const [item2ShowDrop, setItem2ShowDrop] = useState(false);
    const [item3ShowDrop, setItem3ShowDrop] = useState(false);
    const [item4ShowDrop, setItem4ShowDrop] = useState(false);
    const [item5ShowDrop, setItem5ShowDrop] = useState(false);
    const [selectedClient, setSelectedClient] = useState(null);
    const [activeTab, setActiveTab] = useState(0);
    const [open, setOpen] = useState(true)
    const [activeIcon, setActiveIcon] = useState("./close-menu.png")

    const { logout } = useContext(AuthContext);

    const handleLogout = () => {
        logout();
    };

    const handleOpenClose = () => {
        setOpen(!open);
        setActiveIcon(open ? "./open-menu.png" : "./close-menu.png");
    }

    return (
        <>
            <S.NavContent open={open}>
                <S.Navbar open={open}>
                    <S.NavbarTitle>
                        {open && (
                            <span>MENU</span>
                        )}

                        <img onClick={handleOpenClose} className="iconeMenu" src={activeIcon} />
                    </S.NavbarTitle>
                    {(activeIcon === "./close-menu.png") && (
                        <>
                            <S.NavbarMenu open={open} >
                                {open && (
                                    <>
                                        <S.Item open={open}>
                                            <S.ItemButton onClick={() => setActiveTab(0)}>
                                                <S.ItemImage>
                                                    <img src="./home-blue-icon.png" alt="clientes" />
                                                </S.ItemImage>
                                                <S.ItemText open={open}>HOME</S.ItemText>
                                            </S.ItemButton>
                                        </S.Item>
                                        <S.Item open={open} onClick={() => setItem1ShowDrop(!item1ShowDrop)} >
                                            {/* <a target="_blank" href="https://icons8.com/icon/42241/people">People</a> ícone por <a target="_blank" href="https://icons8.com">Icons8</a> */}
                                            <S.ItemButton open={open}>
                                                <S.ItemImage>
                                                    <img src="./people-blue-icon.png" alt="clientes" />
                                                </S.ItemImage>
                                                <S.ItemText open={open}>CLIENTES</S.ItemText>
                                                <S.ItemImageExpand>
                                                    <img src="./down-white-icon.png" alt="clientes" />
                                                </S.ItemImageExpand>
                                            </S.ItemButton>
                                            <S.ItemDropdown show={item1ShowDrop}>
                                                <S.ItemOptionsDropDown onClick={() => setActiveTab(1)}>VER TODOS</S.ItemOptionsDropDown>
                                                <S.ItemOptionsDropDown onClick={() => setActiveTab(2)}>CRIAR UM NOVO</S.ItemOptionsDropDown>
                                            </S.ItemDropdown>
                                        </S.Item>
                                        <S.Item open={open} onClick={() => setItem2ShowDrop(!item2ShowDrop)}>
                                            <S.ItemButton>
                                                <S.ItemImage>
                                                    <img src="./contract-blue-icon.png" alt="clientes" />
                                                </S.ItemImage>
                                                <S.ItemText open={open}>CONTRATOS</S.ItemText>
                                                <S.ItemImageExpand>
                                                    <img src="./down-white-icon.png" alt="clientes" />
                                                </S.ItemImageExpand>
                                            </S.ItemButton>
                                            <S.ItemDropdown show={item2ShowDrop}>
                                                <S.ItemOptionsDropDown onClick={() => setActiveTab(3)}>VER TODOS</S.ItemOptionsDropDown>
                                                <S.ItemOptionsDropDown onClick={() => setActiveTab(4)}>CRIAR UM NOVO</S.ItemOptionsDropDown>
                                            </S.ItemDropdown>
                                        </S.Item>
                                        <S.Item open={open} onClick={() => setItem3ShowDrop(!item3ShowDrop)}>
                                            <S.ItemButton>
                                                <S.ItemImage>
                                                    <img src="./withdrawal-blue-icon.png" alt="clientes" />
                                                </S.ItemImage>
                                                <S.ItemText open={open}>SAQUES</S.ItemText>
                                                <S.ItemImageExpand>
                                                    <img src="./down-white-icon.png" alt="clientes" />
                                                </S.ItemImageExpand>
                                            </S.ItemButton>
                                            <S.ItemDropdown show={item3ShowDrop}>
                                                <S.ItemOptionsDropDown onClick={() => setActiveTab(5)}>VER TODOS</S.ItemOptionsDropDown>
                                                <S.ItemOptionsDropDown onClick={() => setActiveTab(6)}>CRIAR UM NOVO</S.ItemOptionsDropDown>
                                            </S.ItemDropdown>
                                        </S.Item>
                                        <S.Item open={open} onClick={() => setItem5ShowDrop(!item5ShowDrop)}>
                                            <S.ItemButton>
                                                <S.ItemImage>
                                                    <img src="./transaction-blue-icon.png" alt="clientes" />
                                                </S.ItemImage>
                                                <S.ItemText open={open}>TRANSAÇÕES</S.ItemText>
                                                <S.ItemImageExpand>
                                                    <img src="./down-white-icon.png" alt="clientes" />
                                                </S.ItemImageExpand>
                                            </S.ItemButton>
                                            <S.ItemDropdown show={item5ShowDrop}>
                                                <S.ItemOptionsDropDown onClick={() => setActiveTab(7)}>VER TODOS</S.ItemOptionsDropDown>
                                            </S.ItemDropdown>
                                        </S.Item>
                                        <S.Item open={open} onClick={() => setItem4ShowDrop(!item4ShowDrop)}>
                                            <S.ItemButton>
                                                <S.ItemImage>
                                                    <img src="./function-blue-icon.png" alt="clientes" />
                                                </S.ItemImage>
                                                <S.ItemText open={open}>SERVIÇOS</S.ItemText>
                                                <S.ItemImageExpand>
                                                    <img src="./down-white-icon.png" alt="clientes" />
                                                </S.ItemImageExpand>
                                            </S.ItemButton>
                                            <S.ItemDropdown show={item4ShowDrop}>
                                                <S.ItemOptionsDropDown onClick={() => setActiveTab(8)}>Meu Gateway</S.ItemOptionsDropDown>
                                                <S.ItemOptionsDropDown>Controlador de Saques</S.ItemOptionsDropDown>
                                                <S.ItemOptionsDropDown>Controlador de Compras</S.ItemOptionsDropDown>
                                                <S.ItemOptionsDropDown>Controlador de Indicações</S.ItemOptionsDropDown>
                                            </S.ItemDropdown>
                                        </S.Item>
                                    </>
                                )}

                            </S.NavbarMenu>
                        </>
                    )}
                    {open && (
                        <S.LogoutButton open={open}>
                            <button open={open} onClick={handleLogout}>SAIR</button>
                        </S.LogoutButton>
                    )}

                </S.Navbar>
                <S.ActiveComponent>
                    {helpers.navegacao(activeTab, setActiveTab, setSelectedClient, selectedClient)}
                </S.ActiveComponent>
            </S.NavContent>
        </>
    );
}




// ex dos icones = #4ADCFF