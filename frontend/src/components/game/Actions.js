import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Button from './ActionButton';
import PlayerContext from '../contexts/PlayerContext';
import GameContext from '../contexts/GameContext';

const Container = styled.div`
    pointer-events: ${(props) => props.disabled};
    width: 400px;
    height: 180px;
    position: fixed;
    bottom: 0;
    right: 0;
    display: grid;
    background-color: rgb(25, 25, 35);
    filter: ${(props) => (props.disabled === 'none' ? 'brightness(50%)' : '')};
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

const Actions = ({ playerActions }) => {
    Actions.propTypes = {
        playerActions: PropTypes.shape({
            can_call: PropTypes.bool.isRequired,
            can_check: PropTypes.bool.isRequired,
            can_raise: PropTypes.bool.isRequired,
            is_all_in: PropTypes.bool.isRequired,
            is_folded: PropTypes.bool.isRequired,
            is_in_game: PropTypes.bool.isRequired,
        }).isRequired,
    };
    const getActionsUrl = 'http://localhost:8000/game/get/player-actions/';
    const gameName = window.location.pathname.slice(5).replace(/\//g, '');

    const [inputNumber, setInputNumber] = useState(0);
    const player = useContext(PlayerContext);
    const game = useContext(GameContext);
    const [isMyTurn, setIsMyTurn] = useState(player.id === game.current_player);
    const [canCall, setCanCall] = useState(false);
    const [canRaise, setCanRaise] = useState(false);
    const [canCheck, setCanCheck] = useState(false);
    const [canAllIn, setCanAllIn] = useState(false);
    const [canFold, setCanFold] = useState(false);

    useEffect(() => {
        setInputNumber(game.big_blind);
    }, [game.big_blind, game.small_blind]);

    const handleChange = (event) => {
        if (event.target.type === 'number') {
            RaiseSlider.value = event.target.value;
        }
        setInputNumber(event.target.value);
    };

    useEffect(() => {
        axios
            .get(`${getActionsUrl}?game=${gameName}`)
            .then((response) => {
                if (response.status === 200) {
                    setCanCall(player.can_call);
                    setCanRaise(player.can_raise);
                    setCanCheck(player.can_check);
                    setCanAllIn(!player.is_all_in);
                    setCanFold(!player.is_folded);
                } else {
                    console.log('didnt get player', response.status);
                }
            })
            .catch((err) => {
                console.log(`Error: ${err}`);
            });
    }, [player, gameName, game]);

    // refresh current player when game starts
    useEffect(() => {
        setIsMyTurn(player.id === game.current_player);
    }, [game.current_player, player.id]);

    return (
        <Container disabled={isMyTurn ? 'all' : 'none'}>
            <RaiseContainer>
                <RaiseInput value={inputNumber} type="number" onChange={handleChange} />
                <RaiseSlider
                    type="range"
                    id="points"
                    name="points"
                    min="0"
                    max={player.chips}
                    value={inputNumber}
                    onChange={handleChange}
                />
                <RaiseButton
                    setIsMyTurn={setIsMyTurn}
                    action="raise"
                    isEnabled={canRaise}
                    text="Raise"
                    actionValue={inputNumber}
                    color="rgb(65,185,65)"
                    hoverColor="rgb(35,240,35)"
                />
            </RaiseContainer>

            <ButtonsContainer>
                <Button
                    setIsMyTurn={setIsMyTurn}
                    action="check"
                    isEnabled={canCheck}
                    text="Check"
                    color="rgb(65,185,65)"
                    hoverColor="rgb(35,240,35)"
                />
                <Button
                    setIsMyTurn={setIsMyTurn}
                    action="call"
                    isEnabled={canCall}
                    text="Call"
                    color="rgb(65,185,65)"
                    hoverColor="rgb(35,240,35)"
                />
                <Button
                    setIsMyTurn={setIsMyTurn}
                    action="all_in"
                    isEnabled={canAllIn}
                    text="All in"
                    color="rgb(65,65,255)"
                    hoverColor="rgb(45,45,255)"
                />
                <FoldButton
                    setIsMyTurn={setIsMyTurn}
                    action="fold"
                    isEnabled={canFold}
                    text="Fold"
                    color="rgb(255,65,65)"
                    hoverColor="rgb(255,35,35)"
                />
            </ButtonsContainer>
        </Container>
    );
};

export default Actions;
