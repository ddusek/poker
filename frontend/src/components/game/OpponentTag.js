import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Container = styled.div`
    width: 100%;
    height: 20%;
    color: yellow;
    hr {
        border: 0;
        height: 1px;
        width: 80%;
        display: block;
        margin-top: 7px;
        background-image: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(152, 152, 152, 0.75), rgba(0, 0, 0, 0));
    }
`;

/**
 * Opponents window component.
 */

const OpponentTag = ({ name }) => {
    OpponentTag.propTypes = {
        name: PropTypes.string.isRequired,
    };
    return (
        <Container>
            {name} <hr />
        </Container>
    );
};

export default OpponentTag;
