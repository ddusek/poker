import React, {useState} from 'react';
import styled from 'styled-components';
import RegisterForm from './components/RegisterForm';
import axios from 'axios';
import InfoBox from './components/InfoBox';

const Container = styled.div`
    color: white;
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    text-align: center;
`

const Register = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const getUrl = 'http://localhost:8000/user/isloggedin/';
    axios
        .get(getUrl, {
            method: 'GET',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json;charset=UTF-8',
            }
        })
        .then((response) => {
            if (response.status == 200){
                setLoggedIn(true);
            }
            else {
                setLoggedIn(false);
            }
        }, (error) => {
            setError(true);
            setErrorMessage('wrong username or password');
        })
    if (!loggedIn){
        return (
        <Container>
            <RegisterForm />
        </Container>
        )
    }
    return (
        <Container>
            <InfoBox 
                text='You are logged in. If you want to register new account, logout first.'
                buttonText='Log out'
            />
        </Container>
    );
}

export default Register;