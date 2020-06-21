import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import LoginForm from './forms/LoginForm';
import InfoBox from './forms/InfoBox';
import IsAuthenticated from '../utils/Authentication';

const Container = styled.div`
    color: white;
`;

const Login = (props) => {
    const [auth, setAuth] = useState(false);
    useEffect(() => {
        console.log('login');
        if ('isAuthenticated' in props) {
            setAuth(props.isAuthenticated);
        } else {
            setAuth(IsAuthenticated());
        }
    }, [props]);

    if (auth) {
        return (
            <Container>
                <InfoBox
                    text="You are already logged in. You can log out with button below."
                    buttonText="Log out"
                />
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
