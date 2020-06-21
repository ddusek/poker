import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import InfoBox from './components/forms/InfoBox';

const GameStyle = styled.div`
    color: white;
`;

const Game = () => {
    const [clickedCount, setClickedCount] = useState(0);
    const ws = useRef(null);
    const getUrl = 'http://localhost:8000/user/currentuser/';
    const [userID, setUserID] = useState('');
    const [userSet, setUserSet] = useState(false);

    useEffect(() => {
        // get current user from api
        if (!userSet) {
            axios
                .get(getUrl)
                .then((response) => {
                    if (response.status === 200) {
                        setUserID(response.data.user_id);
                        setUserSet(true);
                    } else {
                        console.log('didnt get user', response.status);
                    }
                })
                .catch((err) => {
                    console.log(`Error: ${err}`);
                });
            // set websocket
        } else {
            ws.current = new WebSocket(
                `ws://127.0.0.1:8000/ws${window.location.pathname}?user=${userID}`
            );
            ws.current.onopen = () => console.log('ws opened');
            ws.current.onclose = () => console.log('ws closed');
        }
    }, [userID, userSet]);

    // handle websocket messages
    useEffect(() => {
        if (userSet) {
            ws.current.onmessage = (e) => {
                const data = JSON.parse(e.data);
                setClickedCount(clickedCount + 1);
                console.log(clickedCount, e);
            };
        }
    }, [clickedCount, userSet]);

    // just for testing websocket printing numbers
    const clicked = (e) => {
        const message = JSON.stringify({ message: 'clickedCount', type: 'chat_message' });
        ws.current.send(message);
    };

    return (
        <GameStyle>
            <InfoBox
                header="waiting for players"
                text="at least 2 players are needed to start the game"
                buttonText="start now"
            />
            <button type="button" id="mybutton" onClick={clicked}>
                asd
            </button>
            <p>clicked: {clickedCount}</p>
        </GameStyle>
    );
};

export default Game;
