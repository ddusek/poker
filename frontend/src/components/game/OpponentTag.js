import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    width: 100%;
    height: 20%;
    border-style: dotted;
    color: yellow;
`;

/**
 * Opponents window component.
 */

const OpponentTag = () => {
    return (
        <Container>
            <p>name tag comp</p>
        </Container>
    );
};

export default OpponentTag;
