import React from 'react';
import styled from 'styled-components';
import RegisterForm from './components/RegisterForm';

const Container = styled.div`
    color: white;
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    text-align: center;
`

const Register = () => {
    return (
        <Container>
            <RegisterForm />
        </Container>
    );
}

export default Register;