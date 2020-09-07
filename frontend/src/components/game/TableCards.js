import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import CardIcon from './utils/svgHelper';
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

const CardsContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
`;

const TableCards = () => {
    const [cardFiles, setCardFiles] = useState([]);
    const imagePath = 'cards/';
    const game = useContext(GameContext);
    const getCardsUrl = 'http://localhost:8000/game/get/table-cards-detail/';
    const gameName = window.location.pathname.slice(5).replace(/\//g, '');
    const [cardsInfoSet, setCardsInfoSet] = useState(false);
    const [cardsInfo, setCardsInfo] = useState({});
    const [round, setRound] = useState(0);

    useEffect(() => {
        // get current player's cards from api
        const getTableCards = async () => {
            if (!cardsInfoSet) {
                axios
                    .get(`${getCardsUrl}?game=${gameName}`)
                    .then((response) => {
                        if (response.status === 200) {
                            setCardsInfoSet(true);
                            setCardsInfo(response.data);
                            setRound(game.rounds_played);
                        } else if (response.status !== 204) {
                            console.log('didnt get cards', response.status);
                        }
                    })
                    .catch((err) => {
                        console.log(`Error: ${err}`);
                    });
            }
        };
        getTableCards();
    }, [gameName, game, cardsInfoSet]);

    // refresh cards if next round started
    useEffect(() => {
        if (game.rounds_played !== round) {
            setRound(game.rounds_played);
            setCardsInfoSet(false);
        }
    }, [game.rounds_played, round]);

    useEffect(() => {
        if (Object.keys(cardsInfo).length > 0) {
            cardsInfo.forEach((item) => {
                if (!cardFiles.includes(imagePath + item.image)) {
                    setCardFiles((c) => c.concat(imagePath + item.image));
                }
            });
        }
    }, [cardsInfo, cardFiles, game.rounds_played]);

    if (game === undefined || !cardsInfoSet) {
        return (
            <Container>
                <p>table cards</p>
            </Container>
        );
    }
    return (
        <Container>
            <CardsContainer>
                {cardFiles.map((card) => {
                    return <CardIcon name={card} size="100" />;
                })}
            </CardsContainer>
        </Container>
    );
};

export default TableCards;
