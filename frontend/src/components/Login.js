import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import LoginForm from './forms/LoginForm';
import InfoBox from './forms/InfoBox';

const Container = styled.div`
    color: white;
`;

/**
 * Login Component
 */
const Login = () => {
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
    }, []);

    if (auth) {
        return (
            <Container>
                <InfoBox text="You are already logged in. You can log out with button below." buttonText="Log out" />
            </Container>
        );
    }
    return (
        <Container>
            <LoginForm />
        </Container>
    );
};

export default Login;
