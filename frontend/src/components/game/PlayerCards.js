import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import CardIcon from './utils/svgHelper';
import PlayerContext from '../contexts/PlayerContext';

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
    const getCardsUrl = 'http://localhost:8000/game/get/cards-detail/';

    const gameName = window.location.pathname.slice(5).replace(/\//g, '');

    const [cardFiles, setCardFiles] = useState([]);
    const imagePath = 'cards/';
    const player = useContext(PlayerContext);
    const [handInfoSet, setHandInfoSet] = useState(false);
    const [handInfo, setHandInfo] = useState({});

    useEffect(() => {
        if (handInfo !== undefined) {
            if (Object.keys(handInfo).length === 2) {
                handInfo.forEach((item) => {
                    setCardFiles((c) => c.concat(imagePath + item.image));
                });
            }
        }
    }, [handInfo]);

    useEffect(() => {
        // get current player's cards from api
        const getHand = async () => {
            if (!handInfoSet && player) {
                axios
                    .get(`${getCardsUrl}?game=${gameName}`)
                    .then((response) => {
                        if (response.status === 200) {
                            setHandInfoSet(true);
                            setHandInfo(response.data);
                        } else {
                            console.log('didnt get cards', response.status);
                        }
                    })
                    .catch((err) => {
                        console.log(`Error: ${err}`);
                    });
            }
        };
        getHand();
    }, [handInfoSet, gameName, player]);
    // Return cards only if list contains 2 cards.
    if (!handInfoSet || player === undefined) {
        return (
            <Container>
                <p>loading cards</p>
            </Container>
        );
    }
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
