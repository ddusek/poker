import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ShowCardsContext from '../contexts/ShowCardsContext';

const Container = styled.div`
    display: ${(props) => props.display};
    width: 70%;
    height: 60%;
    color: red;
`;

/**
 * Opponents chips component.
 */

const OpponentChips = ({ chips }) => {
    OpponentChips.propTypes = {
        chips: PropTypes.number.isRequired,
    };
    const display = useContext(ShowCardsContext) ? 'none' : 'block';
    return <Container display={display}>{chips} chips image here</Container>;
};

export default OpponentChips;
