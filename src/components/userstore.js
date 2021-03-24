import {extendObservable} from 'mobx';

//defining properties of the user details 
class userstore {
    constructor(){
        extendObservable(this,{
            loading : true,
            isLoggedIn :false,
            Username : '',
        })
    }
}

export default new userstore();//creating a new instance