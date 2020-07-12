import React, { useState } from 'react';
import styled from 'styled-components';
import Actions from './game/Actions';
import Cards from './game/PlayerCards';
import Logs from './game/Logs';
import OpponentCards from './game/OpponentCards';
import OpponentChipsTotal from './game/OpponentChipsTotal';
import OpponentTag from './game/OpponentTag';
import OpponentAction from './game/OpponentAction';
import OpponentChipsRound from './game/OpponentChipsRound';

const Container = styled.div`
    color: white;
`;

const BottomContainer = styled.div`
    color: green;
    height: 200px;
`;

const OpponentsContainer = styled.div`
    position: fixed;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    left: ${(props) => props.left};
    top: ${(props) => props.top};
    transform: translateX(-50%);
    height: 150px;
    width: 200px;
    border-style: dotted;
`;

/**
 * Component containing all components inside gameplay window
 * Should be used in Game Component.
 */
const GameWindow = () => {
    const [players, setPlayers] = useState(2);
    return (
        <Container>
            <OpponentsContainer left="50%" top="1%">
                <OpponentTag />
                <OpponentCards />
                <OpponentChipsTotal />
                <OpponentChipsRound />
                <OpponentAction />
            </OpponentsContainer>
            <OpponentsContainer left="33%" top="5%">
                <OpponentTag />
                <OpponentCards />
                <OpponentChipsTotal />
                <OpponentChipsRound />
                <OpponentAction />
            </OpponentsContainer>
            <OpponentsContainer left="67%" top="5%">
                <OpponentTag />
                <OpponentCards />
                <OpponentChipsTotal />
                <OpponentChipsRound />
                <OpponentAction />
            </OpponentsContainer>
            <OpponentsContainer left="16%" top="12%">
                <OpponentTag />
                <OpponentCards />
                <OpponentChipsTotal />
                <OpponentChipsRound />
                <OpponentAction />
            </OpponentsContainer>
            <OpponentsContainer left="84%" top="12%">
                <OpponentTag />
                <OpponentCards />
                <OpponentChipsTotal />
                <OpponentChipsRound />
                <OpponentAction />
            </OpponentsContainer>
            <OpponentsContainer left="10%" top="40%">
                <OpponentTag />
                <OpponentCards />
                <OpponentChipsTotal />
                <OpponentChipsRound />
                <OpponentAction />
            </OpponentsContainer>
            <OpponentsContainer left="90%" top="40%">
                <OpponentTag />
                <OpponentCards />
                <OpponentChipsTotal />
                <OpponentChipsRound />
                <OpponentAction />
            </OpponentsContainer>

            <BottomContainer>
                <Logs />
                <Cards />
                <Actions />
            </BottomContainer>
        </Container>
    );
};

export default GameWindow;
