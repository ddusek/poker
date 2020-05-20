import React, {useState} from 'react';
import styled from 'styled-components';
import GameForm from './forms/GameForm';

const Container = styled.div`
    color: white;
`

const CreateGame = () => {
    return (
    <Container>
        <GameForm />
    </Container>
    );
}

export default CreateGame;