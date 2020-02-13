import React from 'react';

import Jumbotron from './Jumbotron.js';
import Info from './Info.js';
import Extensions from './Extensions.js';

function Home() {
    return (
        <div>
            <Jumbotron />
            <Info />
            <Extensions />
        </div>
    )
}

export default Home;