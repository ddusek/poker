import React from 'react';
import Game from './Game';
import Login from './Login';
import Register from './Register';
import MenuForm from './components/MenuForm';
import styled from 'styled-components';
import { hot } from 'react-hot-loader/root';
import {BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';


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
    
function App() {
    return (
        <Layout>
            <Router>
                <Switch>
                    <Route exact path='/'>
                        <MenuForm />
                    </Route>
                    <Route exact path='/game'>
                        <Game />
                    </Route>
                    <Route exact path='/login'>
                        <Login />
                    </Route>
                    <Route exact path='/register'>
                        <Register />
                    </Route>
                </Switch>
            </Router>
        </Layout>
    );
}

export default hot(App);