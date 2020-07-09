import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import InfoBox from './components/forms/InfoBox';
import GameWindow from './components/GameWindow';
import PlayerContext from './components/contexts/PlayerContext';
import GameContext from './components/contexts/GameContext';
import HandContext from './components/contexts/HandContext';

const Container = styled.div`
    color: white;
`;
const GameContainer = styled.div`
    width: 100%;
    height: 100%;
`;

/**
 * Game component containing all components needed for playing a game.
 * This component also creates Websocket connections.
 */
const Game = () => {
    const getUserUrl = 'http://localhost:8000/user/currentuser/';
    const getGameUrl = 'http://localhost:8000/game/get/game-detail/';
    const getPlayerUrl = 'http://localhost:8000/game/get/player-detail/';
    const getCardsUrl = 'http://localhost:8000/game/get/cards-detail/';
    const gameName = window.location.pathname.slice(5).replace(/\//g, '');
    const ws = useRef(null);
    const [clickedCount, setClickedCount] = useState(0);
    const [userSet, setUserSet] = useState(false);
    const [userID, setUserID] = useState('');
    const [startGame, setStartGame] = useState(false);
    const [gameInfoSet, setGameInfoSet] = useState(false);
    const [gameInfo, setGameInfo] = useState({});
    const [playerInfoSet, setPlayerInfoSet] = useState(false);
    const [playerInfo, setPlayerInfo] = useState({});
    const [handInfoSet, setHandInfoSet] = useState(false);
    const [handInfo, setHandInfo] = useState({});

    useEffect(() => {
        // get current user from api
        if (!userSet) {
            axios
                .get(getUserUrl)
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
                `ws://127.0.0.1:8000/ws${window.location.pathname}?user=${userID}&game=${window.location.pathname}`
            );
            ws.current.onopen = () => console.log('ws opened');
            ws.current.onclose = () => console.log('ws closed');
        }
    }, [userID, userSet]);

    useEffect(() => {
        // get current game from api
        if (!gameInfoSet) {
            axios
                .get(`${getGameUrl}?game=${gameName}`)
                .then((response) => {
                    if (response.status === 200) {
                        console.log(response.data);
                        setGameInfoSet(true);
                        setGameInfo(response.data);
                    } else {
                        console.log('didnt get player', response.status);
                    }
                })
                .catch((err) => {
                    console.log(`Error: ${err}`);
                });
        }
    }, [gameInfoSet, gameName]);

    useEffect(() => {
        // get current player from api
        if (!playerInfoSet) {
            axios
                .get(`${getPlayerUrl}?game=${gameName}`)
                .then((response) => {
                    if (response.status === 200) {
                        setPlayerInfoSet(true);
                        setPlayerInfo(response.data);
                    } else {
                        console.log('didnt get player', response.status);
                    }
                })
                .catch((err) => {
                    console.log(`Error: ${err}`);
                });
        }
    }, [playerInfoSet, gameName]);

    useEffect(() => {
        // get current player's cards from api
        if (!handInfoSet) {
            axios
                .get(`${getCardsUrl}?game=${gameName}`)
                .then((response) => {
                    if (response.status === 200) {
                        setHandInfoSet(true);
                        setHandInfo(response.data);
                    } else {
                        console.log('didnt get cards', response.status);
                    }
                })
                .catch((err) => {
                    console.log(`Error: ${err}`);
                });
        }
    }, [handInfoSet, gameName]);

    // handle websocket messages
    useEffect(() => {
        if (userSet) {
            ws.current.onmessage = (e) => {
                const data = JSON.parse(e.data);
                setClickedCount(clickedCount + 1);
                console.log(e);
                setStartGame(data.start_game);
            };
        }
    }, [clickedCount, userSet]);
    // just for testing websocket printing numbers
    const clicked = (e) => {
        const message = JSON.stringify({ message: 'clickedCount', type: 'chat_message' });
        ws.current.send(message);
    };
    if (startGame) {
        return (
            <GameContainer>
                <GameContext.Provider value={gameInfo}>
                    <PlayerContext.Provider value={playerInfo}>
                        <HandContext.Provider value={handInfo}>
                            <GameWindow />
                        </HandContext.Provider>
                    </PlayerContext.Provider>
                </GameContext.Provider>
            </GameContainer>
        );
    }
    return (
        <Container>
            <InfoBox
                header="waiting for players"
                text="at least 2 players are needed to start the game"
                buttonText="start now"
            />
            <button type="button" id="mybutton" onClick={clicked}>
                asd
            </button>
            <p>clicked: {clickedCount}</p>
        </Container>
    );
};

export default Game;
