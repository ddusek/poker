import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ShowCardsContext from '../contexts/ShowCardsContext';

const Container = styled.div`
    display: ${(props) => props.display};
    width: 30%;
    height: 60%;
    color: coral;
`;

/**
 * Opponents pot text component.
 */

const OpponentChipsText = ({ chips }) => {
    OpponentChipsText.propTypes = {
        chips: PropTypes.number.isRequired,
    };
    const display = useContext(ShowCardsContext) ? 'none' : 'block';
    return (
        <Container display={display}>
            {chips} <br /> total
        </Container>
    );
};

export default OpponentChipsText;
