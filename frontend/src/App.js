import React from 'react';
import Home from './Homepage'
import MenuForm from './components/MenuForm'
import styled from 'styled-components';
import { hot } from 'react-hot-loader/root';



const Layout = styled.div`
    width: 100%;
    text-align: center;
    background-color: rgb(25, 25, 25);
`;

const url = 'localhost:8000/api/'
function App() {
    return (
        <Layout>
            <MenuForm handleSubmit='asd' />
        </Layout>
    );
}

export default hot(App);