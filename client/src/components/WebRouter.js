import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './Home.js';
import Contact from './Contact.js'
import Header from'./Header.js';

function WebRouter() {
    return (
        <div>
            <Header />
            <Switch>
                <Route exact path='/' component={() => <Home />} />
                <Route path='/contact' component={() => <Contact />} />
            </Switch>
        </div>
    )
}

export default WebRouter;