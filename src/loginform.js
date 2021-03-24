import React          from 'react';
import Inputform      from './Inputform';
import Submitbutton   from './Submitbutton';
import userstore      from './components/userstore';


class Loginform extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            username : '',
            password : '',
            buttonDisabled : false,
        }
    }
  
    setInputValue(property,val)
    {
        val =val.trim();
        if (val.length >12){
            return;
        }
        this.setState({
            [property]:val
        })
    }

    //to change form if there are any errors

    resetForm()
    {
        this.setState({
            username : '',
            password : '',
            buttonDisabled : false,   
        })
    }

    //creating an API

    async doLogin(){
        if(!this.state.username){
            return;
        }
        if(!this.state.password){
            return;
        }

        this.setState({
            buttonDisabled : true
        })

        try{
            let res = await fetch('/login',{
                method : 'post',
                headers :{
                  'Accept' : 'application/json',
                  'content-type' : 'application/json',
                },
                // check whether username exists in database
                body : JSON.stringify({
                    username : this.state.username,
                    password : this.state.password
                })
              });

              let result = await res.json()

              //checking whether user is registered
              if(result && result.success)
              {
                userstore.isLoggedIn = true;
                userstore.username = result.username;
              }

              else if(result && result.success === false)
              {
                  this.resetForm();
                  alert(result.msg);
              }
            
        }

        catch(error){
            console.log(error);
            this.resetForm();
        }
    }
    render(){
    return (
      <div className="loginform">
       log in 
       <Inputform
       type='text'
       placeholder = 'Username'
       value ={this.state.username ? this.state.username : ''}
       onChange = { (val) => this.setInputValue('username',val) }
    />

    <Inputform
       type='password'
       placeholder = 'Password'
       value ={this.state.password? this.state.password : ''}
       onChange = { (val) => this.setInputValue('password',val) }
    />

    <Submitbutton
    text='Log In'
    disabled ={this.state.buttonDisabled}
    onClick = { () => this.doLogin()}
    />
      </div>
    );
  }
};

export default Loginform;
