import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import OpponentCards from './OpponentCards';
import OpponentChips from './OpponentChips';
import OpponentTag from './OpponentTag';
import OpponentAction from './OpponentAction';
import OpponentChipsText from './OpponentPotText';

const Container = styled.div`
    position: fixed;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    left: ${(props) => props.left};
    top: ${(props) => props.top};
    transform: translateX(-50%);
    height: 180px;
    width: 250px;
    border-style: dotted;
`;

const Opponent = ({ left, top, player }) => {
    Opponent.propTypes = {
        left: PropTypes.string.isRequired,
        top: PropTypes.string.isRequired,
        player: PropTypes.shape({
            id: PropTypes.number.isRequired,
            user: PropTypes.number.isRequired,
            chips: PropTypes.number.isRequired,
            game: PropTypes.number.isRequired,
            highest_combination: PropTypes.number.isRequired,
            pot: PropTypes.number.isRequired,
            round_bid: PropTypes.number.isRequired,
            last_action: PropTypes.string.isRequired,
            can_call: PropTypes.bool.isRequired,
            can_check: PropTypes.bool.isRequired,
            can_raise: PropTypes.bool.isRequired,
            is_all_in: PropTypes.bool.isRequired,
            is_folded: PropTypes.bool.isRequired,
            is_in_game: PropTypes.bool.isRequired,
        }).isRequired,
    };
    return (
        <Container left={left} top={top}>
            <OpponentTag name={player.user} />
            <OpponentCards />
            <OpponentChipsText chips={player.chips} />
            <OpponentChips chips={player.chips} />
            <OpponentAction action={player.last_action} />
        </Container>
    );
};

export default Opponent;
