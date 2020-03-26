import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export class SavedListing extends Component {

    constructor(props) {
        super(props);
        console.log(props)
        
    }
    
    render() {
        console.log("Here", this.props);
        return (
        <div className='text-center'>
            <h1>Saved Listings</h1>
            <hr></hr>
           
                    

        </div>
      
        )
    }
}

export default SavedListing

