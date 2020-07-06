import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    width: 450px;
    height: 250px;
    position: fixed;
    bottom: 0px;
    border-style: dotted;
    background-color: rgb(25, 25, 5);
`;

/**
 * Component showing logs to players (who won last round, bids, who joined, left, etc)
 */

const Logs = () => {
    return (
        <Container>
            <p />
            logs
        </Container>
    );
};

export default Logs;
