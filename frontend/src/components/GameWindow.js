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
    height: 200px;
    width: 250px;
    border-style: dotted;
`;

const OpponentChipsContainer = styled.div`
    position: fixed;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    left: ${(props) => props.left};
    top: ${(props) => props.top};
    transform: translateX(-50%);
    height: 75px;
    width: 100px;
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
            <OpponentChipsContainer left="50%" top="25%" />

            <OpponentsContainer left="33%" top="5%">
                <OpponentTag />
                <OpponentCards />
                <OpponentChipsTotal />
                <OpponentChipsRound />
                <OpponentAction />
            </OpponentsContainer>
            <OpponentChipsContainer left="36%" top="30%" />

            <OpponentsContainer left="67%" top="5%">
                <OpponentTag />
                <OpponentCards />
                <OpponentChipsTotal />
                <OpponentChipsRound />
                <OpponentAction />
            </OpponentsContainer>
            <OpponentChipsContainer left="64%" top="30%" />

            <OpponentsContainer left="14%" top="22%">
                <OpponentTag />
                <OpponentCards />
                <OpponentChipsTotal />
                <OpponentChipsRound />
                <OpponentAction />
            </OpponentsContainer>
            <OpponentChipsContainer left="26%" top="40%" />

            <OpponentsContainer left="86%" top="22%">
                <OpponentTag />
                <OpponentCards />
                <OpponentChipsTotal />
                <OpponentChipsRound />
                <OpponentAction />
            </OpponentsContainer>
            <OpponentChipsContainer left="74%" top="40%" />

            <OpponentsContainer left="10%" top="50%">
                <OpponentTag />
                <OpponentCards />
                <OpponentChipsTotal />
                <OpponentChipsRound />
                <OpponentAction />
            </OpponentsContainer>
            <OpponentChipsContainer left="22%" top="60%" />

            <OpponentsContainer left="90%" top="50%">
                <OpponentTag />
                <OpponentCards />
                <OpponentChipsTotal />
                <OpponentChipsRound />
                <OpponentAction />
            </OpponentsContainer>
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
