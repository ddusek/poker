import React from 'react';
import styled from 'styled-components';
import GameForm from './forms/GameForm';

const Container = styled.div`
    color: white;
`;

/**
 * Component for creating a new game
 */

const CreateGame = () => {
    return (
        <Container>
            <GameForm />
        </Container>
    );
};

export default CreateGame;
