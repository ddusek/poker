import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import AC from '../../../media/cards/AC.svg';

const Container = styled.div`
    width: 250px;
    height: 200px;
    position: fixed;
    left: 50%;
    bottom: 0px;
    transform: translate(-50%);
    border-style: dotted;
`;

const Cards = () => {
    const [cards, setCards] = useState([]);
    const [cardPaths, setCardPaths] = useState([]);
    const imagePath = '../../../media/cards/';
    const getUrl = 'http://localhost:8000/api/get/player-detail/';
    useEffect(() => {
        const getCards = async () => {
            axios
                .get(getUrl)
                .then((response) => {
                    if (response.status === 200) {
                        setCards(response.data);

                        response.data.map((item) => {
                            setCardPaths((c) =>
                                c.concat(<img src={imagePath + item.image} alt="card" />)
                            );
                        });
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        };
        getCards();
    }, []);
    console.log('here', cards);
    console.log('cards', cardPaths);
    return (
        <Container>
            {cardPaths}

            <AC />
        </Container>
    );
};

export default Cards;
