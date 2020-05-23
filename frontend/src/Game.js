import React from 'react';
import styled from 'styled-components';
import InfoBox from './components/forms/InfoBox';

const GameStyle = styled.div`
    color: white;
`

const Game = () => {
    return (
        <GameStyle>
            <InfoBox 
            header='waiting for players'
            text='at least 2 players are needed to start the game'
            buttonText='start now'
             />
            
        </GameStyle>
    );
}

export default Game;