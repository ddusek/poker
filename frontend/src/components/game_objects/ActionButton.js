import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.button`
    width: 100%;
`;

/**
 * Button component used in actions.
 */

const Button = ({ text }) => {
    Button.propTypes = {
        text: PropTypes.string.isRequired,
    };
    return <Container>{text}</Container>;
};

export default Button;
