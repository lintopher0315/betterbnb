import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Header() {
    return (
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
                    <Link className="header-redirect" to={{pathname: '/contact'}}>
                        <div id='header-button'>
                            Contact
                        </div>
                    </Link>
                </Nav.Link>
                <Nav.Link className="header-link">
                    <Link className="header-redirect" to={{pathname: '/login'}}>
                    <div id='header-button'>
                        Login
                    </div>
                    </Link>
                </Nav.Link>
            </Nav>
        </Navbar>
    )
}

export default Header;