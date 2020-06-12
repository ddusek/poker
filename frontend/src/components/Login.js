import React from 'react';
import styled from 'styled-components';
import LoginForm from './forms/LoginForm';
import InfoBox from './forms/InfoBox';
import IsAuthenticated from './Authentication';

const Container = styled.div`
    color: white;
`;

const Login = () => {
    const authorized = IsAuthenticated();
    if (!authorized) {
        return (
            <Container>
                <LoginForm />
            </Container>
        );
    }
    return (
        <Container>
            <InfoBox
                text="You are already logged in. You can log out with button below."
                buttonText="Log out"
            />
        </Container>
    );
};

export default Login;
