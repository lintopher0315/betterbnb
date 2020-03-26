import React, { Component } from 'react'
import axios from 'axios'

export class SavedListing extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: "5e793b4e25eca81d644b12a5",
            data: []
        }
        
    }

    componentDidMount() {

        
        const requestObj = {
            id: this.state.id,
        }
        
        

        axios.post('http://localhost:5000/getListings', requestObj)
            .then(response => {
                //res.send(response.data);
                console.log("here")
                console.log(response.data)
                this.setState({data: response.data})
            })
            .catch(err => {
                console.log(err)
                this.setState({redirection: true})
            })
    }

    render() {
        return (
        <div className='text-center'>
            <h1>Saved Listings</h1>
            <hr></hr>
           
                    

        </div>
      
        )
    }
}

export default SavedListing

