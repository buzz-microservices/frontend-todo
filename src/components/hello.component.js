import React, {Component} from 'react';
import axios from 'axios';
import ReactLoading from 'react-loading';
var emoji = require('node-emoji');


 
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
       console.log(process.env.REACT_APP_BACKEND_LOCATION_URL)
        axios.get(process.env.REACT_APP_BACKEND_LOCATION_URL)
          .then(res => {
            if (this._isMounted) {
              console.log(res);
            this.setState({message: "Hello! you are in " + res.data[0].city + ", " +res.data[0].country_name +" "+ emoji.get('flag-'+(res.data[0].country_code).toLowerCase())}) ;
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
      if(this.state.message.length===0)
      return(   
      <div className="jumbotron jumbotron-fluid">
      <div className="container">
      <ReactLoading type="cylon" color="#485087" delay={0} /> 
      </div>
          </div>   
         );
        return (
          <div className="jumbotron jumbotron-fluid">
          <div className="container">
          <h1 className="display-4"> {this.state.message}</h1>
          </div>
          </div> 


        );
    }
}