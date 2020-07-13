import React, { useContext } from 'react';
import styled from 'styled-components';
import ShowCardsContext from '../contexts/ShowCardsContext';

const Container = styled.div`
    display: ${(props) => props.display};
    width: 30%;
    height: 60%;
    border-style: dotted;
    color: coral;
`;

/**
 * Opponents window component.
 */

const OpponentChipsText = () => {
    const display = useContext(ShowCardsContext) ? 'none' : 'block';
    return (
        <Container display={display}>
            <p>chips text</p>
        </Container>
    );
};

export default OpponentChipsText;
