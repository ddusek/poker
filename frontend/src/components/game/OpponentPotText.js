import React, { useContext } from 'react';
import PropTypes from 'prop-types';
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

const OpponentChipsText = ({ chips }) => {
    OpponentChipsText.propTypes = {
        chips: PropTypes.number.isRequired,
    };
    const display = useContext(ShowCardsContext) ? 'none' : 'block';
    return <Container display={display}>{chips}</Container>;
};

export default OpponentChipsText;
