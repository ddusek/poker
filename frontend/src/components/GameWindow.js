import React, { useState } from 'react';
import styled from 'styled-components';
import Actions from './game/Actions';
import Cards from './game/PlayerCards';
import Logs from './game/Logs';
import Opponent from './game/Opponent';
import PotContainer from './game/PotContainer';
import TableCards from './game/TableCards';

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
    const [players, setPlayers] = useState(2);
    return (
        <Container>
            <Opponent left="50%" top="1%" />
            <PotContainer left="50%" top="22%" />

            <Opponent left="33%" top="5%" />
            <PotContainer left="36%" top="26%" />

            <Opponent left="67%" top="5%" />
            <PotContainer left="64%" top="26%" />

            <Opponent left="14%" top="22%" />
            <PotContainer left="25%" top="35%" />

            <Opponent left="86%" top="22%" />
            <PotContainer left="75%" top="35%" />

            <Opponent left="10%" top="50%" />
            <PotContainer left="22%" top="60%" />

            <Opponent left="90%" top="50%" />
            <PotContainer left="78%" top="60%" />

            <PotContainer left="50%" top="36%" width="250px" />
            <TableCards />

            <PotContainer left="50%" top="67%" />
            <BottomContainer>
                <Logs />
                <Cards />
                <Actions />
            </BottomContainer>
        </Container>
    );
};

export default GameWindow;
