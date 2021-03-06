import React, { useState, useEffect } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AlgoliaPlaces from 'algolia-places-react';
import { useHistory } from 'react-router-dom';

function Header(props) {

    let history = useHistory();

    const [key, setKey] = useState(0);

    useEffect(() => {
        if (window.location.search.includes('?q=')) {
            let query = window.location.search.split('=')[1];
            if (query.includes("&url")) {
                setKey(query.substring(0, query.indexOf("&url")));
            }
            else {
                setKey(query);
            }
        }
        else {
            setKey('undefined');
        }
    }, [key])

    function setLogout() {
        setKey('undefined');
        window.location.href = "http://localhost:5000/logout";
    }

    

    return (
        <div>
            {key !== "undefined" ?
                <Navbar id="user-header" variant="light" expand="large">
                    <Link className="header-link" to ={{pathname: '/userhome/', search: `?q=${key}`}}><Navbar.Brand className="header-link">
                        <img alt="" src={require("../res/betterbnb_small.png")}/>
                    </Navbar.Brand></Link>
                    <div id="user-header-search-container">
                        <AlgoliaPlaces
                            placeholder={"Search a location"}
                            style={{
                                borderRadius: '10px',
                            }}
                            onChange={({suggestion}) => {
                                history.push({
                                    pathname: '/results',
                                    name: suggestion.name,
                                    coord: suggestion.latlng,
                                    search: `?q=${window.location.search.split('=')[1]}`
                                })
                            }}
                        />
                    </div>
                    <Nav className="header-nav">
                        <Nav.Link className="header-link">
                            <Link className="header-redirect" to={{pathname: '/savedlistings', search: `?q=${key}`}}>
                                <div id='user-header-button'>
                                    Your Listings
                                </div>
                            </Link>
                        </Nav.Link>
                        <Nav.Link className="header-link">
                                <div id='user-header-button'>
                                    Recommendations
                                </div>
                        </Nav.Link>
                        <Nav.Link className="header-link">
                            <Link className="header-redirect" to={{pathname: '/preferences', search: `?q=${key}`, params: {
                                id: "test-value"
                            }}}>
                                <div id='user-header-button'>
                                    Preferences
                                </div>
                            </Link>
                        </Nav.Link>
                        <Nav.Link className="header-link">
                            <Link className="header-redirect" onClick={setLogout}>
                                <div id='user-header-button'>
                                    Logout
                                </div>
                            </Link>
                        </Nav.Link>
                    </Nav>
                </Navbar>
            :
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
                            <Link className="header-redirect" to={{pathname: '/login', search: `?q=${key}`}}>
                                <div id='header-button'>
                                    Login
                                </div>
                            </Link> 
                        </Nav.Link>
                    </Nav>
                </Navbar>
            }
        </div>
    )
}

export default Header;