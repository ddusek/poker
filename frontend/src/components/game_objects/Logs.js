import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
    width: 550px;
    height: 250px;
    position: fixed;
    bottom: 0px;
    border-style: dotted;
`;

const Logs = () => {
    return (
        <Container>
            <p />
            logs
        </Container>
    );
};

export default Logs;
