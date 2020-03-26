import React, { Component } from 'react'
import axios from 'axios'

export class SavedListing extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: "5e793b4e25eca81d644b12a5",
            urls: [],
            data: null
        }
        
    }
      

    componentDidMount() {

        
        const requestObj = {
            id: this.state.id,
        }
        
        
        /* we should think about saving all relevant info with a listing */
        /* so we don't need to do multiple requests to get all the data  */
        axios.post('http://localhost:5000/getListings', requestObj)
            .then(response => {
                //res.send(response.data);
                //console.log(response.data[0])

                /* callback function here grabs report data */
                /* will have to patch later for performance */
                this.setState({urls: response.data}, function() {
                    console.log(this.state.urls)
                    for (let i = 0; i < this.state.urls.length; i++) {
                        //console.log("i = ", i);
                        console.log(this.state.urls[i])
                        axios.get('http://localhost:5000/api/report', {headers: {"url": this.state.urls[i]}})
                            .then(response => {
                                this.setState({data: response.data})
                            })
                            .catch(err => {
                                console.log(err)
                            }) /* end of get request */

                    }
                    
                }) /* end of callback */

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

