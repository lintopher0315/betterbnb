import React from 'react';

import Popular from './Popular.js'
import YourListings from './YourListings.js'
import Recommendations from './Recommendations.js'

function UserHome() {

    return (
        <div>
            <Popular />
            <hr />
            <YourListings />
            <hr />
            <Recommendations />
        </div>
    )
}

export default UserHome;