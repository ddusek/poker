import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Container = styled.div`
    width: 100%;
    height: 20%;
    color: blue;
`;

/**
 * Opponents last action component.
 */

const OpponentAction = ({ action }) => {
    OpponentAction.propTypes = {
        action: PropTypes.string.isRequired,
    };
    return <Container>{action} action goes here</Container>;
};

export default OpponentAction;
