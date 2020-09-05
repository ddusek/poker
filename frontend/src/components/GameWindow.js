import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Actions from './game/Actions';
import Cards from './game/PlayerCards';
import Logs from './game/Logs';
import Opponent from './game/Opponent';
import PotContainer from './game/PotContainer';
import TableCards from './game/TableCards';
import PlayerContext from './contexts/PlayerContext';
import GameContext from './contexts/GameContext';

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
const GameWindow = ({ players }) => {
    const player = useContext(PlayerContext);
    const game = useContext(GameContext);
    GameWindow.propTypes = {
        players: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number.isRequired,
                user: PropTypes.number.isRequired,
                chips: PropTypes.number.isRequired,
                game: PropTypes.number.isRequired,
                highest_combination: PropTypes.number.isRequired,
                pot: PropTypes.number.isRequired,
                round_bet: PropTypes.number.isRequired,
                can_call: PropTypes.bool.isRequired,
                can_check: PropTypes.bool.isRequired,
                can_raise: PropTypes.bool.isRequired,
                is_all_in: PropTypes.bool.isRequired,
                is_folded: PropTypes.bool.isRequired,
                is_in_game: PropTypes.bool.isRequired,
            }).isRequired
        ).isRequired,
    };

    const [actions, setActions] = useState({});

    useEffect(() => {
        setActions({
            can_call: player.can_call,
            can_check: player.can_check,
            can_raise: player.can_raise,
            is_all_in: player.is_all_in,
            is_folded: player.is_folded,
            is_in_game: player.is_in_game,
        });
    }, [player.can_call, player.can_check, player.can_raise, player.is_all_in, player.is_folded, player.is_in_game]);

    if (players !== undefined) {
        return (
            <Container>
                <Opponent player={players[0]} left="50%" top="1%" />
                <PotContainer pot={players[0].round_bet} left="50%" top="22%" />

                <Opponent player={players[1]} left="33%" top="5%" />
                <PotContainer pot={players[1].round_bet} left="36%" top="26%" />

                <Opponent player={players[2]} left="67%" top="5%" />
                <PotContainer pot={players[2].round_bet} left="64%" top="26%" />

                <Opponent player={players[3]} left="14%" top="22%" />
                <PotContainer pot={players[3].round_bet} left="25%" top="35%" />

                <Opponent player={players[4]} left="86%" top="22%" />
                <PotContainer pot={players[4].round_bet} left="75%" top="35%" />

                <Opponent player={players[5]} left="10%" top="50%" />
                <PotContainer pot={players[5].round_bet} left="22%" top="60%" />

                <Opponent player={players[6]} left="90%" top="50%" />
                <PotContainer pot={players[6].round_bet} left="78%" top="60%" />

                {/* table pot */}
                <PotContainer pot={game.pot} left="50%" top="36%" width="250px" />
                <TableCards />

                <PotContainer pot={player.round_bet} left="50%" top="67%" />
                <BottomContainer>
                    <Logs />
                    <Cards />
                    <Actions playerActions={actions} />
                </BottomContainer>
            </Container>
        );
    }
    return (
        <Container>
            <p>getting data</p>
        </Container>
    );
};

export default GameWindow;
