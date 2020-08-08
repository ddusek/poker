import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import InfoBox from './components/forms/InfoBox';
import GameWindow from './components/GameWindow';
import PlayerContext from './components/contexts/PlayerContext';
import GameContext from './components/contexts/GameContext';
import HandContext from './components/contexts/HandContext';
import MyTurnContext from './components/contexts/MyTurnContext';

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
    const getPlayersUrl = 'http://localhost:8000/game/get/players-details/';
    const gameName = window.location.pathname.slice(5).replace(/\//g, '');

    const ws = useRef(null);

    const [clickedCount, setClickedCount] = useState(0);
    const [userSet, setUserSet] = useState(false);
    const [userID, setUserID] = useState('');
    const [startGame, setStartGame] = useState();
    const [playersSet, setPlayersSet] = useState(false);
    const [players, setPlayers] = useState();
    const [playerCreated, setPlayerCreated] = useState(false);
    const [isMyTurn, setIsMyTurn] = useState(false);

    // Contexts
    const [gameInfoSet, setGameInfoSet] = useState(false);
    const [gameInfo, setGameInfo] = useState({});
    const [playerInfoSet, setPlayerInfoSet] = useState(false);
    const [playerInfo, setPlayerInfo] = useState({});
    const [handInfoSet, setHandInfoSet] = useState(false);
    const [handInfo, setHandInfo] = useState({});

    useEffect(() => {
        // get current user from api
        const getUser = async () => {
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
        };
        getUser();
    }, [userID, userSet]);

    useEffect(() => {
        // get current game from api
        const getGame = async () => {
            if (!gameInfoSet) {
                axios
                    .get(`${getGameUrl}?game=${gameName}`)
                    .then((response) => {
                        if (response.status === 200) {
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
        };
        getGame();
    }, [gameInfoSet, gameName]);

    useEffect(() => {
        // get current player from api
        const getPlayer = async () => {
            if (!playerInfoSet && playerCreated) {
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
        };
        getPlayer();
    }, [playerInfoSet, gameName, playerCreated]);

    useEffect(() => {
        // get current player's cards from api
        const getHand = async () => {
            if (!handInfoSet && playerInfoSet) {
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
        };
        getHand();
    }, [handInfoSet, gameName, playerInfoSet]);

    // get player object of every player in current game except current player
    useEffect(() => {
        const getPlayers = async () => {
            if (!playersSet && playerInfoSet) {
                axios
                    .get(`${getPlayersUrl}?game=${gameName}`)
                    .then((response) => {
                        if (response.status === 200) {
                            setPlayersSet(true);

                            // remove current player from list
                            response.data.some((item) => {
                                if (item.id === playerInfo.id) {
                                    const index = response.data.indexOf(item);
                                    response.data.splice(index, 1);
                                    return true;
                                }
                                return false;
                            });

                            const compare = (a, b) => {
                                if (a.id < b.id) {
                                    return -1;
                                }
                                if (a.id > b.id) {
                                    return 1;
                                }
                                return 0;
                            };

                            // fill with empty player objects
                            const filledArray = response.data.sort(compare).concat(
                                new Array(8 - response.data.length).fill({
                                    id: 0,
                                    user: 0,
                                    chips: 0,
                                    game: 0,
                                    highest_combination: 0,
                                    pot: 0,
                                    round_bet: 0,
                                    can_call: false,
                                    can_check: false,
                                    can_raise: false,
                                    is_all_in: false,
                                    is_folded: false,
                                    is_in_game: false,
                                })
                            );
                            setPlayers(filledArray);
                        } else {
                            console.log('didnt get any player', response.status);
                        }
                    })
                    .catch((err) => {
                        console.log(`Error: ${err}`);
                    });
            }
        };
        getPlayers();
        console.log('got players');
    }, [playersSet, gameName, playerInfo.id, gameInfo.max_players, playerInfo, playerInfoSet]);

    // Check if its player's turn
    useEffect(() => {
        if (playerInfo.id === gameInfo.current_player) {
            setIsMyTurn(true);
        } else {
            setIsMyTurn(false);
        }
    }, [gameInfo.current_player, playerInfo.id]);

    // handle websocket messages
    useEffect(() => {
        if (userSet) {
            if (!ws.current) return;

            ws.current.onmessage = (e) => {
                const data = JSON.parse(e.data);
                setClickedCount(clickedCount + 1);
                if (data.type === 'player_connected') {
                    setPlayerCreated(true);
                    setPlayersSet(false);
                    setStartGame(data.start_game);
                }
                if (data.type === 'player_disconnected') {
                    setPlayersSet(false);
                }
                if (data.type === 'player_cards_change') {
                    setHandInfoSet(false);
                }
                console.log(e);
            };
        }
    }, [clickedCount, userSet]);
    // just for testing websocket printing numbers
    const clicked = (e) => {
        const message = JSON.stringify({ message: 'clickedCount', type: 'chat_message' });
        ws.current.send(message);
    };
    if (startGame === undefined || !playerInfoSet) {
        return (
            <GameContainer>
                <p>loading</p>
            </GameContainer>
        );
    }
    if (startGame) {
        return (
            <GameContainer>
                <GameContext.Provider value={gameInfo}>
                    <PlayerContext.Provider value={playerInfo}>
                        <HandContext.Provider value={handInfo}>
                            <MyTurnContext.Provider value={playerInfo.id === gameInfo.current_player}>
                                <GameWindow players={players} />
                            </MyTurnContext.Provider>
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
