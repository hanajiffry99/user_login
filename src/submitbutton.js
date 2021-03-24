import React from 'react';
import './App.css';
import './components/userstore';

class Submitbutton extends React.Component {
  render(){
    return (
      <div className="submitbutton">
          <button
          className='btn'
          disabled={this.props.disabled}
          onClick={() => this.props.onClick()}
          >
              {this.props.text}
          </button>
       
      </div>
    );
  }
}

export default Submitbutton;
