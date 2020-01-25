import React, { useState } from 'react';
import { Navbar, Nav } from 'react-bootstrap';

import Jumbotron from './Jumbotron.js';
import Info from './Info.js';
import Extensions from './Extensions.js';

function Home() {
    return (
        <div>
            <Navbar id="header" variant="dark" expand="large">
                <Navbar.Brand href='#' className="header-link">
                    <img alt="" src={require("../res/betterbnb_small.png")}/>
                </Navbar.Brand>
                <Nav className="header-nav">
                    <Nav.Link className="header-link">
                        <div id='header-button'>
                            About
                        </div>
                    </Nav.Link>
                    <Nav.Link className="header-link">
                        <div id='header-button'>
                            Contact
                        </div>
                    </Nav.Link>
                    <Nav.Link className="header-link">
                        <div id='header-button'>
                            Login
                        </div>
                    </Nav.Link>
                </Nav>
            </Navbar>
            <Jumbotron />
            <Info />
            <Extensions />
        </div>
    )
}

export default Home;