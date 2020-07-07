import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import CardIcon from '../utils/svgHelper';

const Container = styled.div`
    width: 250px;
    height: 187.5px;
    position: fixed;
    left: 50%;
    bottom: 0px;
    transform: translate(-50%);
    border-style: dotted;
`;

const CardsContainer = styled.div`
    position: fixed;
    bottom: 0px;
    width: 100%;
    display: flex;
    justify-content: space-between;
`;

/**
 * Component containing player cards.
 */

const Cards = () => {
    const [cardFiles, setCardFiles] = useState([]);
    const imagePath = 'cards/';
    // const getUrl = 'http://localhost:8000/api/get/player-detail/';
    useEffect(() => {
        const getCards = async () => {
            // axios
            //     .get(getUrl)
            //     .then((response) => {
            //         if (response.status === 200) {
            //             // Get images of player cards.
            //             response.data.forEach((item) => {
            //                 setCardFiles((c) => c.concat(imagePath + item.image));
            //             });
            //         }
            //     })
            //     .catch((err) => {
            //         console.log(err);
            //     });
        };
        getCards();
    }, []);
    // Return cards only if list contains 2 cards.
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
