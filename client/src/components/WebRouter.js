import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './Home.js';
import Contact from './Contact.js'
import Header from'./Header.js';
import SearchResults from './SearchResults.js'
import ListingPage from './ListingPage.js'
import LoginPage from './LoginPage.js'
import RegistrationPage from './RegistrationPage.js'

function WebRouter() {
    return (
        <div>
            <Header />
            <Switch>
                <Route exact path='/' component={() => <Home />} />
                <Route path='/contact' component={() => <Contact />} />
                <Route path='/login' component={() => <LoginPage/>} />
                <Route path='/results' component={() => <SearchResults/>} />
                <Route path='/details' component={() => <ListingPage/>} />
                <Route path='/registration' component={() => <RegistrationPage/>} />
            </Switch>
        </div>
    )
}

export default WebRouter;