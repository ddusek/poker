import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.button`
    width: 100%;
`;

/**
 * Button component used in actions.
 */

const Button = ({ text }) => {
    return <Container>{text}</Container>;
};

export default Button;
