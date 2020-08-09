import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import axios from 'axios';

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

const Button = ({ action, text, actionValue = 0, color = 'rgb(125,125,155)', hoverColor = 'rgb(155,155,155)' }) => {
    axios.defaults.xsrfCookieName = 'csrftoken';
    axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';
    const postUrl = `http://localhost:8000/game/post/player/${action}/`;

    // Get name of the game from url.
    const gameName = window.location.pathname.slice(5).replace(/\//g, '');

    Button.propTypes = {
        action: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        actionValue: PropTypes.number,
        color: PropTypes.string,
        hoverColor: PropTypes.string,
    };
    Button.defaultProps = {
        actionValue: 0,
        color: 'rgb(125,125,155)',
        hoverColor: 'rgb(155,155,155)',
    };
    const onClick = async () => {
        const data = { game: gameName, value: actionValue };
        console.log(actionValue);
        axios
            .post(postUrl, {
                body: data,
            })
            .then((response) => {
                if (response.status === 200) {
                    console.log('success', response);
                } else {
                    console.log('error', response.status);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <Container color={color} hoverColor={hoverColor} onClick={onClick}>
            {text}
        </Container>
    );
};

export default Button;
