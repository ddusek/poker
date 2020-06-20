import React from 'react';
import styled from 'styled-components';
import RegisterForm from './forms/RegisterForm';
import InfoBox from './forms/InfoBox';
import IsAuthenticated from './Authentication';

const Container = styled.div`
    color: white;
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    text-align: center;
`;

const Register = () => {
    console.log('register');
    if (!IsAuthenticated()) {
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
