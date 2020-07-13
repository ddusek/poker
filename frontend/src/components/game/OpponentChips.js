import React, { useContext } from 'react';
import styled from 'styled-components';
import ShowCardsContext from '../contexts/ShowCardsContext';

const Container = styled.div`
    display: ${(props) => props.display};
    width: 70%;
    height: 60%;
    border-style: dotted;
    color: red;
`;

/**
 * Opponents window component.
 */

const OpponentChips = () => {
    const display = useContext(ShowCardsContext) ? 'none' : 'block';
    return (
        <Container display={display}>
            <p>chips svgs</p>
        </Container>
    );
};

export default OpponentChips;
