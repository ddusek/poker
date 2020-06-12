import { useState } from 'react';
import axios from 'axios';

const IsAuthenticated = () => {
    const getUrl = 'http://localhost:8000/user/isloggedin/';
    const [loggedIn, setLoggedIn] = useState(false);
    axios
        .get(getUrl, {
            method: 'GET',
            headers: {
                Accept: 'application/json, text/plain',
                'Content-Type': 'application/json;charset=UTF-8',
            },
        })
        .then(
            (response) => {
                if (response.status === 200) {
                    setLoggedIn(true);
                } else {
                    setLoggedIn(false);
                }
            },
            (error) => {
                console.log(error);
                setLoggedIn(false);
            }
        );
    return loggedIn;
};

export default IsAuthenticated;
