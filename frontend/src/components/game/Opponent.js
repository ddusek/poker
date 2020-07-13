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

const Opponent = ({ left, top }) => {
    Opponent.propTypes = {
        left: PropTypes.string.isRequired,
        top: PropTypes.string.isRequired,
    };
    return (
        <Container left={left} top={top}>
            <OpponentTag />
            <OpponentCards />
            <OpponentChipsText />
            <OpponentChips />
            <OpponentAction />
        </Container>
    );
};

export default Opponent;
