import styled from "styled-components";

export const ChatContainer = styled.div`
    width: 100%;
    box-sizing: border-box;
    height: 100vh;
    padding: 20px 50px;

`;

export const Title = styled.h1`
    width: 100%;
    margin: 0;
    text-align: center;
    color: white;
    font-size: 38px;
`;

export const ChatsBox = styled.div`
    width: 100%;
    filter: drop-shadow(0px 0px 10px rgba(0, 50, 200, 1));
    border: 1px solid transparent;
    background: rgba(0,0,0,0.1);
    color: white;
    margin-top: 20px;
    height: 80vh;
    overflow: hidden;
    display: grid;
    grid-template-columns: 2fr 5fr;
`;

export const Chats = styled.div`
    width: 100%;
    height: 100%;
    background: rgba(0, 50, 200, 0.2);
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const SearchChat = styled.div`
    width: 100%;
    height: 120px;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    gap: 5px;
    border-bottom: 3px solid rgba(0, 0, 80, 1);

    .title{
        color: white;
        font-weight: 600;
        color: rgba(255, 255, 255, 0.8);
        drop-shadow(0px 0px 10px rgba(255, 255, 255, 0.8));
    }

    .inputBox{
        width: 70%;
        height: 30px;
        border-radius: 30px;
        box-sizing: border-box;
        text-align: center;
        background: rgba(0, 0, 80, 1);
        color: white;
        border: 0;
    }

`;

export const ClientsChats = styled.div`
    width: 100%;
    height: 60vh;
    overflow-y: auto;
    flex-direction: column;
    align-items: center;
`;

export const ChatButton = styled.div`
    width: 100%;
    height: 80px;
    display: grid;
    grid-template-rows: 1fr 2fr;
    box-sizing: border-box;
    padding: 15px 20px;
    justify-content: start;
    align-items: start;
    overflow: hidden;
    gap: 10px;
    border-bottom: 1px solid rgba(0,0,0,0.4);
    cursor: pointer;
    transition: .3s;

    &:hover{
        background: white;

        .name{
            color: black;
        }

        .boxMessage{
            .msg{
                color: black;
            }
        }

    }

    .name{
        color: white;
        font-weight: 800;
        width: 100%;
        text-align: start;
    }

    .boxMessage{
        display: grid;
        grid-template-columns: 5fr 1fr;
        overflow: hidden;
        height: 100%;

        .msg {
            width: 100%;
            color: rgba(255, 255, 255, 0.7);
            overflow: hidden;
            font-size: 12px;
            white-space: nowrap;
            text-overflow: ellipsis; 
        }

        .time{
            width: 100%;
            color: rgba(255,0, 0, 0.8);
            font-size: 12px;
            font-weight: 800;
        }
    }
`;

export const Conversation = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-rows: 10vh 55vh 15vh;
`;

export const Header = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    padding: 0px 30px;
    box-shadow: 3px 1px 5px rgba(255, 255, 255, 0.6);

    .clientName{
        font-size: 22px;
        font-weight: 800;
    }

    .optionsMenu{
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        box-sizing: border-box;

        img{
            width: 100%;
            cursor: pointer;
        }
    }
`;

export const ConversationsBox = styled.div`
    width: 100%;
    height: 55vh;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    overflow-y: auto;
    padding: 30px;
    border-bottom: 3px solid white;
`;

export const ChatLine = styled.div`
    width: 100%;
    display: flex;
    
    .line{
        min-width: 50%;
        max-width: 100%;
        height: max-content;
        border-radius: 12px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        align-items: start;
        gap: 10px;
        padding: 10px 20px;

        .name{
            width: 100%;
        }

        .boxMessage{
            width: 100%;
            display: flex;
            flex-direction: column;

            .msg{
                width: 100%;
            }

            .time{
                width: 100%;
                display: flex;
                text-align: end;
                color: red;
                font-size: 12px;
                margin-top: 1px;
            }
        }
    }
`;

export const Sender = styled.div`
    width: 100%;
    height: 15vh;
    box-sizing: border-box;
    background-color: rgba(255, 255, 255, 0.4);
    padding: 30px;
    display: grid;
    grid-template-columns: 90% 10%;
    align-items: center;
    justify-content: center;
    gap: 20px;
`;

export const InputText = styled.textarea`
    width: 100%;
    height: 100%;
    background: white;
    box-sizing: border-box;
    border-radius: 8px;
    padding-left: 20px;
`;

export const SenderButton = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    overflow: hidden;
    background: linear-gradient(to bottom, rgba(0, 170, 0, 1), rgba(50, 200, 0, 1));
    border-radius: 8px;
    cursor: pointer;
    transition: .3s;

    &:hover{
        transform: scale(0.98);
    }
    img{
        width: 50px;
    }
`;

// export const nomezinho = styled.div``;

// export const nomezinho = styled.div``;

// export const nomezinho = styled.div``;


