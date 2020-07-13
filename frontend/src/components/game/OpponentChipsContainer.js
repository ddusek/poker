import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import OpponentChipsRound from './OpponentChipsRound';
import OpponentChipsRoundText from './OpponentChipsRoundText';

const Container = styled.div`
    position: fixed;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    left: ${(props) => props.left};
    top: ${(props) => props.top};
    transform: translateX(-50%);
    height: 110px;
    width: 120px;
    border-style: dotted;
`;

const OpponentChipsContainer = ({ left, top }) => {
    OpponentChipsContainer.propTypes = {
        left: PropTypes.string.isRequired,
        top: PropTypes.string.isRequired,
    };
    return (
        <Container left={left} top={top}>
            <OpponentChipsRound />
            <OpponentChipsRoundText />
        </Container>
    );
};

export default OpponentChipsContainer;
