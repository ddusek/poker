import React, {useState} from 'react';
import styled from 'styled-components';
import LoginForm from './components/LoginForm';
import axios from 'axios';
import InfoBox from './components/InfoBox';
const Container = styled.div`
    color: white;
`

const Login = () => {
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
            <LoginForm />
        </Container>
        )
    }
    return (
        <Container>
            <InfoBox 
                text='You are already logged in. You can log out with button below.'
                buttonText='Log out'
            />
        </Container>
    );
}

export default Login;