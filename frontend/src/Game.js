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
        ws.current = new WebSocket("ws://127.0.0.1:8000/ws" + window.location.pathname);
        ws.current.onopen = () => console.log("ws opened");
        ws.current.onclose = () => console.log("ws closed");
    })
    const clicked = () => {
        console.log('clicked');
    };

      useEffect(() => {
        document.querySelector('button#mybutton').onclick = function(e) {
            setClickedCount(clickedCount + 1)
            ws.current.send(JSON.stringify({
                'clicked': clickedCount
            }));
        };
      }, [])
    return (
        <GameStyle>
            <InfoBox 
            header='waiting for players'
            text='at least 2 players are needed to start the game'
            buttonText='start now'
             />
            <button id="mybutton" onClick={() => setClickedCount(clickedCount +1)}>asd</button>
            {clickedCount}
        </GameStyle>
    );
}

export default Game;