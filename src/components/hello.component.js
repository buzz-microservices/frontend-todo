import React, {Component} from 'react';
import axios from 'axios';

export default class hello extends Component {
    state = {
        message: ''
      }
      componentDidMount() {
        /**
        * 'http://localhost:8081/location'
        */
        axios.get('http://backend-location.cje:8081/location')
          .then(res => {
              console.log(res);
            this.setState({message: "Hello! you are in " + res.data[0].city + ", " +res.data[0].country_name}) ;
          })
          .catch(function(error) {
            console.log(error)
        })
      }


    render() {
        return (
            
<div className="jumbotron jumbotron-fluid">
  <div className="container">
    <h1 className="display-4"> {this.state.message}</h1>
  </div>
</div> 


        );
    }
}