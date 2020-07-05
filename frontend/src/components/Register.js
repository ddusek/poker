import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import RegisterForm from './forms/RegisterForm';
import InfoBox from './forms/InfoBox';

const Container = styled.div`
    color: white;
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    text-align: center;
`;

/**
 * Page for registration
 */
const Register = () => {
    const [auth, setAuth] = useState(false);
    useEffect(() => {
        console.log('register');
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
    if (!auth) {
        return (
            <Container>
                <RegisterForm />
            </Container>
        );
    }
    return (
        <Container>
            <InfoBox
                text="You are logged in. If you want to register new account, logout first."
                buttonText="Log out"
            />
        </Container>
    );
};

export default Register;
