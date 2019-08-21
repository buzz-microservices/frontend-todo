import React, {Component} from 'react';
import axios from 'axios';

export default class hello extends Component {
  _isMounted = false;
    state = {
        message: ''
      }
      componentDidMount() {
        this._isMounted = true;
        /**
        * 'http://localhost:8081/location'
        */
        axios.get('http://35.225.144.2:8081/location')
          .then(res => {
            if (this._isMounted) {
              console.log(res);
            this.setState({message: "Hello! you are in " + res.data[0].city + ", " +res.data[0].country_name}) ;
            }
          })
          .catch(function(error) {
            console.log(error)
          
        })
      }
      componentWillUnmount() {
        this._isMounted = false;
      }

    render() {
      if(this.state.message.length>0)
      return null;
        return (

          <div className="jumbotron jumbotron-fluid">
          <div className="container">
          <h1 className="display-4"> {this.state.message}</h1>
          </div>
          </div> 


        );
    }
}