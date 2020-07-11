import React from 'react';
import styled from 'styled-components';
import { hot } from 'react-hot-loader/root';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Game from './Game';
import Home from './Home';
import Login from './components/Login';
import Register from './components/Register';
import MainNavbar from './components/Navbar';
import NewGame from './NewGame';

const Layout = styled.div`
    height: 100%;
    background-color: rgb(25, 25, 25);
    color: rgb(255, 255, 255);
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
`;

const DefaultContainer = () => (
    <Layout>
        <Menu>
            <MainNavbar />
        </Menu>
        <Container>
            <Route exact path="/">
                <Home />
            </Route>
            <Route exact path="/newgame">
                <NewGame />
            </Route>
            <Route exact path="/login">
                <Login />
            </Route>
            <Route exact path="/register">
                <Register />
            </Route>
        </Container>
    </Layout>
);

const GameContainer = () => <Game />;

function App() {
    return (
        <Router>
            <Layout>
                <Switch>
                    <Route exact path="/game/:slug" component={GameContainer} />
                    <Route component={DefaultContainer} />
                </Switch>
            </Layout>
        </Router>
    );
}

export default hot(App);
