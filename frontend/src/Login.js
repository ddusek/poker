import React from 'react';
import styled from 'styled-components';
import LoginForm from './components/LoginForm';

const Container = styled.div`
    color: white;
`

const Login = () => {
    return (
        <Container>
            <LoginForm />
        </Container>
    );
}

export default Login;