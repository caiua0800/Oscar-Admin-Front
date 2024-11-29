import styled, { css } from "styled-components";

export const NavContent = styled.div`
    width: 100%;
    height: 100vh;
    display: grid;
    transition: .6s;
    grid-template-columns: ${props => (props.open ? '1fr 4fr' : '1fr 20fr')};   
    position: relative;

    @media(max-width: 1800px){
        grid-template-columns: ${props => (props.open ? '2fr 8fr' : '1fr 20fr')};   
    }
`;

export const Navbar = styled.div`
    width: 100%;
    display: grid;
    grid-template-rows: ${props => (props.open ? '1fr 4fr 1fr' : '1fr 1fr')};
    background: radial-gradient(rgba(10, 10, 10, 1), rgba(0, 0, 0, 1));
    padding: 20px;
    align-items: start;
    box-sizing: border-box;

    @media(max-width: 1800px){
        grid-template-rows: ${props => (props.open ? '1fr 4fr 1fr' : '1fr 1fr')};
    }
`;

export const ActiveComponent = styled.div`
    width: 100%;
    height: 100%;
    overflow: hidden;
`;

export const NavbarTitle = styled.h1`
    width: ${props => (props.open ? '0' : '100%')};
    margin: 0;
    font-size: 42px;
    color: white;

    display: flex;
    align-items: center;
    justify-content: center;
    opacity: ${props => (props.open ? '0' : '1')}; 
    transform: ${props => (props.open ? 'translateX(-20px)' : 'translateX(0)')};
    .iconeMenu{
        width: 40px;
        cursor: pointer;
        transition: .6s;
    }
`;

export const NavbarMenu = styled.div`
    width: ${props => (props.open ? '100%' : '0')};
    height: 100%;
    display: flex;
    transition: opacity 0.6s ease, transform 0.6s ease; 
    opacity: ${props => (props.open ? '1' : '0')}; 
    transform: ${props => (props.open ? 'translateX(0)' : 'translateX(-20px)')};
    flex-direction: column;
    gap: 20px;
    overflow: hidden; 
`;

export const Item = styled.div`
    width: ${props => (props.open ? '100%' : '20%')};
    opacity: ${props => (props.open ? '1' : '0')};
    transition: opacity 4s linear, display 4s linear;
    height: max-content;
`;

export const ItemButton = styled.div`
    width: 100%;
    height: 45px;
    border-bottom: 2px solid white;
    cursor: pointer;
    font-size: 32px;
    color: #FFFFFd;
    transition: background-color 0.3s ease, transform 0.3s ease; // Adicione outras transições conforme necessário
    display: flex;
    align-items: center;
    justify-content: start;

    &:hover {
        text-shadow: 3px 3px rgba(0,0,0,0);
    }
`;

export const ItemText = styled.span`
    width: ${props => (props.open ? '300px' : '0')};
    overflow: hidden;
    transition: width 0.4s ease, opacity 0.4s ease;
    opacity: ${props => (props.open ? '1' : '0')}; 
`;

export const ItemImage = styled.div`
    height: 50px;
    width: 50px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;

    img{
        width: 80%;
    }
`;

export const ItemImageExpand = styled.div`
    height: 50px;
    width: 50px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;

    img{
        width: 60%;
    }
`;

export const ItemDropdown = styled.div`
    width: 100%;
    max-height: ${(props) => (props.show ? "200px" : "0")}; 
    opacity: ${(props) => (props.show ? "1" : "0")}; 
    background: linear-gradient(to right, right, right);
    overflow: hidden; 
    transition: max-height 0.5s ease, opacity 0.5s ease; 
`;

export const ItemOptionsDropDown = styled.div`
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: start;
    color: white;
    font-size: 22px;
    transition: .3s;
    cursor: pointer;  

    &:hover{
        background: linear-gradient(to right, #1E3E62, #0B192C);
    }
`;

export const LogoutButton = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: ${props => (props.open ? 'end' : 'end')};;
    transition: .6s;

    button{
        width: 100%;
        font-size: 32px;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 0;
        background: rgba(200, 0, 0, 1);
        box-sizing: border-box;
        padding: 10px 10px;
        cursor: pointer;
        opacity: 1;
        transition: .3s;

        &:hover{
            opacity: 1;
        }
    }

`;



// export const nom = styled.div``;

// export const nom = styled.div``;





//     background: radial-gradient(rgba(53, 56, 79, 1), rgba(39, 42, 59, 1));

//     background: radial-gradient(rgba(39, 42, 59, 1), rgba(39, 42, 59, 1));

