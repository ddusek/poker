import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Actions from './game/Actions';
import Cards from './game/PlayerCards';
import Logs from './game/Logs';
import Opponent from './game/Opponent';
import PotContainer from './game/PotContainer';
import TableCards from './game/TableCards';
import PlayerContext from './contexts/PlayerContext';

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
const GameWindow = ({ playerIds }) => {
    GameWindow.propTypes = {
        playerIds: PropTypes.arrayOf(PropTypes.number).isRequired,
    };
    return (
        <Container>
            <Opponent playerID={playerIds[0]} left="50%" top="1%" />
            <PotContainer playerID={playerIds[0]} left="50%" top="22%" />

            <Opponent playerID={playerIds[1]} left="33%" top="5%" />
            <PotContainer playerID={playerIds[1]} left="36%" top="26%" />

            <Opponent playerID={playerIds[2]} left="67%" top="5%" />
            <PotContainer playerID={playerIds[2]} left="64%" top="26%" />

            <Opponent playerID={playerIds[3]} left="14%" top="22%" />
            <PotContainer playerID={playerIds[3]} left="25%" top="35%" />

            <Opponent playerID={playerIds[4]} left="86%" top="22%" />
            <PotContainer playerID={playerIds[4]} left="75%" top="35%" />

            <Opponent playerID={playerIds[5]} left="10%" top="50%" />
            <PotContainer playerID={playerIds[5]} left="22%" top="60%" />

            <Opponent playerID={playerIds[6]} left="90%" top="50%" />
            <PotContainer playerID={playerIds[6]} left="78%" top="60%" />

            <PotContainer playerID={useContext(PlayerContext.id)} left="50%" top="36%" width="250px" />
            <TableCards />

            <PotContainer playerID={useContext(PlayerContext.id)} left="50%" top="67%" />
            <BottomContainer>
                <Logs />
                <Cards />
                <Actions />
            </BottomContainer>
        </Container>
    );
};

export default GameWindow;
