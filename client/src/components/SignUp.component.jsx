import React from 'react';

class SignupForm extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            name:"",
            email:"",
            password:"",
            address:"",
            zipcode:""
        }
    }

    onTextChange=(event)=>{
        var type  = event.target.name;
        this.setState({...this.state,[type]:event.target.value});
    }

    onSubmit=(event)=>{
        
    }

    render(){
        return(
            <form >
                <label>Name</label>
                <input type="text" name = "name" value ={this.state.name} onChange={this.onTextChange}/>
                <label>Email</label>
                <input type="text" name = "email" value ={this.state.email} onChange={this.onTextChange}/>
                <label>Password</label>
                <input type="password" name = "password" value ={this.state.password} onChange={this.onTextChange}/>
                <label>Address</label>
                <input type="text"  name = "address" value ={this.state.address} onChange={this.onTextChange}/>
                <label>Zipcode</label>
                <input type="text" name = "zipcode" value ={this.state.zipcode} onChange={this.onTextChange}/>
                <input type="checkbox"/>
                <label>Sign in as seller</label>
                <input type="submit" value="Sign Up"/>
            </form>
        );
    }
}

export default SignupForm;