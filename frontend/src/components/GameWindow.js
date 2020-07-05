import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Actions from './game_objects/Actions';
import Cards from './game_objects/player/Cards';
import Logs from './game_objects/Logs';

const Container = styled.div`
    color: white;
`;

const BottomContainer = styled.div`
    color: green;
    height: 200px;
`;

/**
 * Component containing all components inside gameplay window
 * Should be used in Game Component.
 */
const GameWindow = () => {
    return (
        <Container>
            <BottomContainer>
                <Actions />
                <Cards />
                <Logs />
            </BottomContainer>
        </Container>
    );
};

export default GameWindow;
