import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Login from './components/Login';
import IsAuthenticated from './components/Authentication';

const Container = styled.div`
    display: flex;
    align-items: center;
`;

const Home = () => {
    const [auth, setAuth] = useState(false);

    useEffect(() => {
        setAuth(IsAuthenticated());
        console.log('home');
    }, [auth]);

    return (
        <Container>{auth ? <Login IsAuthenticated="false" /> : <p>logged in nice</p>}</Container>
    );
};

export default Home;
