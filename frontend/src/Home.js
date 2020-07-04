import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import LoginForm from './components/forms/LoginForm';

const Container = styled.div`
    display: flex;
    align-items: center;
`;

const Home = () => {
    const [auth, setAuth] = useState(false);

    useEffect(() => {
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
        isAuthenticated();
        console.log('home');
    }, []);
    return <Container>{auth ? <p>logged in nice</p> : <LoginForm />}</Container>;
};

export default Home;
