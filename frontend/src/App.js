import React, {useEffect, useState} from 'react';
import Game from './Game'
import MenuForm from './components/MenuForm'
import styled from 'styled-components';
import { hot } from 'react-hot-loader/root';
import Cookies from 'js-cookie';
import {BrowserRouter as Router, Route, Redirect, useHistory, Switch, Link } from 'react-router-dom'


const Layout = styled.div`
    width: 100%;
    height: 100%;
    text-align: center;
    background-color: rgb(25, 25, 25);
    color: rgb(255,255,255);
    display: flex;
    justify-content: center;
    align-items: center;
`;

const history = useHistory();
const url = 'http://localhost:8000/api/'
const csrftoken = Cookies.get('csrftoken');
// const RedirectGame = () => {
//     if (submitted === true) {
//         return <Redirect to='/game' />;
//     }
//     return null;
// }
    
function App() {
    // create game and redirect to that game
    const onSubmit = values => {
        console.log(values);
        // fetch(`${url}post/game/`, {
        //     method: 'POST',
        //     headers: {
        //         'Accept': 'application/json, text/plain',
        //         'Content-Type': 'application/json;charset=UTF-8',
        //         'X-CSRFToken': csrftoken
        //     },
        //     body: JSON.stringify(values)
        // });
        history.push('/game');
    };
    //https://www.youtube.com/watch?v=CZeulkp1ClA
    return (
        <Layout>
            <Router>
                <Switch>
                    <Route exact path='/'>
                        <MenuForm onSubmit={onSubmit} />
                    </Route>
                    <Route exact path='/game'>
                        <Game />
                    </Route>
                </Switch>
                    <Link to='game'>game</Link>
            </Router>
        </Layout>
    );
}

export default hot(App);