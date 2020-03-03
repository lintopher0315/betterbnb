import React, { useEffect, useState } from 'react';

import Jumbotron from './Jumbotron.js';
import Info from './Info.js';
import Extensions from './Extensions.js';

function Home() {

    const [auth, setAuth] = useState('undefined');

    useEffect(() => {
        setAuth(window.location.search.split('=')[1]);
        console.log(auth);
    }, [auth])

    return (
        <div>
            <Jumbotron id={auth} />
            <Info />
            <Extensions />
        </div>
    )
}

export default Home;