import React, {useState, useRef, useEffect} from 'react';
import styled from 'styled-components';
import InfoBox from './components/forms/InfoBox';

const GameStyle = styled.div`
    color: white;
`;

const Game = () => {
    const [clickedCount, setClickedCount] = useState(0);
    const ws = useRef(null);
   
    useEffect(() => {
        ws.current = new WebSocket('ws://127.0.0.1:8000/ws' + window.location.pathname);
        ws.current.onopen = () => console.log('ws opened');
        ws.current.onclose = () => console.log('ws closed');
    }, [])
    
    const clicked = (e) => {
        const message = JSON.stringify({'message': 'clickedCount', 'type': 'chat_message'});
        ws.current.send(message);
    };
    
    useEffect(() => {
        ws.current.onmessage = (e) =>{
            const data = JSON.parse(e.data);
            setClickedCount(clickedCount + 1);
            console.log(clickedCount, e);
        }
    })

    return (
        <GameStyle>
            <InfoBox 
            header='waiting for players'
            text='at least 2 players are needed to start the game'
            buttonText='start now'
             />
            <button id="mybutton" onClick={clicked}>asd</button>
            <p>clicked: {clickedCount}</p>
        </GameStyle>
    );
}

export default Game;