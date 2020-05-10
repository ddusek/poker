import React from 'react';
import styled from 'styled-components';
import Register from './Register';
import Login from './Login';

const Container = styled.div`
    display: flex;
    align-items: center;
`

const Home = () => {
    const loggedIn = false;
    const Content = () => {
        if (!loggedIn){
            return <Login />
        }
        else {
            return <p>logged in nice</p>;
        }
    }
    return (
        <Container>
            <Content />
        </Container>
    );
}

export default Home;