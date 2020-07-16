import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Container = styled.div`
    width: 100%;
    height: 20%;
    border-style: dotted;
    color: blue;
`;

/**
 * Opponents window component.
 */

const OpponentAction = ({ action }) => {
    OpponentAction.propTypes = {
        action: PropTypes.string.isRequired,
    };
    return <Container>{action}</Container>;
};

export default OpponentAction;
