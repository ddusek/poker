import React, { useContext } from 'react';
import styled from 'styled-components';
import ShowCardsContext from '../contexts/ShowCardsContext';

const Container = styled.div`
    display: ${(props) => props.display};
    width: 50%;
    height: 60%;
    border-style: dotted;
    color: green;
`;

/**
 * Opponents window component.
 */

const OpponentChipsRound = () => {
    const display = useContext(ShowCardsContext) ? 'none' : 'block';
    return (
        <Container display={display}>
            <p>chips round comp</p>
        </Container>
    );
};

export default OpponentChipsRound;
