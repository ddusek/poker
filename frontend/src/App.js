import React from 'react';
import Game from './Game';
import Home from './Home';
import Login from './components/Login';
import Register from './components/Register';
import MainNavbar from './components/Navbar';
import GameForm from './components/forms/GameForm';
import NewGame from './NewGame';
import styled from 'styled-components';
import { hot } from 'react-hot-loader/root';
import {BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';


const Layout = styled.div`
    height: 100%;
    background-color: rgb(25, 25, 25);
    color: rgb(255,255,255);
    overflow: auto;
`;

const Menu = styled.div`
    height: 6%;
`;

const Container = styled.div`
    color: white;
    height: 94%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
`
    
function App() {
    return (
        <Router>
            <Layout>
                <Menu>
                    <MainNavbar />
                </Menu>
                <Switch>
                    <Container>
                        <Route exact path='/'>
                            <Home />
                        </Route>
                        <Route exact path='/newgame'>
                            <NewGame />
                        </Route>
                        <Route exact path='/game/:slug'>
                            <Game />
                        </Route>
                        <Route exact path='/login'>
                            <Login />
                        </Route>
                        <Route exact path='/register'>
                            <Register />
                        </Route>
                    </Container>
                </Switch>
            </Layout>
        </Router>
    );
}

export default hot(App);