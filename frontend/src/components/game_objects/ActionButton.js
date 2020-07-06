import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

/**
 * Button component used in actions.
 */

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
    const Container = styled.button`
        width: 100%;
        background-color: ${color};
        border-radius: 8px;
        border-color: rgb(225, 225, 225);

        :focus {
            outline: none;
        }

        :hover {
            background-color: ${hoverColor};
            //color: rgb(55, 55, 55);
        }
    `;

    return <Container>{text}</Container>;
};

export default Button;
