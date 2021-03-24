import React          from 'react';
import userstore      from './components/userstore';
import inputform      from './inputform';
import submitbutton   from './submitbutton';
import loginform      from './loginform';
import './App.css';

class App extends React.Component{

  // API part
  async componentDidMount() {
    try{
      let res = await fetch('/isLoggedIn',{
        method : 'post',
        header :{
          'Accept' : 'application/json',
          'content-type' : 'application/json',
        }
      });

      let result = await res.json()

      //checking whether user is registered
      if(result && result.success)
      {
        userstore.loading = 'false';
        userstore.isLoggedIn = 'true';
        userstore.username = result.username;
      }

      else{
        userstore.loading = 'false';
        userstore.isLoggedIn = 'false';
      }
    }
    catch(error)
    {
      userstore.loading = 'false';
      userstore.isLoggedIn = 'false';
    }
  }

  async doLogout() {
    try{
      let res = await fetch('/logout',{
        method : 'post',
        header :{
          'Accept' : 'application/json',
          'content-type' : 'application/json',
        }
      });

      let result = await res.json()

      //checking whether user is registered
      if(result && result.success)
      {
        userstore.isLoggedIn = 'false';
        userstore.username = '';
      }

    }
    catch(error)
    {
      console.log(error);
    }
  }



  render(){
    return (
      <div className="App">
        <b>Hii</b>
      </div>
    );
  }
}

export default App;
