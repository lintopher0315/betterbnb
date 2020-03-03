import React, { useState, useEffect } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Header(props) {

    const [key, setKey] = useState(0);

    useEffect(() => {
        if (window.location.search.includes('=')) {
            setKey(window.location.search.split('=')[1]);
        }
        else {
            setKey('undefined');
        }
    }, [key])

    function setLogout() {
        setKey('undefined');
    }

    return (
        <Navbar id="header" variant="dark" expand="large">
            <Link className="header-link" to ={{pathname: '/', search: `?q=${key}`}}><Navbar.Brand className="header-link">
                <img alt="" src={require("../res/betterbnb_small.png")}/>
            </Navbar.Brand></Link>
            <Nav className="header-nav">
                <Nav.Link className="header-link">
                    <div id='header-button'>
                        About
                    </div>
                </Nav.Link>
                <Nav.Link className="header-link">
                    <Link className="header-redirect" to={{pathname: '/contact', search: `?q=${key}`}}>
                        <div id='header-button'>
                            Contact
                        </div>
                    </Link>
                </Nav.Link>
                <Nav.Link className="header-link">
                    {key !== "undefined" ?
                    <Link className="header-redirect" onClick={setLogout} to={{pathname: '/login', search: `?q=undefined`}}>
                        <div id='header-button'>
                            Logout
                        </div>
                    </Link> 
                    :
                    <Link className="header-redirect" to={{pathname: '/login', search: `?q=${key}`}}>
                        <div id='header-button'>
                            Login
                        </div>
                    </Link> 
                    }
                </Nav.Link>
            </Nav>
        </Navbar>
    )
}

export default Header;