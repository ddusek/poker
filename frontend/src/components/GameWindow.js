import React, { useState } from 'react';
import styled from 'styled-components';
import Actions from './game/Actions';
import Cards from './game/PlayerCards';
import Logs from './game/Logs';
import OpponentChipsRound from './game/OpponentChipsRound';
import OpponentChipsRoundText from './game/OpponentChipsRoundText';
import OpponentContainer from './game/OpponentContainer';
import OpponentChipsContainer from './game/OpponentChipsContainer';

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
            <OpponentContainer left="50%" top="1%" />
            <OpponentChipsContainer left="50%" top="25%" />

            <OpponentContainer left="33%" top="5%" />
            <OpponentChipsContainer left="36%" top="30%" />

            <OpponentContainer left="67%" top="5%" />
            <OpponentChipsContainer left="64%" top="30%" />

            <OpponentContainer left="14%" top="22%" />
            <OpponentChipsContainer left="26%" top="40%" />

            <OpponentContainer left="86%" top="22%" />
            <OpponentChipsContainer left="74%" top="40%" />

            <OpponentContainer left="10%" top="50%" />
            <OpponentChipsContainer left="22%" top="60%" />

            <OpponentContainer left="90%" top="50%" />
            <OpponentChipsContainer left="78%" top="60%" />

            <BottomContainer>
                <Logs />
                <Cards />
                <Actions />
            </BottomContainer>
        </Container>
    );
};

export default GameWindow;
