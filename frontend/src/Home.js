import React from 'react';
import styled from 'styled-components';
import Login from './components/Login';
import IsAuthenticated from './components/Authentication';

const Container = styled.div`
    display: flex;
    align-items: center;
`;

const Home = () => {
    const isAuthenicated = IsAuthenticated();
    console.log('home');
    const Content = () => {
        if (!isAuthenicated) {
            return <Login IsAuthenticated="false" />;
        }
        return <p>logged in nice</p>;
    };
    return (
        <Container>
            <Content />
        </Container>
    );
};

export default Home;
