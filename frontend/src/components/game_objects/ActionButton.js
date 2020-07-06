import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

/**
 * Button component used in actions.
 */

const Container = styled.button`
    width: 100%;
    background-color: ${(props) => props.color};
    border-radius: 8px;
    border-color: rgb(225, 225, 225);

    :focus {
        outline: none;
    }

    :hover {
        background-color: ${(props) => props.hoverColor};
        //color: rgb(55, 55, 55);
    }
`;

const Button = ({ text, color = 'rgb(125,125,155)', hoverColor = 'rgb(155,155,155)' }) => {
    Button.propTypes = {
        text: PropTypes.string.isRequired,
        color: PropTypes.string,
        hoverColor: PropTypes.string,
    };
    Button.defaultProps = {
        color: 'rgb(125,125,155)',
        hoverColor: 'rgb(155,155,155)',
    };

    return (
        <Container color={color} hoverColor={hoverColor}>
            {text}
        </Container>
    );
};

export default Button;
