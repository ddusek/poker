import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Login from './components/Login';
import IsAuthenticated from './utils/Authentication';

const Container = styled.div`
    display: flex;
    align-items: center;
`;

const Home = () => {
    const [auth, setAuth] = useState(false);

    useEffect(() => {
        setAuth(IsAuthenticated());
        console.log('home');
    }, []);

    return <Container>{auth ? <p>logged in nice</p> : <Login isAuthenticated={auth} />}</Container>;
};

export default Home;
