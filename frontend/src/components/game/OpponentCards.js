import React, { useContext } from 'react';
import styled from 'styled-components';
import ShowCardsContext from '../contexts/ShowCardsContext';

const Container = styled.div`
    display: ${(props) => props.display};
    width: 100%;
    height: 60%;
    border-style: dotted;
    color: green;
`;

/**
 * Opponents cards component.
 */

const OpponentCards = () => {
    const display = useContext(ShowCardsContext) ? 'block' : 'none';

    return (
        <Container display={display}>
            <p>cards comp</p>
        </Container>
    );
};

export default OpponentCards;
