import React          from 'react';
import { observer }   from 'mobx-react';
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

    if(userstore.loading)
    {
      return (
        <div className="App">
          <div className='container'>
            Loading,Please wait for a moment.....
          </div>
        </div>
      );
    }
   
    else(userstore.isLoggedIn)
    {
      return (
        <div className="App">
          <div className='container'>
            Welcome {userstore.username}

            <submitbutton
            text = {'Log out'}
            disabled = {false}
            onClick = {() => this.doLogout()}
            />
          </div>
        </div>
      );
    }

    <div className="App">
          <div className='container'>
           <loginform/>
          </div>
        </div>
  }
}

export default observer(App);
