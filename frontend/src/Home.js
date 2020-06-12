import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Login from './components/Login';

const Container = styled.div`
    display: flex;
    align-items: center;
`;

const Home = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const getUrl = 'http://localhost:8000/user/isloggedin/';
    const Content = () => {
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
                        return <p>logged in nice</p>;
                    }
                    setLoggedIn(false);
                    return '';
                },
                () => {
                    // setError(true);
                    // setErrorMessage('wrong username or password');
                }
            );
        if (!loggedIn) {
            return <Login />;
        }
        return <p>logged in nice</p>;
    };
    return (
        <Container>
            <Content />
        </Container>
    );
};

export default Home;
