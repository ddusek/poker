import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import SvgIcon from '../utils/svgHelper';

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
    console.log('cards', cardPaths);
    return (
        <Container>
            {cardPaths}
            <SvgIcon name="cards/2C" fill="black" />
        </Container>
    );
};

export default Cards;
