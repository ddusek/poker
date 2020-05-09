import React from 'react';
import styled from 'styled-components';
import RegisterForm from './components/RegisterForm';

const Container = styled.div`
    color: white;
`

const Register = () => {
    return (
        <Container>
            <RegisterForm />
        </Container>
    );
}

export default Register;