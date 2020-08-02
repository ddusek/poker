import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
    width: 450px;
    height: 200px;
    position: fixed;
    bottom: 0px;
    background-color: rgb(25, 25, 5);
    border-radius: 0 10px 0 0;
`;

const Ul = styled.ul`
    height: 100%;
    overflow: hidden;
    overflow-y: scroll;
    padding: 4px 10px 4px 10px;

    ::-webkit-scrollbar {
        width: 10px;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: rgb(45, 45, 65);
        border-radius: 10px;
    }
`;

const Li = styled.li`
    display: block;
    text-align: left;
`;

/**
 * Component showing logs to players (who won last round, bids, who joined, left, etc)
 */

const Logs = () => {
    const divRef = useRef({ behavior: 'smooth' });
    // const [data, setData] = useState(['First one']);
    const [texts, setTexts] = useState(<Li />);
    // const [number, setNumber] = useState(0);
    useEffect(() => {
        const doTest = () => {
            // setNumber(number + 1);
            // setData(data.push(number));
            // setTexts(data.map((d) => <Li key={number}>{d}</Li>));
            // divRef.current.scrollIntoView({ behavior: 'smooth' });
        };
        // const interval = setInterval(() => doTest(), 2000);
    }, []);

    useEffect(() => {
        const scrollToBottom = () => {
            divRef.current.scrollIntoView();
        };
        scrollToBottom();
    }, [texts]);

    return (
        <Container>
            <Ul>
                {texts}
                <div ref={divRef} />
            </Ul>
        </Container>
    );
};

export default Logs;
