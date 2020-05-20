import React from 'react';
import styled from 'styled-components';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';


const MyNavbar = styled(Navbar)`
    background-color: rgb(25,25,35);
    border-bottom: 2px outset rgb(200, 200, 200);
    align-items: flex-end;
    justify-content: flex-end;
    //flex-direction: column;
`;

const MyNav = styled(Nav)`
    .Link{
        color: red;
    }
`;

const MyNavDropdown = styled(NavDropdown)`
    .show {
        background-color: rgb(25,25,35);
        border-color: rgb(71,71,71);
    }
    .dropdown-item{
        color: rgba(255, 255, 255, .5);
        :hover{
            background-color: rgb(25,25,35);
            color: rgb(197,197,197)
        }
    }
    .dropdown-item.active{
        background-color: rgb(35,35,60);
        color: rgb(197, 197, 197);
    }
    .dropdown-divider{
        border-color: rgb(71,71,71);
    }
`;


const MainNavbar = () => {
    return (
        <MyNavbar  variant='dark' expand="lg">
        <MyNavbar.Toggle aria-controls="basic-navbar-nav" />
        <MyNavbar.Collapse id="basic-navbar-nav">
            <MyNav className="mr-auto">
            <MyNav.Link href="/">Home</MyNav.Link>
            <MyNav.Link href="/newgame">New game</MyNav.Link>
            <MyNav.Link href="/joingame">Join game</MyNav.Link>
            <MyNavDropdown bg='dark' title="Profile" id="basic-nav-dropdown">
                <MyNavDropdown.Item href="/settings">Settings</MyNavDropdown.Item>
                <MyNavDropdown.Item href="/stats">Statistics</MyNavDropdown.Item>
                <MyNavDropdown.Divider />
                <MyNavDropdown.Item href="/logout">Log out</MyNavDropdown.Item>
            </MyNavDropdown>
            </MyNav>
        </MyNavbar.Collapse>
        </MyNavbar>
    );
}

export default MainNavbar;