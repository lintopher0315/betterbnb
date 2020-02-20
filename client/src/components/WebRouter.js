import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './Home.js';
import Contact from './Contact.js'
import Header from'./Header.js';
import SearchResults from './SearchResults.js'
import ListingPage from './ListingPage.js'

function WebRouter() {
    return (
        <div>
            <Header />
            <Switch>
                <Route exact path='/' component={() => <ListingPage />} />
                <Route path='/contact' component={() => <Contact />} />
            </Switch>
        </div>
    )
}

export default WebRouter;