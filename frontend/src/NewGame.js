import React, {useState} from 'react';
import styled from 'styled-components';
import Login from './components/Login';
import CreateGame from './components/CreateGame'
import IsAuthenticated from './components/Authentication'

const Container = styled.div`
    display: flex;
    align-items: center;
`

const NewGame = () => {
    const authorized = IsAuthenticated();
    if (!authorized){
        return <Login />
    }
    return <CreateGame />
}

export default NewGame;