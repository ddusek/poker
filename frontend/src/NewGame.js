import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Login from './components/Login';
import CreateGame from './components/CreateGame';

/**
 * Page for creating a new game
 */
const NewGame = () => {
    const [auth, setAuth] = useState(false);
    useEffect(() => {
        console.log('new_game');
        const isAuthenticated = async () => {
            const getUrl = 'http://localhost:8000/user/isloggedin/';
            axios
                .get(getUrl)
                .then((response) => {
                    setAuth(response.status === 200);
                })
                .catch((err) => {
                    console.log(err);
                    setAuth(false);
                });
        };
        setAuth(isAuthenticated());
    }, []);
    return <>{auth ? <CreateGame /> : <Login />}</>;
};

export default NewGame;
