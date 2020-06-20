import { useState } from 'react';
import axios from 'axios';

const IsAuthenticated = () => {
    const getUrl = 'http://localhost:8000/user/isloggedin/';
    const [loggedIn, setLoggedIn] = useState(false);
    axios
        .get(getUrl)
        .then((response) => {
            if (response.status === 200) {
                setLoggedIn(true);
            } else {
                setLoggedIn(false);
            }
        })
        .catch((err) => {
            console.log(err);
            setLoggedIn(false);
        });
    return loggedIn;
};

export default IsAuthenticated;
