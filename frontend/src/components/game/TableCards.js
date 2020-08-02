import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import GameContext from '../contexts/GameContext';

const Container = styled.div`
    position: fixed;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    left: 50%;
    top: 50%;
    transform: translateX(-50%);
    height: 150px;
    width: 500px;
    border-radius: 10px;
    background-color: rgb(45, 45, 45);
    color: blue;
`;

const TableCards = () => {
    const [cardFiles, setCardFiles] = useState([]);
    const imagePath = './cards/';
    const game = useContext(GameContext);

    // useEffect(() => {
    //     console.log(Object.keys(hand).length);
    //     if (Object.keys(hand).length === 2) {
    //         hand.forEach((item) => {
    //             setCardFiles((c) => c.concat(imagePath + item.image));
    //         });
    //     }
    // }, [hand]);
    return (
        <Container>
            <p>table cards</p>
        </Container>
    );
};

export default TableCards;
