import { useState } from 'react';
import axios from 'axios';

const IsAuthenticated = () => {
    const getUrl = 'http://localhost:8000/user/isloggedin/';
    axios
        .get(getUrl)
        .then((response) => {
            if (response.status === 200) {
                return true;
            }
            return false;
        })
        .catch((err) => {
            console.log(err);
            return false;
        });
};

export default IsAuthenticated;
