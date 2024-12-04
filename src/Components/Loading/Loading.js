import React from "react";
import { Mosaic } from "react-loading-indicators"
import styled from "styled-components";
import { useLoad } from "../../Context/LoadContext";

export default function Loading() {
    const {loading} = useLoad();

    if (!loading)
        return null;

    return (
        <>
            <ContainerLoad>
                <Mosaic color="#1ceeeb" size="large" text="" textColor="" />
            </ContainerLoad>
        </>
    )
}

const ContainerLoad = styled.div`
    position: fixed;
    z-index: 99;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0,0,0,0.8);;
`;