import React, { useContext } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ShowCardsContext from '../contexts/ShowCardsContext';

const Container = styled.div`
    display: ${(props) => props.display};
    width: 100%;
    height: 30%;
`;

/**
 * Opponents window component.
 */

const PotText = ({ pot }) => {
    PotText.propTypes = {
        pot: PropTypes.number.isRequired,
    };
    const display = useContext(ShowCardsContext) ? 'none' : 'block';
    return <Container display={display}>{pot}</Container>;
};

export default PotText;
