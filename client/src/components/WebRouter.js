import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './Home.js';
import Contact from './Contact.js'
import Header from'./Header.js';
import SearchResults from './SearchResults.js'
import ListingPage from './ListingPage.js'
import LoginPage from './LoginPage.js'
import RegistrationPage from './RegistrationPage.js'
import UserHome from './UserHome.js'
import Report from './Report.js'
import SavedListing from './SavedListing.js'
import Preferences from './Preferences.js';

function WebRouter() {
    return (
        <div>
            <Header />
            <Switch>
                <Route exact path='/' component={() => <Home />} />
                <Route path='/contact' component={() => <Contact />} />
                <Route path='/login' component={() => <LoginPage />} />
                <Route path='/results' component={() => <SearchResults />} />
                <Route exact path='/details/:url' component={() => <ListingPage />} />
                <Route path='/details/' component={() => <ListingPage />} />
                <Route path='/registration' component={() => <RegistrationPage />} />
                <Route path='/userhome' component={() => <UserHome />} />
                <Route path='/report' component={() => <Report />} />
                <Route path='/savedlistings' component={() => <SavedListing />} />
                <Route path='/preferences/' component={() => <Preferences />} />
                
            </Switch>
        </div>
    )
}

export default WebRouter;