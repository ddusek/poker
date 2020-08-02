import React, { useContext } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ShowCardsContext from '../contexts/ShowCardsContext';

const Container = styled.div`
    display: ${(props) => props.display};
    width: 100%;
    height: 70%;
    color: green;
`;

/**
 * Opponents window component.
 */

const PotChips = ({ pot }) => {
    PotChips.propTypes = {
        pot: PropTypes.number.isRequired,
    };
    const display = useContext(ShowCardsContext) ? 'none' : 'block';
    return <Container display={display}>{pot} chips image here</Container>;
};

export default PotChips;
