import React, {useEffect} from 'react';
import Home from './Homepage'
import MenuForm from './components/MenuForm'
import styled from 'styled-components';
import { hot } from 'react-hot-loader/root';



const Layout = styled.div`
    width: 100%;
    height: 100%;
    text-align: center;
    background-color: rgb(25, 25, 25);
    display: flex;
    justify-content: center;
    align-items: center;
`;

const url = 'localhost:8000/api/'
function App() {
    return (
        <Layout>
            <MenuForm />
        </Layout>
    );
}

export default hot(App);