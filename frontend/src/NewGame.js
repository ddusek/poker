import React, { useEffect, useState } from 'react';
import Login from './components/Login';
import CreateGame from './components/CreateGame';
import IsAuthenticated from './utils/Authentication';

const NewGame = () => {
    const [auth, setAuth] = useState(false);
    useEffect(() => {
        console.log('new_game');
        setAuth(IsAuthenticated());
    }, []);
    return <>{auth ? <CreateGame /> : <Login />}</>;
};

export default NewGame;
