import React from 'react';
import styled from 'styled-components';

const Container = styled.div`

`

const Home = () => {
    const loggedIn = false;
    const content = () => {
        if (!loggedIn){
            return <p>need to log in</p>;
        }
        else {
            return <p>logged in nice</p>;
        }
    }
    return (
        <Container>
            {content}
        </Container>
    );
}

export default Home;