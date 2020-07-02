import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

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
    return (
        <Container>
            <p />
            cards
        </Container>
    );
};

export default Cards;
