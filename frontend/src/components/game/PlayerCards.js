import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import CardIcon from './utils/svgHelper';
import HandContext from '../contexts/HandContext';

const Container = styled.div`
    width: 250px;
    height: 187.5px;
    position: fixed;
    left: 50%;
    bottom: 0px;
    transform: translate(-50%);
    background-color: rgb(25, 25, 55);
    border-radius: 10px 10px 0 0;
`;

const CardsContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
`;

/**
 * Component containing player cards.
 */

const Cards = () => {
    const [cardFiles, setCardFiles] = useState([]);
    const imagePath = 'cards/';
    const hand = useContext(HandContext);

    useEffect(() => {
        if (Object.keys(hand).length === 2) {
            hand.forEach((item) => {
                setCardFiles((c) => c.concat(imagePath + item.image));
            });
        }
    }, [hand]);
    // Return cards only if list contains 2 cards.
    console.log('cards component', cardFiles);
    return (
        <Container>
            {cardFiles.length === 2 ? (
                <CardsContainer>
                    <CardIcon name={cardFiles[0]} size="120" />
                    <CardIcon name={cardFiles[1]} size="120" />
                </CardsContainer>
            ) : (
                <p>loading cards</p>
            )}
        </Container>
    );
};

export default Cards;
