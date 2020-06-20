import React from 'react';
import Login from './components/Login';
import CreateGame from './components/CreateGame';
import IsAuthenticated from './components/Authentication';

const NewGame = () => {
    console.log('new_game');
    if (!IsAuthenticated()) {
        return <Login />;
    }
    return <CreateGame />;
};

export default NewGame;
