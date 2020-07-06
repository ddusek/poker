import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Button from './ActionButton';

const Container = styled.div`
    width: 400px;
    height: 200px;
    position: fixed;
    bottom: 0;
    right: 0;
    display: grid;
    background-color: rgb(25, 25, 35);
`;

const ButtonsContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 12px;
    padding: 8px;
`;

const RaiseContainer = styled.div`
    width: 100%;
    height: 100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const RaiseInput = styled.input`
    border-radius: 8px;
    width: 200px;
    background-color: rgb(155, 155, 185);
    border-style: hidden;
    text-align: center;

    ::-webkit-outer-spin-button,
    ::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    input[type='number'] {
        -moz-appearance: textfield;
    }

    :focus {
        outline: none;
    }
`;

const RaiseSlider = styled.input`
    width: 400px;
    :focus {
        outline: none;
    }
`;

const RaiseButton = styled(Button)`
    width: 200px;
`;

const FoldButton = styled(Button)`
    background-color: rgb(22, 122, 122);
    color: rgb(22, 122, 122);
`;

/**
 * Component containing all player poker actions (call, raise, fold, etc)
 */

const Actions = ({ playerChips = 100, bigBlind = 5 }) => {
    Actions.propTypes = {
        playerChips: PropTypes.number.isRequired,
        bigBlind: PropTypes.number.isRequired,
    };
    const [inputNumber, setInputNumber] = useState(bigBlind * 2);

    const handleChange = (event) => {
        if (event.target.type === 'number') {
            RaiseSlider.value = event.target.value;
        }
        setInputNumber(event.target.value);
    };

    return (
        <Container>
            <RaiseContainer>
                <RaiseInput value={inputNumber} type="number" onChange={handleChange} />
                <RaiseSlider
                    type="range"
                    id="points"
                    name="points"
                    min="0"
                    max={playerChips}
                    value={inputNumber}
                    onChange={handleChange}
                />
                <RaiseButton text="Raise" color="rgb(65,185,65)" hoverColor="rgb(35,240,35)" />
            </RaiseContainer>

            <ButtonsContainer>
                <Button text="Check" color="rgb(65,185,65)" hoverColor="rgb(35,240,35)" />
                <Button text="Call" color="rgb(65,185,65)" hoverColor="rgb(35,240,35)" />
                <Button text="All in" color="rgb(65,65,255)" hoverColor="rgb(45,45,255)" />
                <FoldButton text="Fold" color="rgb(255,65,65)" hoverColor="rgb(255,35,35)" />
            </ButtonsContainer>
        </Container>
    );
};

export default Actions;
