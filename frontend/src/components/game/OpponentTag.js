import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Container = styled.div`
    width: 100%;
    height: 20%;
    border-style: dotted;
    color: yellow;
`;

/**
 * Opponents window component.
 */

const OpponentTag = ({ name }) => {
    OpponentTag.propTypes = {
        name: PropTypes.string.isRequired,
    };
    return <Container>{name}</Container>;
};

export default OpponentTag;
