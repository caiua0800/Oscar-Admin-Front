import React, { useState, useEffect, useContext } from "react";
import * as S from "./ChatSuporteStyle";
import { AuthContext } from "../../Context/AuthContext";
import helpers from "../../helpers";
import axios from "axios";

export default function ChatSuporte() {
    const { chats, clients, atualizarChat, atualizarTodosOsChats } = useContext(AuthContext);
    const [processedChats, setProcessedChats] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);
    const [replyMessage, setReplyMessage] = useState("");
    const [searchTerm, setSearchTerm] = useState(""); // Estado do input de pesquisa

    useEffect(() => {
        atualizarTodosOsChats();
    }, []);

    useEffect(() => {
        if (chats && chats.length > 0) {
            const newChats = chats.map(chat => {
                const client = clients.find(client => client.id === chat.clientId);
                return {
                    ...chat,
                    clientName: client ? client.name : "Desconhecido",
                };
            });
            setProcessedChats(newChats);
        }
    }, [chats, clients]);

    // Filtra os chats de acordo com o valor do input
    const filteredChats = processedChats.filter(chat => {
        const clientNameMatch = chat.clientName.toLowerCase().includes(searchTerm.toLowerCase());
        const clientIdMatch = chat.clientId.toLowerCase().includes(searchTerm.toLowerCase());
        return clientNameMatch || clientIdMatch; // Retorna true se o nome ou ID do cliente incluir o termo de pesquisa
    });

    const sendMessage = async () => {
        if (selectedChat && replyMessage.trim() !== "") {
            await axios.post(`${process.env.REACT_APP_BASE_ROUTE}chat/${selectedChat.clientId}/send`, {
                Msg: replyMessage,
                ClientName: "...",
                isResponse: true
            }).then(res => {
                if (res) {
                    atualizarChat(res.data); // Atualiza a lista de chats
                    setSelectedChat(prev => ({
                        ...prev,
                        messages: res.data.messages
                    }));
                    setReplyMessage("");
                }
            }).catch(err => {
                console.log(err);
                alert("Erro ao enviar mensagem");
            });
        }
    };

    return (
        <>
            <S.ChatContainer>
                <S.Title>Chat Da Plataforma 💬</S.Title>

                <S.ChatsBox>
                    <S.Chats>
                        <S.SearchChat>
                            <span className="title">Pesquise</span>
                            <input
                                className="inputBox"
                                placeholder="Nome ou CPF"
                                value={searchTerm} // Liga o valor do input ao estado
                                onChange={(e) => setSearchTerm(e.target.value)} // Atualiza o estado conforme o usuário digita
                            />
                        </S.SearchChat>
                        <S.ClientsChats>
                            {filteredChats.length > 0 ? (
                                filteredChats.map((chat, index) => (
                                    <S.ChatButton key={index} onClick={() => { setSelectedChat(chat); chat !== selectedChat && setReplyMessage(""); }}>
                                        <span className="name">{chat.clientName && chat.clientName.split(" ")[0]}</span>
                                        <div className="boxMessage">
                                            <span className="msg">Msg: {chat.messages[chat.messages.length - 1].msg}</span>
                                            <span className="time">{helpers.formatRelativeDate(chat.messages[chat.messages.length - 1].dateCreated)}</span>
                                        </div>
                                    </S.ChatButton>
                                ))
                            ) : (
                                <span>Nenhum chat encontrado com esse critério.</span>
                            )}
                        </S.ClientsChats>
                    </S.Chats>
                    <S.Conversation>
                        {selectedChat && (
                            <>
                                <S.Header>
                                    <span className="clientName">{selectedChat && selectedChat.clientName && (selectedChat.clientName.split(" ")[0] + " " + selectedChat.clientName.split(" ")[selectedChat.clientName.split(" ").length - 1])}</span>
                                    <div className="optionsMenu">
                                        <img alt="options menu" src="./options-menu-icon.png" />
                                    </div>
                                </S.Header>

                                <S.ConversationsBox>
                                    {selectedChat && selectedChat.messages.map((msg, i) => (
                                        <S.ChatLine style={{ justifyContent: msg.isResponse ? "end" : "start" }}>
                                            <div className="line">
                                                <li className="name" style={{ textAlign: msg.isResponse ? "end" : "start" }}>{!msg.isResponse ? selectedChat.clientName && (selectedChat.clientName.split(" ")[0] + " " + selectedChat.clientName.split(" ")[selectedChat.clientName.split(" ").length - 1]) : "Suporte"}</li>
                                                <div className="boxMessage">
                                                    <span style={{ textAlign: msg.isResponse ? "end" : "start" }} className="msg"><strong>Msg:</strong> {msg.msg}</span>
                                                    <span style={{ justifyContent: msg.isResponse ? "end" : "start" }} className="time">{helpers.formatRelativeDate(msg.dateCreated)}</span>
                                                </div>
                                            </div>
                                        </S.ChatLine>
                                    ))}

                                </S.ConversationsBox>

                                <S.Sender>
                                    <S.InputText value={replyMessage} onChange={(e) => setReplyMessage(e.target.value)} placeholder="Digite a mensagem aqui..." />
                                    <S.SenderButton onClick={sendMessage}>
                                        <img alt="enviar" src="./send-icon.png" />
                                    </S.SenderButton>
                                </S.Sender>
                            </>
                        )}

                    </S.Conversation>
                </S.ChatsBox>
            </S.ChatContainer>
        </>
    )
}