import React, { useState, useEffect } from 'react';
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
    width: 200px;
`;

const RaiseSlider = styled.input`
    width: 400px;
`;

const RaiseButton = styled(Button)`
    width: 200px;
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
        setInputNumber(event.target.value);
    };

    return (
        <Container>
            <RaiseContainer>
                <RaiseInput value={inputNumber} onChange={handleChange} />
                <RaiseSlider
                    type="range"
                    id="points"
                    name="points"
                    min="0"
                    max={playerChips}
                    defaultValue={inputNumber}
                    onChange={handleChange}
                />
                <RaiseButton text="Raise" />
            </RaiseContainer>

            <ButtonsContainer>
                <Button text="Check" />
                <Button text="Call" />
                <Button text="All in" />
                <Button text="Fold" />
            </ButtonsContainer>
        </Container>
    );
};

export default Actions;
