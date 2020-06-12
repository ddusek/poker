import React from 'react';
import Login from './components/Login';
import CreateGame from './components/CreateGame';
import IsAuthenticated from './components/Authentication';

const NewGame = () => {
    const authorized = IsAuthenticated();
    if (!authorized) {
        return <Login />;
    }
    return <CreateGame />;
};

export default NewGame;
