import React from 'react';
import './App.css';
import './components/userstore';

class Inputform extends React.Component {
  render(){
    return (
      <div className="inputform">
          <input
          className='input'
          type = {this.props.type}
          placeholder ={this.props.placeholder}
          value ={this.props.value}
          onChange= { (error) => this.props.onChange(error.target.value)}/>  
      </div>
    );
  }
}

export default Inputform;
