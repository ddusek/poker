import React, { useContext } from 'react';
import styled from 'styled-components';
import ShowCardsContext from '../contexts/ShowCardsContext';

const Container = styled.div`
    display: ${(props) => props.display};
    width: 100%;
    height: 30%;
    border-style: dotted;
    color: purple;
`;

/**
 * Opponents window component.
 */

const OpponentChipsRoundText = () => {
    const display = useContext(ShowCardsContext) ? 'none' : 'block';
    return (
        <Container display={display}>
            <p>chips text</p>
        </Container>
    );
};

export default OpponentChipsRoundText;
